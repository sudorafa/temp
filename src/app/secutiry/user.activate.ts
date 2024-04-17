import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../business/services/authentication.service';
import { map, of, switchMap } from 'rxjs';

export const isUserAuthenticated: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const auth = inject(AuthenticationService);
  return auth.session().pipe(
    map((logged) => {
      if (!logged) {
        auth.loginRedirect();
        return false;
      }
      return logged;
    }),
  );
};

export const isNotUserAuthenticated: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const auth = inject(AuthenticationService);
  return auth.session().pipe(
    map((logged) => {
      if (logged) {
        auth.homeRedirect();
        return false;
      }
      return true;
    }),
  );
};
