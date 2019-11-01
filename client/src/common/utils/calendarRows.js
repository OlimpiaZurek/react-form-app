import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
} from 'date-fns';

export const getCalendarRows = (currentMonth, weekDays) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  while (day <= endDate) {
    for (let i = 0; i < weekDays.length; i++) {
      days.push(day)
      day = addDays(day, 1);
    }
    rows.push(days)
    days = [];
  }
  return rows.map(row => row);
};
