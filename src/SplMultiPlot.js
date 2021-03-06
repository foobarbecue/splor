import { view } from "react-easy-state"
import React from 'react'
import { dataPanes } from './stores'
import { OneLineTSPlotView } from './SplPlot'

const TopicSelectorNV = ({data, setTopic})=>
  <>
  <select onChange={setTopic}>
    <option key={'choose'}>-- choose -- { dataPanes.progress }</option>
    {Object.keys(data).map(
      (child) => <option key={child} value={child}>{child}</option>
    )}
  </select>
  </>
const TopicSelector = view(TopicSelectorNV)

const MessageSelector = ({data, topic, crumbs, setCrumbs})=> {
  const input = data[topic]
  let subObjs = []
  if (!!input) {
    const exampleMsg = input[0]
    const crumbs2 = crumbs.slice() // copy
    while (crumbs2.length > 0) {
      subObjs.push(walkCrumbs(exampleMsg, crumbs2))
      crumbs2.pop()
    }
    subObjs.push(exampleMsg)
    subObjs.reverse()
  }
  return subObjs.map((subObj, n) => {
    if (typeof (subObj) === "object") {

      return <select key={crumbs[n]} value={crumbs[n]}
                     onChange={(evt)=>{
                       const crumbs3 = crumbs.slice(0,n)
                       crumbs3[n] = evt.target.value
                       setCrumbs(crumbs3)
                     }}>
        <option key={'choose'}>-- choose --</option>
        {
          Object.keys(subObj).map(
            (child) => <option key={child} value={child}>{child}</option>
          )
        }
      </select>
    }
  })
}

const walkCrumbs = (obj, crumbs) => {
  return crumbs.reduce((obj, crumb) => obj[crumb], obj)
}

class MultiLineTSPlot extends React.Component {
  constructor (props) {
    super(props)
    this.state = { topic: null, crumbs: [], showPlot: false }
    this.getDataInPlotFormat = this.getDataInPlotFormat.bind(this)
    this.getMetaInPlotFormat = this.getMetaInPlotFormat.bind(this)
  }

  setTopic = (evt)=>{
    this.setState({topic: evt.target.value, crumbs: []})
  }

  getDataInPlotFormat(){ // For some reason the Class Properties format wasn't working to set instance context
    const meta = this.getMetaInPlotFormat()
    return this.props.input[this.state.topic].map(
        (record, n)=>
          ({
            [meta.fields[0]]: new Date(record.header.stamp.sec * 10e2 + record.header.stamp.nsec / 10e5),
            [meta.fields[1]]: walkCrumbs(record, this.state.crumbs)
          })
      )
  }

  getMetaInPlotFormat(){
    return {
      fields: ['time',
        this.state.crumbs.reduce(
          (acc, elem)=> `${acc}/${elem}`, this.state.topic
          )
      ]}
  }

  lastCrumbIsPlottable = ()=> {
    if (this.props.input.hasOwnProperty([this.state.topic])) {
      return typeof(walkCrumbs(this.props.input[this.state.topic][0], this.state.crumbs)) === "number"
    }
  }

  render () {
    return <div>
      <TopicSelector
        setTopic = {this.setTopic}
        data = {this.props.input}
      />
      <MessageSelector
        data = {this.props.input}
        topic = {this.state.topic}
        crumbs = {this.state.crumbs}
        setCrumbs = {(crumbs2)=>{this.setState({crumbs:crumbs2})}}
      />
      {this.lastCrumbIsPlottable() && <OneLineTSPlotView
        paneId = {this.props.paneId}
        data = {this.getDataInPlotFormat()}
        meta = {this.getMetaInPlotFormat()}
        fileInfo = {this.props.fileInfo}
        crumbs = {this.state.crumbs}
      />}
    </div>
  }
}

export const MultiLineTSPlotView = view(MultiLineTSPlot)
