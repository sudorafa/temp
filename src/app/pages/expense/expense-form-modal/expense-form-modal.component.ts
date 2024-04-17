import { Component, DestroyRef, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  Company,
  Expense,
  ExpenseCategory,
} from '../../../business/model/vibbra-nfmei.model';
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
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {
  dateToString,
  dateToStringMonth,
  stringMonthToDate,
  stringToDate,
} from '../../../utils/date.functions';
import { MatIconModule } from '@angular/material/icon';
import { CompanySearchModalComponent } from '../../invoice/company-search-modal/company-search-modal.component';
import { ExpenseService } from '../../../business/services/expense.service';
import { VibbraValidators } from '../../../business/validators/vibbra.validator';
import { CategorySearchModalComponent } from '../category-search-modal/category-search-modal.component';

type ModalConfig = {
  title: string;
  action: 'Cadastrar' | 'Atualizar';
};

type ExpenseModal = {
  expense: Expense;
  modal: ModalConfig;
};

type ExpenseForm = {
  company: FormControl<Company | null>;
  companyString: FormControl<string>;
  category: FormControl<ExpenseCategory>;
  categoryString: FormControl<string>;
  value: FormControl<number>;
  name: FormControl<string>;
  description: FormControl<string>;
  paymentDate: FormControl<string>;
  referenceDate: FormControl<string>;
  id: FormControl<number | undefined>;
};

@Component({
  selector: 'app-expense-form-modal',
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
  templateUrl: './expense-form-modal.component.html',
  styleUrl: './expense-form-modal.component.scss',
})
export class ExpenseFormModalComponent {
  dialogRef = inject(MatDialogRef<ExpenseFormModalComponent>);
  dialog = inject(MatDialog);
  expenseService = inject(ExpenseService);
  destroyRef = inject(DestroyRef);

  form = new FormGroup<ExpenseForm>({
    company: new FormControl(null, {
      nonNullable: false,
      validators: [],
    }),
    companyString: new FormControl('', {
      nonNullable: true,
      validators: [],
    }),
    category: new FormControl(
      {
        archived: false,
        description: '',
        name: '',
      },
      {
        nonNullable: true,
        validators: [Validators.required],
      },
    ),
    categoryString: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        VibbraValidators.withoutWhiteSpace,
        Validators.minLength(3),
      ],
    }),
    value: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0.01)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [],
    }),
    paymentDate: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    referenceDate: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    id: new FormControl(undefined, {
      nonNullable: true,
      validators: [],
    }),
  });

  subs: Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public config: ExpenseModal) {
    this.form.patchValue({
      ...config.expense,
      companyString: config.expense.company?.name,
      paymentDate: dateToString(config.expense.paymentDate),
      referenceDate: dateToString(config.expense.referenceDate),
    });
    this.destroyRef.onDestroy(() => this.subs.forEach((s) => s.unsubscribe()));
  }

  submit(): void {
    const expense = this.form.getRawValue();
    this.form.disable();
    const newSub = this.expenseService
      .updateExpense({
        ...expense,
        company: expense.company === null ? undefined : expense.company,
        paymentDate: stringToDate(expense.paymentDate),
        referenceDate: stringMonthToDate(expense.referenceDate),
      })
      .pipe(tap((newExpense) => this.dialogRef.close(newExpense)))
      .subscribe();
    this.subs.push(newSub);
  }

  companyQuery(): void {
    const modal = this.dialog.open(CompanySearchModalComponent, {
      data: this.config.expense.company,
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

  categoryQuery(): void {
    const modal = this.dialog.open(CategorySearchModalComponent, {
      data: this.config.expense.category,
    });

    this.subs.push(
      modal
        .afterClosed()
        .pipe(
          filter((category) => !(category === null || category === undefined)),
          tap((category) => {
            this.form.controls.category.setValue(category);
            this.form.controls.categoryString.setValue(category.name);
          }),
        )
        .subscribe(),
    );
  }
}
