import React from 'react'
import SbEditable from 'storyblok-react'
import Components from './components'

export interface BlokContent {
  _uid: string
  component: string
}

interface BlokProps {
  content: BlokContent
}

export function mapBlok (blok: any) {
  return React.createElement(Components(blok.component), {key: blok._uid, content: blok})
}

export default function WithBlok<T extends BlokContent>(Component: React.ComponentType<T>) {
  return (props: BlokProps) => {
    return <SbEditable content={props.content}>
      {/* <div> */}
        <Component {...props.content as T} />
      {/* </div> */}
    </SbEditable>
  }
}
