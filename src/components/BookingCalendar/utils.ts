import { CalendarDay, CalendarMonth, Booking, Room, RoomCategory } from './types';
import { format, eachDayOfInterval, isToday, isWeekend, startOfMonth, endOfMonth, addMonths, differenceInDays, startOfDay } from 'date-fns';
import { ru } from 'date-fns/locale';

export function generateCalendarData(startDate: Date, monthsCount: number): CalendarMonth[] {
  const months: CalendarMonth[] = [];
  
  for (let i = 0; i < monthsCount; i++) {
    const monthStart = startOfMonth(addMonths(startDate, i));
    const monthEnd = endOfMonth(monthStart);
    
    const days: CalendarDay[] = eachDayOfInterval({ start: monthStart, end: monthEnd }).map(date => ({
      date,
      dayOfMonth: date.getDate(),
      dayOfWeek: format(date, 'EEE', { locale: ru }),
      isToday: isToday(date),
      isWeekend: isWeekend(date),
    }));
    
    months.push({
      name: format(monthStart, 'LLLL', { locale: ru }),
      year: monthStart.getFullYear(),
      days,
    });
  }
  
  return months;
}

export function getBookingPosition(
  checkIn: Date,
  checkOut: Date,
  calendarStart: Date,
  dayWidth: number
): { left: number; width: number; isVisible: boolean } {
  const startDiff = differenceInDays(startOfDay(checkIn), startOfDay(calendarStart));
  const nights = differenceInDays(startOfDay(checkOut), startOfDay(checkIn));
  
  return {
    left: startDiff * dayWidth,
    width: nights * dayWidth - 4,
    isVisible: nights > 0,
  };
}

export function getRoomsByCategory(
  rooms: Room[],
  categories: RoomCategory[]
): Map<string, Room[]> {
  const grouped = new Map<string, Room[]>();
  
  categories.forEach(cat => {
    grouped.set(cat.id, rooms.filter(r => r.categoryId === cat.id));
  });
  
  return grouped;
}

export function getBookingsForRoom(bookings: Booking[], roomId: string): Booking[] {
  return bookings.filter(b => b.roomId === roomId);
}
