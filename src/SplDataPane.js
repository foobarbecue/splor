import React from 'react'
import SplPlot from './SplPlot'
import SplPlayer from './SplPlayer'
import { view } from 'react-easy-state'
// import line from 'rc-progress'

const SplDataPane = (props) => {
  switch (props.paneObj.dataType) {
    case 'plot':
      return <>
        <SplPlot
          paneId={props.paneObj.id}
          data={props.paneObj.data}
          meta={props.paneObj.meta}
          fileInfo={props.paneObj.fileInfo}
        />
      </>
      break

    case 'video':
      return <>
        <SplPlayer
          key={props.paneObj.id}
          paneObj={props.paneObj}
        />
      </>
      break

    default:
      return <div> unknown data pane type </div>
  }
}

export default view(SplDataPane)
