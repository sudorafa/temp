import { Component, DestroyRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InvoiceFormModalComponent } from '../../../pages/invoice/invoice-form-modal/invoice-form-modal.component';
import { ExpenseFormModalComponent } from '../../../pages/expense/expense-form-modal/expense-form-modal.component';
import { dateToStringMonth } from '../../../utils/date.functions';
import { DashboardService } from '../../../business/services/dashboard.service';
import { Subscription, filter, tap } from 'rxjs';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    InvoiceFormModalComponent,
    ExpenseFormModalComponent,
  ],
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.scss',
})
export class QuickActionsComponent {
  modal = inject(MatDialog);
  dashboardService = inject(DashboardService);
  destroyRef = inject(DestroyRef);

  subs: Subscription[] = [];

  constructor() {
    this.destroyRef.onDestroy(() => this.subs.map((s) => s.unsubscribe()));
  }

  quickInvoice(): void {
    const modal = this.modal.open(InvoiceFormModalComponent, {
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

    const newSub = modal
      .afterClosed()
      .pipe(
        filter((data) => !(data === null || data === undefined)),
        tap(() =>
          this.dashboardService.loadDashboard(
            this.dashboardService.currentYear(),
          ),
        ),
      )
      .subscribe();

    this.subs.push(newSub);
  }

  quickExpense(): void {
    const modal = this.modal.open(ExpenseFormModalComponent, {
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

    const newSub = modal
      .afterClosed()
      .pipe(
        filter((data) => !(data === null || data === undefined)),
        tap(() =>
          this.dashboardService.loadDashboard(
            this.dashboardService.currentYear(),
          ),
        ),
      )
      .subscribe();

    this.subs.push(newSub);
  }
}
