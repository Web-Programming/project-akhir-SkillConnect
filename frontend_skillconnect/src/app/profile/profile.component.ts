import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, UserProfile } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile = {
    name: '',
    email: '',
    phone: '',
    bio: '',
    photoUrl: ''
  };
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.getUserProfile().subscribe({
      next: (profile: UserProfile) => {
        if (!profile) {
          this.errorMessage = 'Data profil tidak ditemukan';
          this.isLoading = false;
          return;
        }

        this.userProfile = {
          ...profile,
          phone: profile.phone || '',
          bio: profile.bio || '',
          photoUrl: profile.photoUrl || ''
        };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.errorMessage = `Gagal memuat data profil: ${error.message || 'Silakan coba lagi'}`;
        this.isLoading = false;
      }
    });
  }

  onSaveChanges() {
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.updateProfile(this.userProfile).subscribe({
      next: (response: UserProfile) => {
        this.successMessage = 'Profil berhasil diperbarui!';
        this.userProfile = {
          ...response,
          phone: response.phone || '',
          bio: response.bio || '',
          photoUrl: response.photoUrl || ''
        };
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.errorMessage = 'Gagal memperbarui profil. Silakan coba lagi.';
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getRandomColor(): string {
    const colors = [
      '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', 
      '#34495e', '#16a085', '#27ae60', '#2980b9', 
      '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22', 
      '#e74c3c', '#95a5a6', '#f39c12', '#d35400'
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
} 