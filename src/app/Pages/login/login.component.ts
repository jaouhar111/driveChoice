import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  loginWithEmail(email: string, password: string) {
    this.authService.signInWithEmail(email, password).subscribe((user) => {
      if (user) {
        this.toastr.success(`Logged in with email: ${user}`, 'success', {
          closeButton: true,
          timeOut: 500,
        });

        this.router.navigate(['']);
      }
    });
  }

  loginWithGoogle() {
    this.authService.signInWithGoogle().subscribe((user) => {
      if (user) {
        this.toastr.success(
          `Logged in with email: ${user.displayName}`,
          'success'
        );
        this.router.navigate(['']);
      }
    });
  }

  logout() {
    this.authService.signOut().subscribe(() => {
      console.log('Logged out');

      this.router.navigate(['']);
    });
  }

  checkUserAuthorization() {
    this.authService.isAllowedUser().subscribe((isAllowed) => {
      if (isAllowed) {
        console.log('User is authorized to access the dashboard');
      } else {
        console.log('User is not authorized');
      }
    });
  }
}
