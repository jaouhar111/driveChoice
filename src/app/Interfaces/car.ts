import { OtherDetails } from './otherDetails';

export interface Car {
  id?: string;
  image_url: string;
  brand: string;
  model: string;
  price: string;
  year: number;
  other_details: OtherDetails;
  color?: string;
}
