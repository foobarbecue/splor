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

	propsToItems = (props) => {
		const propsToUse = props || this.props;
		return (
			propsToUse.plotData.map(
				(dataForOnePlot, index) => {
					const firstColName = dataForOnePlot.meta.fields[0];
					const nRows = dataForOnePlot.data.length;
					return (
						{
							id: index,
							group: 1,
							title: dataForOnePlot.fileName,
							start_time: dataForOnePlot.data[0][firstColName],
							end_time: dataForOnePlot.data[nRows - 1][firstColName]
						}
					)
				}
			))
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
		if (this.props.plotData.length < nextProps.plotData.length) {
			const items = this.propsToItems(nextProps);
			const startTimes = this.getItemStartTimes(items);
			const endTimes = this.getItemEndTimes(items);
			this.setState({
				visibleTimeStart: startTimes[0].getTime(),
				visibleTimeEnd: endTimes[0].getTime(),
				items: items
			});
		}
	}

	render() {
		return (
			<Timeline
				items={this.state.items}
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
