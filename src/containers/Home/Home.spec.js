import React from 'react';
import { mount } from 'enzyme';
import configuredMockStore from 'redux-mock-store';

import { TestProvider } from '../../utils/test.utils';

import Home from './Home';

describe('Home component', () => {
  it('should display', () => {
    const store = configuredMockStore()({ chapter: {
      chapters: [],
      limit: 10,
      page: 0
    }});

    const wrapper = mount(
      <TestProvider store={store}>
        <Home />
      </TestProvider>
    );

    expect(wrapper.find(Home).length).toBe(1);
  });
});
