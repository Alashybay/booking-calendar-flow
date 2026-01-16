export type BookingStatus = 'confirmed' | 'pending' | 'staying' | 'checkout' | 'maintenance';

export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  status: BookingStatus;
  guestsCount?: number;
  phone?: string;
  notes?: string;
}

export interface Room {
  id: string;
  number: string;
  categoryId: string;
  floor?: number;
}

export interface RoomCategory {
  id: string;
  name: string;
  color?: string;
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
