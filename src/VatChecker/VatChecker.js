import React, { Component } from 'react';
import './VatChecker.css';

class VatChecker extends Component {
  constructor(props) {
    super(props)
    this.inputVatNumber = 'vat-number'
    this.buttonCheckVat = 'vat-check'
  }

  render() {
    return (
      <div className="vat-checker">
        <form>
          <fieldset>
            <legend>Check VAT number</legend>
            <label for={this.inputVatNumber}>Enter VAT number</label>
            <input type="text" name={this.inputVatNumber}/><br/>
            <input type="button" name={this.buttonCheckVat} value="Check" />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default VatChecker;
