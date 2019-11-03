import React from 'react';
import { shallow } from 'enzyme';
import ValidationMessage from './ValidationMessage';

const props = {
  status:'test',
  message: 'test'
};

describe('<ValidatonMessage', () => {
  it('should be defined', () => {
    expect(ValidationMessage).toBeDefined();
  });

  it('should render corectly', () => {
    const wrapper = shallow(
      <ValidationMessage {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  }); 
})
