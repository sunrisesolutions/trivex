import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isLoggedIn: boolean = false;
  constructor(private router: Router, private authService: NbAuthService) { }

  canActivate() {
    return this.authService.isAuthenticatedOrRefresh()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['/auth/login']);
            return false;
          }
        })
      );
  }

}
