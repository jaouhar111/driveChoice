import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { Car } from '../../Interfaces/car';
import { CarDealershipServiceService } from '../../Services/car-dealership-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TestDrive } from '../../Interfaces/testDrive';
import { TitleCasePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-testdrive-form',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    TitleCasePipe,
    RouterLink,
    FooterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './testdrive-form.component.html',
  styleUrl: './testdrive-form.component.css',
})
export class TestdriveFormComponent {
  car: Car | null = null;
  carId: string = '';
  testDriveForm: FormGroup;

  constructor(
    private carService: CarDealershipServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.testDriveForm = this.fb.group({
      dateSouhaiter: ['', Validators.required],
      heureSouhaiter: ['', Validators.required],
      message: [''],
      civilite: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      status: ['Pending'], // Default value
      car: [this.car],
    });
  }

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('id')!;
    this.carService.getCarById(this.carId).subscribe((car) => {
      this.car = car;
      // Update the form value with the fetched car
      this.testDriveForm.patchValue({
        car: this.car,
      });
    });
  }

  onSubmit() {
    if (this.testDriveForm.valid) {
      const booking: TestDrive = this.testDriveForm.value;
      this.carService
        .bookTestDrive(booking)
        .then((docRef) => {
          this.testDriveForm.reset(); // Reset the form after successful submission
          // Show success message
          alert(
            'Test drive submitted successfully! Keep an eye on your email for confirmation.'
          );
        })
        .catch((error) => {
          alert(`Error booking test drive: ${error}`);
        });
    }
  }
}
