import React from 'react'
import Img from 'gatsby-image'
import { getFluidGatsbyImage } from 'gatsby-storyblok-image'

const FluidImage = ({ src, maxWidth }) => {
  const fluidProps = getFluidGatsbyImage(src, {
    maxWidth: maxWidth || 900
  })

  return <Img fluid={fluidProps} />
}

export default FluidImage