import React from 'react'
import ReactDOM from 'react-dom'

import CyNetworkViewerComponent from 'cy-network-viewer-component'


class SimpleNetworkViewer {

  constructor(viewportTagId, cxNetwork,
              width = '100%', height = '700px', background = '#EAEAEA') {


    this.viewportStyle = {
      width: width,
      height: height,
      background: background
    }

    this.cxNetwork = cxNetwork
    this.tagId = viewportTagId
    this.command = null

  }

  setHandlers(eventHandlers) {
    console.log('@@CONST:  original handlers')
    console.log(eventHandlers)

    this.handlers = eventHandlers
  }

  fit() {
    this.command = 'fit'
    this.display()
    this.command = null
  }

  zoomIn() {
    this.command = 'zoomIn'
    this.display()
    this.command = null
  }

  zoomOut() {
    this.command = 'zoomOut'
    this.display()
    this.command = null
  }

  applyStyle(visualStyle) {
    this.networkStyle = visualStyle
    this.display()
  }

  applyLayout(layoutName) {
    this.layout = layoutName
    this.display()
  }

  display() {
    console.log('original handlers')
    console.log(this.handlers)

    ReactDOM.render(
      <CyNetworkViewerComponent
        key={this.tagId}
        cxNetwork={this.cxNetwork}
        style={this.viewportStyle}
        command={this.command}
        networkStyle={this.networkStyle}
        rendererOptions={{layout: this.layout}}
        eventHandlers={this.handlers}
      />,
      document.getElementById(this.tagId)
    );
  }
}

export function create(tagId, network, width, height, background) {
  return new SimpleNetworkViewer(tagId, network, width, height, background)
}