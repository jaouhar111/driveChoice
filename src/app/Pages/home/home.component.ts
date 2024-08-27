import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { HeroComponent } from '../../Components/hero/hero.component';
import { CarListComponent } from '../../Components/car-list/car-list.component';
import { Car } from '../../Interfaces/car';
import { CarDealershipServiceService } from '../../Services/car-dealership-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    CarListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarDealershipServiceService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe((cars) => {
      this.cars = this.getRandomCars(cars, 8);
    });
  }

  getRandomCars(cars: Car[], count: number): Car[] {
    return cars.sort(() => 0.5 - Math.random()).slice(0, count);
  }
}
