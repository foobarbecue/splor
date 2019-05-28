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
            end: regionData.data[nRows - 1][firstColName]
          }
        )
      } else if (regionData && regionData.dataType === 'video') {
        {
          if (regionData.hasOwnProperty('duration')) {
            return ({
              start: regionData.startTime,
              end: new Date(regionData.startTime.getTime() + regionData.duration * 1000),
              content: regionData.fileInfo.name,
              editable: {
                updateTime: true
              },
              paneObj: regionData
            })
          }
        }
      }
    }
  )
  return timelineItems.filter(item => item) // remove undefineds
}

const onMoveItem = (item, callbackCallback) => {
  console.log(item)
  item.paneObj.startTime = item.start
}

function SplTimeline (props) {
  const items = getTimelineItemsFromData(dataPanes)
  let timelineRef = React.createRef()
  const jsvizTlOptions = {
    showCurrentTime: false,
    onMove: onMoveItem
  }

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.$el.fit()
    }
  })

  return <Timeline
    ref={timelineRef}
    items={items}
    options={jsvizTlOptions}
    customTimes={{ cursor: eventTimes.cursor }}
    timechangeHandler={(newTime) => {
      eventTimes.cursor = newTime.time
    }}
  />
}

export default view(SplTimeline)
