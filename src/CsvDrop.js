import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Papa from 'papaparse'

export default function () {
	const onDrop = useCallback(
		acceptedFiles => {
		for (const acceptedFile of acceptedFiles){
			console.log(acceptedFile)
			Papa.parse(acceptedFile, {
				complete: (data)=>{
					console.log(data)
				}
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