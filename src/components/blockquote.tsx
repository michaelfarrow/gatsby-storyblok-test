import React from 'react'
import Blok, { BlokContent } from './blok'
import Markdown from './markdown'
// import Image from '../image'
import Classes from '../utils/classes'

export interface BlockQuoteContent extends BlokContent {
  body: string,
  attribution?: string
  company?: string
  icon?: string
}

const iconStyle = {
  position: 'absolute',
  width: 50,
  height: 50,
  top: 0,
  left: 0
}

class BlockQuote extends React.Component<BlockQuoteContent> {

  render() {
    const { body, attribution, company, icon } = this.props
    const classes = Classes('blockquote')
    if (icon) classes.add('has-icon')
    return <blockquote className={classes.join()}>
      <div className='content'>
        <Markdown content={body} />
      </div>
      {(attribution || company) && <footer>
        {/* {icon && <Image alt={company || attribution} src={icon} defaultSize='100x100' width={50} height={50} style={iconStyle} />} */}
        <cite>{company && <b>{company}</b>}{company && attribution && ' - ' || ''}{attribution}</cite>
      </footer>}
      <style jsx>{`
        blockquote {
          margin-left: 0;
          margin-right: 0;
        }
        .content {
          font-size: 1.5em;
        }
        footer {
          position: relative;
          margin-top: 1em;
          padding-left: 0.5em;
          box-sizing: border-box;
        }
        .has-icon footer {
          padding-left: 2.5em;
          padding-top: 0.5em;
          min-height: 50px;
        }
        footer:before {
          content: "${'\\2014'}";
          margin-right: 0.5em;
        }
        .has-icon footer:before {
          display: none;
        }
        cite {
          font-style: normal;
        }
      `}</style>
      <style jsx global>{`
        .blockquote .content > *:first-child:before,
        .blockquote .content > div:first-child:last-child > *:first-child:before {
          content: "${'\\201c'}";
        }
        .blockquote .content > *:last-child:after,
        .blockquote .content > div:first-child:last-child > *:last-child:after {
          content: "${'\\201d'}";
        }
        .blockquote .content > div:first-child:last-child:before,
        .blockquote .content > div:first-child:last-child:after {
          content: "";
        }
      `}</style>
    </blockquote>
  }

}

const BlockQuoteBlok = Blok(BlockQuote)
export default BlockQuoteBlok
