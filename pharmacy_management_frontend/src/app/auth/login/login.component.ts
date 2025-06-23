import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showOverlay = true;
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  closeOverlay() {
    this.showOverlay = false;
  }

  onLogin() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        localStorage.setItem('accessToken', res.access_token); // Save token correctly
        localStorage.setItem('id', res.id);
        const role = res.role || this.auth.getUserRole();
        this.router.navigate(['/dashboard/home']);
      },
      error: (error) => {
        alert('Invalid credentials');
        console.log(error);
      },
    });
  }
}