import React from 'react'
import Blok, { BlokContent } from './blok'
import Skill, { SkillContent } from './skill'

export interface SkillSetContent extends BlokContent {
  name: string
  skills: Array<SkillContent>
}

class SkillSet extends React.Component<SkillSetContent> {

  render() {
    const { name, skills } = this.props
    return <div className='skill-set'>
      <span className='name'>{name}</span>
      <ul className='skills'>
        {skills.map(skill => <li className='skill' key={skill._uid}><Skill content={skill} /></li>)}
      </ul>
      <style jsx>{`
        .skill-set {
          margin-top: 1em;
          margin-bottom: 1em;
        }
        .name {
          font-weight: bold;
        }
        .name:after {
          content: ": ";
        }
        .skills {
          display: inline;
          list-style-type: none;
          padding: 0;
        }
        .skill {
          display: inline;
        }
        .skill:after {
          content: " • ";
        }
        .skill:last-child:after {
          content: "";
          display: none;
        }
      `}</style>
    </div>
  }

}

const SkillSetBlok = Blok(SkillSet)
export default SkillSetBlok
