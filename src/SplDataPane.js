import React from 'react';
import SplPlot from './SplPlot'
import SplPlayer from './SplPlayer'

const SplDataPane = (props) => {
	switch (props.dataType) {

		case 'plot':
			return <SplPlot
				key={props.id}
				data={props.data}
				meta={props.meta}
				fileInfo={props.fileInfo}
			/>
			break;

		case 'video':
			return <SplPlayer
				key={props.id}
				data={props.data}
				meta={props.meta}
				fileInfo={props.fileInfo}
			/>
			break;

		default:
			return <div> unknown data pane type </div>
	}
}

export default SplDataPane
