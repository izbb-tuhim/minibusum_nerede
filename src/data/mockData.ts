import { Bus, MapPin, Clock, Info, Ticket, AlertTriangle } from 'lucide-react';

export interface Stop {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface Schedule {
  departureTime: string;
  frequency: string; // e.g., "Every 10 mins"
}

export interface Tariff {
  distance: string;
  price: number;
}

export interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
}

export interface MinibusLine {
  id: string;
  name: string;
  routeCoordinates: [number, number][]; // [lat, lng]
  stops: Stop[];
  schedules: { weekday: Schedule[]; weekend: Schedule[] };
  tariffs: Tariff[];
}

// Mock Route: A simple path roughly simulating a route in Izmir (e.g., Alsancak area)
const ROUTE_ALSANCAK_BORNOVA: [number, number][] = [
  [38.4381, 27.1417], // Start
  [38.4390, 27.1430],
  [38.4400, 27.1450],
  [38.4420, 27.1480],
  [38.4450, 27.1520],
  [38.4480, 27.1580],
  [38.4500, 27.1650],
  [38.4520, 27.1700],
  [38.4550, 27.1800], // End-ish
];

const ROUTE_KONAK_BUCA: [number, number][] = [
  [38.4189, 27.1287], // Konak
  [38.4150, 27.1300],
  [38.4100, 27.1350],
  [38.4000, 27.1400],
  [38.3900, 27.1500],
  [38.3850, 27.1600], // Buca
];

export const MOCK_LINES: MinibusLine[] = [
  {
    id: 'M-101',
    name: 'Alsancak - Bornova',
    routeCoordinates: ROUTE_ALSANCAK_BORNOVA,
    stops: [
      { id: 1, name: 'Alsancak Gar', lat: 38.4381, lng: 27.1417 },
      { id: 2, name: 'Lozan Meydanı', lat: 38.4420, lng: 27.1480 },
      { id: 3, name: 'Bornova Metro', lat: 38.4550, lng: 27.1800 },
    ],
    schedules: {
      weekday: [{ departureTime: '06:00', frequency: '10 dk' }, { departureTime: '23:00', frequency: '20 dk' }],
      weekend: [{ departureTime: '07:00', frequency: '15 dk' }, { departureTime: '24:00', frequency: '30 dk' }],
    },
    tariffs: [
      { distance: '0-5 km', price: 15.00 },
      { distance: '5-10 km', price: 18.00 },
      { distance: '10+ km', price: 22.00 },
    ],
  },
  {
    id: 'M-202',
    name: 'Konak - Buca',
    routeCoordinates: ROUTE_KONAK_BUCA,
    stops: [
      { id: 1, name: 'Konak İskele', lat: 38.4189, lng: 27.1287 },
      { id: 2, name: 'Şirinyer', lat: 38.4000, lng: 27.1400 },
      { id: 3, name: 'Buca Heykel', lat: 38.3850, lng: 27.1600 },
    ],
    schedules: {
      weekday: [{ departureTime: '06:30', frequency: '8 dk' }, { departureTime: '23:30', frequency: '15 dk' }],
      weekend: [{ departureTime: '07:30', frequency: '12 dk' }, { departureTime: '24:00', frequency: '20 dk' }],
    },
    tariffs: [
      { distance: '0-5 km', price: 16.00 },
      { distance: '5-10 km', price: 20.00 },
      { distance: '10+ km', price: 25.00 },
    ],
  },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: 'Güzergah Değişikliği',
    date: '01.03.2026',
    content: 'Alsancak - Bornova hattında yol çalışması nedeniyle güzergah geçici olarak değiştirilmiştir.',
  },
  {
    id: 2,
    title: 'Yeni Ücret Tarifesi',
    date: '15.02.2026',
    content: '1 Mart itibariyle geçerli olacak yeni ücret tarifesi yayınlanmıştır.',
  },
];

export const NAV_ITEMS = [
  { id: 'route', label: 'Güzergah', icon: MapPin },
  { id: 'schedule', label: 'Seferler', icon: Clock },
  { id: 'stops', label: 'Duraklar', icon: Bus },
  { id: 'announcements', label: 'Duyurular', icon: Info },
  { id: 'tariff', label: 'Ücretler', icon: Ticket },
];
