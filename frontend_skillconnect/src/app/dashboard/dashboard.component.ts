import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <nav class="navbar">
        <h1>Dashboard</h1>
        <div class="nav-buttons">
          <button class="profile-button" (click)="goToProfile()">
            <i class="fas fa-user"></i> Profile
          </button>
          <button class="logout-button" (click)="logout()">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </nav>
      <div class="content">
        <p>Selamat datang di Dashboard</p>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    .nav-buttons {
      display: flex;
      gap: 10px;
    }
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .profile-button {
      background: #007bff;
      color: white;
    }
    .profile-button:hover {
      background: #0056b3;
    }
    .logout-button {
      background: #dc3545;
      color: white;
    }
    .logout-button:hover {
      background: #c82333;
    }
    .content {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
    }
  `]
})
export class DashboardComponent {
  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
} 