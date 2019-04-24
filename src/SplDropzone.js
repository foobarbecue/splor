import React from "react";
import Papa from "@foobarbecue/papaparse";


function SplDropzone(props) {

	return (
		<input type={'file'} onChange=
			{(inp) => {
				dispatchAddPlotData(
					addPlotDataAC({regionId: props.regionId, fileData: inp})
				)
			}
			}/>
	)
}

export default SplDropzone
