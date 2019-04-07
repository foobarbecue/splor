import React, {Component} from 'react'
import Timeline from 'react-visjs-timeline'

export default class SplTimeline extends Component {
	constructor(props) {
		super(props);
		this.timelineRef = React.createRef();
		this.state = {
			items: [{
				start: new Date(2010, 7, 15),
				end: new Date(2010, 8, 2),  // end is optional
				content: 'No content yet',
			}]
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
								// id: region,
								// group: 1,
								content: regionData.fileName,
								start: regionData.data[0][firstColName],
								end: regionData.data[nRows - 1][firstColName]
							}
					)
					}
				}
			);
		return timelineItems.filter(item => item) // remove undefineds
	};

	componentWillReceiveProps(nextProps, nextContext) {
		// If new components (plots or videos) were added we need to update the timeline
		if (this.props.regionsData !== nextProps.regionsData) {
			const items = this.getTimelineItemsFromData(nextProps.regionsData);
			if (items.length > 0){
				this.setState({
					items: items
				});
				this.timelineRef.current.$el.fit()
			}
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.timelineRef.current.$el.fit()
	}

	render() {
		return (<div className={'timelineContainer'}>
				<Timeline
					ref={this.timelineRef}
					items={this.state.items} // TODO seems to be recalculating on drag
				/>
			</div>
		)
	}
}
