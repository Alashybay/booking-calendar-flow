import { Booking, BookingStatus } from './types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { User, Phone, Calendar, MessageSquare, Moon } from 'lucide-react';
import { differenceInDays } from 'date-fns';

interface BookingDetailsModalProps {
  booking: Booking | null;
  onClose: () => void;
}

const statusLabels: Record<BookingStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  confirmed: { label: 'Подтверждено', variant: 'default' },
  pending: { label: 'Ожидает оплаты', variant: 'outline' },
  staying: { label: 'Проживает', variant: 'secondary' },
  checkout: { label: 'Выезд сегодня', variant: 'destructive' },
  maintenance: { label: 'Ремонт', variant: 'destructive' },
};

export function BookingDetailsModal({ booking, onClose }: BookingDetailsModalProps) {
  if (!booking) return null;
  
  const nights = differenceInDays(booking.checkOut, booking.checkIn);
  const status = statusLabels[booking.status];
  
  const getNightsLabel = (count: number) => {
    if (count === 1) return 'ночь';
    if (count >= 2 && count <= 4) return 'ночи';
    return 'ночей';
  };
  
  const getGuestsLabel = (count: number) => {
    if (count === 1) return 'гость';
    if (count >= 2 && count <= 4) return 'гостя';
    return 'гостей';
  };

  return (
    <Dialog open={!!booking} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Детали бронирования</span>
            <Badge variant={status.variant}>{status.label}</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-lg">{booking.guestName}</p>
              {booking.guestsCount && (
                <p className="text-sm text-muted-foreground">
                  {booking.guestsCount} {getGuestsLabel(booking.guestsCount)}
                </p>
              )}
            </div>
          </div>
          
          {booking.phone && (
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <a href={`tel:${booking.phone}`} className="text-primary hover:underline">
                {booking.phone}
              </a>
            </div>
          )}
          
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>
              {format(booking.checkIn, 'd MMM', { locale: ru })} — {format(booking.checkOut, 'd MMM yyyy', { locale: ru })}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <Moon className="w-4 h-4 text-muted-foreground" />
            <span>{nights} {getNightsLabel(nights)}</span>
          </div>
          
          {booking.notes && (
            <div className="flex items-start gap-3 text-sm">
              <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5" />
              <p className="text-muted-foreground">{booking.notes}</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>Закрыть</Button>
          <Button>Редактировать</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
