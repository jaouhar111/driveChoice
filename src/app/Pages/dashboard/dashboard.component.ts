import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  isToggleOn = false;
  isLoggedIn = false;
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }
  
  toggle(): void {
    this.isToggleOn = !this.isToggleOn;
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
