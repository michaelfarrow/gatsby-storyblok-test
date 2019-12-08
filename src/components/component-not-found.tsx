import React from 'react'

const ComponentNotFound = (props) => (
  <div>
    Component {(props.blok && props.blok.component) || (props.content && props.content.component)} is not defined. Add it to components.js
  </div>
)

export default ComponentNotFound