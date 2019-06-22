import React from 'react'
import { OneLineTSPlotView } from './SplPlot'
import { MultiLineTSPlotView } from './SplMultiPlot'
import SplPlayer from './SplPlayer'
import { view } from 'react-easy-state'

const SplDataPane = (props) => {
  switch (props.paneObj.dataType) {
    case 'plot':
      // This pane is a plot representing one time series
      return <OneLineTSPlotView
          paneId={props.paneObj.id}
          data={props.paneObj.data}
          meta={props.paneObj.meta}
          fileInfo={props.paneObj.fileInfo}
        />

    case 'multiplot':
      // This pane is a plot representing multiple time series
      return <MultiLineTSPlotView
          key={props.paneObj.id}
          paneObj={props.paneObj}
        />

    case 'video':
      return <SplPlayer
          key={props.paneObj.id}
          paneObj={props.paneObj}
        />

    default:
      return <> Unknown data pane type </>
  }
}

export default view(SplDataPane)
