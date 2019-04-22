import React from "react";
import {setGlobal, useGlobal} from 'reactn';
import SplTimeline from './SplTimeline'
import SplDataRegion from './SplDataRegion'
import uuidv4 from 'uuid/v4'

const fixtures = {
	regionsData: [
		{id: uuidv4(),
			data:[],
			dataType:"",
			errors:[],
			fileName:"notAfile.csv",
			meta:{}},
		{}
	],
	events: [],
	timebar: new Date()
}

setGlobal(fixtures);

// addReducer('addItem')

const App = () => {
	const [regionsData] = useGlobal('regionsData');
	return (
		<div>
			{regionsData.map(region =>
				<SplDataRegion
					key = {region.id}
					{...region}
				/>
			)}
			<SplTimeline />
		</div>
	)
};

export default App
