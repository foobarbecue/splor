// import request from "superagent";

import React, {Component} from 'react'
import SplRegion from './SplRegion'
import SplTimeline from './SplTimeline'
import RVStyles from 'react-vis-styles'
import './main.css'

export default class extends Component {
	constructor() {
		super();
		const now = new Date();
		this.state = {
			// plotData and vidData have 4 elements, representing NW NE SE SW regions. TODO adjustable numbers of regions
			regionsData: [null, null, null, null], // A list of datasets to be plotted
			timeBar: null,
			events: [
				{time: new Date(now.getTime() - 24 * 1000 * 60 * 60), name: 'defaultStart'},  // prepopulate so the timeline doesn't freak out
				{time: new Date(now.getTime() + 24 * 1000 * 60 * 60), name: 'defaultEnd'}
			]
		}
	}

	addData = (newData, fileOrURL, dataType, region) => {
			Object.assign(newData, {fileName: fileOrURL.name, dataType: dataType}); //TODO maybe move this into readInp
			const augmentedRegionsData = this.state.regionsData.slice();
			augmentedRegionsData[region] = newData;
			this.setState({regionsData: augmentedRegionsData});
	};

	setTimebar = (datetime) => {
		this.setState(
			{timeBar: datetime}
		)
	};

	onVidProgress = (progressObj) => {
		this.setTimebar(progressObj.playedSeconds)
	};

	onVidDuration = (region, duration) => {
		const regionsDataCopy = this.state.regionsData.slice();
		Object.assign(regionsDataCopy[region], {duration: duration});
		this.setState({regionsData: regionsDataCopy});
	};

	render() {
		return (
			<>
				<div style={{
					display: 'grid',
					gridTemplateRows: '1fr 4fr 4fr 2fr',
					gridTemplateColumns: '1fr 1fr',
					gridTemplateAreas: "'hdr hdr' 'NW NE' 'SW SE' 'timeline timeline'",
					height: '100%'
				}}>
					<h1 style={{gridArea: "hdr"}}>splor</h1>
					<RVStyles/>

					{this.state.regionsData.map((regionData, region) =>
						<SplRegion
							key={region}
							onAddData={this.addData}
							onVidProgress={this.onVidProgress}
							onVidDuration={this.onVidDuration}
							regionData={regionData}
							region={region}
							timebar={this.state.timeBar}
							setTimebar={this.setTimebar}
						/>
					)}
					{// Show timeline if any of the regions contain data
						!this.state.regionsData.every((elem)=>(elem==null)) &&
					<SplTimeline
						regionsData={this.state.regionsData}
					/>
					}
				</div>
			</>
		)
	}
}
