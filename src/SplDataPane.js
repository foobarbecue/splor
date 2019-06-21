import React from 'react'
import SplPlot from './SplPlot'
import SplPlayer from './SplPlayer'
import { view, store } from 'react-easy-state'
// import line from 'rc-progress'

const SplDataPane = ({ data, meta, progress }) => {
  return <RosDisp data={data} meta={meta} />
}

const RosDisp = view(({ data, meta }) => {
  const stateStore = store({ topic: null })

  const getTopics = (data) => {
    const topics = []
    console.log(data)
    for (let topic in data) {
      topics.push(<option>{topic}</option>)
    }
    return topics
  }

  const getFields = (data, topic) => {
    const fields = []
    const sampleMessage = data[topic][0]
    for (let field in sampleMessage) {
      fields.push(<option>{field}</option>)
    }
    return fields
  }

  const setTopic = (evt) => {
    stateStore.topic = evt.target.value
  }

  return <div>
    <select onChange={setTopic}>
      {getTopics(data)}
    </select>
    <select>
      {stateStore.topic ? getFields(data, stateStore.topic) : ''}
    </select>
  </div>
})

export default view(SplDataPane)
