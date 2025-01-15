import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaketService {
  private apiUrl = 'http://localhost:3000/api/paket';

  constructor(private http: HttpClient) {}

  uploadFile(paketId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload/${paketId}`, formData);
  }
}
