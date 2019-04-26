import React from "react";
import {view} from 'react-easy-state'
import {dataPanes} from './stores'
import SplTimeline from './SplTimeline'
import SplDataPane from './SplDataPane'
import SplAddData from './SplAddData'

const App = view(() => {
	return (
		<div>
			<SplAddData	/>
			<div style={{
				display: 'grid',
				gridGap: '20px',
				gridTemplateColumns: 'repeat(auto-fit, 400px)',
				height: '400px',
				// overflow: 'hidden'
			}}>
				{dataPanes.all.map(pane =>
					<SplDataPane
						key={pane.id}
						{...pane}
					/>
				)}
			</div>
			<SplTimeline/>
		</div>
	)
});

export default App
