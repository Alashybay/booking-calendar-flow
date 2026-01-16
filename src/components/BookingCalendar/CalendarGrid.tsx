import { useMemo } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { BookingBar } from './BookingBar';
import { Booking, Room, RoomCategory, CalendarMonth } from './types';
import { getBookingPosition, getBookingsForRoom } from './utils';
import { cn } from '@/lib/utils';

interface CalendarGridProps {
  months: CalendarMonth[];
  categories: RoomCategory[];
  roomsByCategory: Map<string, Room[]>;
  bookings: Booking[];
  dayWidth: number;
  rowHeight: number;
  onBookingClick: (booking: Booking) => void;
  collapsedCategories: Set<string>;
}

export function CalendarGrid({
  months,
  categories,
  roomsByCategory,
  bookings,
  dayWidth,
  rowHeight,
  onBookingClick,
  collapsedCategories,
}: CalendarGridProps) {
  const calendarStart = months[0]?.days[0]?.date || new Date();
  const totalDays = months.reduce((sum, month) => sum + month.days.length, 0);
  const totalWidth = totalDays * dayWidth;

  // Build flat list of visible rooms with their row indices
  const visibleRooms = useMemo(() => {
    const rooms: { room: Room; rowIndex: number }[] = [];
    let currentRow = 0;
    
    categories.forEach(category => {
      if (!collapsedCategories.has(category.id)) {
        const categoryRooms = roomsByCategory.get(category.id) || [];
        categoryRooms.forEach(room => {
          rooms.push({ room, rowIndex: currentRow });
          currentRow++;
        });
      }
    });
    
    return rooms;
  }, [categories, roomsByCategory, collapsedCategories]);

  // Pre-calculate room to row index mapping
  const roomRowMap = useMemo(() => {
    const map = new Map<string, number>();
    visibleRooms.forEach(({ room, rowIndex }) => {
      map.set(room.id, rowIndex);
    });
    return map;
  }, [visibleRooms]);

  return (
    <div style={{ width: totalWidth, minWidth: '100%' }}>
      <CalendarHeader months={months} dayWidth={dayWidth} />
      
      {/* Calendar Grid with Bookings */}
      <div className="relative">
        {/* Background grid - render rows for categories and rooms */}
        {categories.map((category) => {
          const rooms = roomsByCategory.get(category.id) || [];
          const isCollapsed = collapsedCategories.has(category.id);
          
          return (
            <div key={category.id}>
              {/* Category row - spanning full width */}
              <div
                className="flex border-b border-calendar-border bg-muted/30"
                style={{ height: 36 }}
              >
                {months.flatMap((month) =>
                  month.days.map((day, dayIdx) => (
                    <div
                      key={`cat-${category.id}-${dayIdx}`}
                      className={cn(
                        'flex-shrink-0 border-r border-calendar-border/50',
                        day.isWeekend && 'bg-calendar-weekend/50'
                      )}
                      style={{ width: dayWidth }}
                    />
                  ))
                )}
              </div>
              
              {/* Room rows */}
              {!isCollapsed && rooms.map((room) => (
                <div
                  key={room.id}
                  className="flex border-b border-calendar-border relative"
                  style={{ height: rowHeight }}
                >
                  {months.flatMap((month) =>
                    month.days.map((day, dayIdx) => (
                      <div
                        key={`room-${room.id}-${dayIdx}`}
                        className={cn(
                          'flex-shrink-0 border-r border-calendar-border',
                          day.isWeekend && 'bg-calendar-weekend',
                          day.isToday && 'bg-primary/5'
                        )}
                        style={{ width: dayWidth }}
                      />
                    ))
                  )}
                  
                  {/* Bookings for this room */}
                  {getBookingsForRoom(bookings, room.id).map((booking) => {
                    const position = getBookingPosition(
                      booking.checkIn,
                      booking.checkOut,
                      calendarStart,
                      dayWidth
                    );
                    
                    if (!position.isVisible) return null;
                    
                    return (
                      <BookingBar
                        key={booking.id}
                        booking={booking}
                        onClick={onBookingClick}
                        style={{
                          left: position.left + 2,
                          width: position.width,
                          top: 4,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
