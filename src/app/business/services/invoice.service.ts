import { Injectable, inject } from '@angular/core';
import { InvoiceService as BackendService } from '../../backend/bff/services/invoice.service';
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
import { Company, Invoice, InvoiceEntity } from '../model/vibbra-nfmei.model';
import { CompanyService } from '../../backend/bff/services/company.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoiceBackend = inject(BackendService);
  private companyBackend = inject(CompanyService);

  invoicesEvent = new Subject<void>();
  invoicesList = new BehaviorSubject<Invoice[]>([]);
  invoices$ = this.invoicesEvent
    .pipe(
      switchMap(() => this.invoiceBackend.getAll()),
      map((invoices) => invoices.reverse()),
      switchMap((invoices) => {
        return forkJoin<[InvoiceEntity[], Company[]]>([
          of(invoices),
          this.companyBackend.getAll(),
        ]);
      }),
      map(([invoices, companies]) =>
        invoices.map((i) => ({
          ...i,
          company: companies.find((c) => c.id === i.company),
        })),
      ),
      tap((invoices) => this.invoicesList.next(invoices)),
    )
    .subscribe();

  loadInvoices(): void {
    this.invoicesEvent.next();
  }

  invoiceToInvoiceEntity(invoice: Invoice): InvoiceEntity {
    return {
      ...invoice,
      company: invoice.company?.id as number,
    };
  }

  updateInvoice(invoiceParam: Invoice): Observable<Invoice> {
    return this.invoiceBackend.getUser().pipe(
      map((user) => {
        if (invoiceParam.id === null || invoiceParam.id === undefined) {
          delete invoiceParam.id;
        }
        return { user, invoice: { ...invoiceParam } };
      }),
      map(({ user, invoice }) => ({
        user,
        invoice: this.invoiceToInvoiceEntity(invoice),
      })),
      switchMap(({ user, invoice }) =>
        !invoice.id
          ? this.invoiceBackend.create({ ...invoice, user })
          : this.invoiceBackend.update({ ...invoice, user }),
      ),
      map((invoice) => ({
        ...invoice,
        company: invoiceParam.company,
      })),
      tap(() => this.loadInvoices()),
    );
  }

  remove(invoice: Invoice): Observable<InvoiceEntity[]> {
    return this.invoiceBackend
      .remove(invoice.id as number)
      .pipe(tap((_) => this.loadInvoices()));
  }

  undo(invoice: Invoice): Observable<InvoiceEntity> {
    return this.invoiceBackend
      .update(this.invoiceToInvoiceEntity(invoice))
      .pipe(tap((_) => this.loadInvoices()));
  }
}
