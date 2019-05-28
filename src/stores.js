import { store } from 'react-easy-state'
import uuidv4 from 'uuid/v4'

export const eventTimes = store({
  cursor: new Date(),
  userInput: []
})

export const dataPanes = store(
  {
    all: [],
    get allPlots () {
      return dataPanes.all.filter(dataPane => dataPane.dataType === 'initial')
    },
    addPlot (plotData, acceptedFile) {
      dataPanes.all.push(
        {
          id: uuidv4(),
          dataType: 'plot',
          fileInfo: acceptedFile,
          ...plotData
        }
      )
      eventTimes.cursor = plotData.data[0][plotData.meta.fields[0]] // Set time cursor to first time value in new plot
    },
    addVid (vidDataUrl, acceptedFile) {
      dataPanes.all.push(
        {
          id: uuidv4(),
          dataType: 'video',
          fileInfo: acceptedFile,
          data: vidDataUrl,
          startTime: new Date(eventTimes.cursor) // Copy the cursor time for default video start time
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
