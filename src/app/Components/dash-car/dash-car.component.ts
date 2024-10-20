import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { Car } from '../../Interfaces/car';
import { CarDealershipServiceService } from '../../Services/car-dealership-service.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddCarModalComponent } from '../add-car-modal/add-car-modal.component';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-dash-car',
  standalone: true,
  imports: [RouterLink, CommonModule, AddCarModalComponent,NgxPaginationModule],
  templateUrl: './dash-car.component.html',
  styleUrl: './dash-car.component.css',
})
export class DashCarComponent {
  private carService = inject(CarDealershipServiceService);
  private toastr = inject(ToastrService);

  @ViewChild(AddCarModalComponent) addCarModal!: AddCarModalComponent;

  cars = signal<Car[]>([]);
  selectedBrand = signal<string>('');
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(5);

  brands = computed(() => Array.from(new Set(this.cars().map(car => car.brand))));
  filteredCars = computed(() => {
    const brand = this.selectedBrand();
    return brand ? this.cars().filter(car => car.brand === brand) : this.cars();
  });

  ngOnInit(): void {
    this.loadCars();
  }

  private loadCars(): void {
    this.carService.getCars().subscribe({
      next: (cars) => this.cars.set(cars),
      error: (err) => this.toastr.error('Error loading cars', err.message)
    });
  }

  onBrandChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedBrand.set(target.value);
    this.currentPage.set(1); // Reset to first page when filter changes
  }

  deleteCar(id: string): void {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(id).then(() => {
        this.cars.update(cars => cars.filter(car => car.id !== id));
        this.toastr.success('Car deleted successfully');
      }).catch(error => {
        this.toastr.error('Error deleting car', error.message);
      });
    }
  }

  openAddCarModal(): void {
    this.addCarModal.openModal();
  }

  addCar(newCar: Car): void {
    this.carService.addCar(newCar).then(() => {
      this.cars.update(cars => [...cars, newCar]);
      this.toastr.success('Car added successfully');
    }).catch(error => {
      this.toastr.error('Error adding car', error.message);
    });
  }

  onItemsPerPageChange(items: number): void {
    this.itemsPerPage.set(items);
    this.currentPage.set(1);
  }
}
