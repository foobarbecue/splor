import React, { useEffect } from "react";
import {view} from 'react-easy-state'
import {dataPanes} from './stores'
import SplTimeline from './SplTimeline'
import SplDataPane from './SplDataPane'
import SplAddData from './SplAddData'
import './App.css'

const App = view(() => {
	useEffect(
		// Manually trigger a window resize to get react-vis to fit plots into css grid
		()=>{window.dispatchEvent(new Event('resize'));}
	)

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
				gridTemplateRows: 'repeat(auto-fit, minmax(20%, 1fr)',
				gridAutoFlow:'rows',
				position: 'fixed',
				top: '50px',
				bottom: '150px',
				width: '100%',
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
