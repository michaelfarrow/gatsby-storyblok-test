const path = require('path')
const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const storyblokEntry = path.resolve('src/templates/storyblok-entry.js')

    resolve(
      graphql(
        `{
          allStoryblokEntry {
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
        }`
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const entries = result.data.allStoryblokEntry.edges
        entries.forEach((entry, index) => {
          let pagePath = entry.node.full_slug == 'home' ? '' : `${entry.node.full_slug}/`

          createPage({
            path: `/${pagePath}`,
            component: storyblokEntry,
            context: {
              story: entry.node
            }
          })
        })
      })
    )
  })
}

function processRemoteImage (node, createNode, createNodeId, cache, store) {
  return async function(src) {
    const fileNode = await createRemoteFileNode({
      url: src,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store
    })

    return fileNode
  }
}

async function processBlok (blok, processImage, images = {}) {
  if (blok && (blok.component || blok.plugin)) {
    for (let [key, value] of Object.entries(blok)) {
      if (Array.isArray(value)) {
        await Promise.all(value.map(v => {
          return processBlok(v, processImage, images)
        }))
      } else if (typeof value === 'string' && (value.startsWith('//a.storyblok.com/') || value.startsWith('https://a.storyblok.com/'))) {
        const _src = value.startsWith('//') ? `https:${value}` : value
        if (!images[_src]) {
          const fileNode = await processImage(_src)
          if (fileNode) images[_src] = fileNode.id
        }
      } else {
        await processBlok(value, processImage, images)
      }
    }
  }
  return images
}

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  store,
  cache,
  createNodeId,
}) => {
  if (node.internal.type === 'StoryblokEntry') {
    const content = JSON.parse(node.content)
    const images = await processBlok(content, processRemoteImage(node, createNode, createNodeId, cache, store))
    createNodeField({
      node,
      name: 'images___NODE',
      value: Object.values(images)
    })
  }
}