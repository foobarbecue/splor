import React, { Component } from 'react'
import ReactPlayer from 'react-player'

export default (props) => {
		return (
			<ReactPlayer
				url={props.vidData}
				controls
			/>
		)
}