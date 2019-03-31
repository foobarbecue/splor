// import request from "superagent";

import React, { Component } from 'react'
import FileDrop from './FileDrop'
import { OneLineTSPlot, MultilineTSPlot } from './Plots'
import Player from 'react-player'
import EventTimeline from './Timeline'
import RVStyles from 'react-vis-styles'

export default class extends Component{
	constructor() {
		super();
		const now = new Date();
		this.state = {
			plotData: [], // A list of datasets to be plotted
			vidData: [], // A list of video blobs to be shown in players
			timeBar: null,
			events: [
				{time: new Date(now.getTime() - 24 * 1000 * 60 * 60), name: 'defaultStart'},  // prepopulate so the timeline doesn't freak out
				{time: new Date(now.getTime() + 24 * 1000 * 60 * 60), name: 'defaultEnd'}
			]
		}
	}

	addPlotData = (newPlotData, file) => {
		Object.assign(newPlotData, {fileName:file.name});
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
			<div style={{
				display: 'grid',
				gridTemplateRows: '1fr 4fr 4fr 2fr',
				gridTemplateColumns: '1fr 1fr',
				gridTemplateAreas:"'hdr hdr' 'NW NE' 'SW SE' 'timeline timeline'",

				height: '100%'
			}}>
				<h1 style={{gridArea: "hdr"}}>Let's SPLOR!</h1>
				<RVStyles />
				<FileDrop
					onAddPlotData={this.addPlotData}
					onAddVidData={this.addVidData}
				/>
				{this.state.plotData.map((plotData, index) =>
				{if (plotData.meta.fields.length === 2){
					return <OneLineTSPlot
						key={index}
						plotData={plotData}
						timeBar={this.state.timeBar}
					/>
				} else if (plotData.meta.fields.length > 2){
					return <MultilineTSPlot
						key={index}
						plotData={plotData}
						timeBar={this.state.timeBar}
					/>
				}
				}
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
				<EventTimeline
					// Computes max and min times. Probably already calculated in the plot components. Optimise?
					plotData={this.state.plotData}
					vidData={this.state.vidData}
					minTime={this.state.events[0].time.getTime()}
					maxTime={this.state.events[this.state.events.length - 1].time.getTime()}
				/>
			</div>
				</>
		)
	}
}
