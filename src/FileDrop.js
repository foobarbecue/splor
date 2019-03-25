import React, { Component, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Papa from 'papaparse'

export default function(props) {
	const onDrop = useCallback(
		acceptedFiles => {
		for (const acceptedFile of acceptedFiles){

			// If it's a csv, parse and plot
			if (acceptedFile.name.endsWith('csv')){
				Papa.parse(acceptedFile, {
					complete: props.onAddPlotData,
					header: true,
					dynamicTyping: true
				})
			}
			else {
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
					<p>Drop it like it's plot</p>
			}
		</div>
	)
}