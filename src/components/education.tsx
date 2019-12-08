import React from 'react'
import Blok, { BlokContent } from './blok'
import Moment from 'react-moment'
import Link from './link'
import { COLOURS } from '../utils/colours'

export interface EducationContent extends BlokContent {
  qualification: string
  institution: string
  url?: string
  from: string
  to: string
}

class Education extends React.Component<EducationContent> {

  render() {
    const { qualification, institution, url } = this.props
    const { from, to } = this.props
    return <div>
      <h3 className='qualification'>{qualification}</h3>
      <h4 className='institution'>{url && <Link href={url}>{institution}</Link> || institution}</h4>
      <footer className='timespan'>
        <Moment format='Y'>{from}</Moment>
        {' - '}
        <Moment format='Y'>{to}</Moment>
      </footer>
      <style jsx>{`
        .qualification,
        .institution {
          margin: 0;
          font-size: 1em;
        }
        .qualification {
          font-weight: normal;
          color: ${COLOURS.brand_primary};
        }
      `}</style>
    </div>
  }

}

const EducationBlok = Blok(Education)
export default EducationBlok
