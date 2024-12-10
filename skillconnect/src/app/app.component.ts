import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="data">
      <h1>{{ data }}</h1>
    </div>
    <div *ngIf="error">
      {{ error }}
    </div>
  `,
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  standalone: true,
  providers: [DataService]
})
export class AppComponent implements OnInit {
  data: string = '';
  error: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe({
      next: (response) => {
        this.data = response.message;
      },
      error: (err) => {
        this.error = 'Failed to fetch data: ' + err.message;
        console.error('Error:', err);
      }
    });
  }
}
