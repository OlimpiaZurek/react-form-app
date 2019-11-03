import React from 'react';
import { shallow, mount } from 'enzyme';
import TextInput from './TextInput.js';

const props = {
  onClick: jest.fn(),
  handleChange:  jest.fn(),
  placeholder: 'test',
  value: 'test value',
  type: 'test type',
  name: 'test name',
  className: 'test',
  error: 'test',
}

describe('<TextInput/ >', () => {
  it('should be defined', () => {
    expect(TextInput).toBeDefined();
  });

  it('should render corectly', () => {
    const wrapper = shallow(
      <TextInput {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render text input correctly with empty string value', () => {
    const wrapper = mount(
      <TextInput  {...props}  value = ''/>
    );
    expect((wrapper).prop('value')).toEqual('');
  });

  it('render text input correctly with value', () => {
    const wrapper = mount(
      <TextInput  {...props} />
    );
    expect(wrapper.props().value).toBe('test value')
  });
});
