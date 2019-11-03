import { checkAllFieldsValid } from './validation.js';

describe('checkAllFieldsValid', () => {
  it('should return false when values are empty string', () => {
    const formValues = {
      firstname: '',
      lastname: '',
      email: '',
      datefield: ''
    };
    expect(checkAllFieldsValid(formValues)).toBe(false)
  });
});