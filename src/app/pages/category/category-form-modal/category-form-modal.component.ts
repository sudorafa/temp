import { Component, DestroyRef, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ExpenseCategory } from '../../../business/model/vibbra-nfmei.model';
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
import { VibbraValidators } from '../../../business/validators/vibbra.validator';
import { CategoryService } from '../../../business/services/category.service';
import { Subscription, tap } from 'rxjs';

type ModalConfig = {
  title: string;
  action: 'Cadastrar' | 'Atualizar';
};

type CategoryModal = {
  category: ExpenseCategory;
  modal: ModalConfig;
};

type CategoryForm = {
  name: FormControl<string>;
  description: FormControl<string>;
  id: FormControl<number | undefined>;
};

@Component({
  selector: 'app-category-form-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
  ],
  templateUrl: './category-form-modal.component.html',
  styleUrl: './category-form-modal.component.scss',
})
export class CategoryFormModalComponent {
  dialogRef = inject(MatDialogRef<CategoryFormModalComponent>);
  categoryService = inject(CategoryService);
  destroyRef = inject(DestroyRef);

  form = new FormGroup<CategoryForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.minLength(3),
        Validators.required,
        VibbraValidators.withoutWhiteSpace,
      ],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [],
    }),
    id: new FormControl(undefined, {
      nonNullable: true,
      validators: [],
    }),
  });

  subs: Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public config: CategoryModal) {
    this.form.patchValue(config.category);
    this.destroyRef.onDestroy(() => this.subs.forEach((s) => s.unsubscribe()));
  }

  submit(): void {
    const category = this.form.getRawValue();
    this.form.disable();
    const newSub = this.categoryService
      .updateCategory({ ...category, archived: false })
      .pipe(tap((newCategory) => this.dialogRef.close(newCategory)))
      .subscribe();
    this.subs.push(newSub);
  }
}
