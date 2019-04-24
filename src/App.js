import React from "react";
import { view } from 'react-easy-state'
import { dataPanes } from './stores'
import SplTimeline from './SplTimeline'
import SplDataPane from './SplDataPane'
import SplAddData from './SplAddData'

const App = view(() => {
	return (
		<div>
			{dataPanes.all.map(pane =>
				<SplDataPane
					key = {pane.id}
					{...pane}
				/>
			)}
			<SplAddData />
			<SplTimeline />
		</div>
	)
});

export default App
