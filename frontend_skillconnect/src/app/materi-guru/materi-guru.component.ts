import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PaketService } from '../services/paket.service';

@Component({
  selector: 'app-materi-guru',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './materi-guru.component.html',
  styleUrl: './materi-guru.component.css',
})
export class MateriGuruComponent implements OnInit {
  username: string = '';
  selectedPaket: string = 'P1';
  selectedFile: File | null = null;
  isUploading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private paketService: PaketService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    // if (user) {
    //   this.username = user.username;
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }

  selectPaket(paket: string) {
    this.selectedPaket = paket;
    this.selectedFile = null;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validasi tipe file jika diperlukan
      const allowedTypes = [
        'application/pdf',
        'application/msword', // Word versi 2003 .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word versi 2007 atau lebih baru (DOCX)
        'image/png',
        'image/jpeg',
        'image/jpg',
      ];
      if (allowedTypes.includes(file.type)) {
        this.selectedFile = file;
        this.errorMessage = '';
      } else {
        this.errorMessage =
          'Tipe file tidak didukung. Mohon upload file PDF, DOC/DOCX, JPG, JPEG atau PNG.';
        this.selectedFile = null;
      }
    }
  }

  async uploadFile() {
    if (!this.selectedFile || !this.selectedPaket) {
      this.errorMessage = 'Mohon pilih file terlebih dahulu';
      return;
    }

    try {
      this.isUploading = true;
      this.errorMessage = '';

      await this.paketService
        .uploadFile(this.selectedPaket, this.selectedFile)
        .subscribe({
          next: (response) => {
            this.successMessage = 'File berhasil diupload!';
            this.selectedFile = null;
            this.isUploading = false;
          },
          error: (error) => {
            this.errorMessage = 'Gagal mengupload file. Silakan coba lagi.';
            this.isUploading = false;
          },
        });
    } catch (error) {
      this.errorMessage = 'Terjadi kesalahan saat mengupload file';
      this.isUploading = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Helper method untuk menampilkan nama file yang dipilih
  getSelectedFileName(): string {
    return this.selectedFile ? this.selectedFile.name : 'Pilih file';
  }

  // Helper method untuk mengecek apakah tombol upload bisa diklik
  canUpload(): boolean {
    return !this.isUploading && !!this.selectedFile;
  }
}
