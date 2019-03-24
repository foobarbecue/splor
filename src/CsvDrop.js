import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function () {
	const onDrop = useCallback(acceptedFiles => {
		console.log(acceptedFiles)
	}, []);
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