import React, {useCallback, Component} from 'react'
import {useDropzone} from 'react-dropzone'
import readInp from './readInp'
import Player from 'react-player'
import SplPlot from './SplPlot'


function SplDropzone(props){
	const onDrop = useCallback(
		acceptedFiles => {
			for (const acceptedFile of acceptedFiles) {
				readInp(acceptedFile, props.onAddData, props.region)
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

export default class SplRegion extends Component {
	constructor(props){
		super(props);

	};

	render() {
		// If we don't have data in this region yet:
		if (!this.props.regionData) {
			return (
				<SplDropzone
					onAddData={this.props.onAddData}
					region={this.props.region}
					timebar={this.props.timebar}
				/>
			)
		} else if (this.props.regionData.dataType === "plot") {
			return (
				<SplPlot
					key={this.props.region} // region number
					regionData={this.props.regionData}
					timebar={this.props.timebar}
				/>
				)
		} else if (this.props.regionData.dataType === "video") {
			return (
				<Player
					key={this.props.region} // region number
					url={this.props.regionData.url}
					controls
					height='100%'
					width='100%'
					onProgress={this.props.onVidProgress}
					onSeek={this.props.setTimebar}
				/>
				)
		}
		}
}
