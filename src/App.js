// import request from "superagent";

import React, { Component } from 'react'
import FileDrop from './FileDrop'
import Plot from './Plot'
import Player from './Player'
import RVStyles from 'react-vis-styles'

export default class extends Component{
	constructor(){
		super();
		this.addPlotData = this.addPlotData.bind(this)
		this.addVidData = this.addVidData.bind(this)
		this.state = {plotData: [], vidData: []}
	}

	addPlotData(newPlotData) {
		this.setState(
				{plotData: this.state.plotData.concat(newPlotData)}
		)
	}

	addVidData(newVidData) {
		this.setState(
			{vidData: this.state.vidData.concat(newVidData)}
		)
	}


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
					/>
				)}
				{this.state.vidData.map((vidData, index) =>
					<Player
						key={index}
						vidData={vidData}
					/>
				)}
			</div>
				</>
		)
	}
}
