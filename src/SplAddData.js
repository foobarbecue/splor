import React from 'react';
import { MdControlPoint } from 'react-icons/md'
import { open as rosopen } from 'rosbag'
import Papa from '@foobarbecue/papaparse'
import { dataPanes, eventTimes } from "./stores";

const SplAddData = ()=>
	<form style={{
		position:"fixed",
		top:"0",
		right:"0"
	}}>
		<input
			type={"file"}
			multiple={"multiple"}
			onChange={(evt)=>{
				for (const inpFile of evt.target.files){
					readInp(inpFile)
				}
			}}
		/>
	</form>

// TODO: This input parser should be replaced with a plugin-based system
export function readInp(acceptedFile) {
	if (acceptedFile.name.endsWith('csv')) {
		Papa.parse(acceptedFile, {
				complete: (plotData) => dataPanes.addPlot(plotData, acceptedFile),
				header: true,
				dynamicTyping: true,
				skipEmptyLines: true
			}
		)
	} else if (acceptedFile.name.endsWith('bag')) {
		alert('rosbag not yet implemented, sorry')
	} else if (acceptedFile.name.endsWith('sqlite')) {
		alert('sqlite not yet implemented, sorry')
	} else {
		const vidDataUrl = URL.createObjectURL(acceptedFile);
		dataPanes.addVid(vidDataUrl, acceptedFile);
	}
}


export default SplAddData
