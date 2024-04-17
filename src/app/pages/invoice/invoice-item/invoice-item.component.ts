import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Invoice } from '../../../business/model/vibbra-nfmei.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

type FormattedInvoice = Invoice & {
  formattedValue: string;
};

@Component({
  selector: 'app-invoice-item',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CurrencyPipe, DatePipe],
  templateUrl: './invoice-item.component.html',
  styleUrl: './invoice-item.component.scss',
})
export class InvoiceItemComponent {
  currency = new CurrencyPipe('pt-BR');

  invoice = input.required<FormattedInvoice, Invoice>({
    transform: (i) => ({
      ...i,
      formattedValue: this.currency.transform(i.value, 'BRL') as string,
    }),
  });
  edit = output();
  remove = output();
}
