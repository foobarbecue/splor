import React from 'react';
import Player from 'react-player'
import { eventTimes } from './stores'
import { view } from 'react-easy-state'

const SplPlayer= view((props)=>
	<Player
			url={props.data}
			controls
			height='100%'
			width='100%'
	/>
)

export default SplPlayer
