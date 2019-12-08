import Page from './page'
import CV from './cv'

import ComponentNotFound from './component-not-found'

import Row from './row'
import Column from './column'
import Button from './button'
import RichText from './rich-text'
import BlockQuote from './blockquote'
import Image from './image'
import Video from './video'
import Experience from './experience'
import SkillSet from './skill-set'
import Skill from './skill'
import Education from './education'

const ComponentList = {
  page: Page,
  work: Page,
  cv: CV,
  row: Row,
  column: Column,
  button: Button,
  rich_text: RichText,
  blockquote: BlockQuote,
  image: Image,
  video: Video,
  experience: Experience,
  skill_set: SkillSet,
  skill: Skill,
  education: Education
}

const Components = (type) => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound
  }
  return ComponentList[type]
}

export default Components