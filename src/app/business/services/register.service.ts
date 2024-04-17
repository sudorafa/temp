import { Injectable, inject } from '@angular/core';
import { User } from '../model/vibbra-nfmei.model';
import { BehaviorSubject, Observable, Subject, switchMap, tap } from 'rxjs';
import { UserService } from '../../backend/bff/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private userBackend = inject(UserService);
  sendUserEvent = new Subject<User>();
  registerEvent = new Subject<User>();
  errorEvent = new BehaviorSubject<string>('reset');

  sendUserSubs$ = this.sendUserEvent
    .pipe(
      switchMap((newUser) => this.userBackend.create(newUser)),
      tap((newUser) => this.registerEvent.next(newUser)),
    )
    .subscribe();

  constructor() {}

  register(newUser: User): void {
    this.sendUserEvent.next(newUser);
  }

  cnpjCheck(cnpj: string): Observable<boolean> {
    return this.userBackend.checkCnpjExist(cnpj);
  }

  emailCheck(email: string): Observable<boolean> {
    return this.userBackend.checkCnpjExist(email);
  }
}
