import React from 'react'
import Blok, { BlokContent } from './blok'

export interface SkillContent extends BlokContent {
  name: string
  link?: any
  sub_skills?: Array<SkillContent>
}

class Skill extends React.Component<SkillContent> {

  render() {
    const { name, link, sub_skills } = this.props
    return <span>
      <span className='name'>{name}</span>
      {sub_skills && sub_skills.length && <>
        {' (inc. '}
        <ul className='sub-skills'>
          {sub_skills.map(skill => <li className='sub-skill' key={skill._uid}><SkillBlok content={skill} /></li>)}  
        </ul>
        {')'}
      </> || null}
      <style jsx>{`
        .sub-skills {
          display: inline;
          list-style-type: none;
          padding: 0;
      }
        .sub-skill {
          display: inline;
        }
        .sub-skill:before {
          content: ", ";
        }
        .sub-skill:last-child:before {
          content: ", and ";
        }
        .sub-skill:first-child:before {
          content: "";
        }
      `}</style>
    </span>
  }

}

const SkillBlok = Blok(Skill)
export default SkillBlok
