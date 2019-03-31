import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import readInp from './readInp'


export default function SplRegion(props) {

	const onDrop = useCallback(
		acceptedFiles => {
			console.log('acptdfiles')
			for (const acceptedFile of acceptedFiles) {
				readInp(acceptedFile, props.onAddPlotData, props.onAddVidData)
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
