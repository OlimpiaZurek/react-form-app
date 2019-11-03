import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button.js';

describe('<Button />', () => {
  const mockFn = jest.fn();
  
  it('should be defined', () => {
    expect(Button).toBeDefined();
  });

  it('should render corectly', () => {
    const wrapper = shallow(
      <Button children='test'/>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call mock function when button is clicked', () => {
    const wrapper = shallow(
      <Button children='test' onClick={mockFn}/>
    );
    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
