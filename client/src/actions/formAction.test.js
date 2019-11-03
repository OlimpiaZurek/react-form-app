import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as types from './actionTypes';
import { 
  submitFormData,
  sendFormSuccess,
  sendFormFailure 
} from './formAction';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const data = {
  firstname: 'test',
  lastname: 'test',
  email: 'test@test.com',
  date: '02.11.2019',
};

const mockServiceCreator = (body, succeeds = true) => () =>
  new Promise((resolve, reject) => {
    setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10);
});

let store;

describe('actions', () => {
  beforeEach(() => {
    store = mockStore({ });
  })

  it('when data has been send', () => {
   const expectedActions = {
     type: types.SEND_FORM_DATA, data
   };

   store.dispatch(submitFormData(data, mockServiceCreator(types.SEND_FORM_DATA)))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });
});


describe('success action', () => {
  it('should dispatches the correct action and payload', () => {
    const expectedActions = [
      {
        message: 'Application has been send',
        type: types.SEND_DATA_SUCCESS
      },
    ];
    store.dispatch(sendFormSuccess('Application has been send'))
    expect(store.getActions()).toEqual(expectedActions)
  });
});
