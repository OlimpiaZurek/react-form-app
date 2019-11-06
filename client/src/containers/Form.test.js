import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { EventForm } from './Form';
import ValidationMessage from '../components/ValidationMessage/ValidationMessage';
import TextInput from '../components/TextInput/TextInput';
import DatePicker from '../components/DatePicker/DatePicker';
import { mapStateToProps, mapDispatchToProps } from './Form';
import * as actionTypes from '../actions/actionTypes';
import { data } from '../common/mockData/mockData';

const mockStore = configureStore({});

const props = {
  actions: {submitFormData: () => jest.fn() },
  message: '',
};

describe('<EventForm />', () => {
  let store;
  let wrapper;
  let wrapperInstance;

  beforeEach(() => {
    store = mockStore({});
    wrapper = shallow(
      <EventForm  {...props} store={store}/>
    );
    wrapperInstance = wrapper.instance();
  });

  afterEach(() => {
    wrapper = undefined;
    wrapperInstance = undefined;
  })

  it('should render with given state from Redux store', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a form', () => {
    expect(wrapper.first().type()).toBe('form');
  });

  it('should contains everything else that gets rendered', () => {
    const form = () => wrapper.first();
    expect(form().children()).toEqual(wrapper.children());
  });

  it('should render <ValidationMessage />', () => {
    wrapper.setState({allFieldsValid: true});
    expect(wrapper.find(ValidationMessage).length).toBe(1);
  });

  it('should render <TextInput />', () => {
    expect(wrapper.find(TextInput).length).toBe(3);
  });

  it('should render <DatePicker />', () => {
    expect(wrapper.find(DatePicker).length).toBe(1);
  });

  it('should receives message props as ValidationMessage Text Prop', () => {
    wrapper.setState({allFieldsValid: true});
    const validationMessage =  () => wrapper.find(ValidationMessage);
    expect(validationMessage().props('text')).toEqual(
      wrapper.props('message')
    );
  });

  it('should receives state.valid as <TextInput />  error prop', () => {
    const textInput = () => wrapper.find(TextInput).first();
    expect(textInput().prop('error')).toEqual(false)
  });

  it('should receives handleChange as handleChange <TextInput /> prop', () => {
    const textInput = () => wrapper.find(TextInput).first();
    expect(textInput().prop('handleChange')).toEqual(
      wrapperInstance.handleChange,
    );
  });

  it('should receives state currentDate as <DatePicker />', () => {
    const datepicker = () => wrapper.find(DatePicker).first();
    expect(datepicker().prop('selectedDate')).toEqual(wrapper.state('currentDate'));
  });

  it('should receives onDateClick as onDateClick <DatePicker /> props', () => {
    const datepicker = () => wrapper.find(DatePicker);
    expect(datepicker().prop('onDateClick')).toEqual(
      wrapperInstance.onDateClick
    );
  });

  it('should check valid email when trying to submit empty input ', () => {
    const wrapper = mount(<EventForm {...props}  store={store} />)
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(wrapper.state().email.valid).toBe(false)
  });

  it(' it should return state message from mapStateToProps', () => {
      const state = {
        formReducer: {
          data: {
            message: 'test'
          }
        }
      };
      expect(mapStateToProps(state).message).toEqual('test')
  });

  it('should dispatch actions with mapDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).actions.sendFormDataAction();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: actionTypes.SEND_FORM_DATA});
  });
});
