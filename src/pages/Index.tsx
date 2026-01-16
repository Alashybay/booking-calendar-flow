import { BookingCalendar, Booking, Room, RoomCategory } from '@/components/BookingCalendar';
import { addDays, startOfMonth } from 'date-fns';

const today = new Date();
const monthStart = startOfMonth(today);

// Room categories
const categories: RoomCategory[] = [
  { id: 'standard', name: 'Стандарт' },
  { id: 'comfort', name: 'Комфорт' },
  { id: 'suite', name: 'Люкс' },
];

// Rooms list
const rooms: Room[] = [
  { id: '101', number: '101', categoryId: 'standard', floor: 1 },
  { id: '102', number: '102', categoryId: 'standard', floor: 1 },
  { id: '103', number: '103', categoryId: 'standard', floor: 1 },
  { id: '201', number: '201', categoryId: 'comfort', floor: 2 },
  { id: '202', number: '202', categoryId: 'comfort', floor: 2 },
  { id: '203', number: '203', categoryId: 'comfort', floor: 2 },
  { id: '301', number: '301', categoryId: 'suite', floor: 3 },
  { id: '302', number: '302', categoryId: 'suite', floor: 3 },
];

// Sample bookings data
const sampleBookings: Booking[] = [
  {
    id: '1',
    roomId: '101',
    guestName: 'Иванов И.И.',
    checkIn: addDays(monthStart, 2),
    checkOut: addDays(monthStart, 5),
    status: 'confirmed',
    guestsCount: 2,
    phone: '+7 (999) 123-45-67',
  },
  {
    id: '2',
    roomId: '102',
    guestName: 'Петров П.П.',
    checkIn: addDays(monthStart, 1),
    checkOut: addDays(monthStart, 8),
    status: 'staying',
    guestsCount: 1,
    phone: '+7 (999) 234-56-78',
    notes: 'VIP гость, завтрак в номер',
  },
  {
    id: '3',
    roomId: '103',
    guestName: 'Сидоров С.С.',
    checkIn: addDays(monthStart, 10),
    checkOut: addDays(monthStart, 12),
    status: 'pending',
    guestsCount: 3,
  },
  {
    id: '4',
    roomId: '201',
    guestName: 'Козлов К.К.',
    checkIn: addDays(monthStart, 5),
    checkOut: addDays(monthStart, 10),
    status: 'confirmed',
    guestsCount: 2,
    phone: '+7 (999) 345-67-89',
  },
  {
    id: '5',
    roomId: '202',
    guestName: 'Ремонт',
    checkIn: addDays(monthStart, 0),
    checkOut: addDays(monthStart, 4),
    status: 'maintenance',
  },
  {
    id: '6',
    roomId: '202',
    guestName: 'Николаев Н.Н.',
    checkIn: addDays(monthStart, 6),
    checkOut: addDays(monthStart, 9),
    status: 'checkout',
    guestsCount: 1,
  },
  {
    id: '7',
    roomId: '203',
    guestName: 'Михайлов М.М.',
    checkIn: addDays(monthStart, 12),
    checkOut: addDays(monthStart, 18),
    status: 'confirmed',
    guestsCount: 4,
    phone: '+7 (999) 456-78-90',
  },
  {
    id: '8',
    roomId: '301',
    guestName: 'Федоров Ф.Ф.',
    checkIn: addDays(monthStart, 3),
    checkOut: addDays(monthStart, 7),
    status: 'staying',
    guestsCount: 2,
    notes: 'Юбилей, заказан торт',
  },
  {
    id: '9',
    roomId: '302',
    guestName: 'Александров А.А.',
    checkIn: addDays(monthStart, 15),
    checkOut: addDays(monthStart, 20),
    status: 'confirmed',
    guestsCount: 2,
    phone: '+7 (999) 567-89-01',
  },
  {
    id: '10',
    roomId: '101',
    guestName: 'Васильев В.В.',
    checkIn: addDays(monthStart, 8),
    checkOut: addDays(monthStart, 14),
    status: 'pending',
    guestsCount: 1,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            Управление отелем
          </h1>
          <p className="text-muted-foreground mt-1">
            Шахматка бронирований номерного фонда
          </p>
        </header>
        
        <div className="h-[600px]">
          <BookingCalendar
            bookings={sampleBookings}
            rooms={rooms}
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
