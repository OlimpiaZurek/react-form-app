import * as actionTypes from '../actions/actionTypes';

export const formReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SEND_FORM_DATA:
      const { data } = action;
      return {
        ...state,
        data
      };
    
    case actionTypes.SEND_DATA_SUCCESS: 
     const { message: successMessage } = action;
     return {
       ...state,
       successMessage
     };

     case actionTypes.SEND_DATA_FAILURE: 
     const { message: falilureMessage } = action;
     return {
       ...state,
      falilureMessage
     };
    default:
      return state;
  };
};