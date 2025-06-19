import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent{

 registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['USER'], // default role
      firstName: [''],
      lastName: [''],
      phoneNumber: ['']
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) return;

    this.authService.register(this.registrationForm.value).subscribe({
      next: (res: any) => {
        if (res?.token) {
          this.authService.setToken(res.token);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        alert('Registration failed. Please check the form and try again.');
        console.error('Registration error:', err);
      }
    });
  }
  
}
