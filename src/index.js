import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import VatChecker from './VatChecker/VatChecker'
import registerServiceWorker from './registerServiceWorker'

const url = 'https://vat.erply.com/numbers'
const method = 'GET'
ReactDOM.render(<VatChecker url={url} method={method} />, document.getElementById('root'))
registerServiceWorker()
