import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router) {}

  // Data untuk login
  loginEmail: string = '';
  loginPassword: string = '';

  // Data untuk register
  registerName: string = '';
  registerEmail: string = '';
  registerPhone: string = '';
  registerPassword: string = '';
  registerUserType: string = '';

  onLogin() {
    const loginData = {
      email: this.loginEmail,
      password: this.loginPassword,
    };

    this.http.post('http://localhost:3000/api/login', loginData).subscribe({
      next: (response: any) => {
        if (response.success) {
          if (response.user.role === 'pelajar') {
            this.router.navigate(['/dashboard']);
          } else {
            alert('Anda tidak punya hak akses');
          }
        } else {
          alert('Login gagal');
        }
      },
      error: (error: HttpErrorResponse) => {
        alert('Error logging in');
        console.error(error);
      },
    });
  }

  onRegister() {
    const registerData = {
      nama: this.registerName,
      email: this.registerEmail,
      no_hp: this.registerPhone,
      password: this.registerPassword,
      role: this.registerUserType,
    };

    this.http
      .post('http://localhost:3000/api/register', registerData)
      .subscribe({
        next: (response: any) => {
          alert('Registrasi berhasil');
          // Reset form
          this.registerName = '';
          this.registerEmail = '';
          this.registerPhone = '';
          this.registerPassword = '';
          this.registerUserType = '';
        },
        error: (error: HttpErrorResponse) => {
          alert('Error registering');
          console.error(error);
        },
      });
  }
}
