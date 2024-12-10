import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // misalnya 'http://localhost:3001/api'

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((response: LoginResponse) => {
          if (response.token) {
            this.setToken(response.token);
          }
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client-side atau network error
      return throwError(() => new Error('Tidak dapat terhubung ke server'));
    } else {
      // Backend mengembalikan error
      const message = error.error?.message || 'Terjadi kesalahan pada server';
      return throwError(() => new Error(message));
    }
  }

  // Simpan token setelah login berhasil
  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  // Ambil token untuk request yang membutuhkan autentikasi
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Cek apakah user sudah login
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.getToken();
    }
    return false;
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/auth/profile`, this.getAuthHeaders())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Profile error:', error);
          if (error.status === 401) {
            this.logout(); // Token tidak valid, logout user
            return throwError(() => new Error('Sesi telah berakhir, silakan login kembali'));
          }
          return throwError(() => new Error('Gagal memuat profil: ' + (error.error?.message || 'Terjadi kesalahan')));
        })
      );
  }

  updateProfile(profileData: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(
      `${this.apiUrl}/auth/profile`,
      profileData,
      this.getAuthHeaders()
    );
  }

  private getAuthHeaders() {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token tidak ditemukan');
    }
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
  }

  register(userData: RegisterData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, userData);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  photoUrl?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
}