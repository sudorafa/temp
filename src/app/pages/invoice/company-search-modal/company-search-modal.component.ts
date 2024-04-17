import { Component, DestroyRef, Inject, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Company } from '../../../business/model/vibbra-nfmei.model';
import { CompanyItemComponent } from '../../company/company-item/company-item.component';
import { CompanyService } from '../../../business/services/company.service';
import { Subscription, distinctUntilChanged, map, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-company-search-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatDivider,
    MatFormFieldModule,
    MatInputModule,
    CompanyItemComponent,
  ],
  templateUrl: './company-search-modal.component.html',
  styleUrl: './company-search-modal.component.scss',
})
export class CompanySearchModalComponent {
  dialogRef = inject(MatDialogRef<CompanySearchModalComponent>);
  destroyRef = inject(DestroyRef);
  companyService = inject(CompanyService);
  companies = signal<Company[]>([]);
  companiesFiltered = signal<Company[]>([]);

  companies$ = this.companyService.companiesList
    .pipe(
      tap((companies) => this.companies.set(companies)),
      tap((companies) => this.companiesFiltered.set(companies)),
    )
    .subscribe();

  subs$: Subscription[] = [];

  search = new FormControl<string>('');

  constructor(@Inject(MAT_DIALOG_DATA) public selectedCompany: Company) {
    this.destroyRef.onDestroy(() => {
      this.companies$.unsubscribe();
      this.subs$.forEach((s) => s.unsubscribe());
    });

    this.subs$.push(
      this.search.valueChanges
        .pipe(
          distinctUntilChanged(),
          map((query) =>
            this.companies().filter((company) => {
              if (query === '' || query === null) {
                return true;
              }
              return (
                company.cnpj.indexOf(query) !== -1 ||
                company.name.indexOf(query) !== -1
              );
            }),
          ),
          tap((companies) => this.companiesFiltered.set(companies)),
        )
        .subscribe(),
    );
    this.companyService.loadCompanies();
  }

  selectCompany(company: Company): void {
    this.dialogRef.close(company);
  }
}
