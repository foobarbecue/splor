import React from 'react';
import Player from 'react-player'
import { eventTimes } from './stores'
import { view } from 'react-easy-state'
import RemoveButton from './RemoveButton'

const SplPlayer= view((props)=>
	<div
		style={{position:'relative'}}
	>
	<Player
			url={props.paneObj.data}
			controls
			height='100%'
			width='100%'
			onDuration={(duration)=>props.paneObj.duration = duration}
	/>
	<RemoveButton
		paneId = {props.paneObj.id}
	/>
	</div>
)

export default SplPlayer
