import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock';
import * as types from './actionTypes';
import { data } from '../common/mockData/mockData';
import { 
  submitFormData,
  sendFormSuccess,
  sendFormFailure,
} from './formAction';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it('it should send data properly', () => {
    nock('http://localhost:3000/api')
      .post('/form', data)
      .reply(200, {id: 'abc', message: 'test', success: true});
      
    const expectedActions = [
      {
        type: types.SEND_FORM_DATA, 
        data: 
        { 
          id: 'abc', 
          message: 'test', 
          success: true
        }
      },
      {
        type: types.SEND_DATA_SUCCESS, 
        message: 'test',
      }
    ];

   store.dispatch(submitFormData(data))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });
});

describe('actions error', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it('should not sending data properly', () => {
    nock('http://localhost:3000/api')
      .post('/form')
      .replyWithError('something awful happened')
      
   const expectedActions = [
      {
        type: 
        types.SEND_DATA_FAILURE, 
        message: new Error('something awful happened'),
      }
    ];

   store.dispatch(submitFormData(data))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  })
})

describe('actions success', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
    it('should handle success action', () => {
    store.dispatch(sendFormFailure('test'))
    expect(store.getActions()[0].type).toEqual(types.SEND_DATA_FAILURE)
  });
});

describe('actions success', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
    it('should handle success action', () => {
    store.dispatch(sendFormSuccess('test'))
    expect(store.getActions()[0].type).toEqual(types.SEND_DATA_SUCCESS)
  });
});

