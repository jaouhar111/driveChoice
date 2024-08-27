import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isScrolled = false;
  isMenuOpen: boolean = false;
  isHidden = false;
  isToggleOn = false;
  isLoggedIn = false; // Track user's login status

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if the user is logged in when the component initializes
    this.authService.getCurrentUser().subscribe((user) => {
      this.isLoggedIn = !!user;
    });

    // Add scroll event listener
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  toggle(): void {
    this.isToggleOn = !this.isToggleOn;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Scroll event handler
  onScroll(): void {
    this.isScrolled = window.scrollY > 10; // Adjust the scroll threshold as needed
  }

  ngOnDestroy(): void {
    // Remove the scroll event listener when the component is destroyed
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  // Method to handle login
  login(): void {
    this.router.navigate(['/login']);
  }

  handleSignOut(): void {
    this.authService.signOut().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.isToggleOn = false;
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Sign out error:', error);
      },
    });
  }
}
