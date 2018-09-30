import React, { Component } from 'react'

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

  render() {
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
      <div className={'vat-viewer'}>
        <fieldset>
          <legend>Result</legend>
            <div className='response-info'>
              <div id={'titles'}> {titles} </div>
              <div id={'values'}> {values} </div>
            </div>
        </fieldset>
      </div>
    )
  }
}

export default VatViewer;