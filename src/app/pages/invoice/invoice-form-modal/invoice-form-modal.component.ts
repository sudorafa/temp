import { Component, DestroyRef, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Company, Invoice } from '../../../business/model/vibbra-nfmei.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { Subscription, filter, tap } from 'rxjs';
import { InvoiceService } from '../../../business/services/invoice.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {
  dateToString,
  dateToStringMonth,
  stringMonthToDate,
  stringToDate,
} from '../../../utils/date.functions';
import { MatIconModule } from '@angular/material/icon';
import { CompanySearchModalComponent } from '../company-search-modal/company-search-modal.component';

type ModalConfig = {
  title: string;
  action: 'Cadastrar' | 'Atualizar';
};

type InvoiceModal = {
  invoice: Invoice;
  modal: ModalConfig;
};

type InvoiceForm = {
  company: FormControl<Company>;
  companyString: FormControl<string>;
  value: FormControl<number>;
  description: FormControl<string>;
  referenceMonth: FormControl<string>;
  receivedDate: FormControl<string>;
  id: FormControl<number | undefined>;
};

@Component({
  selector: 'app-invoice-form-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
    NgxMaskDirective,
    CompanySearchModalComponent,
  ],
  providers: [provideNgxMask()],
  templateUrl: './invoice-form-modal.component.html',
  styleUrl: './invoice-form-modal.component.scss',
})
export class InvoiceFormModalComponent {
  dialogRef = inject(MatDialogRef<InvoiceFormModalComponent>);
  dialog = inject(MatDialog);
  invoiceService = inject(InvoiceService);
  destroyRef = inject(DestroyRef);

  form = new FormGroup<InvoiceForm>({
    company: new FormControl(
      {
        cnpj: '',
        corporateName: '',
        name: '',
      },
      {
        nonNullable: true,
        validators: [Validators.required],
      },
    ),
    companyString: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    value: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0.01)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [],
    }),
    referenceMonth: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    receivedDate: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    id: new FormControl(undefined, {
      nonNullable: true,
      validators: [],
    }),
  });

  subs: Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public config: InvoiceModal) {
    this.form.patchValue({
      ...config.invoice,
      companyString: config.invoice.company?.name,
      receivedDate: dateToString(config.invoice.receivedDate),
      referenceMonth: dateToStringMonth(config.invoice.receivedDate),
    });
    this.destroyRef.onDestroy(() => this.subs.forEach((s) => s.unsubscribe()));
  }

  submit(): void {
    const invoice = this.form.getRawValue();
    this.form.disable();
    const newSub = this.invoiceService
      .updateInvoice({
        ...invoice,
        receivedDate: stringToDate(invoice.receivedDate),
        referenceMonth: stringMonthToDate(invoice.referenceMonth),
      })
      .pipe(tap((newInvoice) => this.dialogRef.close(newInvoice)))
      .subscribe();
    this.subs.push(newSub);
  }

  companyQuery(): void {
    const modal = this.dialog.open(CompanySearchModalComponent, {
      data: this.config.invoice.company,
    });

    this.subs.push(
      modal
        .afterClosed()
        .pipe(
          filter((company) => !(company === null || company === undefined)),
          tap((company) => {
            this.form.controls.company.setValue(company);
            this.form.controls.companyString.setValue(company.name);
          }),
        )
        .subscribe(),
    );
  }
}
