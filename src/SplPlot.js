import {FlexibleXYPlot, XAxis, YAxis, LineSeriesCanvas, Crosshair, Highlight, Borders} from 'react-vis'
import React, { Component } from 'react'
import '../node_modules/react-vis/dist/style.css';
import { eventTimes } from "./stores";
import { view } from "react-easy-state";
import RemoveButton from './RemoveButton'

export default function SplPlot(props){
	if (props.meta.fields.length === 2) {
		return <OneLineTSPlot
			{...props}
		/>
	} else if (props.meta.fields.length > 2) {
		return <>Multi-column data is not yet implemented</>
		// return <MultilineTSPlot
		// 	{...props}
		// />
	}
}

class OneLineTSPlot extends Component {
	constructor(props) {
		super(props);
		// React-vis wants objects with keys "x" and "y", so rename.
		// Field names are still in props.meta.fields
		this.data = props.data.map(
			(row) => ({
				x: row[props.meta.fields[0]],
				y: row[props.meta.fields[1]]
			}));

		this.state = {xDomain: null, yDomain: null}
	}

	is_timeseries = () => (this.data[0]['x'] instanceof Date);

	zoomTo = (area) => {
		if (!!area) {
			this.setState({
				xDomain: [area.left, area.right],
				yDomain: [area.bottom, area.top]
			})
		}
	};

	resetZoom = () =>{
		this.setState({
			xDomain: null,
			yDomain: null
		})
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		// Manually trigger a window resize to get react-vis to fit plots into css grid
		window.dispatchEvent(new Event('resize'));
	}

	render() {
		return (
			<div style={{position:'relative'}}>
				<h2 style={{position:'absolute', right: '0'}}>
					{this.props.fileName}
				</h2>
				<FlexibleXYPlot
					xType={this.is_timeseries ? "time" : "linear"}
					xDomain={this.state.xDomain}
					yDomain={this.state.yDomain}
				>

					<LineSeriesCanvas
						data={this.data}/>
					<Crosshair
						values={[{x: eventTimes.cursor.getTime(), y: 0}]}
					>test</Crosshair>
					<Borders style={{all: {fill: '#fff'}}} />
					<XAxis title={this.props.meta.fields[0]}/>
					<YAxis title={this.props.meta.fields[1]}/>
					<Highlight
						onBrushEnd={this.zoomTo}
					/>
				</FlexibleXYPlot>
				<RemoveButton
					paneId = {this.props.paneId}
				/>
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

OneLineTSPlot = view(OneLineTSPlot);
