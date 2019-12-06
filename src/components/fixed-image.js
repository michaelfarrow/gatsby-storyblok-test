import React from 'react'
import Img from 'gatsby-image'
import { getFixedGatsbyImage } from 'gatsby-storyblok-image'

const FixedImage = ({ src }) => {
  const fixedProps = getFixedGatsbyImage(src, width, {
    width: width || 900
  })

  return <Img fixed={fixedProps} />
}

export default FixedImage