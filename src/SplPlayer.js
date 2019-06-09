import React, { Component } from 'react'
import Player from 'react-player'
import { eventTimes } from './stores'
import { view } from 'react-easy-state'
import RemoveButton from './RemoveButton'

class SplPlayer extends Component {
  constructor (props) {
    super(props)
    this.playerRef = React.createRef()
  }

  ref = player => {
    this.player = player
  }

  render () {
    if (this.player && !this.player.player.isPlaying) {
      this.player.seekTo((eventTimes.cursor - this.props.paneObj.startTime) / 1000, 'seconds')
    }
    return <div
      style={{ position: 'relative' }}
    >
      <Player
        ref={this.ref}
        url={this.props.paneObj.data}
        controls
        height='100%'
        width='100%'
        onDuration={(duration) => {this.props.paneObj.duration = duration }}
        onProgress={(progressObj) => {
          eventTimes.cursor = new Date(
            this.props.paneObj.start.getTime() + progressObj.playedSeconds * 1000)
        }}
      />
      <div style={{ position: 'absolute', right: '50px', top: '10px' }}>
        <h2 style={{ margin: '0px' }}>{this.props.paneObj.fileInfo.name}</h2>
        Start time: {this.props.paneObj.startTime.toISOString() || <>unknown</>}
      </div>

      <RemoveButton
        paneId={this.props.paneObj.id}
      />
    </div>
  }
}

export default view(SplPlayer)
