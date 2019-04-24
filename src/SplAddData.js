import React from 'react';
import { MdControlPoint } from 'react-icons/md'
import readInp from './readInp'

const SplAddData = ()=>
	<form>
		<input
			type={"file"}
			onChange={(evt)=>readInp(evt.target.files[0])}
		/>
	</form>

export default SplAddData
