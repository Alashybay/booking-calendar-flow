import { BookingCalendar, Booking, Room, RoomCategory } from '@/components/BookingCalendar';
import { addDays, startOfMonth } from 'date-fns';

const today = new Date();
const monthStart = startOfMonth(today);

// Single apartment category
const categories: RoomCategory[] = [
  { id: 'apartment', name: 'Квартира' },
];

// Single apartment
const apartments: Room[] = [
  { id: 'apt-1', number: 'ул. Солнечная 5, кв. 12', categoryId: 'apartment', floor: 1 },
];

// Sample bookings for the apartment
const sampleBookings: Booking[] = [
  {
    id: '1',
    roomId: 'apt-1',
    guestName: 'Иванов И.И.',
    checkIn: addDays(monthStart, 2),
    checkOut: addDays(monthStart, 5),
    status: 'confirmed',
    guestsCount: 2,
    phone: '+7 (999) 123-45-67',
  },
  {
    id: '2',
    roomId: 'apt-1',
    guestName: 'Петров П.П.',
    checkIn: addDays(monthStart, 7),
    checkOut: addDays(monthStart, 12),
    status: 'staying',
    guestsCount: 3,
    phone: '+7 (999) 234-56-78',
    notes: 'Поздний заезд после 20:00',
  },
  {
    id: '3',
    roomId: 'apt-1',
    guestName: 'Уборка',
    checkIn: addDays(monthStart, 12),
    checkOut: addDays(monthStart, 13),
    status: 'maintenance',
  },
  {
    id: '4',
    roomId: 'apt-1',
    guestName: 'Сидоров С.С.',
    checkIn: addDays(monthStart, 15),
    checkOut: addDays(monthStart, 20),
    status: 'pending',
    guestsCount: 2,
  },
  {
    id: '5',
    roomId: 'apt-1',
    guestName: 'Козлов К.К.',
    checkIn: addDays(monthStart, 22),
    checkOut: addDays(monthStart, 28),
    status: 'confirmed',
    guestsCount: 1,
    phone: '+7 (999) 345-67-89',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            Аренда квартиры
          </h1>
          <p className="text-muted-foreground mt-1">
            Календарь бронирований
          </p>
        </header>
        
        <div className="h-[300px]">
          <BookingCalendar
            bookings={sampleBookings}
            rooms={apartments}
            categories={categories}
            startDate={monthStart}
            monthsCount={2}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
