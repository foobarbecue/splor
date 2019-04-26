import React from 'react';
import { MdControlPoint } from 'react-icons/md'
import readInp from './readInp'

const SplAddData = ()=>
	<form style={{
		position:"fixed",
		top:"0",
		right:"0"
	}}>
		<input
			type={"file"}
			onChange={(evt)=>readInp(evt.target.files[0])}
		/>
	</form>

export default SplAddData
