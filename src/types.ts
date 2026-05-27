/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OfficeSpace {
  id: string;
  number: string;
  floor: number;
  area: number; // in square meters
  pricePerSqmYear: number; // price per sqm per year in rubles
  status: 'free' | 'booked' | 'occupied';
  type: 'Cabinet' | 'OpenSpace' | 'MeetingRoom' | 'EntireFloor';
  windows: 'courtyard' | 'street' | 'panoramic';
  description: string;
  features: string[];
}

export interface FloorData {
  floor: number;
  totalArea: number;
  freeArea: number;
  offices: OfficeSpace[];
}

export interface BookingRequest {
  id: string;
  officeId?: string;
  officeNumber?: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  areaRange: string;
  rentDate: string;
  comments?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'terms' | 'infrastructure' | 'technical';
}

export interface NeighborhoodPlace {
  name: string;
  type: 'metro' | 'food' | 'parking' | 'landmark' | 'shop';
  distance: string; // e.g., "7 минут пешком"
  description: string;
}
