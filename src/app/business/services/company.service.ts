import { Injectable, inject } from '@angular/core';
import { CompanyService as BackendService } from '../../backend/bff/services/company.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { Company } from '../model/vibbra-nfmei.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companyBackend = inject(BackendService);

  companiesEvent = new Subject<void>();
  companiesList = new BehaviorSubject<Company[]>([]);
  companies$ = this.companiesEvent
    .pipe(
      switchMap(() => this.companyBackend.getAll()),
      map((companies) => companies.reverse()),
      tap((companies) => this.companiesList.next(companies)),
    )
    .subscribe();

  loadCompanies(): void {
    this.companiesEvent.next();
  }

  updateCompany(company: Company): Observable<Company> {
    return this.companyBackend.getUser().pipe(
      map((user) => {
        if (company.id === null || company.id === undefined) {
          delete company.id;
        }
        return { user, company };
      }),
      switchMap(({ user, company }) =>
        !company.id
          ? this.companyBackend.create({ ...company, user })
          : this.companyBackend.update({ ...company, user }),
      ),
      tap(() => this.loadCompanies()),
    );
  }
}
