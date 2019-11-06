import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import TextInput from '../components/TextInput/TextInput';
import DatePicker from '../components/DatePicker/DatePicker' ;
import ValidationMessage from '../components/ValidationMessage/ValidationMessage';
import Button from '../components/Button/Button';
import STATE, { 
  reduceFormValues, 
  checkAllFieldsValid 
} from '../common/utils/validation';
import { 
  INPUT_DATE_FORMAT
} from '../common/consts/calendar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/formAction';

const txtFieldState = {
  value: '',
  valid: true,
  typeMismatch: false, 
};

export class EventForm extends Component {

  state = {
    currentDate: new Date(),
    ...STATE(txtFieldState)
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let newState = Object.assign({}, this.state);
    newState[name].value = value;
    this.setState(newState);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formValues = reduceFormValues(form.elements, this.state);
    const allFieldsValid = checkAllFieldsValid(formValues);

    this.setState({ 
      ...formValues,
      allFieldsValid 
    });
    const { 
      firstname, 
      lastname, 
      email, 
      datefield,
    } = formValues;
  
    const preparedData  = {
      firstName: firstname.value,
      lastName: lastname.value,
      email: email.value,
      date: datefield.value
    };


    if (allFieldsValid) {
      this.props.actions.submitFormData(preparedData);
    }
  }

  onDateClick = day => {
    this.setState(prevState => ({
      datefield: {
        ...prevState.datefield,
        value: day
      },
      currentDate: day
    }))
  };
  
  render() {
    const { 
      email,
      firstname,
      lastname,
      datefield, 
      allFieldsValid 
    } = this.state;

    const isMatch = email.typeMismatch && email.formatErrorTxt;
    const isRequired = !email.valid && email.requiredTxt;

    if (allFieldsValid) {
      return (
        <ValidationMessage 
          text={this.props.message}
          status={this.props.status}
        />
      );
    } else {
      return (
        <form
          onSubmit={this.handleSubmit}
          noValidate
          className={this.props.className}
        >
          <TextInput 
            type="text"
            placeholder="First Name"
            name="firstname"
            handleChange={this.handleChange}
            error={!firstname.valid && firstname.requiredTxt}
          />
          <TextInput 
            type="text"
            placeholder="Last Name"
            name="lastname"
            handleChange={this.handleChange}
            error={!lastname.valid && lastname.requiredTxt}
          />
          <TextInput 
            type="email"
            placeholder="Email"
            name="email"
            handleChange={this.handleChange}
            error={isMatch || isRequired}
          />
          <DatePicker 
            selectedDate={this.state.currentDate}
            onDateClick={this.onDateClick}
            value={datefield.value && format(datefield.value, INPUT_DATE_FORMAT)}
            error={!datefield.valid && datefield.requiredTxt}
            name="datefield"
          /> 
          <Button>Send</Button>
        </form>
      )
    }
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { formReducer: form } = state;
  return {
    message: form && form.data.message,
    status: form && form.data.success
  }
};

export const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
};

EventForm.propTypes = {
  actions: PropTypes.object,
  className: PropTypes.string,
  status: PropTypes.string,
  message: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)
