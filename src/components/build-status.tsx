import React from 'react'

interface BuildStatusProps {}
interface BuildStatusState {
  now: number
}

export default class BuildStatus extends React.Component<BuildStatusProps, BuildStatusState> {

  badge: string = 'https://api.netlify.com/api/v1/badges/4754bf85-9434-4f97-904d-990cabc1bd2f/deploy-status'

  timer: any

  state = {
    now: 0
  }

  componentDidMount () {
    this.timer = setInterval(this.refresh, 5000)
  }

  componentWillUnmount () {
    if (this.timer) clearInterval(this.timer)
  }

  refresh = () => {
    this.setState({ now: new Date().getTime() })
  }

  render() {
    const { now } = this.state
    return <div className='build-status'>
      <img src={`${this.badge}?t=${now}`} alt='Build Status' />
      <style jsx>{`
        .build-status {
          position: fixed;
          top: 0.5rem;
          left: 0.5rem;
          z-index: 100;
        }
      `}</style>
    </div>
  }

}