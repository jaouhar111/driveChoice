import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Paiement } from '../../Interfaces/Paiement';
import { CarDealershipServiceService } from '../../Services/car-dealership-service.service';
import { ReservationDetailsModalComponent } from '../reservation-details-modal/reservation-details-modal.component';

@Component({
  selector: 'app-dash-paiement',
  standalone: true,
  imports: [RouterLink, CommonModule, ReservationDetailsModalComponent],
  templateUrl: './dash-paiement.component.html',
  styleUrl: './dash-paiement.component.css',
})
export class DashPaiementComponent {
  reservations: Paiement[] = [];
  selectedReservation: Paiement | null = null;
  isModalVisible: boolean = false;

  constructor(private carService: CarDealershipServiceService) {}

  ngOnInit(): void {
    this.carService.getAllReservations().subscribe((data) => {
      this.reservations = data;
    });
  }

  openModal(reservation: Paiement): void {
    this.selectedReservation = reservation;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedReservation = null;
  }
}
