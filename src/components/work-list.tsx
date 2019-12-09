import React from 'react'
import Blok, { BlokContent } from './blok'
import { StaticQuery, graphql } from 'gatsby'
import RawImage from '../components/img'

export interface WorkListContent extends BlokContent {}

class WorkList extends React.Component<WorkListContent> {

  render() {
    return <>
      <StaticQuery
        query={graphql`
          query {
            entries: allStoryblokEntry(filter: {full_slug: {regex: "/^work//"}, field_component: {eq: "work"}}) {
              edges {
                node {
                  id
                  name
                  created_at
                  uuid
                  slug
                  full_slug
                  content
                  is_startpage
                  parent_id
                  group_id
                  fields {
                    images {
                      url
                      relativePath
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => {
          return <ul>{data.entries.edges.map(edge => {
            const { node } = edge
            const content = JSON.parse(node.content)
            const { thumbnail } = content
            return <li key={node.uuid}>
              {(thumbnail && thumbnail.image && <RawImage src={thumbnail.image} alt={node.name} />) || null}
              <span>{node.name}</span>
            </li>
          })}</ul>
        }}
      />
    </>
  }

}

const WorkListBlok = Blok(WorkList)
export default WorkListBlok
