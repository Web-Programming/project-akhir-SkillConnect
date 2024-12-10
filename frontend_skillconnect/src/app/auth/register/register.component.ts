import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AuthService, RegisterResponse } from '../../services/auth.service';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData: RegisterData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.errorMessage = '';

    // Validasi semua field terisi
    if (!this.registerData.name || !this.registerData.email || !this.registerData.password) {
      this.errorMessage = '⚠️ Mohon lengkapi semua field';
      return;
    }
    
    // Validasi password match
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = '⚠️ Password dan Confirm Password tidak cocok';
      return;
    }

    // Validasi panjang password
    if (this.registerData.password.length < 6) {
      this.errorMessage = '⚠️ Password harus minimal 6 karakter';
      return;
    }

    const { confirmPassword, ...userData } = this.registerData;
    
    this.authService.register(userData).subscribe({
      next: (response: RegisterResponse) => {
        if (response.success) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = '⚠️ ' + response.message;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Registration failed:', error);
        
        if (error.error?.message) {
          this.errorMessage = '⚠️ ' + error.error.message;
        } else if (error.status === 0) {
          this.errorMessage = '⚠️ Tidak dapat terhubung ke server';
        } else {
          this.errorMessage = '⚠️ Registrasi gagal';
        }
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
