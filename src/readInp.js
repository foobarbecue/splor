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
			const topic = prompt('What topic would you like to plot?');
			readBag(acceptedFile, onAddData, region, topic)
	} else {
		// If it's video, blobify and play
		const vidData = {url:URL.createObjectURL(acceptedFile)};
		onAddData(vidData, acceptedFile, 'video', region);
	}
}

async function readBag(acceptedFile, onAddData, region, topic){
	const bag = await rosopen(acceptedFile);
	await bag.readMessages({topics: [topic]},
		(result) => {
			const progress = (result.chunkOffset / result.totalChunks);
			console.log(result);
			// onAddData({progress:progress}, acceptedFile, 'loading', region);
	}
	)
}
