import { open as rosopen } from 'rosbag'
import Papa from '@foobarbecue/papaparse'

export default function readInp(acceptedFile, onAddData, region){
	console.log(acceptedFile);
	if (acceptedFile.name.endsWith('csv')) {
		const wrappedOnAddData = (newData, file) => {
			onAddData(newData, file, 'plot', region)
		};
		Papa.parse(acceptedFile, {
			complete: wrappedOnAddData,
			header: true,
			dynamicTyping: true,
			skipEmptyLines: true
		})
	} else if (acceptedFile.name.endsWith('bag')) {
			readBag(acceptedFile)
	} else {
		// If it's video, blobify and play
		const vidData = {url:URL.createObjectURL(acceptedFile)};
		onAddData(vidData, acceptedFile, 'video', region);
	}
}

async function readBag(acceptedFile){
	const bag = await rosopen(acceptedFile);
	await bag.readMessages({},
		(result) => {console.log(result.chunkOffset / result.totalChunks)}
	)
}
