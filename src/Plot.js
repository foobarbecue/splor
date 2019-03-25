import {FlexibleXYPlot, XAxis, YAxis, LineSeries} from 'react-vis'
import React, { Component } from 'react'

export default class Plot extends Component{
	constructor(props){
		super();
		// React-vis wants objects with keys "x" and "y", so rename.
		// Field names are still in props.plotData.meta.fields
		this.data = props.plotData.data.map(
			(row)=>({
				x: row[props.plotData.meta.fields[0]],
				y: row[props.plotData.meta.fields[1]]
			}))
	}

	is_timeseries = () => (this.data[0]['x'] instanceof Date);

	render() {
			return (
				<>
				<FlexibleXYPlot
					xType={this.is_timeseries ? "time" : "linear"}
				>
					<LineSeries
						data={this.data}/>
					<XAxis title={this.props.plotData.meta.fields[0]}/>
					<YAxis title={this.props.plotData.meta.fields[1]}/>
				</FlexibleXYPlot>
				</>
			)
	}
	}