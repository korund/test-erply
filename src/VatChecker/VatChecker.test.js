import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import VatChecker from './VatChecker';
import VatViewer from '../VatViewer/VatViewer'

Enzyme.configure({adapter: new Adapter()});

const props = {
  url: 'https://dummy.url/',
  queryKey: 'vatNumber',
  method: 'GET'
}

describe('VatChecker', function () {
  afterEach(function () {
    jest.clearAllMocks()
  })
  
  describe('#constructor', function () {
    it('should set props into state', function () {
      props.unrequiredProp = 'value of unrequired prop'
      const wrapper = shallow(<VatChecker {...props} />)
      for(let key in props) {
        expect(wrapper.state()).toHaveProperty(key, props[key])
      }
    })

    it('should warn if required property is not set and set default value instead', function () {
      const property = 'method'
      const requiredProp = 'GET'
      jest.spyOn(console, 'warn')
      const wrapper = shallow(<VatChecker />)
      expect(console.warn).toBeCalledWith(`No ${property} property was set for VatChecker. Using "${requiredProp}" instead`)
      expect(wrapper.state()[property]).toBe(requiredProp)
    })
  })
  
  describe('#render', function () {
    let wrapper

    beforeEach(function () {
    })

    it('should have field to enter VAT number', function () {
      wrapper = shallow(<VatChecker {...props} />)
      expect(wrapper.containsMatchingElement(<input type="text" name={wrapper.state().vatNumberKey} />)).toBeTruthy()
    })

    it('should have submit button', function () {
      wrapper = shallow(<VatChecker {...props} />)
      expect(wrapper.containsMatchingElement(<input type="submit" />)).toBeTruthy()
    })

    it('should call #handleSubmit on form submission', function () {
      const spy = jest.spyOn(VatChecker.prototype, 'handleSubmit')
      wrapper = shallow(<VatChecker {...props} />)
      expect(spy).not.toHaveBeenCalled()
      wrapper.find('form').simulate('submit', {preventDefault: jest.fn()})
      expect(spy).toHaveBeenCalled()
    })

    it('should call #handleChange on text field content change', function () {
      const spy = jest.spyOn(VatChecker.prototype, 'handleChange')
      wrapper = shallow(<VatChecker {...props} />)
      expect(spy).not.toHaveBeenCalled()
      wrapper.find(`input[name="${wrapper.state().vatNumberKey}"]`)
        .simulate('change', {target: {name: 'name', value: 'changedValue'}})
      expect(spy).toHaveBeenCalled()
    })

    it('should not render VatViewer if requestResult is not defined', function () {
      wrapper = shallow(<VatChecker {...props} />)
      expect(wrapper.state().requestResult).not.toBeDefined()
      expect(wrapper.containsMatchingElement(<VatViewer />)).toBeFalsy()
    })

    it('should render VatViewer if requestResult is defined', function () {
      wrapper = shallow(<VatChecker {...props} />)
      wrapper.setState({requestResult: 'defined'})
      expect(wrapper.containsMatchingElement(<VatViewer />)).toBeTruthy()
    })
  })

  describe('#handleChange', function () {
    let wrapper

    beforeEach(function () {
      wrapper = shallow(<VatChecker {...props} />)
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
    const event = { preventDefault: jest.fn() }

    beforeEach(function () {
      wrapper = shallow(<VatChecker {...props} />)
      wrapper.instance().processRequest = jest.fn()
    })

    it('should prevent default event behavior', function () {
      wrapper.instance().handleSubmit(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('should set state of requestResult to null', function () {
      expect(wrapper.state().requestResult).not.toBe(null)
      wrapper.instance().handleSubmit(event)
      expect(wrapper.state().requestResult).toBe(null)
    })

    it('should call for #processRequest method', function () {
      wrapper.instance().handleSubmit(event)
      expect(wrapper.instance().processRequest).toHaveBeenCalled()
    })
  })

  describe('#processRequest', function () {
    // TODO: need a mock XHR implementation
    let wrapper
    const number = 'test number'
    const url = props.url + '?' + props.queryKey + '=' + number

    beforeEach(function () {
      // global.XMLHttpRequest = MockXHR
      wrapper = shallow(<VatChecker {...props} />)
      wrapper.setState((state) => {
        state[props.queryKey] = number
        return state
      })
    })

    it('should make a xhr request', function () {
      expect.hasAssertions()
    })

    it('should set requestResult with provided content', function () {
      expect.hasAssertions()
    })
  })
})
