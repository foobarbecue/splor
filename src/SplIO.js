import React from 'react'
import { view } from 'react-easy-state'
import { eventTimes, dataPanes, session } from './stores'
import { saveAs } from 'file-saver'
import { Link } from 'react-router-dom'

export const SplSave = view(() => {
  const saveBlob = new Blob([
    JSON.stringify({ eventTimes, dataPanes })
  ])
  saveAs(saveBlob, `${session.id}.json`)
})

export const SplIOButtons = view(() => <>
    <Link to="/Save">
      <button>Save</button>
    </Link>
    <button>Load</button>
    <button>Clear</button>
  </>
)

// export const SplLoad = view(() => {
//
// })
