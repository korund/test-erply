import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import VatChecker from './VatChecker';

Enzyme.configure({adapter: new Adapter()});

const props = {
  url: 'https://vat.erply.com/numbers',
  queryKey: 'vatNumber',
  method: 'GET'
}

describe('VatChecker', function () {
  const vatCheckerConstruction = <VatChecker method={props.method} url={props.url} queryKey={props.queryKey} />

  describe('#constructor', function () {
    
  })
  
  describe('#render', function () {
    let wrapper

    beforeEach(function () {
      wrapper = shallow(vatCheckerConstruction)
    })

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
      wrapper = shallow(vatCheckerConstruction)
    })

    it('should put new value in state', function () {
      const name = 'test-name'
      const value = 'test-value'
      const event = {target: {name: name, value: value}}
      wrapper.instance().handleChange(event)
      expect(wrapper.instance().state[name]).toBe(value)
    })
  })

  describe('#handleSubmit', function () {
    let wrapper
    const event = {}

    beforeEach(function () {
      event.preventDefault = jest.fn()
      wrapper = shallow(vatCheckerConstruction)
      wrapper.instance().processRequest = jest.fn()
    })

    it('should prevent default event behavior', function () {
      wrapper.instance().handleSubmit(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('should call for #processRequest method', function () {
      wrapper.instance().handleSubmit(event)
      expect(wrapper.instance().processRequest).toHaveBeenCalled()
    })
  })

  describe('#processRequest', function () {
    it('should send a xhr request', function () {
      expect.hasAssertions()
    })

    it('should return promise', function () {
      
    })
  })
})

class MockXhr {

}