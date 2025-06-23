import { Component, OnInit } from '@angular/core';

import { ServiceService, UserResponse } from '../services/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: UserResponse[] = [];
  errorMessage = '';

  constructor(private userService: ServiceService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (error) => {
        this.errorMessage = error.message;
        console.error(error);
      }
    });
  }
}