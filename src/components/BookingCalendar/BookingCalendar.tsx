import { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { CalendarGrid } from './CalendarGrid';
import { BookingDetailsModal } from './BookingDetailsModal';
import { generateCalendarData, getRoomsByCategory } from './utils';
import { Booking, Room, RoomCategory } from './types';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, addMonths, subMonths, startOfMonth } from 'date-fns';
import { ru } from 'date-fns/locale';

interface BookingCalendarProps {
  bookings: Booking[];
  rooms: Room[];
  categories: RoomCategory[];
  startDate?: Date;
  monthsCount?: number;
  dayWidth?: number;
  rowHeight?: number;
}

const HEADER_HEIGHT = 82; // Height of month + day headers
const SIDEBAR_WIDTH = 160;

export function BookingCalendar({
  bookings,
  rooms,
  categories,
  startDate,
  monthsCount = 2,
  dayWidth = 40,
  rowHeight = 44,
}: BookingCalendarProps) {
  const [currentStartDate, setCurrentStartDate] = useState(() => startDate || startOfMonth(new Date()));
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const gridScrollRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const months = useMemo(
    () => generateCalendarData(currentStartDate, monthsCount),
    [currentStartDate, monthsCount]
  );
  
  const roomsByCategory = useMemo(
    () => getRoomsByCategory(rooms, categories),
    [rooms, categories]
  );

  const calendarStart = months[0]?.days[0]?.date || new Date();
  
  // Sync vertical scroll between sidebar and grid
  const handleGridScroll = useCallback(() => {
    if (gridScrollRef.current && sidebarRef.current) {
      sidebarRef.current.scrollTop = gridScrollRef.current.scrollTop;
    }
  }, []);

  const handleSidebarScroll = useCallback(() => {
    if (gridScrollRef.current && sidebarRef.current) {
      gridScrollRef.current.scrollTop = sidebarRef.current.scrollTop;
    }
  }, []);
  
  const scrollToToday = useCallback(() => {
    if (gridScrollRef.current) {
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - calendarStart.getTime()) / (1000 * 60 * 60 * 24));
      const scrollPosition = Math.max(0, daysDiff * dayWidth - 200);
      gridScrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, [calendarStart, dayWidth]);
  
  const goToPrevMonth = () => {
    setCurrentStartDate(prev => subMonths(prev, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentStartDate(prev => addMonths(prev, 1));
  };

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };
  
  useEffect(() => {
    scrollToToday();
  }, [scrollToToday]);

  return (
    <div className="flex flex-col h-full bg-background rounded-xl border border-calendar-border shadow-calendar overflow-hidden">
      {/* Month Navigation - Inline with calendar header */}
      <div className="flex items-center gap-4 px-4 py-3 bg-calendar-header border-b border-calendar-border">
        {/* Month selector with navigation */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-foreground" 
            onClick={goToPrevMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2 min-w-[160px] justify-center">
            <CalendarDays className="w-5 h-5 text-primary" />
            <span className="text-base font-semibold text-foreground capitalize">
              {format(currentStartDate, 'LLLL yyyy', { locale: ru })}
            </span>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-foreground" 
            onClick={goToNextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Today button */}
        <Button variant="outline" size="sm" onClick={scrollToToday} className="ml-2">
          Сегодня
        </Button>
      </div>
      
      {/* Calendar Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <div 
          ref={sidebarRef}
          className="flex-shrink-0 overflow-hidden"
          style={{ width: SIDEBAR_WIDTH }}
          onScroll={handleSidebarScroll}
        >
          <div className="h-full overflow-y-auto scrollbar-none">
            <RoomsSidebarContent
              categories={categories}
              roomsByCategory={roomsByCategory}
              rowHeight={rowHeight}
              headerHeight={HEADER_HEIGHT}
              collapsedCategories={collapsedCategories}
              onToggleCategory={toggleCategory}
            />
          </div>
        </div>
        
        {/* Scrollable Grid */}
        <div
          ref={gridScrollRef}
          className="flex-1 overflow-auto scrollbar-thin"
          onScroll={handleGridScroll}
        >
          <CalendarGrid
            months={months}
            categories={categories}
            roomsByCategory={roomsByCategory}
            bookings={bookings}
            dayWidth={dayWidth}
            rowHeight={rowHeight}
            onBookingClick={setSelectedBooking}
            collapsedCategories={collapsedCategories}
          />
        </div>
      </div>
      
      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}

// Internal component for sidebar content that syncs with grid
interface RoomsSidebarContentProps {
  categories: RoomCategory[];
  roomsByCategory: Map<string, Room[]>;
  rowHeight: number;
  headerHeight: number;
  collapsedCategories: Set<string>;
  onToggleCategory: (id: string) => void;
}

function RoomsSidebarContent({
  categories,
  roomsByCategory,
  rowHeight,
  headerHeight,
  collapsedCategories,
  onToggleCategory,
}: RoomsSidebarContentProps) {
  return (
    <div className="flex flex-col bg-background border-r border-calendar-border">
      {/* Placeholder for header alignment */}
      <div 
        className="sticky top-0 z-10 bg-calendar-header border-b border-calendar-border flex items-end justify-center pb-2"
        style={{ height: headerHeight }}
      >
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Номера
        </span>
      </div>
      
      {/* Room list */}
      {categories.map((category) => {
        const rooms = roomsByCategory.get(category.id) || [];
        const isCollapsed = collapsedCategories.has(category.id);
        
        return (
          <div key={category.id}>
            {/* Category header */}
            <button
              onClick={() => onToggleCategory(category.id)}
              className="w-full flex items-center gap-2 px-3 text-sm font-semibold bg-muted/50 hover:bg-muted transition-colors border-b border-calendar-border text-left"
              style={{ height: 36 }}
            >
              <span className={`transition-transform ${isCollapsed ? '' : 'rotate-90'}`}>▸</span>
              <span className="truncate">{category.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {rooms.length}
              </span>
            </button>
            
            {/* Rooms in category */}
            {!isCollapsed && rooms.map((room) => (
              <div
                key={room.id}
                className="flex items-center px-4 border-b border-calendar-border hover:bg-muted/30 transition-colors"
                style={{ height: rowHeight }}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{room.number}</span>
                  {room.floor && (
                    <span className="text-[10px] text-muted-foreground">
                      {room.floor} этаж
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
