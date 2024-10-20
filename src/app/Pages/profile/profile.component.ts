import { Component } from '@angular/core';
import { NavbarComponent } from "../../Components/navbar/navbar.component";
import { FooterComponent } from "../../Components/footer/footer.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
