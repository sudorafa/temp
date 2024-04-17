import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Expense } from '../../../business/model/vibbra-nfmei.model';

type FormattedExpense = Expense & {
  formattedValue: string;
};

@Component({
  selector: 'app-expense-item',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CurrencyPipe, DatePipe],
  templateUrl: './expense-item.component.html',
  styleUrl: './expense-item.component.scss',
})
export class ExpenseItemComponent {
  currency = new CurrencyPipe('pt-BR');

  expense = input.required<FormattedExpense, Expense>({
    transform: (i) => ({
      ...i,
      formattedValue: this.currency.transform(i.value, 'BRL') as string,
    }),
  });
  edit = output();
  remove = output();
}
