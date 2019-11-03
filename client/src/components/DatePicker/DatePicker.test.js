import React from 'react';
import { shallow, mount } from 'enzyme';
import DatePicker from './Datepicker.js';
import Calendar from '../Calendar/Calendar';

describe('<DatePicker />', () => {
  const mockFn = jest.fn();
  it('should be defined', () => {
      expect(DatePicker).toBeDefined();
    });
  
  it('should render corectly', () => {
    const wrapper = shallow(
      <DatePicker value='2.11.2019' onDateClick={mockFn} />
    );
    expect(wrapper).toMatchSnapshot();
  }); 

  it('check month and years dropdowns displayed', () => {
    const wrapper = shallow(
      <DatePicker value='2.11.2019' onDateClick={mockFn} />
    );
    wrapper.setState({ isCalendarOpened: true})
    expect(wrapper.state().isCalendarOpened).toEqual(true)
  });

  it('should render Calendar component', () => {
    const wrapper = mount(
      <DatePicker value='test' onDateClick={mockFn} />
    );
    expect(wrapper.find('TextInput')).toHaveLength(1)
  });

  it('should not call mock function when calendar is not open', () => {
    const wrapper = mount(
      <DatePicker value='test' onDateClick={mockFn} />
    );
    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(0)
  });
});