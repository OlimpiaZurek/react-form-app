import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import TextInput from '../TextInput/TextInput';
import Calendar from '../Calendar/Calendar';
import { 
  DATE_PICKER_PLACEHOLDER
} from '../../common/consts/calendar';

class DatePicker extends Component {

  constructor(props) {
    super(props);
      this.state = {
        isCalendarOpened: false,
    };
    this.delayedFunc = debounce(this.toggleCalendar, 300)
  }
 
  toggleCalendar = () => {
    this.setState({
      isCalendarOpened: !this.state.isCalendarOpened
    });
  }
  
  handleChange = (e) => {
    e.preventDefault();
  }

  onClick = (day) => {
    this.delayedFunc()
    this.props.onDateClick(day)
  }

  render() {
    const { isCalendarOpened } = this.state;
    const { value } = this.props;
    return (
      <Fragment>
        <TextInput
          type="text"
          value={value}
          placeholder={DATE_PICKER_PLACEHOLDER}
          handleChange={this.handleChange}
          onClick={this.toggleCalendar}
          {...this.props}
        />
        {isCalendarOpened && (
          <Calendar 
            {...this.props}
            onDateClick={this.onClick}
          />
        )}
      </Fragment>
     
    );
  }
}

DatePicker.propTypes = {
 value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
 ]),
 onDateClick: PropTypes.func,
};

export default DatePicker;
