import { Component, ViewChild } from '@angular/core';
import { Car } from '../../Interfaces/car';
import { CarDealershipServiceService } from '../../Services/car-dealership-service.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddCarModalComponent } from '../add-car-modal/add-car-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dash-car',
  standalone: true,
  imports: [RouterLink, CommonModule, AddCarModalComponent],
  templateUrl: './dash-car.component.html',
  styleUrl: './dash-car.component.css',
})
export class DashCarComponent {
  cars: Car[] = [];
  brands: string[] = [];
  filteredCars: Car[] = [];
  selectedBrand: string = '';
  @ViewChild(AddCarModalComponent) addCarModal!: AddCarModalComponent;

  constructor(
    private carService: CarDealershipServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars; // Store the original list of cars
      this.filteredCars = cars; // Initialize filteredCars with all cars
      this.brands = Array.from(new Set(cars.map((car) => car.brand)));
    });
  }

  onBrandChange(event: any): void {
    this.selectedBrand = event.target.value;
    this.filteredCars = this.selectedBrand
      ? this.cars.filter((car) => car.brand === this.selectedBrand) // Filter from the original cars array
      : this.cars; // If no brand is selected, show all cars
  }

  deleteCar(id: string): void {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService
        .deleteCar(id)
        .then(() => {
          // Remove the deleted car from the local list
          this.filteredCars = this.filteredCars.filter((car) => car.id !== id);
          this.toastr.error('Car deleted successfully!');
        })
        .catch((error) => {
          this.toastr.error('Error deleting car:', error);
        });
    }
  }

  openAddCarModal() {
    this.addCarModal.openModal();
  }

  addCar(newCar: any) {
    //this.cars.push(newCar);
    this.carService
      .addCar(newCar)
      .then(() => {
        this.toastr.success('Car added successfully', 'success');

        // Optionally reset the form or navigate to another page
      })
      .catch((error) => {
        this.toastr.error('Error deleting car:', error);
      });
  }
}
