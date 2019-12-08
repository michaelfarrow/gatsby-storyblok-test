import React from 'react'
import MarkdownToJsx from 'markdown-to-jsx'
import Link from './link'
import Classes from '../utils/classes'

const MARKDOWN_OPTIONS = {
  forceBlock: true,
  overrides: {
    a: {
        component: Link
    }
  }
}

interface MarkdownProps {
  className?: string
  content?: string
}

export default class  Markdown extends React.Component<MarkdownProps> {

  render() {
    const { className, content } = this.props
    const classes = Classes('markdown').add(className)
    return <>
      <MarkdownToJsx
        className={classes.join()}
        children={content || ''}
        options={MARKDOWN_OPTIONS} />
    </>
  }

}