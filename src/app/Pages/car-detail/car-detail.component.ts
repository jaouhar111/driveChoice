import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { CarDealershipServiceService } from '../../Services/car-dealership-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Car } from '../../Interfaces/car';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css',
})
export class CarDetailComponent {
  car: Car | null = null;
  carId: string = '';

  constructor(
    private carService: CarDealershipServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('id')!;
    this.carService.getCarById(this.carId).subscribe((car) => {
      this.car = car;
    });
  }
  
}
