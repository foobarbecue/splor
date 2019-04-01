import React, {Component} from 'react'
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'

export default class SplTimeline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visibleTimeStart: this.props.minTime,
			visibleTimeEnd: this.props.maxTime,
			items: []
		}
	}

	getTimelineItemsFromData = (regionsData) => {
		const timelineItems = regionsData.map(
				(regionData, region) => {
					if (regionData && regionData.dataType === 'plot'){
						const firstColName = regionData.meta.fields[0];
						const nRows = regionData.data.length;
						return (
							{
								id: region,
								group: 1,
								title: regionData.fileName,
								start_time: regionData.data[0][firstColName],
								end_time: regionData.data[nRows - 1][firstColName]
							}
					)
					}
				}
			);
		return timelineItems.filter(item => item) // remove undefineds
	};

	getItemStartTimes = (items) => {
		return items.map(
			(item) => {
				return item.start_time
			}
		).sort((item0, item1) => (item0 < item1) ? -1 : 1)
	};

	getItemEndTimes = (items) => {
		return items.map(
			(item) => {
				return item.end_time
			}
		).sort((item0, item1) => (item0 > item1) ? -1 : 1)
	};

	handleTimeChange = (visibleTimeStart, visibleTimeEnd) => {
		this.setState({visibleTimeStart, visibleTimeEnd})
	};

	componentWillReceiveProps(nextProps, nextContext) {
		// If new components (plots or videos) were added we need to update the timeline
		if (this.props.regionsData !== nextProps.regionsData) {
			const items = this.getTimelineItemsFromData(nextProps.regionsData);
			if (items.length > 0){
				const startTimes = this.getItemStartTimes(items);
				const endTimes = this.getItemEndTimes(items);
				this.setState({
					visibleTimeStart: startTimes[0].getTime(),
					visibleTimeEnd: endTimes[0].getTime(),
					items: items
				});
			}
		}
	}

	render() {
		return (
			<Timeline
				items={this.state.items} // TODO seems to be recalculating on drag
				groups={[{id: 1, title: 'Plots'}, {id: 2, title: 'Videos'}]}
				visibleTimeStart={this.state.visibleTimeStart}
				visibleTimeEnd={this.state.visibleTimeEnd}
				traditionalZoom={true}
				style={{gridArea: 'timeline'}}
				onTimeChange={this.handleTimeChange}
			/>
		)
	}
}
