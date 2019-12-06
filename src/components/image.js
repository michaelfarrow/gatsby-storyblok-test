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

class Image extends React.Component {

  static contextType = ImagesContext;

  render () {
    const { src, alt } = this.props
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
    const defaultImage = <img src={_src} alt={alt} />
    if (imageRelPath) {
      return <StaticQuery
        query={graphql`
          query {
            images: allFile(filter:{ extension: { regex: "/jpeg|jpg|png|gif/"}}) {
            edges {
              node {
                extension
                relativePath
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
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
          return <Img fluid={image.node.childImageSharp.fluid} alt={alt} />
        }}
      />
    }
    return defaultImage
  }

}

export default Image
