// import request from "superagent";

import React, { Component } from 'react'
import Csvdrop from './CsvDrop'

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
				<Csvdrop
					onAddPlotData={this.addPlotData}
				/>
			</div>
		)
	}
}
