import React, {Component} from 'react'
import Timeline from 'react-visjs-timeline'

export default class SplTimeline extends Component {
	constructor(props) {
		super(props);
		this.timelineRef = React.createRef();
	}

	getTimelineItemsFromData = (regionsData) => {
		const timelineItems = regionsData.map(
				(regionData, region) => {
					if (regionData && regionData.dataType === 'plot'){
						const firstColName = regionData.meta.fields[0];
						const nRows = regionData.data.length;
						return (
							{
								// id: region,
								// group: 1,
								content: regionData.fileName,
								start: regionData.data[0][firstColName],
								end: regionData.data[nRows - 1][firstColName]
							}
					) }
					else if (regionData && regionData.dataType === "video"){
						{
							if(regionData.hasOwnProperty('duration')){
								return({
									content: regionData.fileName,
									start: regionData.vidStartTime,
									end: new Date(regionData.vidStartTime.getTime() + regionData.duration * 1000)
								})
							}
						}
						}

				}
			);
		return timelineItems.filter(item => item) // remove undefineds
	};

	onTimebarDrag = ({id, time, event}) => {
		this.props.setTimebar(time)
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		// If data is added or removed, zoom to fit
		if (prevProps.regionsData != this.props.regionsData){
			this.timelineRef.current.$el.fit()
		}
	}

	render() {
		const items = this.getTimelineItemsFromData(this.props.regionsData);
		return (<div className={'timelineContainer'}>
				<Timeline
					ref={this.timelineRef}
					items={items} // TODO seems to be recalculating on drag
					options={{showCurrentTime: false}}
					customTimes = {{timeBar: this.props.timeBar}}
					timechangeHandler = {this.onTimebarDrag}
				/>
			</div>
		)
	}
}
