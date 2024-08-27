import { Component } from '@angular/core';
import { Car } from '../../Interfaces/car';
import { CarDealershipServiceService } from '../../Services/car-dealership-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-cars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-cars.component.html',
  styleUrl: './popular-cars.component.css',
})
export class PopularCarsComponent {
  cars: Car[] = [];
  bgColors = ['bg-blue-100', 'bg-red-100', 'bg-gray-100'];
  bgColors2 = ['bg-blue-50', 'bg-red-50', 'bg-gray-50'];
  constructor(private carService: CarDealershipServiceService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe((cars) => {
      this.cars = this.getRandomCars(cars, 3);
    });
  }
  getRandomCars(cars: Car[], count: number): Car[] {
    return cars.sort(() => 0.5 - Math.random()).slice(0, count);
  }
}
