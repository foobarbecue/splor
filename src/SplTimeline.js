import Timeline from 'react-visjs-timeline'
import React from 'react';
import { store, view } from 'react-easy-state'
import { dataPanes, eventTimes } from './stores'

/**
 * Collect start and end times of the videos and plot data and convert to visjs timeline format
 */
const getTimelineItemsFromData = (regionsData) => {
	if (regionsData.all.length === 0){
		return [{start: new Date(), end: new Date('2020-12-17T03:24:00'), content: "frump"}]
	}
	const timelineItems = regionsData.all.map(
		(regionData) => {
			if (regionData && regionData.dataType === 'plot'){
				const firstColName = regionData.meta.fields[0];
				const nRows = regionData.data.length;
				return (
					{
						content: regionData.fileInfo.name,
						start: regionData.data[0][firstColName],
						end: regionData.data[nRows - 1][firstColName]
					}
				) }
			else if (regionData && regionData.dataType === "video"){
				{
					if(regionData.hasOwnProperty('duration')){
						return({
							start: regionData.vidStartTime,
							end: new Date(regionData.vidStartTime.getTime() + regionData.duration * 1000),
							content: regionData.fileName,
							// editable: {
							// 	updateTime: true
							// }
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
	// onMove: onMoveItem
}

const SplTimeline = view(()=> {
		const items = getTimelineItemsFromData(dataPanes);
		return <Timeline
			items={items}
			options={jsvizTlOptions}
			customTimes={eventTimes.cursor}
			timechangeHandler={(newTime) => {
				eventTimes.cursor = newTime
			}}
		/>
	}
)

export default SplTimeline
