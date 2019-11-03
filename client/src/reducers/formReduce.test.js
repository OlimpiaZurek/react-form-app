import * as actionTypes from '../actions/actionTypes';
import { formReducer } from './formReducer';
import { data } from '../common/mockData/mockData';

describe('form reducer', () => {
  it('should return the initial state', () => {
    expect(formReducer(undefined, {})).toEqual(null);
  });

  it('should handle sending form data', () => {
      expect(formReducer( {}, {
        type: actionTypes.SEND_FORM_DATA,
        data
      }
      )).toEqual({data})
  });

  it('should send data with success', () => {
    expect(formReducer({}, {
      type: actionTypes.SEND_DATA_SUCCESS,
      message: 'Applicaton has been sent'
    })).toEqual({
      successMessage: 'Applicaton has been sent'
    });
  });

  it('should send data with failule', () => {
    expect(formReducer({}, {
      type: actionTypes.SEND_DATA_FAILURE,
      message: 'Application has not been sent'
    })).toEqual({
      falilureMessage: 'Application has not been sent'
    });
  });
});
