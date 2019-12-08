import React from 'react'
import { mapBlok } from './blok'

const CV = (props) => {
  const { blok = {} } = props
  const { description } = blok
  const { experience, other_work, skill_sets, education } = blok
  return <div>
    <p>{description}</p>
    {(experience && experience.length && <div>
      <h2>Experience</h2>
      <ul className='experience'>
        {experience.map(exp => <li key={exp._uid} className='experience-item'>
          {mapBlok(exp)}
        </li>)}
      </ul>
    </div>) || null}
    {(other_work && other_work.length && <div>
      <h2>Other Work</h2>
      <ul className='other-work'>
        {other_work.map(work => <li key={work._uid} className='other-work-item'>
          {mapBlok(work)}
        </li>)}
      </ul>
    </div>) || null}
    {(skill_sets && skill_sets.length && <div>
      <h2>Skills</h2>
      <ul className='skills'>
        {skill_sets.map(set => <li key={set._uid} className='skill-item'>
          {mapBlok(set)}
        </li>)}
      </ul>
    </div>) || null}
    {(education && education.length && <div>
      <h2>Education</h2>
      <ul className='education'>
        {education.map(edu => <li key={edu._uid} className='education-item'>
          {mapBlok(edu)}
        </li>)}
      </ul>
    </div>) || null}
    <style jsx>{`
      .experience,
      .skills,
      .other-work,
      .education {
          list-style-type: none;
          padding: 0;
      }
      .experience-item,
      .skill-item,
      .other-work-item,
      .education-item {
        margin-bottom: 2em;
      }
    `}</style>
  </div>
}

export default CV