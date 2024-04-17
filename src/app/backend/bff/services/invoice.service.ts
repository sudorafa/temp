import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import {
  Company,
  Invoice,
  InvoiceEntity,
} from '../../../business/model/vibbra-nfmei.model';
import { VibbraTables } from '../database/tables.enum';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService extends DatabaseService<InvoiceEntity> {
  protected override table = VibbraTables.INVOICES;

  constructor() {
    super();
  }

  getList(): Observable<Invoice[]> {
    return this.getAll().pipe(
      switchMap((invoiceEntity) => {
        if (invoiceEntity.length === 0) {
          return of([]);
        }

        return forkJoin<[InvoiceEntity[], Company[]]>([
          of(invoiceEntity),
          this.database.bulkGet<Company>(
            VibbraTables.COMPANIES,
            invoiceEntity.map((invoice) => invoice.company),
          ),
        ]);
      }),
      map(([invoiceEntity, companies]) => {
        return invoiceEntity.map<Invoice>((entity) => ({
          ...entity,
          company: companies.find((c) => c.id === entity.company) as Company,
        }));
      }),
    );
  }
}
