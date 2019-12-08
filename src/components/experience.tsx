import React from 'react'
import Blok, { BlokContent } from './blok'
import Moment from 'react-moment'
import moment from 'moment'
import Link from './link'

export interface ExperienceContent extends BlokContent {
  from: string
  to?: string
  company: string
  url: string
  job_title: string
  description: string
}

class Experience extends React.Component<ExperienceContent> {

  render() {
    const { from, to } = this.props
    const { company, url, job_title } = this.props
    const { description } = this.props
    const omitYear = from && to && moment(from).format('Y') === moment(to).format('Y')
    const omitTo = from && to && moment(from).format('M Y') === moment(to).format('M Y')
    return <div>
      <header>
        <Moment format={(omitYear && !omitTo) ? 'MMMM' : 'MMMM Y'}>{from}</Moment>
        {!omitTo && ' to '}
        {!omitTo && <Moment format={to ? 'MMMM Y' : 'P\\r\\e\\s\\ent'}>{to || Date.now()}</Moment>}
      </header>
      <h3><span className='company'>{url && <Link href={url}>{company}</Link> || company}</span> {job_title}</h3>
      {description && <p>{description}</p>}
      <style jsx>{`
        .company:after {
          content: " •";
        }
      `}</style>
    </div>
  }

}

const ExperienceBlok = Blok(Experience)
export default ExperienceBlok
