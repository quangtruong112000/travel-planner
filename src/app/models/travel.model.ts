export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  duration?: string;
  icon: string;
  category: 'flight' | 'hotel' | 'food' | 'sightseeing' | 'transport';
}

export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  activities: Activity[];
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  category: string;
  rating: number;
}

export interface BudgetItem {
  category: string;
  amount: number;
  icon: string;
}

export interface PackingItem {
  id: string;
  label: string;
  completed: boolean;
  category: string;
}

export interface TripOverview {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  durationNights: number;
  hotels: string;
  transportation: string;
  estimatedBudget: number;
  currency: string;
  heroImage: string;
}

export interface TripData {
  overview: TripOverview;
  itinerary: ItineraryDay[];
  destinations: Destination[];
  budget: BudgetItem[];
  tickets: TicketItem[];
}

export interface TicketItem {
  id: string;
  type: 'bus' | 'ferry' | 'flight'; // Loại phương tiện
  provider: string; // Hãng xe/tàu (VD: Phương Trang, Superdong)
  title: string; // Tên vé (VD: Vé xe chiều đi, Vé tàu về)
  route: string; // Tuyến đường
  departureTime: string; // Thời gian khởi hành
  seatNumber?: string; // Số ghế/số giường (nếu có)
  passengerName?: string; // Tên hành khách (nếu có)
  bookingCode: string; // Mã đặt chỗ
  qrUrl: string;
}
