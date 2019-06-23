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

class WalkFields extends React.Component {
  constructor (props) {
    super(props)
    this.state = { topic: null, crumbs: [] }
    this.getDataInPlotFormat = this.getDataInPlotFormat.bind(this)
    this.getMetaInPlotFormat = this.getMetaInPlotFormat.bind(this)
  }

  walkCrumbs = (obj, crumbs) => {
    return crumbs.reduce((obj, crumb) => obj[crumb], obj)
  }

  handleChange = (n) =>{
    const handleChangeWcontext = (evt) => {
      console.log(n)
      const crumbs2 = this.state.crumbs.slice(0,n)
      crumbs2[n] = evt.target.value
      this.setState({ crumbs: crumbs2 })
    }
    return handleChangeWcontext.bind(this)
  }

  setTopic = (evt)=>{
    this.setState({topic: evt.target.value, crumbs: []})
  }

  getDataInPlotFormat(){ // For some reason the Class Properties format wasn't working to set instance context
    const meta = this.getMetaInPlotFormat()
    return this.props.input[this.state.topic].map(
        (record, n)=>
          ({
            [meta.fields[0]]: n,
            [meta.fields[1]]: this.walkCrumbs(record, this.state.crumbs)
          })
      )
  }

  getMetaInPlotFormat(){
    return {
      fields: ['timeish',
        this.state.crumbs.reduce(
          (acc, elem)=> `${acc}/${elem}`, this.state.topic
          )
      ]}
  }

  render () {
    const input = this.props.input[this.state.topic]
    let subObjs = []
    if (!!input){
      const exampleMsg = input[0]
      const crumbs = this.state.crumbs.slice()
      while (crumbs.length > 0) {
        subObjs.push(this.walkCrumbs(exampleMsg, crumbs))
        crumbs.pop()
      }
      subObjs.push(exampleMsg)
      subObjs.reverse()
    }

    return <div>
      <TopicSelector
        setTopic = {this.setTopic}
        data = {this.props.input}
      />
      {subObjs.map((subObj, n) =>{
        if (typeof(subObj) === "number"){
          const plotData = this.getDataInPlotFormat()
          const plotMeta = this.getMetaInPlotFormat()
          return <OneLineTSPlotView
            data = {plotData}
            meta = {plotMeta}
            fileInfo = {this.props.fileInfo}
          />}
        else if (typeof(subObj) === "object"){
          return <select key={this.state.crumbs[n]} value={this.state.crumbs[n]}
                  onChange={this.handleChange(n)}>
            <option>-- choose --</option>
            {
              Object.keys(subObj).map(
                (child) => <option key={child} value={child}>{child}</option>
              )
            }
          </select>
        }
        else {
          return <>not obj or num</>
        }
      })}
    </div>
  }
}
