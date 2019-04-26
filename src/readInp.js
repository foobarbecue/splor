import React from 'react'
import { open as rosopen } from 'rosbag'
import Papa from '@foobarbecue/papaparse'
import { dataPanes } from "./stores";

export default function readInp(acceptedFile){
	Papa.parse(acceptedFile, {
		complete: (plotData) => dataPanes.addPlot(plotData, acceptedFile),
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true
		}
	)
}
