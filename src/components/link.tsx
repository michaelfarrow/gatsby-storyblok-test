import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

interface LinkProps {
  href: any
  children: any
  className?: string
  style?: any
}

type LinkChildrenProps = {
  href?: string
  target?: string
  className?: string
  style?: any
}

export default class Link extends React.Component<LinkProps> {

  render() {
    const { href, children, className, style } = this.props
    let _href = href
    // let _children = (props: LinkChildrenProps) => {
    //   return children
    //   // return <a {...props}>{children}</a>
    // }
    // if (typeof children === 'function') _children = children
    if(_href.linktype) {
      if (_href.linktype === 'url') {
        _href = _href.cached_url
      } else {
        _href = `/${_href.cached_url}`
      }
    }
    const isInternal = _href && _href[0] === '/'
    // if (isInternal) {
    //   return <GatsbyLink to={_href}>{_children({className, style})}</GatsbyLink>
    // }
    // return _children({target: '_blank', href: _href, className, style})
    if (isInternal) {
      // if (window !== undefined && window.location.pathname === '/editor/') {
      //   _href = `${window.location.pathname}${window.location.search.replace(/\?path=([^&]+)/, `?path=${_href.replace(/^\/?(.*?)\/?$/, '$1')}`)}`
      //   return <a href={_href} target='_blank'>{children}</a>
      // }
      return <GatsbyLink className={className} to={_href}>{children}</GatsbyLink>
    }
    return <a className={className} href={_href} target='_blank'>{children}</a>
  }

}