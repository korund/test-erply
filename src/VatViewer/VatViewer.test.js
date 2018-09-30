import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import VatViewer from './VatViewer';

Enzyme.configure({adapter: new Adapter()});

describe('VatViewer', function () {
  describe('#constructor', function () {
    it('should set a map of titles into state', function () {
      const wrapper = shallow(<VatViewer />)
      expect(wrapper.state().titles).toBeDefined()
    })
  })

  describe('#render', function () {
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
})
