import {XYPlot, XAxis, YAxis, LineSeries} from 'react-vis'
import React, { Component } from 'react'

export default class extends Component{
	render() {
		console.log(this.props.plotData.data)
			return (
				<>
				<XYPlot
					width={300}
					height={300}>
					<LineSeries
						data={this.props.plotData.data}/>
					<XAxis/>
					<YAxis/>
				</XYPlot>
				</>
			)
	}
	}