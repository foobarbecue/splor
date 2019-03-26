// import request from "superagent";

import React, { Component } from 'react'
import FileDrop from './FileDrop'
import Plot from './Plot'
import Player from 'react-player'
import RVStyles from 'react-vis-styles'

export default class extends Component{
	constructor(){
		super();
		this.state = {
			plotData: [], // A list of datasets to be plotted
			vidData: [], // A list of video blobs to be shown in players
			timeBar: null} // The current time, in seconds from the beginning of the first timeseries plot added
	}

	addPlotData = (newPlotData) => {
		this.setState(
				{plotData: this.state.plotData.concat(newPlotData)}
		)
	};

	addVidData = (newVidData) => {
		this.setState(
			{vidData: this.state.vidData.concat(newVidData)}
		)
	};

	setTimebar = (datetime) => {
		this.setState(
			{timeBar: datetime}
		)
	};

	onVidProgress = (progressObj) => {
		this.setTimebar(progressObj.playedSeconds)
	};

	render(){
		return (
			<>
				<h1>Let's SPLOR!</h1>
			<div style={{
				display: 'grid',
				gridTemplateRows: '50% 50%',
				gridTemplateColumns: '50% 50%',
				height: '100%'
			}}>
				<RVStyles />
				<FileDrop
					onAddPlotData={this.addPlotData}
					onAddVidData={this.addVidData}
				/>
				{this.state.plotData.map((plotData, index) =>
					<Plot
						key={index}
						plotData={plotData}
						timeBar={this.state.timeBar}
					/>
				)}
				{this.state.vidData.map((vidData, index) =>
					<Player
						key={index}
						url={vidData}
						controls
						height='100%'
						width='100%'
						onProgress={this.onVidProgress}
						onSeek={this.setTimebar}
					/>
				)}
			</div>
				</>
		)
	}
}
