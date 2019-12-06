import React from 'react'
import Components from '../components/components'
import { ImagesContext } from '../components/image'

class StoryblokEntry extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (state.story.uuid === props.pageContext.story.uuid) {
      return null
    }

    return StoryblokEntry.prepareStory(props)
  }

  static prepareStory(props) {
    const story = Object.assign({}, props.pageContext.story)
    story.content = JSON.parse(story.content)
    
    return { story }
  }

  constructor(props) {
    super(props)

    this.state = StoryblokEntry.prepareStory(props)
  }

  render() {
    let content = this.state.story.content
    let fields = this.state.story.fields

    return (
      <div>
        <ImagesContext.Provider value={(fields && fields.images) || []}>
          {React.createElement(Components(content.component), {key: content._uid, blok: content})}
        </ImagesContext.Provider>
      </div>
    )
  }
}

export default StoryblokEntry