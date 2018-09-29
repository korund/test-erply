import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import VatChecker from './VatChecker/VatChecker'
import registerServiceWorker from './registerServiceWorker'

const props = {
  url: 'https://vat.erply.com/numbers',
  queryKey: 'vatNumber',
  method: 'GET'
}
ReactDOM.render(<VatChecker method={props.method} url={props.url} queryKey={props.queryKey}/>, document.getElementById('root'))
registerServiceWorker()
