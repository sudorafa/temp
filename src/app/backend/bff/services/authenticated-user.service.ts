import { Injectable, inject } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import {
  AuthenticatedUser,
  LoginForm,
  User,
} from '../../../business/model/vibbra-nfmei.model';
import { VibbraTables } from '../database/tables.enum';
import { Observable, filter, map, of, switchMap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedUserService extends DatabaseService<AuthenticatedUser> {
  protected override table = VibbraTables.AUTHENTICATED_USERS;
  private userService = inject(UserService);

  constructor() {
    super();
  }

  private createSession(user: User): Observable<User> {
    return this.create({ logged: 1, user: user.id as number }).pipe(
      map((_) => user),
    );
  }

  login(loginForm: LoginForm): Observable<User | null> {
    return this.database
      .getByIndex<User>(VibbraTables.USERS, 'email', loginForm.email)
      .pipe(
        switchMap((user) => {
          if (!user) {
            return of(null);
          }
          const loggedUser = user.password === loginForm.password ? user : null;
          if (loggedUser === null) {
            return of(null);
          }
          return this.createSession(loggedUser);
        }),
      );
  }

  getLogged(): Observable<User | null> {
    return this.database
      .getByIndex<AuthenticatedUser>(this.table, 'logged', 1)
      .pipe(
        switchMap((authenticateUser) => {
          if (!authenticateUser) {
            return of(null);
          }
          return this.userService.getById(authenticateUser.user as number);
        }),
      );
  }

  logout(): Observable<void> {
    return this.database
      .getByIndex<AuthenticatedUser>(this.table, 'logged', 1)
      .pipe(
        filter((authenticateUser) => !!authenticateUser),
        switchMap((authenticateUser) =>
          this.update({ ...authenticateUser, logged: 0 }),
        ),
        map(() => void 0),
      );
  }
}
