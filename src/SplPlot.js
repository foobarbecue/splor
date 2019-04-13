import {FlexibleXYPlot, XAxis, YAxis, LineSeriesCanvas, Crosshair, Highlight} from 'react-vis'
import React, {Component} from 'react'

export default function SplPlot(props){
	if (props.regionData.meta.fields.length === 2) {
		return <OneLineTSPlot
			plotData={props.regionData}
			timeBar={props.timeBar}
		/>
	} else if (props.regionData.meta.fields.length > 2) {
		return <MultilineTSPlot
			plotData={props.regionData}
			timeBar={props.timeBar}
		/>
	}
}

export class OneLineTSPlot extends Component {
	constructor(props) {
		super(props);
		// React-vis wants objects with keys "x" and "y", so rename.
		// Field names are still in props.plotData.meta.fields
		this.data = props.plotData.data.map(
			(row) => ({
				x: row[props.plotData.meta.fields[0]],
				y: row[props.plotData.meta.fields[1]]
			}));

		this.state = {xDomain: null, yDomain: null}
	}

	is_timeseries = () => (this.data[0]['x'] instanceof Date);

	zoomTo = (area) => {
		this.setState({
			xDomain: [area.left, area.right],
			yDomain: [area.bottom, area.top]
		})
	};

	resetZoom = () =>{
		this.setState({
			xDomain: null,
			yDomain: null
		})
	};

	render() {
		return (
			<div style={{position:'relative'}}>
				<h2 style={{position:'absolute', right: '0%'}}>
					{this.props.plotData.fileName}
				</h2>
				<FlexibleXYPlot
					xType={this.is_timeseries ? "time" : "linear"}
					xDomain={this.state.xDomain}
					yDomain={this.state.yDomain}
				>

					<LineSeriesCanvas
						data={this.data}/>
					<Crosshair
						values={this.props.timeBar ? [{x: this.props.timeBar.getTime(), y: 0}] : null}
					>test</Crosshair>
					<XAxis title={this.props.plotData.meta.fields[0]}/>
					<YAxis title={this.props.plotData.meta.fields[1]}/>
					<Highlight
						onBrushEnd={this.zoomTo}
					/>
				</FlexibleXYPlot>
				{(this.state.xDomain || this.state.yDomain) &&

				<button
					onClick={()=>{this.resetZoom()}}
					style={{
						position: 'absolute',
						bottom: '40px',
						left: '40px'
					}}
				>Reset zoom</button>
				}
			</div>
		)
	}
}

export class MultilineTSPlot extends Component {
	constructor(props) {
		super(props);
		// React-vis wants objects with keys "x" and "y", so rename.
		// Field names are still in props.plotData.meta.fields

		const xfield = props.plotData.meta.fields[0];
		const yfields = props.plotData.meta.fields.slice(1, props.plotData.meta.fields.length);
		this.data = [];
		for (const yfield of yfields) {
			this.data.push(props.plotData.data.map(
				(row) => ({
					x: row[xfield],
					y: row[yfield]
				})))
		}

		this.state = {startTime: this.data[0][0].x}
	}

	is_timeseries = () => (this.data[0][0]['x'] instanceof Date);

	render() {
		return (
			<div>
				<h2>{this.props.plotData.fileName}</h2>
				<FlexibleXYPlot
					xType={this.is_timeseries ? "time" : "linear"}
				>
					{this.data.map(
						(data, index) =>
							<LineSeriesCanvas
								ref={index}
								data={data}/>
					)}

					<Crosshair
						values={[{x: (this.state.startTime.getTime() + this.props.timeBar * 1000), y: 0}]}
					>test</Crosshair>
					<XAxis title={this.props.plotData.meta.fields[0]}/>
				</FlexibleXYPlot>
			</div>
		)
	}
}
