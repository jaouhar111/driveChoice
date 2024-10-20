import { Component, signal } from '@angular/core';
import { TestDrive } from '../../Interfaces/testDrive';
import { CarDealershipServiceService } from '../../Services/car-dealership-service.service';
import { EmailServiceService } from '../../Services/email/email-service.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReservationDetailsModalComponent } from '../reservation-details-modal/reservation-details-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dash-message',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    FormsModule,
    NgxPaginationModule,
    ReservationDetailsModalComponent,
  ],
  templateUrl: './dash-message.component.html',
  styleUrl: './dash-message.component.css',
})
export class DashMessageComponent {
  testDrives: TestDrive[] = [];
  filteredTestDrives: TestDrive[] = [];
  selectedStatus: string = '';
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(5);

  constructor(
    private carDealershipService: CarDealershipServiceService,
    private emailService: EmailServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.carDealershipService.getAllTestDriveBookings().subscribe((data) => {
      this.testDrives = data;
      this.filterTestDrives();
    });
  }

  filterTestDrives(): void {
    if (this.selectedStatus) {
      this.filteredTestDrives = this.testDrives.filter(
        (testDrive) => testDrive.status === this.selectedStatus
      );
    } else {
      this.filteredTestDrives = this.testDrives; // Show all if no status is selected
    }
  }

  // Method to handle Confirm action
  async confirmTestDrive(
    id: string,
    clientEmail: string,
    clientName: string,
    carModel: string,
    carBrand: string,
    date: Date,
    time: string
  ) {
    try {
      // Check the current status of the test drive
      const currentStatus = await this.carDealershipService.getTestDriveStatus(
        id
      );

      // Proceed only if the current status is 'Pending'
      if (currentStatus === 'Pending') {
        // Update the status to 'Confirmed'
        await this.carDealershipService.updateTestDriveStatus(id, 'Confirmed');

        // After confirming the test drive, send the confirmation email
        const response = await this.emailService.sendTestDriveConfirmation(
          clientEmail,
          clientName,
          carModel,
          carBrand,
          date.toString(),
          time
        );
        this.toastr.success(`Email sent successfully!`, 'success', {
          timeOut: 500,
        });
      } else {
        this.toastr.info('Test drive is not in a pending state.');
      }
    } catch (error) {
      this.toastr.error(`Error handling test drive confirmation: ${error}`);
    }
  }
  // Method to handle Reject action
  async rejectTestDrive(
    id: string,
    clientEmail: string,
    clientName: string,
    carModel: string,
    date: Date,
    time: string
  ) {
    try {
      // Check the current status of the test drive
      const currentStatus = await this.carDealershipService.getTestDriveStatus(
        id
      );

      // Proceed only if the current status is 'Pending'
      if (currentStatus === 'Pending') {
        // Update the status to 'Rejected'
        await this.carDealershipService.updateTestDriveStatus(id, 'Rejected');

        // After rejecting the test drive, send the rejection email
        const response = await this.emailService.sendTestDriveRejection(
          clientEmail,
          clientName,
          carModel,
          date.toString(),
          time
        );
        this.toastr.success(`Rejection email sent successfully!`, 'success', {
          timeOut: 500,
        });
      } else {
        this.toastr.info('Test drive is not in a pending state.');
      }
    } catch (error) {
      this.toastr.error(`Error handling test drive confirmation: ${error}`);
    }
  }
}
