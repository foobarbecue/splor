import React from "react";
import {view} from 'react-easy-state'
import {dataPanes} from './stores'
import SplTimeline from './SplTimeline'
import SplDataPane from './SplDataPane'
import SplAddData from './SplAddData'
import './App.css'

const App = view(() => {
	return (
		<div>

			<div style = {{
				position:'fixed',
				top:'0',
				height:'50px',
				width:'100%'
			}}>splor
				<SplAddData 	/>
			</div>
			<div style={{
				display: 'grid',
				gridGap: '20px',
				gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr)',
				gridTemplateRows: 'repeat(auto-fit, minmax(0px, 1fr)',
				position: 'fixed',
				top: '50px',
				bottom: '150px',
				width: '100%'
				// overflow: 'hidden'
			}}>
				{dataPanes.all.map(pane =>
					<SplDataPane
						key={pane.id}
						{...pane}
					/>
				)}
			</div>
			<div id={"timeline"} style = {{
				position:'fixed',
				bottom:'0',
				height:'150px',
				width:'100%'
			}}>
			<SplTimeline
			/>
			</div>
		</div>
	)
});

export default App
