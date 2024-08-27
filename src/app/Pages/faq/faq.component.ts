import { Component } from '@angular/core';
import { FooterComponent } from '../../Components/footer/footer.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {}
