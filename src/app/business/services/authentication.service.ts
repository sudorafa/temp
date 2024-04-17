import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { LoginForm, User } from '../model/vibbra-nfmei.model';
import { AuthenticatedUserService } from '../../backend/bff/services/authenticated-user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authBackend = inject(AuthenticatedUserService);
  private loginEvent = new BehaviorSubject<LoginForm | null>(null);
  private router = inject(Router);

  private loginSub$ = this.loginEvent
    .pipe(
      filter((login) => login !== null),
      switchMap((loginForm) => {
        if (loginForm === null) return of(null);
        return this.authBackend.login(loginForm);
      }),
      tap((loggedUser) => this.loggedEvent.next(loggedUser)),
    )
    .subscribe();

  logoutEvent = new Subject<void>();
  private logoutSub = new Subject<boolean>();
  private logoutSub$ = this.logoutSub
    .pipe(
      filter((logout) => logout),
      switchMap((_) => this.authBackend.logout()),
      tap(() => this.logoutEvent.next()),
    )
    .subscribe();

  loggedEvent = new BehaviorSubject<User | null>(null);

  constructor() {}

  login(user: LoginForm): void {
    this.loginEvent.next(user);
  }

  logout(): void {
    this.logoutSub.next(true);
  }

  session(): Observable<boolean> {
    return this.authBackend.getLogged().pipe(
      map((loggedUser) => {
        return loggedUser !== null;
      }),
    );
  }

  loginRedirect(): void {
    this.router.navigate(['/login']);
  }

  homeRedirect(): void {
    this.router.navigate(['/dashboard']);
  }
}
