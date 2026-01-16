import { Booking } from './types';
import { cn } from '@/lib/utils';

interface BookingBarProps {
  booking: Booking;
  style: React.CSSProperties;
}

const colorClasses = {
  blue: 'bg-booking-blue border-booking-blue-border text-booking-blue-text',
  green: 'bg-booking-green border-booking-green-border text-booking-green-text',
  orange: 'bg-booking-orange border-booking-orange-border text-booking-orange-text',
  purple: 'bg-booking-purple border-booking-purple-border text-booking-purple-text',
  pink: 'bg-booking-pink border-booking-pink-border text-booking-pink-text',
};

export function BookingBar({ booking, style }: BookingBarProps) {
  const color = booking.color || 'blue';
  
  return (
    <div
      className={cn(
        'absolute h-9 rounded-lg border-2 px-3 py-1.5 text-sm font-medium',
        'shadow-sm cursor-pointer transition-all duration-200',
        'hover:shadow-md hover:scale-[1.02] hover:z-10',
        'truncate flex items-center',
        colorClasses[color]
      )}
      style={style}
      title={booking.title}
    >
      {booking.title}
    </div>
  );
}
