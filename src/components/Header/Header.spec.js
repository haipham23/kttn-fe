import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import configuredMockStore from 'redux-mock-store';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';

import { TestProvider } from '../../utils/test.utils';

import Header from './Header';

describe('Header component', () => {
  it('should display', () => {
    const store = configuredMockStore()({ account: {} });
    const options = new ReactRouterEnzymeContext();

    const wrapper = mount(
      <TestProvider store={store}>
        <Header />
      </TestProvider>,
      options.get()
    );

    expect(wrapper.find(Header)).to.have.length(1);
  });
});
