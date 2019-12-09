import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

export const ImagesContext = React.createContext([]);

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const IMAGE_STYLE = {
  display: 'block',
  width: '100%'  
}

interface ImageProps {
  src: string
  alt?: string
  className?: string
  ratio?: number
}

class Image extends React.Component<ImageProps> {

  static contextType = ImagesContext;

  render () {
    const { src, alt, className, ratio } = this.props
    const images = this.context || []
    if (!src) return null
    const _src = src.indexOf('//a.storyblok.com/') === 0 ? `https:${src}` : src
    let imageRelPath = null
    for(let i = 0; i < images.length; i++) {
      const image = images[i]
      if(image.url === _src) {
        imageRelPath = image.relativePath
        break
      }
    }
    let imageStyle: any = {}
    if (ratio) imageStyle.height = '100%'
    imageStyle = {...IMAGE_STYLE, ...imageStyle}
    const defaultImage = <img className={className} style={imageStyle} src={_src} alt={alt} />
    let ImageComponent = defaultImage
    if (imageRelPath) {
      ImageComponent = <StaticQuery
        query={graphql`
          query {
            images: allFile(filter:{ extension: { regex: "/jpeg|jpg|png|gif/"}}) {
            edges {
              node {
                extension
                relativePath
                childImageSharp {
                  fluid(maxWidth: 2000, traceSVG: { background: "#fff", color: "#663399" }) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
        `}
        render={({ images }) => {
          const image = images.edges.find(image => image.node.relativePath === imageRelPath)
          if (!image) return defaultImage
          return <Img className={className} style={imageStyle} fluid={image.node.childImageSharp.fluid} alt={alt} />
        }}
      />
    }
    return <>
      {(ratio && <span className='image-ratio-wrapper'>
        <span className='image-ratio'>
          {ImageComponent}
        </span>
      </span>) || ImageComponent}
      <style jsx>{`
        .image-ratio-wrapper {
          display: block;
          width: 100%;
          position: relative;
          padding-top: ${(ratio || 1) * 100}%;
        }
        .image-ratio {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  }

}

export default Image
