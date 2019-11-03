import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar.js';

const props = {
  onDateClick: jest.fn(),
  selectedDate: new Date(),
}

describe('<Calendar />', () => {
  it('should be defined', () => {
      expect(Calendar).toBeDefined();
  });
  
  it('should render corectly', () => {
    const wrapper = shallow(
      <Calendar {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
})