import React from 'react';
import { MdControlPoint } from 'react-icons/md'
import readInp from './readInp'

const SplAddData = ()=>
	<form>
		<input
			type={"file"}
			onChange={readInp}
		/>
	</form>

export default SplAddData
