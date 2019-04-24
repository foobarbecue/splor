import React from 'react';
import SplPlot from './SplPlot'
import Player from 'react-player'

const SplDataPane = (props) => {
	switch (props.dataType) {

		case 'plot':
			return <SplPlot
				key={props.id}
				data={props.data}
				timebar={props.timebar}
			/>
			break;

		default:
			return <div> unknown data pane type </div>
	}
}

export default SplDataPane
