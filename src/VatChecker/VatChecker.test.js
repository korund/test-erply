import React from 'react';
import ReactDOM from 'react-dom';
import VatChecker from './VatChecker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VatChecker />, div);
  ReactDOM.unmountComponentAtNode(div);
});
