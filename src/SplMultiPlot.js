import { view } from "react-easy-state"
import React from 'react'
import { dataPanes } from './stores'
import { OneLineTSPlotView } from './SplPlot'

export const MultiLineTSPlotView = view(({paneId, paneObj})=> {
  return <div>
    <span className={"hidden"}>{ dataPanes.progress }</span>
      <WalkFields
        input={paneObj.data}
        fileInfo={paneObj.fileInfo}
      />
    </div>
  }
)

const TopicSelector = view(({data, setTopic})=>
  <>
  <select onChange={setTopic}>
    <option>-- choose --</option>
    {Object.keys(data).map(
      (child) => <option key={child} value={child}>{child}</option>
    )}
  </select>
    <span className={"hidden"}>{ dataPanes.progress }</span> {/*TODO hack to make it refresh*/}
  </>)

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
        <option>-- choose --</option>
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

class WalkFields extends React.Component {
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
            [meta.fields[0]]: new Date(record.header.stamp.sec * 10e3 + record.header.stamp.nsec / 10e9),
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
    console.log('checking plottable')
    console.log(this.state.crumbs)
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
        data = {this.getDataInPlotFormat()}
        meta = {this.getMetaInPlotFormat()}
        fileInfo = {this.props.fileInfo}
        crumbs = {this.state.crumbs}
      />}
    </div>
  }
}
