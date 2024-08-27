import { Component } from '@angular/core';
import { PopularCarsComponent } from '../popular-cars/popular-cars.component';
import { CarListComponent } from '../car-list/car-list.component';
import { Car } from '../../Interfaces/car';
import { CarDealershipServiceService } from '../../Services/car-dealership-service.service';

@Component({
  selector: 'app-bord',
  standalone: true,
  imports: [PopularCarsComponent, CarListComponent],
  templateUrl: './bord.component.html',
  styleUrl: './bord.component.css',
})
export class BordComponent {
  cars: Car[] = [];

  constructor(private carService: CarDealershipServiceService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe((cars) => {
      this.cars = this.getRandomCars(cars, 4);
    });
  }

  getRandomCars(cars: Car[], count: number): Car[] {
    return cars.sort(() => 0.5 - Math.random()).slice(0, count);
  }
}
