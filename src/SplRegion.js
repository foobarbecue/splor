import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Papa from '@foobarbecue/papaparse'
import { open as rosopen } from 'rosbag'
window.rosopen = rosopen;

async function readRosbag(acceptedFile){
	const bag = await rosopen(acceptedFile);
	await bag.readMessages({},
		(result) => {console.log(result.chunkOffset / result.totalChunks)}
		)
}

export default function SplRegion(props) {

	const onDrop = useCallback(
		acceptedFiles => {
			for (const acceptedFile of acceptedFiles) {

				// If it's a csv, parse and plot
				if (acceptedFile.name.endsWith('csv')) {
					Papa.parse(acceptedFile, {
						complete: props.onAddPlotData,
						header: true,
						dynamicTyping: true,
						skipEmptyLines: true
					})
				} else if(acceptedFile.name.endsWith('bag')){
					readRosbag(acceptedFile)
				} else
				{
					// If it's video, blobify and play
					const vidData = URL.createObjectURL(acceptedFile);
					props.onAddVidData(vidData);
				}

			}
		},
		[] // Arguments for react hook memoization... maybe use to optimize?
	);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});


	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{
				isDragActive ?
					<p>Ok leggo that mouse button now</p> :
					<p>
						<span style={{color: 'grey'}}>(Drag and) </span>
						drop it like it's plot
						<span style={{color: 'grey'}}> (or video.)</span>
					</p>
			}
		</div>
	)
}
