import Timeline from 'react-visjs-timeline'
import React, { useEffect } from 'react'
import { view } from 'react-easy-state'
import { dataPanes, eventTimes } from './stores'

/**
 * Collect start and end times of the videos and plot data and convert to visjs timeline format
 */
const getTimelineItemsFromData = (regionsData) => {
  if (regionsData.all.length === 0) {
    return []
  }
  const timelineItems = regionsData.all.map(
    (regionData) => {
      if (regionData && regionData.dataType === 'plot') {
        const firstColName = regionData.meta.fields[0]
        const nRows = regionData.data.length
        return (
          {
            content: regionData.fileInfo.name,
            start: regionData.data[0][firstColName],
            end: regionData.data[nRows - 1][firstColName],
            group: 'Plots'
          }
        )
      } else if (regionData && regionData.dataType === 'video') {
        if (regionData.hasOwnProperty('duration')) {
          return ({
            start: regionData.start,
            end: new Date(regionData.start.getTime() + regionData.duration * 1000),
            content: regionData.fileInfo.name,
            editable: {
              updateTime: true
            },
            group: 'Videos',
            paneObj: regionData
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
    />
  </>
}

export default view(SplTimeline)
