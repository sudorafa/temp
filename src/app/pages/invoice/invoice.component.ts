import { DialogModule } from '@angular/cdk/dialog';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InvoiceItemComponent } from './invoice-item/invoice-item.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceService } from '../../business/services/invoice.service';
import { Invoice } from '../../business/model/vibbra-nfmei.model';
import { Subscription, tap } from 'rxjs';
import { InvoiceFormModalComponent } from './invoice-form-modal/invoice-form-modal.component';
import { dateToStringMonth } from '../../utils/date.functions';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    DialogModule,
    InvoiceItemComponent,
    MatSnackBarModule,
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss',
})
export class InvoiceComponent {
  modal = inject(MatDialog);
  destroyRef = inject(DestroyRef);
  invoiceService = inject(InvoiceService);
  snack = inject(MatSnackBar);

  invoices = signal<Invoice[]>([]);

  invoices$ = this.invoiceService.invoicesList
    .pipe(tap((invoices) => this.invoices.set(invoices)))
    .subscribe();

  subs$: Subscription[] = [];

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.invoices$.unsubscribe();
      this.subs$.forEach((s) => s.unsubscribe());
    });
    this.invoiceService.loadInvoices();
  }

  create(): void {
    this.modal.open(InvoiceFormModalComponent, {
      data: {
        invoice: {
          value: '',
          description: '',
          referenceMonth: dateToStringMonth(new Date()),
          receivedDate: new Date(),
          company: undefined,
          id: undefined,
        },
        modal: {
          action: 'Cadastrar',
          title: 'Cadastrar Nota Fiscal',
        },
      },
      disableClose: true,
    });
  }

  edit(invoice: Invoice): void {
    this.modal.open(InvoiceFormModalComponent, {
      data: {
        invoice,
        modal: {
          action: 'Atualizar',
          title: 'Atualizar Nota Fiscal',
        },
      },
    });
  }

  remove(invoice: Invoice): void {
    this.subs$.push(this.invoiceService.remove(invoice).subscribe());

    const snack = this.snack.open(
      `Nota Fiscal ${invoice.id} foi removida`,
      'Desfazer',
      {
        duration: 7000,
      },
    );

    const sub = snack
      .onAction()
      .pipe(
        tap(() =>
          this.subs$.push(this.invoiceService.undo(invoice).subscribe()),
        ),
      )
      .subscribe();
    this.subs$.push(sub);
  }
}
