import { CalendarDay, CalendarMonth } from './types';
import { format, eachDayOfInterval, isToday, isWeekend, startOfMonth, endOfMonth, addMonths } from 'date-fns';

export function generateCalendarData(startDate: Date, monthsCount: number): CalendarMonth[] {
  const months: CalendarMonth[] = [];
  
  for (let i = 0; i < monthsCount; i++) {
    const monthStart = startOfMonth(addMonths(startDate, i));
    const monthEnd = endOfMonth(monthStart);
    
    const days: CalendarDay[] = eachDayOfInterval({ start: monthStart, end: monthEnd }).map(date => ({
      date,
      dayOfMonth: date.getDate(),
      dayOfWeek: format(date, 'EEE'),
      isToday: isToday(date),
      isWeekend: isWeekend(date),
    }));
    
    months.push({
      name: format(monthStart, 'MMMM'),
      year: monthStart.getFullYear(),
      days,
    });
  }
  
  return months;
}

export function getBookingPosition(
  bookingStart: Date,
  bookingEnd: Date,
  calendarStart: Date,
  dayWidth: number
): { left: number; width: number } {
  const startDiff = Math.floor((bookingStart.getTime() - calendarStart.getTime()) / (1000 * 60 * 60 * 24));
  const duration = Math.floor((bookingEnd.getTime() - bookingStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  return {
    left: startDiff * dayWidth,
    width: duration * dayWidth - 4,
  };
}
