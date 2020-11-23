import { store } from 'react-easy-state'
import { v4 as uuidv4 } from 'uuid'

export const eventTimes = store({
  cursor: new Date(),
  userInput: [],
  addEvent (name, time) {
    eventTimes.userInput.push(
      {
        id: uuidv4(),
        start: time,
        content: name,
        editable: true,
        type: 'point',
        group: 'Events'
      }
    )
  },
  removeEvent (idToRemove) {
    eventTimes.userInput = eventTimes.userInput.filter(
      (item) => {
        if (item.id !== idToRemove) {
          return item
        }
      })
  }
})

export const session = store({
  id: uuidv4()
})

export const dataPanes = store(
  {
    all: [],
    get allPlots () {
      return dataPanes.all.filter(dataPane => dataPane.dataType === 'initial')
    },
    addPlot (plotData, acceptedFile, multi = false) {
      const newPlot = {
        id: uuidv4(),
        dataType: (multi ? 'multiplot' : 'plot'),
        fileInfo: acceptedFile,
        progress: 0.0,
        ...plotData
      }
      dataPanes.all.push(
        newPlot
      )
      if (plotData.data.length > 0) {
        eventTimes.cursor = plotData.data[0][plotData.meta.fields[0]] // Set time cursor to first time value in new plot
      }
      return newPlot
    },
    addVid (vidDataUrl, acceptedFile) {
      dataPanes.all.push(
        {
          id: uuidv4(),
          dataType: 'video',
          fileInfo: acceptedFile,
          progress: 0.0,
          data: vidDataUrl,
          start: new Date(eventTimes.cursor) // Copy the cursor time for default video start time
        }
      )
    },
    addWebVid (vidDataUrl) {
      dataPanes.all.push(
        {
          id: uuidv4(),
          dataType: 'video',
          fileInfo: vidDataUrl,
          progress: 0.0,
          data: vidDataUrl,
          start: new Date(eventTimes.cursor) // Copy the cursor time for default video start time
        }
      )
    },
    removePane (idToRemove) {
      dataPanes.all = dataPanes.all.filter(
        (item) => {
          if (item.id !== idToRemove) {
            return item
          }
        })
    }
  }
)
