import React from 'react'
import SbEditable from 'storyblok-react'
import Image from './image'

const Feature = (props) => (
  <SbEditable content={props.blok}>
    <div className="col-4">
      <h2>{props.blok.name}</h2>
      {props.blok.icon && <Image src={props.blok.icon} />}
    </div>
  </SbEditable>
)

export default Feature