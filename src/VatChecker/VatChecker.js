import React, { Component } from 'react';
import VatViewer from '../VatViewer/VatViewer'
import './VatChecker.css';

const requiredProps = {
  url: 'https://vat.erply.com/numbers',
  queryKey: 'vatNumber',
  method: 'GET'
}

class VatChecker extends Component {
  constructor(props) {
    super(props)

    this.state = { vatNumberKey: this.props.queryKey }
    this.state[this.state.vatNumberKey] = ''

    for (let property in props) {
      if(props.hasOwnProperty(property))
        this.state[property] = props[property]
    }

    for(let property in requiredProps) {
      if (!this.state.hasOwnProperty(`${property}`) ||
        this.state[`${property}`] === 'undefined' ||
        this.state[`${property}`] === '') {
        console.warn(`No ${property} property was set for VatChecker. Using "${requiredProps[property]}" instead`)
        this.state[property] = requiredProps[property]
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState((state) => {
      state[name] = value
      return state
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({requestResult: null})
    this.processRequest()
  }

  processRequest() {
    const saveResult = (result) => this.setState({requestResult: result})
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(this.state.method, this.state.url + '?' + this.state.queryKey + '=' + this.state[this.vatNumber])
      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: xhr.statusText
        })
      }
      xhr.onload = function(e) {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response)
        } else {
          xhr.onerror(e)
        }
      }
      xhr.send()
    }).then((resolved) => {
      saveResult(JSON.parse(resolved))
    }, (rejected) => {
      saveResult(rejected)
    })
  }

  render() {
    const inputName = this.state.vatNumberKey
    const requestResult = this.state.requestResult
    return (
      <div className="vat-checker">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Check VAT number</legend>
            <label htmlFor={inputName}>Enter VAT number</label>
            <input type="text" name={inputName} value={this.state[inputName]} onChange={this.handleChange} /><br/>
            <input type="submit" value="Check" />
          </fieldset>
        </form>
        {typeof requestResult !== 'undefined' && <VatViewer {...requestResult} />}
      </div>
    )
  }
}

export default VatChecker;
