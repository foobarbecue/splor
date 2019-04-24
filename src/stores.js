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
			{
				id:uuidv4(),
				dataType:"initial"
			},
			{
				id:uuidv4(),
				dataType:"initial"
			}
		],
		get allPlots () {
			return dataPanes.all.filter(dataPane => dataPane.dataType === "initial")
		},
		add (plotData) {
			console.log(plotData)
		}
	}
);

export let timebar =	store( new Date() )
