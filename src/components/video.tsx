import React from 'react'
import Blok, { BlokContent } from './blok'
import ReactPlayer from 'react-player'

export interface VideoContent extends BlokContent {
  url: string
}

class Video extends React.Component<VideoContent> {

  render() {
    const { url } = this.props
    return (
      <div className='wrapper'>
        <ReactPlayer
          className='player'
          url={url}
          width='100%'
          height='100%'
          light
          playing
          style={{position: 'absolute', top: 0, left: 0}}
        />
        <style jsx>{`
          .wrapper {
            background-color: black;
            position: relative;
            padding-top: 56.25%;
          }
        `}</style>
      </div>
    )
  }

}

const VideoBlok = Blok(Video)
export default VideoBlok
