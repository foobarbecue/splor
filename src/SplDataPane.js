import React from 'react'
import { OneLineTSPlotView } from './SplPlot'
import { MultiLineTSPlotView } from './SplMultiPlot'
import { SpatialMap } from './SplSpatialMap'
import SplPlayer from './SplPlayer'
import { view } from 'react-easy-state'
import { dataPanes } from './stores'

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
      return <><span className={"hidden"}>{ dataPanes.progress }</span>
      <MultiLineTSPlotView
          key={props.paneObj.id}
          paneId={props.paneObj.id}
          input={props.paneObj.data}
          fileInfo={props.paneObj.fileInfo}
      /></>

    case 'video':
      return <SplPlayer
          key={props.paneObj.id}
          paneObj={props.paneObj}
        />
        
    case 'spatialmap':
      return <SpatialMap />

    default:
      return <> Unknown data pane type </>
  }
}

export default view(SplDataPane)
