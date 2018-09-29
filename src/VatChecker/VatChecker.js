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
    this.vatNumber = 'vat-number'

    this.state = {}
    this.state[this.vatNumber] = ''
    this.state.vatViewerState = {}

    for (let property in props) {
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
    //alert('Input data: ' + this.state[this.vatNumber].value)
    this.processRequest()
      .then((resolved) => {
        console.log('Resolved:\n')
        console.log(resolved)
      }, (rejected) => {
        console.log('Reject:\n')
        console.log(rejected)
      })
  }

  processRequest() {
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
    })
  }

  render() {
    const inputName = this.vatNumber
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
        <VatViewer state={this.state.vatViewerState}/>
      </div>
    )
  }
}

export default VatChecker;
