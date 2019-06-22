import { view } from "react-easy-state"
import React from 'react'
import { dataPanes } from './stores'

export const MultiLineTSPlotView = view(({paneId, paneObj})=> {
  return <div>
    <span className={"hidden"}>{ dataPanes.progress }</span>
      <WalkFields
        input={paneObj.data}
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
        if (typeof(subObj) === "number"){return <>plot</>}
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
