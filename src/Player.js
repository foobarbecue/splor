import React from 'react'
import ReactPlayer from 'react-player'

export default function Player(props){
		return (
			<ReactPlayer
				url={props.vidData}
				controls
				height='100%'
				width='100%'
			/>
		)
}