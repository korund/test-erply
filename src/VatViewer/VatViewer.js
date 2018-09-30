import React, { Component } from 'react'
import loading from './loading.svg'

class VatViewer extends Component {
  constructor(props) {
    super(props)
    const titleMap = new Map()
    titleMap.set('Name', 'Name')
    titleMap.set('CountryCode', 'Country Code')
    titleMap.set('VATNumber', 'VAT Number')
    titleMap.set('Address', 'Address')
    titleMap.set('Valid', 'Valid')
    titleMap.set('RequestDate', 'Time of request')
    titleMap.set('status', 'Error code')
    titleMap.set('statusText', 'Error message')
    this.state = {titles: titleMap}
  }

  renderResult() {
    const titles = []
    const values = []
    for (let id in this.props) {
      if (this.props.hasOwnProperty(id) ) {
        const title = this.state.titles.get(id)
        titles.push(<p key={id}>{ title ? title : id}</p>)
        values.push(<p key={id}>{`${this.props[id]}`}</p>)
      }
    }
    return (
      <div className='vat-check-result'>
        <div id={'titles'}> {titles} </div>
        <div id={'values'}> {values} </div>
      </div>
    )
  }

  renderLoading() {
    return (
      <div>
        <img src={loading} className="loading-logo" alt="loading" />
        <p>Loading</p>
      </div>
    )
  }

  render() {
    let isPropsEmpty = true
    for (let item in this.props) {
      if (this.props.hasOwnProperty(item)) {
        isPropsEmpty = false
        break
      }
    }

    return (
      <div className={'vat-viewer'}>
        <fieldset>
          <legend>Result</legend>
          {isPropsEmpty ? this.renderLoading() : this.renderResult()}
        </fieldset>
      </div>
    )
  }
}

export default VatViewer;