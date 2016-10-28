import React from 'react'
import ReactDOM from 'react-dom'
import CyViewer from 'cy-viewer'


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

    const commandFinished = (lastCommand, status) => {
      console.log("* Last Command: " + lastCommand);
      this.command = null;
    };

    eventHandlers.commandFinished = commandFinished;
    this.handlers = eventHandlers
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
      <CyViewer
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