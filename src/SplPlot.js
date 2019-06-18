import { Borders, Crosshair, FlexibleXYPlot, Highlight, LineSeriesCanvas, XAxis, YAxis } from 'react-vis'
import React, { Component } from 'react'
import '../node_modules/react-vis/dist/style.css'
import { eventTimes, session, dataPanes } from './stores'
import { view } from 'react-easy-state'
import RemoveButton from './RemoveButton'

export default view(({data, meta, type, progress}) => {
  return <> {meta.fields.length}</>
})

class OneLineTSPlot extends Component {
  constructor (props) {
    super(props)
    // React-vis wants objects with keys "x" and "y", so rename.
    // Field names are still in props.meta.fields
    this.data = props.data.map(
      (row) => ({
        x: row[props.meta.fields[0]],
        y: row[props.meta.fields[1]]
      }))

    this.state = { xDomain: null, yDomain: null }
  }

  is_timeseries = () => (this.data[0]['x'] instanceof Date)

  zoomTo = (area) => {
    if (area) {
      this.setState({
        xDomain: [area.left, area.right],
        yDomain: [area.bottom, area.top]
      })
    }
  }

  resetZoom = () => {
    this.setState({
      xDomain: null,
      yDomain: null
    })
  }

  render () {
    const timeCursor = eventTimes.cursor
    return (
      <div style={{ position: 'relative' }}>
        <h2 style={{ position: 'absolute', right: '50px', top: '10px', margin: '0px' }}>
          {this.props.fileInfo.name}
        </h2>
        <FlexibleXYPlot
          xType={this.is_timeseries ? 'time' : 'linear'}
          xDomain={this.state.xDomain}
          yDomain={this.state.yDomain}
        >

          <LineSeriesCanvas
            data={this.data}/>
          <Crosshair
            values={[{ x: timeCursor.getTime(), y: 0 }]}
          >{timeCursor.toISOString()}</Crosshair>
          <Borders style={{ all: { fill: '#fff' } }}/>
          <XAxis title={this.props.meta.fields[0]}/>
          <YAxis title={this.props.meta.fields[1]}/>
          <Highlight
            onBrushEnd={this.zoomTo}
          />
        </FlexibleXYPlot>
        <RemoveButton
          paneId={this.props.paneId}
        />
        {(this.state.xDomain || this.state.yDomain) &&

        <button
          onClick={() => { this.resetZoom() }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px'
          }}
        >Reset zoom</button>
        }
      </div>
    )
  }
}

class MultiLineTSPlot extends Component {
  constructor (props) {
    super(props)
    // React-vis wants objects with keys "x" and "y", so rename.
    // Field names are still in props.meta.fields
    this.data = props.data.map(
      (row) => ({
        x: row[props.meta.fields[0]],
        y: row[props.meta.fields[1]]
      }))

    this.state = { xDomain: null, yDomain: null }
  }

  is_timeseries = () => (this.data[0]['x'] instanceof Date)

  zoomTo = (area) => {
    if (area) {
      this.setState({
        xDomain: [area.left, area.right],
        yDomain: [area.bottom, area.top]
      })
    }
  }

  resetZoom = () => {
    this.setState({
      xDomain: null,
      yDomain: null
    })
  }

  render () {
    const timeCursor = eventTimes.cursor
    const TopicsSelect = <select>
      <option value={'frump'}>frump</option>
    </select>
    return (
      <div style={{ position: 'relative' }}>
        <h2 style={{ position: 'absolute', right: '50px', top: '10px', margin: '0px' }}>
          {this.props.fileInfo.name}
        </h2>
        {TopicsSelect}
        <FlexibleXYPlot
          xType={this.is_timeseries ? 'time' : 'linear'}
          xDomain={this.state.xDomain}
          yDomain={this.state.yDomain}
        >

          <LineSeriesCanvas
            data={this.data[0]}/> //TODO map
          <Crosshair
            values={[{ x: timeCursor.getTime(), y: 0 }]}
          >{timeCursor.toISOString()}</Crosshair>
          <Borders style={{ all: { fill: '#fff' } }}/>
          <XAxis title={this.props.meta.fields[0]}/>
          <YAxis title={this.props.meta.fields[1]}/>
          <Highlight
            onBrushEnd={this.zoomTo}
          />
        </FlexibleXYPlot>
        <RemoveButton
          paneId={this.props.paneId}
        />
        {(this.state.xDomain || this.state.yDomain) &&

        <button
          onClick={() => { this.resetZoom() }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px'
          }}
        >Reset zoom</button>
        }
      </div>
    )
  }
}

MultiLineTSPlot = view(MultiLineTSPlot)
OneLineTSPlot = view(OneLineTSPlot)
