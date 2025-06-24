import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import {
  RegisterRequest,
  ServiceService,
} from '../../services/service.service';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  showOverlay = true;

  closeOverlay() {
    this.showOverlay = false;
  }

  // Registration
  user: RegisterRequest = {
    email: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    salary: 0, // Fixed: salary should be number not string
  };

  registrationSuccess = false;
  registrationError = '';

  constructor(private router: Router, private userService: ServiceService) {}

  onSubmit() {
    this.userService.registerUser(this.user).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.registrationSuccess = true;
        this.registrationError = '';
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (error: Error) => {
        console.error('Registration error:', error.message);
        this.registrationError = error.message;
        this.registrationSuccess = false;
        alert(error.message);
      },
    });
  }
}