import React, { useEffect } from 'react'
import { view } from 'react-easy-state'
import { dataPanes } from './stores'
import SplTimeline from './SplTimeline'
import SplDataPane from './SplDataPane'
import SplAddData from './SplAddData'
import './App.css'

const App = view(() => {
  useEffect(
    // Manually trigger a window resize to get react-vis to fit plots into css grid
    () => { window.dispatchEvent(new Event('resize')) }
  )

  return (
    <div>
      <SplAddData />
      <div style={{
        position: 'fixed',
        top: '0',
        height: '50px',
        width: '100%'
      }}>splor
      </div>

      {dataPanes.all.length > 0 && <div style={{
        display: 'grid',
        gridGap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr)',
        gridTemplateRows: 'repeat(auto-fit, minmax(20%, 1fr)',
        gridAutoFlow: 'rows',
        position: 'fixed',
        top: '50px',
        bottom: '200px',
        width: '100%',
        zIndex: 20
        // overflow: 'hidden'
      }}>
        {dataPanes.all.map(pane =>
          <SplDataPane
            key={pane.id}
            paneObj={pane}
          />
        )}
      </div>}
      <div id={'timeline'} style={{
        position: 'absolute',
        bottom: 0,
        height: '200px',
        width: '100%',
        zIndex: 30
      }}>
        {dataPanes.all.length > 0 && <SplTimeline/>}
      </div>
    </div>
  )
})

export default App
