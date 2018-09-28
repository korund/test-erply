import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import VatChecker from './VatChecker';

Enzyme.configure({adapter: new Adapter()});

describe('VatChecker', function () {
  let component
  beforeEach(function () {
    component = shallow(<VatChecker/>)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<VatChecker />, div)
    ReactDOM.unmountComponentAtNode(div)
  });

  it('should have field to enter VAT number', function () {
    expect.hasAssertions()
    expect(component.find({name: "vat-number"})).toHaveLength(1)
  })

  it('should have button to check VAT number', function () {
    expect.hasAssertions()
    expect(component.find({name: "vat-check"})).toHaveLength(1)
  })


})
