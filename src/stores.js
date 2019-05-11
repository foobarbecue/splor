import {store} from "react-easy-state";
import uuidv4 from 'uuid/v4'

// export const dataPaneExample =	{
// 	id: uuidv4(),
// 	data:[],
// 	dataType:"",
// 	errors:[],
// 	fileName:"notAfile.csv",
// 	meta:{}
// }

export const dataPanes = store(
	{
		all: [
		],
		get allPlots () {
			return dataPanes.all.filter(dataPane => dataPane.dataType === "initial")
		},
		addPlot (plotData, acceptedFile) {
			dataPanes.all.push(
				{id:uuidv4(),
					dataType:"plot",
					fileInfo: acceptedFile,
					...plotData}
				)
		},
	addVid (vidDataUrl, acceptedFile){
		dataPanes.all.push(
			{id:uuidv4(),
				dataType:"video",
				fileInfo: acceptedFile,
				data: vidDataUrl}
		)
  }
	},
);

export let eventTimes =	store( {
	cursor: new Date(),
	all: []
} )
