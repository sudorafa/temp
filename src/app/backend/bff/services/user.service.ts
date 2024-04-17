import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import {
  Company,
  ExpenseCategory,
  ExpenseEntity,
  InvoiceEntity,
  User,
  UserSettings,
} from '../../../business/model/vibbra-nfmei.model';
import { VibbraTables } from '../database/tables.enum';
import { Observable, Subscription, map, of, switchMap, tap } from 'rxjs';
import mock from '../../mocks/backend.mock';

@Injectable({
  providedIn: 'root',
})
export class UserService extends DatabaseService<User> {
  protected override table = VibbraTables.USERS;

  subs$: Subscription[] = [];

  constructor() {
    super();
  }

  checkCnpjExist(cnpj: string): Observable<boolean> {
    return this.database
      .getByIndex<User>(this.table, 'cnpj', cnpj)
      .pipe(map((result) => !(result === null)));
  }

  checkEmailExist(email: string): Observable<boolean> {
    return this.database
      .getByIndex<User>(this.table, 'email', email)
      .pipe(map((result) => !(result === null)));
  }

  override create(user: User): Observable<User> {
    return super.create(user).pipe(
      switchMap((user) => this.install(user)),
      switchMap(({ id }) =>
        this.database
          .add<UserSettings>(VibbraTables.USER_SETTING, {
            user: id as number,
            billingCeil: 81_000,
            emailNotification: false,
            smsNotification: false,
          })
          .pipe(map(() => ({ ...user, id }))),
      ),
    );
  }

  private install(user: User): Observable<User> {
    for (const category of mock.categoriesMock) {
      const sub = this.database
        .add<ExpenseCategory>(VibbraTables.EXPENSE_CATEGORIES, category)
        .subscribe();
      this.subs$.push(sub);
    }

    for (const company of mock.companiesMock) {
      const sub = this.database
        .add<Company>(VibbraTables.COMPANIES, { ...company, user: user.id })
        .subscribe();
      this.subs$.push(sub);
    }

    for (const invoice of mock.invoicesMock) {
      const sub = this.database
        .add<InvoiceEntity>(VibbraTables.INVOICES, {
          ...invoice,
          user: user.id,
        })
        .subscribe();
      this.subs$.push(sub);
    }

    for (const expense of mock.expensesMock) {
      const sub = this.database
        .add<ExpenseEntity>(VibbraTables.EXPENSES, {
          ...expense,
          user: user.id,
        })
        .subscribe();
      this.subs$.push(sub);
    }

    return of(user);
  }
}
