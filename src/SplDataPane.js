import React from 'react'
import SplPlot from './SplPlot'
import SplPlayer from './SplPlayer'
import { view } from 'react-easy-state'
// import line from 'rc-progress'

const SplDataPane = ({data, meta, progress}) => {

  return <div><select>
    {meta.fields.map((field)=>
      <option>{field}</option>)
    }
  </select>
  </div>
}

export default view(SplDataPane)
