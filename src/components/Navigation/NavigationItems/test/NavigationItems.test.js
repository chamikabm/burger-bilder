// Testing Dumb Components (Functional || Stateless Components) with Jest and Enzyme

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from '../NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

// Method 1
describe(' <NavigationItems/>', () => {
  it('Should render two <NavigationItem/> elements if not authenticated.', () => {
    const wrapper = shallow(<NavigationItems/>);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('Should render three <NavigationItem/> elements if authenticated.', () => {
    const wrapper = shallow(<NavigationItems isAuthenticated/>);
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});

// Method 2
describe('<NavigationItems/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems/>);
  });
  it('Should render two <NavigationItem/> elements if not authenticated.', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('Should render three <NavigationItem/> elements if authenticated.', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('Should render logput element if authenticated.', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });
});