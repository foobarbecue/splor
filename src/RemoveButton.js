import React from 'react'
import { dataPanes } from './stores'

export default function RemoveButton (props) {
  return <div
    onClick={() => {
      console.log('clickt')
      dataPanes.removePane(props.paneId)
    }}
    style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      color: 'red'
    }}
  >X</div>
}
