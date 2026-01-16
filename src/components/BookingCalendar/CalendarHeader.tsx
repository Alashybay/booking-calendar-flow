import { CalendarMonth } from './types';
import { cn } from '@/lib/utils';

interface CalendarHeaderProps {
  months: CalendarMonth[];
  dayWidth: number;
}

export function CalendarHeader({ months, dayWidth }: CalendarHeaderProps) {
  return (
    <div className="sticky top-0 z-20 bg-background border-b border-calendar-border">
      {/* Month row */}
      <div className="flex border-b border-calendar-border">
        {months.map((month, idx) => (
          <div
            key={`${month.name}-${month.year}-${idx}`}
            className="flex-shrink-0 px-4 py-3 font-semibold text-foreground bg-calendar-header"
            style={{ width: month.days.length * dayWidth }}
          >
            {month.name} {month.year}
          </div>
        ))}
      </div>
      
      {/* Days row */}
      <div className="flex">
        {months.map((month, monthIdx) => (
          month.days.map((day, dayIdx) => (
            <div
              key={`${monthIdx}-${dayIdx}`}
              className={cn(
                'flex-shrink-0 flex flex-col items-center justify-center py-2',
                'border-r border-calendar-border text-sm',
                day.isToday && 'bg-primary/10',
                day.isWeekend && 'bg-calendar-weekend'
              )}
              style={{ width: dayWidth }}
            >
              <span className={cn(
                'text-xs text-muted-foreground',
                day.isToday && 'text-primary font-medium'
              )}>
                {day.dayOfWeek}
              </span>
              <span className={cn(
                'font-medium',
                day.isToday && 'text-primary',
                day.isWeekend && 'text-muted-foreground'
              )}>
                {day.dayOfMonth}
              </span>
            </div>
          ))
        ))}
      </div>
    </div>
  );
}
