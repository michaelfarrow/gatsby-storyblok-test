import React from 'react'
import { mapBlok } from './blok'

const Page = (props) => {
  return <div>
    {props.blok.body && props.blok.body.map((blok) => mapBlok(blok))}
  </div>
}

export default Page