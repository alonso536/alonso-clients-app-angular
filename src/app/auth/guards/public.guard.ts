import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const service: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return service.checkAuthentication()
    .pipe(
      tap((isAuthenticated) => {
        if(isAuthenticated) {
          router.navigate(['/profile'])
        }
      }),
      map(isAuthenticated => !isAuthenticated)
    );
}

export const canActivatedPublicGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return checkAuthStatus();
}

export const canMatchPublicGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    return checkAuthStatus();
}