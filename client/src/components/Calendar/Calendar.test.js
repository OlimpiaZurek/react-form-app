import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar.js';

const props = {
  onDateClick: jest.fn(),
  selectedDate: new Date(),
}

describe('<Calendar />', () => {
  let wrapper;
  let wrapperInstance;

  beforeEach(() => {
    wrapper = shallow(
      <Calendar {...props} />
    );

   wrapperInstance = wrapper.instance();
  });

  it('should be defined', () => {
    expect(Calendar).toBeDefined();
  });
  
  it('should render corectly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call nextMonth', () => {
    const spy = jest.spyOn(wrapperInstance, 'nextMonth');
    wrapperInstance.nextMonth();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call precMonth', () => {
    const spy = jest.spyOn(wrapperInstance, 'prevMonth');
    wrapperInstance.prevMonth();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should receives onClick as onDateClick <Calendar /> prop', () => {
    const spy = jest.spyOn(wrapperInstance, 'getDays');
    wrapperInstance.getDays(new Date());
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
