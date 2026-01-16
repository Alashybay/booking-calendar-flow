import { CalendarMonth } from './types';
import { cn } from '@/lib/utils';

interface CalendarHeaderProps {
  months: CalendarMonth[];
  dayWidth: number;
}

export function CalendarHeader({ months, dayWidth }: CalendarHeaderProps) {
  return (
    <div className="sticky top-0 z-20 bg-background">
      {/* Month row */}
      <div className="flex border-b border-calendar-border">
        {months.map((month, idx) => (
          <div
            key={`${month.name}-${month.year}-${idx}`}
            className="flex-shrink-0 px-4 py-2 font-semibold text-foreground bg-calendar-header capitalize"
            style={{ width: month.days.length * dayWidth }}
          >
            {month.name} {month.year}
          </div>
        ))}
      </div>
      
      {/* Days row */}
      <div className="flex border-b border-calendar-border">
        {months.map((month, monthIdx) => (
          month.days.map((day, dayIdx) => (
            <div
              key={`${monthIdx}-${dayIdx}`}
              className={cn(
                'flex-shrink-0 flex flex-col items-center justify-center py-1.5',
                'border-r border-calendar-border text-xs',
                day.isToday && 'bg-primary text-primary-foreground',
                !day.isToday && day.isWeekend && 'bg-calendar-weekend text-muted-foreground'
              )}
              style={{ width: dayWidth }}
            >
              <span className={cn(
                'text-[10px] uppercase',
                day.isToday ? 'text-primary-foreground/80' : 'text-muted-foreground'
              )}>
                {day.dayOfWeek}
              </span>
              <span className="font-semibold">
                {day.dayOfMonth}
              </span>
            </div>
          ))
        ))}
      </div>
    </div>
  );
}
