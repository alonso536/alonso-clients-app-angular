import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const service: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return service.checkAuthentication()
    .pipe(
      tap((isAuthenticated) => {
        if(!isAuthenticated) {
          router.navigate(['/auth/login'])
        }
      })
    );
}

export const canActivatedGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return checkAuthStatus();
}

export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    return checkAuthStatus();
}