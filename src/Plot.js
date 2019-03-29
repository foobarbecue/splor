import {FlexibleXYPlot, XAxis, YAxis, LineSeries, Crosshair} from 'react-vis'
import React, { Component } from 'react'

export default class Plot extends Component{
	constructor(props){
		super(props);
		// React-vis wants objects with keys "x" and "y", so rename.
		// Field names are still in props.plotData.meta.fields
		this.data = props.plotData.data.map(
			(row)=>({
				x: row[props.plotData.meta.fields[0]],
				y: row[props.plotData.meta.fields[1]]
			}))

		this.state = {startTime: this.data[0].x}
	}

	is_timeseries = () => (this.data[0]['x'] instanceof Date);

	render() {
			return (
				<div>
					<h2>{this.props.plotData.fileName}</h2>
				<FlexibleXYPlot
					xType={this.is_timeseries ? "time" : "linear"}
				>
					<LineSeries
						data={this.data}/>
					<Crosshair
						values = {[{x: (this.state.startTime.getTime() + this.props.timeBar * 1000), y:0}]}
					>test</Crosshair>
					<XAxis title={this.props.plotData.meta.fields[0]}/>
					<YAxis title={this.props.plotData.meta.fields[1]}/>
				</FlexibleXYPlot>
				</div>
			)
	}
	}