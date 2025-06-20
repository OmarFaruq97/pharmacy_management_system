import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  showOverlay = true;

  closeOverlay() {
    this.showOverlay = false;
  }

  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  onLogin() {
    this.auth.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          this.auth.setToken(res.access_token);
          localStorage.setItem('id', res.id);
          //localStorage.setItem('role', res.role)
          //const role = localStorage.getItem('role');
          const role = this.auth.getUserRole();

          //role based navigation
          switch(role){
            case 'admin':
              window.location.href="/admin";

              break;

            case 'pharmacist':
              window.location.href="/pharmacist";
              break;

            default:
              alert('Unknow role. Please contact support.');  
          }
        },
        error: (error) => {
          alert('Invalid credentials')
          console.log(error)
        }
      });
  }

}