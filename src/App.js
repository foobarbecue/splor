// import request from "superagent";

import React, { Component } from 'react'
import Csvdrop from './CsvDrop'
import Plot from './Plot'
import RVStyles from 'react-vis-styles'

export default class extends Component{
	constructor(){
		super();
		this.addPlotData = this.addPlotData.bind(this)
		this.state = {plotData: []}
	}

	addPlotData(newPlotData) {
		this.setState(
				{plotData: this.state.plotData.concat(newPlotData)}
		)
	}

	render(){
		return (
			<>
				<h1>Let's SPLOR!</h1>
			<div style={{
				display: 'grid',
				'grid-template-rows': '50% 50%',
				'grid-template-columns': '50% 50%',
				height: '100%'
			}}>
				<RVStyles />
				<Csvdrop
					onAddPlotData={this.addPlotData}
				/>
				{this.state.plotData.map((plotData, index) =>
					<Plot
						key={index}
						plotData={plotData}
					>
					</Plot>
				)}
			</div>
				</>
		)
	}
}
