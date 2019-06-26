import Timeline from 'react-visjs-timeline'
import React, { useEffect } from 'react'
import { view } from 'react-easy-state'
import { dataPanes, eventTimes } from './stores'
import { SplIOButtons } from './SplIO'

/**
 * Collect start and end times of the videos and plot data and convert to visjs timeline format
 */
const getTimelineItemsFromData = (panesData) => {
  if (panesData.all.length === 0) {
    return []
  }
  const timelineItems = panesData.all.map(
    (paneData) => {
      if (paneData.data.length > 0 && paneData.dataType === 'plot') {
        const firstColName = paneData.meta.fields[0]
        const nRows = paneData.data.length
        return (
          {
            content: paneData.fileInfo.name,
            start: paneData.data[0][firstColName],
            end: paneData.data[nRows - 1][firstColName],
            group: 'Plots'
          }
        )
      } else if (Object.keys(paneData.data).length > 0 && paneData.dataType === 'multiplot') { // This actually means rosbag at the moment
        const paneKeys = Object.keys(paneData.data)
        const starts = []
        const ends = []
        for (let key of paneKeys){
          if(paneData.data[key][0].hasOwnProperty('header')) {
            starts.push(paneData.data[key][0].header.stamp.sec)
            ends.push(paneData.data[key][paneData.data[key].length - 1].header.stamp.sec)
          }
        }
        const earliestStart = new Date(Math.min(...starts) * 1000)
        const latestEnd = new Date(Math.max(...ends) * 1000)
        return (
          {
            content: paneData.fileInfo.name,
            start: earliestStart,
            end: latestEnd,
            group: 'Plots'
          }
        )

      } else if (paneData && paneData.dataType === 'video') {
        if (paneData.hasOwnProperty('duration')) {
          return ({
            start: paneData.start,
            end: new Date(paneData.start.getTime() + paneData.duration * 1000),
            content: paneData.fileInfo.name,
            editable: {
              updateTime: true
            },
            group: 'Videos',
            paneObj: paneData
          })
        }
      }
    }
  )
  return timelineItems.filter(item => item) // remove undefineds
}

const getTimelineEventsFromData = (eventTimes) => {
  return (eventTimes.userInput.map(
    (event) => (
      { paneObj: event,
        ...event }
    )
  ))
}

const onMoveItem = (item, callbackCallback) => {
  item.paneObj.start = item.start
}

const onRemoveItem = (item, callbackCallback) => {
  eventTimes.removeEvent(item.paneObj.id)
}

function SplTimeline (props) {
  const items = getTimelineItemsFromData(dataPanes).concat(getTimelineEventsFromData(eventTimes))
  const timelineRef = React.createRef()
  const newEventName = React.createRef()
  const jsvizTlOptions = {
    showCurrentTime: false,
    onMove: onMoveItem,
    onRemove: onRemoveItem
  }

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.$el.initialDrawDone = true; // TODO workaround to deal with freezing on first load issue
      timelineRef.current.$el.fit()
    }
  })

  return <>
      <input ref={newEventName} type={'text'} name={'eventName'}/>
      <button
        type={'button'}
        onClick={
          () => { eventTimes.addEvent(newEventName.current.value, eventTimes.cursor) }
        }
      >
        Add event at time cursor
      </button>
      <SplIOButtons />
    <span>{ dataPanes.progress }</span> {/* TODO remove this hack throughout */}
    <Timeline
      ref={timelineRef}
      items={items}
      options={jsvizTlOptions}
      groups={[
        { id: 'Events', content: 'Events' },
        { id: 'Plots', content: 'Plots' },
        { id: 'Videos', content: 'Videos' }
      ]}
      customTimes={{ cursor: eventTimes.cursor }}
      timechangeHandler={(newTime) => {
        eventTimes.cursor = newTime.time
      }}
      clickHandler={(evt)=>{if(evt.what === "background") eventTimes.cursor = evt.time}}
    />
  </>
}

export default view(SplTimeline)
