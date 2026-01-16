import { useRef, useEffect, useMemo } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { BookingBar } from './BookingBar';
import { generateCalendarData, getBookingPosition } from './utils';
import { Booking, CalendarMonth } from './types';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingCalendarProps {
  bookings: Booking[];
  startDate?: Date;
  monthsCount?: number;
  dayWidth?: number;
  rowHeight?: number;
}

export function BookingCalendar({
  bookings,
  startDate = new Date(),
  monthsCount = 3,
  dayWidth = 48,
  rowHeight = 56,
}: BookingCalendarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const months = useMemo(
    () => generateCalendarData(startDate, monthsCount),
    [startDate, monthsCount]
  );
  
  const calendarStart = months[0]?.days[0]?.date || new Date();
  const totalDays = months.reduce((sum, month) => sum + month.days.length, 0);
  const totalWidth = totalDays * dayWidth;
  
  // Get unique rows
  const rows = useMemo(() => {
    const uniqueRows = [...new Set(bookings.map(b => b.row))].sort((a, b) => a - b);
    return uniqueRows.length > 0 ? uniqueRows : [0, 1, 2, 3, 4];
  }, [bookings]);
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -dayWidth * 7, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dayWidth * 7, behavior: 'smooth' });
    }
  };
  
  const scrollToToday = () => {
    if (scrollRef.current) {
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - calendarStart.getTime()) / (1000 * 60 * 60 * 24));
      scrollRef.current.scrollTo({ left: daysDiff * dayWidth - 200, behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    scrollToToday();
  }, []);
  
  return (
    <div className="flex flex-col h-full bg-background rounded-xl border border-calendar-border shadow-calendar overflow-hidden">
      {/* Navigation Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-calendar-header border-b border-calendar-border">
        <h2 className="text-lg font-semibold text-foreground">Booking Calendar</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={scrollToToday}>
            Today
          </Button>
          <Button variant="ghost" size="icon" onClick={scrollLeft}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={scrollRight}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Scrollable Calendar */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-auto scrollbar-thin"
      >
        <div style={{ width: totalWidth, minWidth: '100%' }}>
          <CalendarHeader months={months} dayWidth={dayWidth} />
          
          {/* Calendar Grid with Bookings */}
          <div className="relative">
            {/* Background grid */}
            {rows.map((row) => (
              <div
                key={row}
                className="flex border-b border-calendar-border"
                style={{ height: rowHeight }}
              >
                {months.map((month, monthIdx) => (
                  month.days.map((day, dayIdx) => (
                    <div
                      key={`${monthIdx}-${dayIdx}`}
                      className={cn(
                        'flex-shrink-0 border-r border-calendar-border',
                        day.isWeekend && 'bg-calendar-weekend'
                      )}
                      style={{ width: dayWidth }}
                    />
                  ))
                ))}
              </div>
            ))}
            
            {/* Booking bars */}
            {bookings.map((booking) => {
              const position = getBookingPosition(
                booking.startDate,
                booking.endDate,
                calendarStart,
                dayWidth
              );
              
              return (
                <BookingBar
                  key={booking.id}
                  booking={booking}
                  style={{
                    left: position.left + 2,
                    width: position.width,
                    top: booking.row * rowHeight + 8,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
