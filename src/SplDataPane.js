import React from 'react'
import SplPlot from './SplPlot'
import SplPlayer from './SplPlayer'
import { view, store } from 'react-easy-state'
import { dataPanes, session } from './stores'
// import line from 'rc-progress'

const SplDataPane = view(()=><div>
  { dataPanes.progress }
  <WalkFields
    input = {dataPanes.all[0].data}
  />
</div>)

const TopicSelector = ({data, setTopic})=>
  <select onChange={setTopic}>
    {Object.keys(data).map(
      (child) => <option key={child} value={child}>{child}</option>
    )}
  </select>

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
    this.setState({topic: evt.target.value})
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
      {subObjs.map((subObj, n) =>
        <select key={this.state.crumbs[n]} value={this.state.crumbs[n]}
                onChange={this.handleChange(n)}>
          {
            Object.keys(subObj).map(
              (child) => <option key={child} value={child}>{child}</option>
            )
          }
        </select>)}
    </div>
  }
}

export default SplDataPane
