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
			<div>
				Let's SPLOR!
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
		)
	}
}
