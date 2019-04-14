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

	// The next three functions just exist to add the region (window quadrant) to the
	// function call
	onVidDuration = (duration) => {
		this.props.onVidDuration(this.props.region, duration)
	};

	onVidProgress = (progressObj) => {
		this.props.onVidProgress(this.props.region, progressObj)
	};

	onVidSeek = (seconds) => {
		// re-using the onVidProgress function to avoid passing another function down the tree :-s
		this.props.onVidProgress(this.props.region, {playedSeconds: seconds})
	};

	playerRef = (player) => {
		this.player = player
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		// To avoid race condition, only seek video timebar if timebar has been moved > 100 seconds
		if (this.player && Math.abs(this.props.timeBar - prevProps.timeBar) > 100){
			this.player.seekTo((this.props.timeBar - this.props.regionData.vidStartTime) / 1000, 'seconds')
		}
	}

	render() {
		// If we don't have data in this region yet:
		if (!this.props.regionData) {
			return (
				<SplDropzone
					onAddData={this.props.onAddData}
					region={this.props.region}
					timeBar={this.props.timeBar}
				/>
			)
		} else if (this.props.regionData.dataType === "loading") {
			return <div>loading {this.props.regionData.progress}%</div>
		} else if (this.props.regionData.dataType === "plot") {
			return (
				<SplPlot
					key={this.props.region} // region number
					regionData={this.props.regionData}
					timeBar={this.props.timeBar}
				/>
				)
		} else if (this.props.regionData.dataType === "video") {
			return (
				// TODO probably needs own component
				<>
				<div className={'regionHeader'} style={{position:'relative'}}>
					<div style={{position:'absolute', width:'100%'}}>
						<span className={'regionTitle'} style={{float:'left'}}>{this.props.regionData.fileName}</span>
					<span style={{float:'right'}}>
						<img className={'timeAnchor'} alt={'anchor icon'} src={'/icons/iconmonstr-anchor-3.svg'} />
					{this.props.regionData.vidStartTime.toISOString()}
					</span>
					</div>
				<Player
					ref = {this.playerRef}
					key={this.props.region} // region number
					url={this.props.regionData.url}
					controls
					height='100%'
					width='100%'
					onProgress={this.onVidProgress}
					onSeek={this.onVidSeek}
					onDuration={this.onVidDuration}
				/>
				</div>
				</>
				)
		}
		}
}
