import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import VatChecker from './VatChecker';

Enzyme.configure({adapter: new Adapter()});

describe('VatChecker', function () {
  describe('#constructor', function () {
    
  })
  
  describe('#render', function () {
    let wrapper

    beforeEach(function () {
      wrapper = shallow(<VatChecker/>)
    })

    it('renders without crashing', () => {
      const div = document.createElement('div')
      ReactDOM.render(<VatChecker />, div)
      ReactDOM.unmountComponentAtNode(div)
    });

    it('should have field to enter VAT number', function () {
      expect(wrapper.find({name: 'vat-number'})).toHaveLength(1)
    })

    it('should have submit button', function () {
      expect(wrapper.find('input[type="submit"]')).toHaveLength(1)
    })

    it('should call #handleSubmit on form submission', function () {
      //TODO: research how to check for function call
      expect.hasAssertions()
    })

    it('should call #handleChange on text field content change', function () {
      //TODO: research how to check for function call
      expect.hasAssertions()
    })
  })

  describe('#handleChange', function () {
    let wrapper

    beforeEach(function () {
      wrapper = shallow(<VatChecker/>)
    })

    it('should put new value in state', function () {
      const testName = 'testName'
      const testValue = 'testValue'
      const event = {target: {name: testName, value: testValue}}
      wrapper.instance().handleChange(event)
      expect(wrapper.instance().state[testName]).toBe(testValue)
    })
  })

  describe('#handleSubmit', function () {
    it('should call for xhr method with current state', function () {

    })
  })
})
