import { open as rosopen } from 'rosbag'
import Papa from '@foobarbecue/papaparse'

export default function readInp(acceptedFile, addPlotData, addVidData){
	console.log(acceptedFile);
	if (acceptedFile.name.endsWith('csv')) {
		Papa.parse(acceptedFile, {
			complete: addPlotData,
			header: true,
			dynamicTyping: true,
			skipEmptyLines: true
		})
	} else if (acceptedFile.name.endsWith('bag')) {
			readBag(acceptedFile)
	} else {
		// If it's video, blobify and play
		const vidData = URL.createObjectURL(acceptedFile);
		addVidData(vidData);
	}
}

async function readBag(acceptedFile){
	const bag = await rosopen(acceptedFile);
	await bag.readMessages({},
		(result) => {console.log(result.chunkOffset / result.totalChunks)}
	)
}
