import React from 'react'
import Blok, { BlokContent } from './blok'
import Link from './link'
import css from 'styled-jsx/css'

export interface ButtonContent extends BlokContent {
  label?: string
  link?: any
}

const { className: linkClass, styles: linkStyles } = css.resolve`
  a {
    display: block;
    background-color: red;
    color: white;
    padding: 1em 0.5em;
  }
  a:hover {
    background-color: black;
  }
`

class Button extends React.Component<ButtonContent> {

  render() {
    const { label, link } = this.props
    return <div>
      <Link className={linkClass} href={link}>{label}</Link>
      {linkStyles}
    </div>
  }

}

const ButtonBlok = Blok(Button)
export default ButtonBlok
