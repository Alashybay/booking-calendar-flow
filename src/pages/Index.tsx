import { BookingCalendar, Booking } from '@/components/BookingCalendar';
import { addDays, startOfMonth } from 'date-fns';

const today = new Date();
const monthStart = startOfMonth(today);

// Sample bookings data
const sampleBookings: Booking[] = [
  {
    id: '1',
    title: 'Team Meeting',
    startDate: addDays(monthStart, 2),
    endDate: addDays(monthStart, 4),
    color: 'blue',
    row: 0,
  },
  {
    id: '2',
    title: 'Project Alpha',
    startDate: addDays(monthStart, 5),
    endDate: addDays(monthStart, 12),
    color: 'green',
    row: 1,
  },
  {
    id: '3',
    title: 'Client Call',
    startDate: addDays(monthStart, 8),
    endDate: addDays(monthStart, 8),
    color: 'orange',
    row: 0,
  },
  {
    id: '4',
    title: 'Workshop',
    startDate: addDays(monthStart, 15),
    endDate: addDays(monthStart, 18),
    color: 'purple',
    row: 2,
  },
  {
    id: '5',
    title: 'Sprint Review',
    startDate: addDays(monthStart, 20),
    endDate: addDays(monthStart, 21),
    color: 'pink',
    row: 0,
  },
  {
    id: '6',
    title: 'Conference',
    startDate: addDays(monthStart, 25),
    endDate: addDays(monthStart, 30),
    color: 'blue',
    row: 3,
  },
  {
    id: '7',
    title: 'Training Session',
    startDate: addDays(monthStart, 10),
    endDate: addDays(monthStart, 14),
    color: 'green',
    row: 4,
  },
  {
    id: '8',
    title: 'Design Review',
    startDate: addDays(monthStart, 35),
    endDate: addDays(monthStart, 38),
    color: 'orange',
    row: 1,
  },
  {
    id: '9',
    title: 'Product Launch',
    startDate: addDays(monthStart, 42),
    endDate: addDays(monthStart, 45),
    color: 'purple',
    row: 2,
  },
  {
    id: '10',
    title: 'Annual Review',
    startDate: addDays(monthStart, 50),
    endDate: addDays(monthStart, 55),
    color: 'pink',
    row: 0,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            Resource Scheduler
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage all bookings in one place
          </p>
        </header>
        
        <div className="h-[600px]">
          <BookingCalendar
            bookings={sampleBookings}
            startDate={monthStart}
            monthsCount={3}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
