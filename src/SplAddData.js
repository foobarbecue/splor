import React from 'react'
import Papa from '@foobarbecue/papaparse'
import { dataPanes } from './stores'

const SplAddData = () =>
  <div style={{ height: '100%', width: '100%', position: 'relative', 'zIndex': 10, direction: 'rtl' }}>
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

  </div>

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
    alert('rosbag not yet implemented, sorry')
  } else if (acceptedFile.name.endsWith('sqlite')) {
    alert('sqlite not yet implemented, sorry')
  } else {
    const vidDataUrl = URL.createObjectURL(acceptedFile)
    dataPanes.addVid(vidDataUrl, acceptedFile)
  }
}

export default SplAddData
