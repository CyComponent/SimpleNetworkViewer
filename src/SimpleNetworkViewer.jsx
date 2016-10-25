import React from 'react'
import ReactDOM from 'react-dom'

import CyNetworkViewerComponent from 'cy-network-viewer-component'


class SimpleNetworkViewer {

  constructor(viewportTagId, cxNetwork,
              width = '100%', height = '700px', background = '#CCCCCC') {

    this.viewportStyle = {
      width: width,
      height: height,
      background: background
    }

    this.cxNetwork = cxNetwork
    this.tagId = viewportTagId
    this.command = null
  }

  fit() {
    this.command = 'fit'
    this.display()
  }

  zoomIn() {
    this.command = 'zoomIn'
    this.display()
  }

  zoomOut() {
    this.command = 'zoomOut'
    this.display()
  }

  display() {
    ReactDOM.render(
      <CyNetworkViewerComponent
        key={this.tagId}
        cxNetwork={this.cxNetwork}
        style={this.viewportStyle}
        runningCommand={this.command}
      />,
      document.getElementById(this.tagId)
    );
  }
}

export function create(tagId, network, width, height, background) {
  return new SimpleNetworkViewer(tagId, network, width, height, background)
}