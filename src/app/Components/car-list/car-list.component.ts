import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '../../Interfaces/car';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css',
})
export class CarListComponent {
  @Input() car: Car[] = [];
}
