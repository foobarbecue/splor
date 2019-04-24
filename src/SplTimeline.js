import Timeline from 'react-visjs-timeline'
import React from 'react';
import { store, view } from 'react-easy-state'

/**
 * Collect start and end times of the videos and plot data and convert to visjs timeline format
 */
const getTimelineItemsFromData = (regionsData) => {
	const timelineItems = regionsData.map(
		(regionData, region) => {
			if (regionData && regionData.dataType === 'plot'){
				const firstColName = regionData.meta.fields[0];
				const nRows = regionData.data.length;
				return (
					{
						region: region,
						content: regionData.fileName,
						start: regionData.data[0][firstColName],
						end: regionData.data[nRows - 1][firstColName]
					}
				) }
			else if (regionData && regionData.dataType === "video"){
				{
					if(regionData.hasOwnProperty('duration')){
						return({
							region: region,
							content: regionData.fileName,
							start: regionData.vidStartTime,
							end: new Date(regionData.vidStartTime.getTime() + regionData.duration * 1000),
							editable: {
								updateTime: true
							}
						})
					}
				}
			}

		}
	);
	return timelineItems.filter(item => item) // remove undefineds
};

const onMoveItem = (item, callbackCallback) => {
	console.log(item);
	this.props.setVidStart(item.region, item.start)
};

const jsvizTlOptions = {
	showCurrentTime: false,
	onMove: onMoveItem
}

const SplTimeline = view(()=>
	<Timeline
			items={getTimelineItemsFromData(dataPanes)}
			options={jsvizTlOptions}
			customTimes = {{timebar}}
			timechangeHandler = {setTimebar}
	/>
)

export default SplTimeline
