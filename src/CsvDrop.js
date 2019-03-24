import React, { Component, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Papa from 'papaparse'

export default function(props) {
	const onDrop = useCallback(
		acceptedFiles => {
		for (const acceptedFile of acceptedFiles){
			Papa.parse(acceptedFile, {
				complete: props.onAddPlotData,
				header: true
			})
		}
	},
		[]
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