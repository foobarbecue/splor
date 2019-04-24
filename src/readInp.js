import React from 'react'
import { open as rosopen } from 'rosbag'
import Papa from '@foobarbecue/papaparse'

export default function readInp(acceptedFile, regionId){
	const dispatchAddPlotData = useGlobal(addPlotDataReducer)

	Papa.parse(acceptedFile, {
		complete: (plotData) => dispatchAddPlotData(addPlotDataAC(plotData, regionId))
		}
	)

}
