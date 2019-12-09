import React from 'react'
import Blok, { BlokContent } from './blok'
import { StaticQuery, graphql } from 'gatsby'
import RawImage, { ImagesContext } from '../components/img'

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
          let images = []
          data.entries.edges.forEach(edge => {
            if (edge.node.fields.images) images = images.concat(edge.node.fields.images)
          })
          return <ImagesContext.Provider value={images}>
            <ul>{data.entries.edges.map(edge => {
              const { node } = edge
              const content = JSON.parse(node.content)
              const { thumbnail } = content
              return <li key={node.uuid}>
                {(thumbnail && thumbnail.image && <RawImage src={thumbnail.image} alt={node.name} />) || null}
                <span>{node.name}</span>
              </li>
            })}</ul>
          </ImagesContext.Provider>
        }}
      />
    </>
  }

}

const WorkListBlok = Blok(WorkList)
export default WorkListBlok
