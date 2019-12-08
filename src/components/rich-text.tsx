import React from 'react'
import Blok, { BlokContent } from './blok'
import Markdown from './markdown'

export interface RichTextContent extends BlokContent {
  content?: string
}

class RichText extends React.Component<RichTextContent> {

  render() {
    const { content } = this.props
    return <div className='rich-text'>
      {content && <Markdown content={content} />}
      <style jsx>{`
        .rich-text {
          // margin-top: 0.5em;
          // margin-bottom: 0.5em;
        }
      `}</style>
    </div>
  }

}

const RichTextBlok = Blok(RichText)
export default RichTextBlok
