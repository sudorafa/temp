import { Injectable, inject } from '@angular/core';
import { ExpenseService as BackendService } from '../../backend/bff/services/expense.service';
import { CompanyService } from '../../backend/bff/services/company.service';
import { ExpenseCategoryService } from '../../backend/bff/services/expense-category.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import {
  Company,
  Expense,
  ExpenseCategory,
  ExpenseEntity,
} from '../model/vibbra-nfmei.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenseBackend = inject(BackendService);
  private companyBackend = inject(CompanyService);
  private categoryBackend = inject(ExpenseCategoryService);

  expensesEvent = new Subject<void>();
  expensesList = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expensesEvent
    .pipe(
      switchMap(() => this.expenseBackend.getAll()),
      map((expenses) => expenses.reverse()),
      switchMap((expenses) => {
        return forkJoin<[ExpenseEntity[], Company[], ExpenseCategory[]]>([
          of(expenses),
          this.companyBackend.getAll(),
          this.categoryBackend.getAll(),
        ]);
      }),
      map(([expenses, companies, categories]) =>
        expenses.map((i) => ({
          ...i,
          company: companies.find((c) => c.id === i.company),
          category: categories.find((c) => c.id === i.category),
        })),
      ),
      tap((expenses) => this.expensesList.next(expenses)),
    )
    .subscribe();

  loadExpenses(): void {
    this.expensesEvent.next();
  }

  expenseToExpenseEntity(expense: Expense): ExpenseEntity {
    return {
      ...expense,
      company: expense.company?.id,
      category: expense.category?.id,
    };
  }

  updateExpense(expenseParam: Expense): Observable<Expense> {
    return this.expenseBackend.getUser().pipe(
      map((user) => {
        if (expenseParam.id === null || expenseParam.id === undefined) {
          delete expenseParam.id;
        }
        return { user, expense: { ...expenseParam } };
      }),
      map(({ user, expense }) => ({
        user,
        expense: this.expenseToExpenseEntity(expense),
      })),
      switchMap(({ user, expense }) =>
        !expense.id
          ? this.expenseBackend.create({ ...expense, user })
          : this.expenseBackend.update({ ...expense, user }),
      ),
      map((expense) => ({
        ...expense,
        company: expenseParam.company,
        category: expenseParam.category,
      })),
      tap(() => this.loadExpenses()),
    );
  }

  remove(expense: Expense): Observable<ExpenseEntity[]> {
    return this.expenseBackend
      .remove(expense.id as number)
      .pipe(tap((_) => this.loadExpenses()));
  }

  undo(expense: Expense): Observable<ExpenseEntity> {
    return this.expenseBackend
      .update(this.expenseToExpenseEntity(expense))
      .pipe(tap((_) => this.loadExpenses()));
  }
}
