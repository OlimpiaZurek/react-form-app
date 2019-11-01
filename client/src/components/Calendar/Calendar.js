import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  format,
  startOfMonth,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import {
  MONTH_FORMAT,
  DAY_FORMAT,
  WEEK_DAYS
} from '../../common/consts/calendar'
import { getCalendarRows } from '../../common/utils/calendarRows';
import styles from './Calendar.module.scss';

const DAYS = Array.from(Object.values(WEEK_DAYS));

class Calendar extends Component {
  state = {
    currentMonth: new Date(),
  };

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };

  get header() {
    return (
      <div className={styles.CalendarHeader}>
        <div 
          className={`${styles.Arrow} ${styles.ArrowLeft}`}
          onClick={this.prevMonth} 
        />
        <div className={`${styles.Col} ${styles.ColCenter}`}>
          <span className={styles.CalendarMonth}>
            {format(this.state.currentMonth, MONTH_FORMAT)}
          </span>
        </div>
        <div 
          className={`${styles.Arrow} ${styles.ArrowRight}`}
          onClick={this.nextMonth}
        />
      </div>
    );
  }

  get days() {
    const days = DAYS.map(day => 
      <div 
        className={`${styles.Col} ${styles.ColCenter}`}
        key={day}
      >
        {day}
      </div>
    );
    return <div className={styles.Row}>{days}</div>;
  }

  getDays = (day) => {
    const { selectedDate } = this.props;
    const { currentMonth } = this.state;
    const monthStart = startOfMonth(currentMonth);
    return (
      <div
        className={`${styles.Col} ${
          !isSameMonth(day, monthStart)
            ? styles.Disabled
            : isSameDay(day, selectedDate) ? styles.Selected : ""
        }`}
        key={day}
        onClick={() => this.props.onDateClick(day)}
      >
        <span className={styles.Num}>{format(day, DAY_FORMAT)}</span>
      </div>
    );
  }

  get cells() {
    const { currentMonth } = this.state;
    return getCalendarRows(currentMonth, DAYS).map(cell => 
      <div className={styles.Row} key={cell}>
        {cell.map(day => this.getDays(day))}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.Calendar}>
        {this.header}
        {this.days}
        {this.cells}
      </div>
    );
  }
}

Calendar.propTypes = {
  onDateClick: PropTypes.func,
  selectedDate: PropTypes.instanceOf(Date),
};

Calendar.defaultProps = {
  selectedDate: new Date()
}

export default Calendar;
