import { Car } from './car';

export interface Paiement {
  id?: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  adresse: string;
  ville: string;
  carte: string;
  expiration: string;
  cvc: string;
  montant: number;
  terms?: boolean;
  car: Car;
}
