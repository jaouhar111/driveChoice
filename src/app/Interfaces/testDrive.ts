import { Car } from './car';

export interface TestDrive {
  id?: string;
  dateSouhaiter: Date;
  heureSouhaiter: string;
  message: string;
  civilite: string; // Changed from 'civiliter' to 'civilite' to align with common French terms
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  status: 'Pending' | 'Confirmed' | 'Rejected';
  car: Car; // Corrected syntax for union type
}
