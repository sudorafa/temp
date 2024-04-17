import { DialogModule } from '@angular/cdk/dialog';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Expense } from '../../business/model/vibbra-nfmei.model';
import { Subscription, tap } from 'rxjs';
import { dateToStringMonth } from '../../utils/date.functions';
import { ExpenseItemComponent } from './expense-item/expense-item.component';
import { ExpenseService } from '../../business/services/expense.service';
import { ExpenseFormModalComponent } from './expense-form-modal/expense-form-modal.component';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    DialogModule,
    ExpenseItemComponent,
    MatSnackBarModule,
  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss',
})
export class ExpenseComponent {
  modal = inject(MatDialog);
  destroyRef = inject(DestroyRef);
  expenseService = inject(ExpenseService);
  snack = inject(MatSnackBar);

  expenses = signal<Expense[]>([]);

  expenses$ = this.expenseService.expensesList
    .pipe(tap((expenses) => this.expenses.set(expenses)))
    .subscribe();

  subs$: Subscription[] = [];

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.expenses$.unsubscribe();
      this.subs$.forEach((s) => s.unsubscribe());
    });
    this.expenseService.loadExpenses();
  }

  create(): void {
    this.modal.open(ExpenseFormModalComponent, {
      data: {
        expense: {
          name: '',
          value: '',
          description: '',
          paymentDate: new Date(),
          referenceDate: new Date(),
          category: undefined,
          company: undefined,
          id: undefined,
        },
        modal: {
          action: 'Cadastrar',
          title: 'Cadastrar Despesa',
        },
      },
      disableClose: true,
    });
  }

  edit(expense: Expense): void {
    this.modal.open(ExpenseFormModalComponent, {
      data: {
        expense,
        modal: {
          action: 'Atualizar',
          title: 'Atualizar Despesa',
        },
      },
    });
  }

  remove(expense: Expense): void {
    this.subs$.push(this.expenseService.remove(expense).subscribe());

    const snack = this.snack.open(
      `Despesa ${expense.name} foi removida`,
      'Desfazer',
      {
        duration: 7000,
      },
    );

    const sub = snack
      .onAction()
      .pipe(
        tap(() =>
          this.subs$.push(this.expenseService.undo(expense).subscribe()),
        ),
      )
      .subscribe();
    this.subs$.push(sub);
  }
}
