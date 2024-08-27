import { Component, Input } from '@angular/core';
import { CarListComponent } from '../../Components/car-list/car-list.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { CarDealershipServiceService } from '../../Services/car-dealership-service.service';
import { Car } from '../../Interfaces/car';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-collection',
  standalone: true,
  imports: [CarListComponent, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './car-collection.component.html',
  styleUrl: './car-collection.component.css',
})
export class CarCollectionComponent {
  cars: Car[] = [];
  filteredCars: Car[] = [];
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
    'HONDA',
    'HYUNDAI',
    'Jaguar',
    'Land Rover',
    'Range Rover',
    'KIA',
    'Maserati',
    'MAZDA',
    'Mercedes_Benz',
    'MITSUBISHI',
    'INFINITI',
    'NISSAN',
    'Porsche',
    'Rolls Royce',
    'TOYOTA',
    'Audi',
    'Bentley',
    'BUGATTI',
    'Lamborghini',
    'Volkswagen',
    'Volvo',
  ]; // Replace with actual brand list
  colors: string[] = ['white', 'beige', 'blue', 'brown', 'green', 'purple'];
  selectedBrands: Set<string> = new Set();
  selectedColors: Set<string> = new Set();

  constructor(
    private carService: CarDealershipServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Fetch cars from the service
    this.carService.getCars().subscribe((data: Car[]) => {
      this.cars = data;

      // Get brand from the route
      this.route.paramMap.subscribe((params) => {
        const brandFromPath = params.get('brand');
        if (brandFromPath) {
          this.selectedBrands.add(brandFromPath);
        }
        this.applyFilters();
      });
    });
  }

  onBrandChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.selectedBrands.add(input.value);
    } else {
      this.selectedBrands.delete(input.value);
    }
    this.applyFilters();
  }

  onColorChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.selectedColors.add(input.value);
    } else {
      this.selectedColors.delete(input.value);
    }
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredCars = this.cars.filter((car) => {
      const matchesBrand =
        this.selectedBrands.size === 0 || this.selectedBrands.has(car.brand);
      const matchesColor =
        this.selectedColors.size === 0 || this.selectedColors.has(car.color!);
      return matchesBrand && matchesColor;
    });
  }
}
