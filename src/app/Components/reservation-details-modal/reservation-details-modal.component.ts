import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paiement } from '../../Interfaces/Paiement';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-details-modal.component.html',
  styleUrl: './reservation-details-modal.component.css',
})
export class ReservationDetailsModalComponent {
  @Input() reservation: Paiement | null = null;
  @Input() isVisible: boolean = false;
  @Output() closeEvent = new EventEmitter<void>();

  close(): void {
    this.isVisible = false;
    this.closeEvent.emit();
  }
}
