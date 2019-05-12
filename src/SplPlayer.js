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
			url={props.data}
			controls
			height='100%'
			width='100%'
	/>
	<RemoveButton
		paneId = {props.paneId}
	/>
	</div>
)

export default SplPlayer
