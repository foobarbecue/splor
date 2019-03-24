import {XYPlot, XAxis, YAxis, LineSeries} from 'react-vis'
import React, { Component } from 'react'

export default class extends Component{
	constructor(props){
		super()
		// React-vis wants objects with keys "x" and "y", so rename.
		// Field names are still in props.plotData.meta.fields
		this.data = props.plotData.data.map(
			(row)=>({
				x: row[props.plotData.meta.fields[0]],
				y: row[props.plotData.meta.fields[1]]
			}))
	}

	render() {
			return (
				<>
				<XYPlot
					width={300}
					height={300}>
					<LineSeries
						data={this.data}/>
					<XAxis title={this.props.plotData.meta.fields[0]}/>
					<YAxis title={this.props.plotData.meta.fields[1]}/>
				</XYPlot>
				</>
			)
	}
	}