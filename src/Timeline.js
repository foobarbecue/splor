import React, {Component} from 'react'
import Timeline from 'react-calendar-timeline'
import moment from 'moment'
import 'react-calendar-timeline/lib/Timeline.css'

export default class EventTimeline extends Component{
	constructor(props){
		super(props);
		this.items = props.plotData.map(
			(dataForOnePlot) =>{
				const firstCol = dataForOnePlot[dataForOnePlot.meta.fields[0]];
				const nRows = dataForOnePlot.length;
				return(
					{
						start_time: dataForOnePlot[firstCol][0],
						end_time: dataForOnePlot[firstCol][nRows-1]
					}
				)
			}
		)
	}

	render(){
		return(
			<Timeline
				items={this.items}
				groups={[{ id: 1, title: 'Plots' }, { id: 2, title: 'Videos' }]}
				defaultTimeStart={moment().add(-12, 'hour')}
				defaultTimeEnd={moment().add(12, 'hour')}
			/>
		)
	}
}