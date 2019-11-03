import React from 'react';
import { Provider } from 'react-redux';
import { shallow , mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { EventForm } from './Form';

const mockStore = configureStore({});

const props = {
  actions: {submitFormData: () => jest.fn() },
  message: '',
};

describe('<EventForm />', () => {
  let store;
  let wrapper;
  const mock = jest.fn()
  beforeEach(() => {
    store = mockStore({});

    wrapper = mount(
      <Provider store={store}>
        <EventForm  {...props}/>
      </Provider>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render the container component', () => {
   expect(wrapper.find(EventForm).length).toEqual(1)
  });

  it('should not submit form when data are not provied' , () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(mock).toHaveBeenCalledTimes(0)
  });

  it('should check valid email when trying to submit empty input ', () => {
    const wrapper = mount(<EventForm {...props}  store={store} />)
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(wrapper.state().email.valid).toBe(false)
  });
});
