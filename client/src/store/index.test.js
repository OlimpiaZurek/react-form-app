import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import { data } from '../common/mockData/mockData';
import * as formActions from '../actions/formAction';

const initialState = {}

describe('Store', () => {
  it('should handle form data', () => {
    const store = createStore(rootReducer, initialState);
    const action = formActions.sendFormDataAction(data);
    store.dispatch(action);
    const actual = store.getState().formReducer.data;
    expect(actual).toEqual(data)
  });
});
