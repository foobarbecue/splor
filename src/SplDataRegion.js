import React from 'reactn';
import SplPlot from './SplPlot'
import SplDropzone from './SplDropzone'
import Player from 'react-player'

const SplDataRegion = (props) => {
	switch (props.dataType) {

		case 'plot':
			return <SplPlot
				key={props.id}
				data={props.data}
				timebar={props.timebar}
			/>
			break;

		default:
			return <SplDropzone
				key={props.id}
				onAddData={props.onAddData}
			/>
	}
}

export default SplDataRegion
