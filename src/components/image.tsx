import React from 'react'
import Blok, { BlokContent } from './blok'
import Classes from '../utils/classes'
import { COLOURS } from '../utils/colours'
// import RawImage, { ImageSize } from '../image'
import RawImage from './img'
import css from 'styled-jsx/css'

export interface ImageContentSource {
  image?: string
  alt_tag?: string
  caption?: string
  copyright_info?: string
}

export interface ImageContent extends BlokContent {
  source: ImageContentSource
  style?: Array<string>
  ratio?: number
}

// const IMAGE_WIDTHS: Array<number> = [
//   240,
//   300,
//   720,
//   1280,
//   2000
// ]

// function createImageSize(width: number, ratio?: number): ImageSize {
//   let _ratio = undefined
//   if (ratio !== undefined && ratio > 0.01) _ratio = ratio
//   return {
//     option: `${width}x${_ratio ? Math.round(width * _ratio) : 0}`,
//     size: `${width}w`
//   }
// }

// function createImageSizes(sizes: Array<number>, ratio?: number): Array<ImageSize> {
//   return sizes.map(size => createImageSize(size, ratio))
// }

const { className: imgClass, styles: imgStyles } = css.resolve`
  img {
    object-fit: cover;
  }
`

class Image extends React.Component<ImageContent> {

  render() {
    const { source, style, ratio } = this.props
    const classes = Classes('image').add(style)
    if (!source || !source.image) return <div></div>
    const { image, alt_tag, caption, copyright_info } = source
    return <div className={classes.join()}>
      <div className='image-source'>
        <RawImage
          className={imgClass}
          src={image}
          alt={alt_tag}
          ratio={ratio}
          // defaultSize={createImageSize(700, ratio).option}
          // sizes={createImageSizes(IMAGE_WIDTHS, ratio)}
          />
        {copyright_info && <div className='copyright'>&copy; {copyright_info}</div>}
      </div>
      {caption && <p className='caption'>{caption}</p>}
      {imgStyles}
      <style jsx>{`
        .image {
          display: flex;
          flex-direction: column;
        }
        .image-ratio {
          padding-top: ${(ratio || 1) * 100}%;
        }
        .image-source {
          position: relative;
          display: flex;
          flex: 1;
        }
        .stretch {
          flex: 1;
        } 
        .copyright {
          background-color: transparent;
          position: absolute;
          bottom: 0;
          left: 0;
          color: white;
          padding: 0.5em;
          transition-property: background-color;
          transition-duration: 300ms;
        }
        .image:hover .copyright {
          background-color: black;
        }
        .caption {
          margin: 1.2em 0 0 0;
          font-size: 0.8em;
          color: ${COLOURS.text_mid};
        }
      `}</style>
    </div>
  }

}

const ImageBlok = Blok(Image)
export default ImageBlok
