import React from 'react';
import SplPlot from './SplPlot'
import SplPlayer from './SplPlayer'
import { view } from 'react-easy-state'

const SplDataPane = (props) => {
	switch (props.dataType) {

		case 'plot':
			return <>
			<SplPlot
				paneId={props.id}
				data={props.data}
				meta={props.meta}
				fileInfo={props.fileInfo}
			/>
			</>
			break;

		case 'video':
			return <>
			<SplPlayer
				paneId={props.id}
				data={props.data}
				meta={props.meta}
				fileInfo={props.fileInfo}
			/>
			</>
			break;

		default:
			return <div> unknown data pane type </div>
	}
}

export default view(SplDataPane)
