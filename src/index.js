import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VatChecker from './VatChecker/VatChecker';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<VatChecker />, document.getElementById('root'));
registerServiceWorker();
