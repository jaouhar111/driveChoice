import { Component, OnInit } from '@angular/core';
import { Car } from '../../Interfaces/car';
import { CarDealershipServiceService } from '../../Services/car-dealership-service.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Paiement } from '../../Interfaces/Paiement';
import { EmailServiceService } from '../../Services/email/email-service.service';

@Component({
  selector: 'app-paiement-form',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    TitleCasePipe,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './paiement-form.component.html',
  styleUrl: './paiement-form.component.css',
})
export class PaiementFormComponent implements OnInit {
  car: Car | null = null;
  carId: string = '';
  reservationPrice: number = 0;
  paiementForm: FormGroup;

  constructor(
    private carService: CarDealershipServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private emailService: EmailServiceService
  ) {
    this.paiementForm = this.fb.group({
      nom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      adresse: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      carte: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiration: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$'),
        ],
      ], // MM/YY format
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]], // 3 or 4 digit CVC
      montant: [this.reservationPrice],
      car: [this.car],
      terms: [false, Validators.requiredTrue], // Assuming car is selected from a dropdown or another form control
    });
  }
  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('id')!;
    this.carService.getCarById(this.carId).subscribe((car) => {
      this.car = car;
      this.paiementForm.patchValue({
        car: this.car,
      });
      if (this.car && this.car.price) {
        const numericPrice = this.extractNumericPrice(this.car.price);

        this.reservationPrice = this.calculateReservationPrice(numericPrice);
      }
    });
  }
  extractNumericPrice(price: string): number {
    const numericPrice = Number(price.replace(/[^0-9.-]+/g, ''));
    return numericPrice;
  }

  calculateReservationPrice(price: number): number {
    const reservationPercentage = 0.02; // 2% of the car price
    const reservationPrice = price * reservationPercentage;
    this.paiementForm.patchValue({
      montant: reservationPrice,
    });
    return Math.round(reservationPrice);
  }

  async onSubmit() {
    if (this.paiementForm.valid) {
      const paiementData: Paiement = this.paiementForm.value;
      try {
        const reservationId = await this.carService.makeReservation(
          paiementData
        );
        console.log('Reservation successful with ID:', reservationId);

        // Send email with PDF attachment
        await this.emailService.sendReservationWithPDF(
          paiementData.email, // Replace with actual client email from form data
          paiementData.nom, // Replace with actual client name from form data
          reservationId,
          paiementData
        );

        console.log('Email with PDF sent successfully');
      } catch (error) {
        console.error('Error making reservation or sending email:', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
