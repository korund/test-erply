import React, { Component } from 'react'

class VatViewer extends Component {
  constructor(props) {
    super(props)

  }


  render() {
    return (
    <div className='vat-viewer'>
      <p>{this.props.vatViewerState}</p>
    </div>
    )
  }
}

export default VatViewer;