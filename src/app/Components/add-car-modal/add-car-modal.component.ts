import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Car } from '../../Interfaces/car';

@Component({
  selector: 'app-add-car-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-car-modal.component.html',
  styleUrl: './add-car-modal.component.css',
})
export class AddCarModalComponent {
  @Output() carAdded = new EventEmitter<Car>();
  isOpen = false;
  brands: string[] = [
    'Aston Martin',
    'BMW',
    'Alfa Romeo',
    'Chrysler',
    'Dodge',
    'Fiat',
    'Jeep',
    'Ferrari',
    'Ford',
    'Honda',
    'Hyundai',
    'Jaguar',
    'Land Rover',
    'Range Rover',
    'Kia',
    'Maserati',
    'Mazda',
    'Mercedes-Benz',
    'Mitsubishi',
    'Infiniti',
    'Nissan',
    'Porsche',
    'Rolls-Royce',
    'Toyota',
    'Audi',
    'Bentley',
    'Bugatti',
    'Lamborghini',
    'Volkswagen',
    'Volvo',
  ];

  newCar: Car = {
    brand: '',
    model: '',
    image_url: '',
    year: new Date().getFullYear(),
    price: '',
    other_details: {
      fuel_type: '',
      transmission: '',
      city_mpg: 0,
      combination_mpg: '',
      cylinders: '',
      displacement: '',
      drive: '',
      highway_mpg: '',
    },
    color: '',
  };

  generateImageUrl(make: string, model: string): string {
    if (!make || !model) return '';

    const baseUrl = 'https://cdn.imagin.studio/getimage';
    const customerKey = 'hrjavascript-mastery';

    const queryParams = new URLSearchParams({
      customer: customerKey,
      make: make.toLowerCase(),
      modelFamily: model.toLowerCase().replace(/\s+/g, '-'),
      zoomType: 'relative',
    });

    return `${baseUrl}?${queryParams.toString()}`;
  }

  updateCarImageUrl(): void {
    this.newCar.image_url = this.generateImageUrl(
      this.newCar.brand,
      this.newCar.model
    );
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  addCar() {
    this.updateCarImageUrl(); // Ensure the image URL is updated before emitting
    this.carAdded.emit(this.newCar);
    console.log(this.newCar);
    this.closeModal();
  }
}
