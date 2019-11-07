import React from 'react';
import { shallow, mount } from 'enzyme';
import DatePicker from './Datepicker.js';

describe('<DatePicker />', () => {
  let wrapper;
  let wrapperInstance;
  const mockFn = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <DatePicker value='2.11.2019' onDateClick={mockFn} />
    );
    wrapperInstance = wrapper.instance();
  });

  afterEach(() => {
    wrapper = undefined;
    wrapperInstance = undefined;
  });

  it('should be defined', () => {
    expect(DatePicker).toBeDefined();
  });
  
  it('should render corectly', () => {
    expect(wrapper).toMatchSnapshot();
  }); 

  it('check month and years dropdowns displayed', () => {
    wrapper.setState({ isCalendarOpened: true})
    expect(wrapper.state().isCalendarOpened).toEqual(true)
  });

  it('should render TextInput component', () => {
    expect(wrapper.find('TextInput')).toHaveLength(1)
  });

  it('should call onClick', () => {
    const spy = jest.spyOn(wrapperInstance, 'onClick');
    wrapperInstance.onClick();
    expect(spy).toHaveBeenCalledTimes(1)
  });

  it('should change isCalendarOpened state when toggleCalendar is called', () => {
    wrapperInstance.toggleCalendar();
    expect(wrapper.state().isCalendarOpened).toEqual(true);
  });

  it('should call handleChangge', () => {
    const mockEvent = Object.assign(jest.fn(), {preventDefault: () => {}})
    const spy = jest.spyOn(wrapperInstance, 'handleChange');
    wrapperInstance.handleChange(mockEvent);
    expect(spy).toHaveBeenCalledTimes(1)
  });
});