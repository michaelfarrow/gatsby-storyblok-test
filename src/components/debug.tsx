import React from 'react'

interface DebugProps {}

interface DebugState {
  screenWidth: number
}

export default class Debug extends React.Component<DebugProps, DebugState> {

  state = {
    screenWidth: 0
  }

  componentDidMount () {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onWindowResize)
      this.onWindowResize()
    }
  }

  componentWillUnmount () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onWindowResize)
    }
  }

  onWindowResize = () => {
    if (typeof window !== 'undefined') {
      this.setState({screenWidth: window.innerWidth})
    }
  }

  render() {
    const { screenWidth } = this.state
    return <div className='debug'>
      Screen Width: {screenWidth}px
      <style jsx>{`
        .debug {
          position: fixed;
          top: 0;
          right: 0;
          padding: 1em;
          background-color: black;
          color: white;
        }
      `}</style>
    </div>
  }

}