import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-materi',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './materi.component.html',
  styleUrls: ['./materi.component.css'],
})
export class MateriComponent implements OnInit {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.username = user.username;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  downloadMateri(number: number) {
    // Implementasi fungsi download
    console.log(`Downloading materi P${number}`);
  }
}
