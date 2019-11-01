
const STATE = (txtFieldState) => ({
  email: {
    ...txtFieldState,
    fieldName: "Email",
    required: true,
    requiredTxt: "Email is resquired",
    formatErrorTxt: "Incorrect email format"
  },
  firstname: {
    ...txtFieldState,
    fieldName: "First Name",
    required: true,
    requiredTxt: "First Name is required"
  },
  lastname: {
    ...txtFieldState,
    fieldName: "Last Name",
    required: true,
    requiredTxt: "Last Name is required"
  },
  datefield: {
    ...txtFieldState,
    fieldName: 'datefield',
    required: true,
    requiredTxt: 'Date is required',
  },
  allFieldsValid: false
});

export const reduceFormValues = (formElements,state) => {
  const arrElements = Array.from(formElements); 
  const formValues = arrElements
    .filter(elem => elem.name.length > 0)
    .map(x => {
      const { typeMismatch } = x.validity;
      const { name, type, value } = x;
      return {
        name,
        type,
        typeMismatch,
        value,
        valid: x.checkValidity()
      };
    })
    .reduce((acc, currVal) => {
      const { value, valid, typeMismatch } = currVal;
      const { fieldName, requiredTxt, formatErrorTxt } = state[
        currVal.name
      ];
      acc[currVal.name] = {
        value,
        valid,
        typeMismatch,
        fieldName,
        requiredTxt,
        formatErrorTxt
      };

      return acc;
    }, {});

  return formValues;
};


export const checkAllFieldsValid = formValues => {
  return !Object.keys(formValues)
    .map(x => formValues[x])
    .some(field => !field.valid);
};

export default STATE;
