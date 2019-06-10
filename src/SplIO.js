import React from 'react';
import { view } from 'react-easy-state'
import { eventTimes, dataPanes, session } from './stores'
import { saveAs } from 'file-saver'

export const SplSave = view(() => {
  console.log(eventTimes)
  console.log(dataPanes)
  const saveBlob = new Blob([
    JSON.stringify({eventTimes, dataPanes})
  ])
  saveAs(saveBlob, `${session.id}.json`)
})

// export const SplLoad = view(() => {
//
// })
