// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { CommonModule } from '@angular/common';
// import {
//   RegisterRequest,
//   ServiceService,
// } from '../../services/service.service';

// @Component({
//   selector: 'app-registration',
//   imports: [FormsModule, ReactiveFormsModule, CommonModule],
//   templateUrl: './registration.component.html',
//   styleUrl: './registration.component.css',
// })
// export class RegistrationComponent {
//   showOverlay = true;

//   closeOverlay() {
//     this.showOverlay = false;
//   }

//   // Registration
//   user: RegisterRequest = {
//     email: '',
//     password: '',
//     role: '',
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//     salary: 0, // Fixed: salary should be number not string
//   };

//   registrationSuccess = false;
//   registrationError = '';

//   constructor(private router: Router, private userService: ServiceService) {}

//   onSubmit() {
//     this.userService.registerUser(this.user).subscribe({
//       next: (response) => {
//         console.log('Registration successful:', response);
//         this.registrationSuccess = true;
//         this.registrationError = '';
//         alert(`Registration successful! Role: ${this.user.role}`  );
//         this.router.navigate(['/login']);
//       },
//       error: (error: Error) => {
//         console.error('Registration error:', error.message);
//         this.registrationError = error.message;
//         this.registrationSuccess = false;
//         alert(error.message);
//       },
//     });
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  RegisterRequest,
  ServiceService,
} from '../../services/service.service';

// Required for Bootstrap modal
declare var bootstrap: any;

@Component({
  selector: 'app-registration',  
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  showOverlay = true;

  user: RegisterRequest = {
    email: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    salary: 0,
  };

  registrationSuccess = false;
  registrationError = '';

  constructor(private router: Router, private userService: ServiceService) {}

  closeOverlay() {
    this.showOverlay = false;
  }

  //  Navigate to login after modal closes
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  //  Form submit
  onSubmit() {
    this.userService.registerUser(this.user).subscribe({
      next: (response) => {
        this.registrationSuccess = true;
        this.registrationError = '';

        //  Show Bootstrap success modal
        const modalEl = document.getElementById('successModal');
        if (modalEl) {
          const modal = new bootstrap.Modal(modalEl);
          modal.show();
        }
      },
      error: (error: Error) => {
        this.registrationError = error.message;
        this.registrationSuccess = false;
        alert(error.message);
      },
    });
  }
}
