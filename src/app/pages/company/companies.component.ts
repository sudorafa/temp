import { DialogModule } from '@angular/cdk/dialog';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from '../../business/services/company.service';
import { Company } from '../../business/model/vibbra-nfmei.model';
import { Subscription, tap } from 'rxjs';
import { CompanyFormModalComponent } from './company-form-modal/company-form-modal.component';
import { CompanyItemComponent } from './company-item/company-item.component';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    DialogModule,
    CompanyItemComponent,
    MatSnackBarModule,
  ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
})
export class CompaniesComponent {
  modal = inject(MatDialog);
  destroyRef = inject(DestroyRef);
  companyService = inject(CompanyService);
  snack = inject(MatSnackBar);

  companies = signal<Company[]>([]);

  companies$ = this.companyService.companiesList
    .pipe(tap((companies) => this.companies.set(companies)))
    .subscribe();

  subs$: Subscription[] = [];

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.companies$.unsubscribe();
      this.subs$.forEach((s) => s.unsubscribe());
    });
    this.companyService.loadCompanies();
  }

  create(): void {
    this.modal.open(CompanyFormModalComponent, {
      data: {
        company: {
          corporateName: '',
          cnpj: '',
          name: '',
          id: undefined,
        },
        modal: {
          action: 'Cadastrar',
          title: 'Adicionar Empresa',
        },
      },
    });
  }

  edit(company: Company): void {
    this.modal.open(CompanyFormModalComponent, {
      data: {
        company,
        modal: {
          action: 'Atualizar',
          title: 'Salvar Empresa',
        },
      },
    });
  }
}
