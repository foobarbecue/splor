import React from 'react'
import Papa from '@foobarbecue/papaparse'
import { open as rosopen } from 'rosbag'
import { dataPanes } from './stores'
import { view } from 'react-easy-state'

const SplAddData = view(() =>
  <div style={{ height: '100%', width: '100%', position: 'relative', 'zIndex': 10, direction: 'rtl' }}>
      <div>
    <input
      type={'file'}
      name={'uploadChooser'}
      id={'uploadChooser'}
      multiple={'multiple'}
      onChange={(evt) => {
        for (const inpFile of evt.target.files) {
          readInp(inpFile)
        }
      }}
      style={{ position: 'fixed', width: '100%', height: '100%' }}
    />
    <input
      id={'ytVidChooser'}
      type={'button'}
      onClick={() => {
          dataPanes.addWebVid(
              prompt('Enter URL of the youtube video')
          )
      }}
      value={'Add YT video'}
    />
      </div>
  </div>)

async function readBag (acceptedFile) {
  const bag = await rosopen(acceptedFile)
  const newPlot = dataPanes.addPlot({ data: {}, meta: { fields: [] }, errors: [] }, acceptedFile, true)
  newPlot.data = {} // todo not great... this was an array, redefining as an object
  console.log(newPlot)
  dataPanes.progress = 0
  await bag.readMessages({},
    (result) => {
      // Add topic to meta fields list
      if (!newPlot.meta.fields.includes(result.topic)) {
        newPlot.meta.fields.push(result.topic)
      }

      // Add rosbag chunk data to store
      // const resultData = result.data.map((datum) => { return { [result.topic]: datum } })
      try {
        newPlot.data[result.topic].push(result.message)
      } catch {
        newPlot.data[result.topic] = [result.message]
      }
      dataPanes.progress = (result.chunkOffset / result.totalChunks)
      newPlot.progress = (result.chunkOffset / result.totalChunks)
    }
  )
  dataPanes.progress = 100
}

// TODO: This input parser should be replaced with a plugin-based system
export function readInp (acceptedFile) {
  if (acceptedFile.name.endsWith('csv')) {
    Papa.parse(acceptedFile, {
      complete: (plotData) => dataPanes.addPlot(plotData, acceptedFile),
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      comments: '//'
    }
    )
  } else if (acceptedFile.name.endsWith('bag')) {
    readBag(acceptedFile)
  } else if (acceptedFile.name.endsWith('sqlite')) {
    alert('sqlite not yet implemented, sorry')
  } else if (acceptedFile.name.endsWith('gpx')){
    alert('adding map')
    dataPanes.addSpatialMap()
  } else {
    const vidDataUrl = URL.createObjectURL(acceptedFile)
    dataPanes.addVid(vidDataUrl, acceptedFile)
  }
}

export default SplAddData
