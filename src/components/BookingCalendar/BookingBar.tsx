import { Booking, BookingStatus } from './types';
import { cn } from '@/lib/utils';
import { User, Wrench } from 'lucide-react';

interface BookingBarProps {
  booking: Booking;
  style: React.CSSProperties;
  onClick?: (booking: Booking) => void;
}

const statusConfig: Record<BookingStatus, { bg: string; border: string; text: string; icon?: React.ReactNode }> = {
  confirmed: {
    bg: 'bg-booking-confirmed',
    border: 'border-booking-confirmed-border',
    text: 'text-booking-confirmed-text',
  },
  pending: {
    bg: 'bg-booking-pending',
    border: 'border-booking-pending-border',
    text: 'text-booking-pending-text',
  },
  staying: {
    bg: 'bg-booking-staying',
    border: 'border-booking-staying-border',
    text: 'text-booking-staying-text',
  },
  checkout: {
    bg: 'bg-booking-checkout',
    border: 'border-booking-checkout-border',
    text: 'text-booking-checkout-text',
  },
  maintenance: {
    bg: 'bg-booking-maintenance',
    border: 'border-booking-maintenance-border',
    text: 'text-booking-maintenance-text',
    icon: <Wrench className="w-3 h-3 mr-1 flex-shrink-0" />,
  },
};

export function BookingBar({ booking, style, onClick }: BookingBarProps) {
  const config = statusConfig[booking.status];
  
  return (
    <div
      className={cn(
        'absolute h-8 rounded-md border-l-4 px-2 py-1 text-xs font-medium',
        'shadow-sm cursor-pointer transition-all duration-200',
        'hover:shadow-lg hover:scale-[1.02] hover:z-20',
        'flex items-center gap-1 overflow-hidden',
        config.bg,
        config.border,
        config.text
      )}
      style={style}
      onClick={() => onClick?.(booking)}
      title={`${booking.guestName} | ${booking.status}`}
    >
      {config.icon || <User className="w-3 h-3 flex-shrink-0" />}
      <span className="truncate">{booking.guestName}</span>
      {booking.guestsCount && booking.guestsCount > 1 && (
        <span className="text-[10px] opacity-70 flex-shrink-0">+{booking.guestsCount - 1}</span>
      )}
    </div>
  );
}
