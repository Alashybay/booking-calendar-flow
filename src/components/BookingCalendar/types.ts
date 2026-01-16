export interface Booking {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'pink';
  row: number;
}

export interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  dayOfWeek: string;
  isToday: boolean;
  isWeekend: boolean;
}

export interface CalendarMonth {
  name: string;
  year: number;
  days: CalendarDay[];
}
