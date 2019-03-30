import React, {Component} from 'react'
import Timeline from 'react-calendar-timeline'
import moment from 'moment'
import 'react-calendar-timeline/lib/Timeline.css'

export default class EventTimeline extends Component{
	constructor(props){
		super(props);
	}

	getItems = () =>
		this.props.plotData.map(
		(dataForOnePlot) =>{
			const firstColName = dataForOnePlot.meta.fields[0];
			const nRows = dataForOnePlot.data.length;
			return(
				{
					id: 1,
					group: 1,
					title: dataForOnePlot.fileName,
					start_time: dataForOnePlot.data[0][firstColName],
					end_time: dataForOnePlot.data[nRows-1][firstColName]
				}
			)
		}
	);

	getStartTimes = () => {
		return this.props.plotData.map(
			(dataForOnePlot) => {
				const firstColName = dataForOnePlot.meta.fields[0];
				return dataForOnePlot.data[0][firstColName]
			}
		)
	};

	getEndTimes = () => {
		return this.props.plotData.map(
			(dataForOnePlot) => {
				const firstColName = dataForOnePlot.meta.fields[0];
				const nRows = dataForOnePlot.data.length;
				return dataForOnePlot.data[nRows - 1][firstColName]
			}
		)
	};

	render(){
		const items = this.getItems();
		const startTimes = this.getStartTimes();
		const startTime = startTimes.length > 0 ? this.getStartTimes()[0] : this.props.minTime;

		const endTimes = this.getEndTimes();
		const endTime = endTimes.length > 0 ? endTimes[endTimes.length -1] : this.props.maxTime;

		return(
			<Timeline
				items={items}
				groups={[{ id: 1, title: 'Plots' }, { id: 2, title: 'Videos' }]}
				visibleTimeStart={startTime.getTime()}
				visibleTimeEnd={endTime.getTime()}
				traditionalZoom={true}
				style={{gridArea: 'timeline'}}
			/>
		)
	}
}