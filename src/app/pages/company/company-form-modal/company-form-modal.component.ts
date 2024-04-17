import { Component, DestroyRef, Inject, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CompanyService } from '../../../business/services/company.service';
import { Company } from '../../../business/model/vibbra-nfmei.model';
import { VibbraValidators } from '../../../business/validators/vibbra.validator';
import { Subscription, tap } from 'rxjs';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

type ModalConfig = {
  title: string;
  action: 'Cadastrar' | 'Atualizar';
};

type CompanyModal = {
  company: Company;
  modal: ModalConfig;
};

type CompanyForm = {
  name: FormControl<string>;
  cnpj: FormControl<string>;
  corporateName: FormControl<string>;
  id: FormControl<number | undefined>;
};

@Component({
  selector: 'app-company-form-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSnackBarModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './company-form-modal.component.html',
  styleUrl: './company-form-modal.component.scss',
})
export class CompanyFormModalComponent {
  dialogRef = inject(MatDialogRef<CompanyFormModalComponent>);
  companyService = inject(CompanyService);
  destroyRef = inject(DestroyRef);

  form = new FormGroup<CompanyForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.minLength(3),
        Validators.required,
        VibbraValidators.withoutWhiteSpace,
      ],
    }),
    corporateName: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.minLength(3),
        Validators.required,
        VibbraValidators.withoutWhiteSpace,
      ],
    }),
    cnpj: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(14), Validators.required],
    }),
    id: new FormControl(undefined, {
      nonNullable: true,
      validators: [],
    }),
  });

  subs: Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public config: CompanyModal) {
    this.form.patchValue(config.company);
    this.destroyRef.onDestroy(() => this.subs.forEach((s) => s.unsubscribe()));
  }

  submit(): void {
    const company = this.form.getRawValue();
    this.form.disable();
    const newSub = this.companyService
      .updateCompany(company)
      .pipe(tap((newCompany) => this.dialogRef.close(newCompany)))
      .subscribe();
    this.subs.push(newSub);
  }
}
