import * as actionTypes from './actionTypes';
import { sendFormData } from '../services/formService';

export const sendFormDataAction = data => ({
  type: actionTypes.SEND_FORM_DATA,
  data
});

export const sendFormSuccess = message => ({
  type: actionTypes.SEND_DATA_SUCCESS,
  message
});

export const sendFormFailure = message => ({
  type: actionTypes.SEND_DATA_FAILURE,
  message
})

export const submitFormData = data => dispatch =>
  sendFormData(data)
  .then(({ data } )=> {
    dispatch(sendFormDataAction(data))
    if (data.success) {
      dispatch(sendFormSuccess(data.message));
    } else {
      dispatch(sendFormFailure(data.message));
    }
  })
  .catch((err) => {
    dispatch(sendFormFailure(err));
});
