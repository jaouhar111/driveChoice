import { Component } from '@angular/core';
import { TestDrive } from '../../Interfaces/testDrive';
import { CarDealershipServiceService } from '../../Services/car-dealership-service.service';
import { EmailServiceService } from '../../Services/email/email-service.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dash-message',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './dash-message.component.html',
  styleUrl: './dash-message.component.css',
})
export class DashMessageComponent {
  testDrives: TestDrive[] = [];
  filteredTestDrives: TestDrive[] = [];
  selectedStatus: string = '';

  constructor(
    private carDealershipService: CarDealershipServiceService,
    private emailService: EmailServiceService
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

        console.log('Email sent successfully!', response.status, response.text);
      } else {
        console.log('Test drive is not in a pending state.');
      }
    } catch (error) {
      console.error('Error handling test drive confirmation:', error);
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
        console.log(clientEmail);

        console.log(
          'Rejection email sent successfully!',
          response.status,
          response.text
        );
      } else {
        console.log('Test drive is not in a pending state.');
      }
    } catch (error) {
      console.error('Error handling test drive rejection:', error);
    }
  }
}
