import React from 'react'
import ReactDOM from 'react-dom'
import Immutable, {Set} from 'immutable'
import uuid from 'node-uuid'

import CyNetworkViewerComponent from 'cy-network-viewer-component'


const Viewport = props =>
  <div style={props.style}>
    <CyNetworkViewerComponent
      {...props}
      renderer='cytoscape'
    />
  </div>

class SimpleNetworkViewer {

  constructor(viewportTagId,  network, networkId=null,
              width='100%', height='700px', background='teal') {

    this.viewportStyle = {
      width: width,
      height: height,
      background: background
    }

    this.network = this.buildInitialState(network)
    this.tagId = viewportTagId

    if(networkId === null) {
      this.networkId = uuid.v4()
    } else {
      this.networkId = networkId
    }
  }

  buildInitialState(networkInCx) {
    return Immutable.fromJS({
      network: networkInCx,
      selected: {
        nodes: Set(),
        edges: Set()
      },
      view: {
        zoom: 1.0,
        pan: {
          x: 0,
          y: 0
        },
        style: {}
      }
    });
  }

  display() {
    ReactDOM.render(
      <Viewport
        key={this.tagId}
        networkId={this.networkId}
        network={this.network}
        style={this.viewportStyle}
      />,
      document.getElementById(this.tagId)
    );
  }
}

export function create(tagId, key, network, width, height, background) {
  return new SimpleNetworkViewer(tagId, key, network, width, height, background)
}