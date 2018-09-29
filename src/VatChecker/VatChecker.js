import React, { Component } from 'react';
import './VatChecker.css';

const requiredProps = {
  url: 'https://vat.erply.com/numbers',
  method: 'GET'
}

class VatChecker extends Component {
  constructor(props) {
    super(props)
    this.inputVatNumber = 'vatNumber'

    this.state = {}
    this.state[this.inputVatNumber] = ''

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
    alert('Input data: ' + this.state[this.inputVatNumber].value)

  }

  render() {
    return (
      <div className="vat-checker">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Check VAT number</legend>
            <label htmlFor={this.inputVatNumber}>Enter VAT number</label>
            <input type="text" name={this.inputVatNumber} value={this.state[this.inputVatNumber].value} onChange={this.handleChange} /><br/>
            <input type="submit" value="Check" />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default VatChecker;
