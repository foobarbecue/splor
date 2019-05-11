import React from 'react';
import { MdControlPoint } from 'react-icons/md'
import { open as rosopen } from 'rosbag'
import Papa from '@foobarbecue/papaparse'
import { dataPanes } from "./stores";

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

export function readInp(acceptedFile){
	Papa.parse(acceptedFile, {
			complete: (plotData) => dataPanes.addPlot(plotData, acceptedFile),
			header: true,
			dynamicTyping: true,
			skipEmptyLines: true
		}
	)
}


export default SplAddData
