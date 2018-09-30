import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import VatViewer from './VatViewer';
import loading from './loading.svg';

Enzyme.configure({adapter: new Adapter()});

describe('VatViewer', function () {
  afterEach(function () {
    jest.clearAllMocks()
  })

  describe('#constructor', function () {
    it('should set a map of titles into state', function () {
      const wrapper = shallow(<VatViewer />)
      expect(wrapper.state().titles).toBeDefined()
    })
  })

  describe('#render', function () {
    it('should call #renderLoading, if no props were passed', function () {
      const spy = jest.spyOn(VatViewer.prototype, 'renderLoading')
      const spy2 = jest.spyOn(VatViewer.prototype, 'renderResult')
      shallow(<VatViewer />)
      expect(spy).toHaveBeenCalled()
      expect(spy2).not.toHaveBeenCalled()
    })

    it('should call #renderResult, if props were passed', function () {
      const props = { testProp: 'test property value' }
      const spy = jest.spyOn(VatViewer.prototype, 'renderResult')
      const spy2 = jest.spyOn(VatViewer.prototype, 'renderLoading')
      shallow(<VatViewer {...props} />)
      expect(spy).toHaveBeenCalled()
      expect(spy2).not.toHaveBeenCalled()
    })
  })

  describe('#renderResult', function () {
    let wrapper
    const props = {
      status: 'some status message',
      undefinedProp: 'undefined prop value'
    }

    beforeEach(function () {
      wrapper = shallow(<VatViewer {...props} />)
    })

    it('should print prop values with corresponding titles', function () {
      const key = 'status'
      const title = wrapper.state().titles.get(key)
      expect(wrapper.contains(<p>{title}</p>)).toBeTruthy()
      expect(wrapper.contains(<p>{props[key]}</p>)).toBeTruthy()
    })

    it('should print prop value with id as title, if no title found', function () {
      const key = 'undefinedProp'
      expect(wrapper.contains(<p>{key}</p>)).toBeTruthy()
      expect(wrapper.contains(<p>{props[key]}</p>)).toBeTruthy()
    })
  })

  describe('#renderLoading', function () {
    let wrapper

    beforeEach(function () {
      wrapper = shallow(<VatViewer />)
    })

    it('should render loading.svg with "Loading" message', function () {
      expect(wrapper.contains([
        <img src={loading} className="loading-logo" alt="loading" />,
        <p>Loading</p>
      ])).toBeTruthy()
    })
  })
})
