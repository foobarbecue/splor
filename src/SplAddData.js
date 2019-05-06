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
			multiple={"multiple"}
			onChange={(evt)=>{
				for (const inpFile of evt.target.files){
					readInp(inpFile)
				}
			}}
		/>
	</form>

export default SplAddData
