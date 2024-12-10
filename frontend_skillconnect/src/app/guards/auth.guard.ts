import { Injectable, inject } from '@angular/core';
import { 
  CanActivate, 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot 
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Cek apakah kode berjalan di browser
    if (isPlatformBrowser(this.platformId)) {
      if (this.authService.isLoggedIn()) {
        return of(true);
      }
    }

    // Jika tidak terautentikasi atau bukan di browser, redirect ke login
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return of(false);
  }
} 