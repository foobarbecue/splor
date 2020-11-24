import React, { Component } from 'react'
import { Layer } from 'mobility-toolbox-js/ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import BasicMap from 'react-spatial/components/BasicMap';

class SpatialMap extends Component {
  constructor(props) {
    super(props);
    this.spatialMapRef = React.createRef()
    this.layers = [
      new Layer({
        olLayer: new Tile({
          source: new OSM(),
        }),
      })
    ];
  }
  
  ref = spatialMap => {
    this.spatialMap = spatialMap
  }
  
  render = () =>
    <BasicMap layers={this.layers} style={{'height': '100%'}} tabIndex={0} />
  
}

export default SpatialMap