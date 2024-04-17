import { Component, DestroyRef, Inject, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ExpenseCategory } from '../../../business/model/vibbra-nfmei.model';
import { Subscription, distinctUntilChanged, map, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { CategoryItemComponent } from '../../category/category-item/category-item.component';
import { CategoryService } from '../../../business/services/category.service';

@Component({
  selector: 'app-category-search-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatDivider,
    MatFormFieldModule,
    MatInputModule,
    CategoryItemComponent,
  ],
  templateUrl: './category-search-modal.component.html',
  styleUrl: './category-search-modal.component.scss',
})
export class CategorySearchModalComponent {
  dialogRef = inject(MatDialogRef<CategorySearchModalComponent>);
  destroyRef = inject(DestroyRef);
  categoryService = inject(CategoryService);
  categories = signal<ExpenseCategory[]>([]);
  categoriesFiltered = signal<ExpenseCategory[]>([]);

  categories$ = this.categoryService.categoriesList
    .pipe(
      tap((categories) => this.categories.set(categories)),
      tap((categories) => this.categoriesFiltered.set(categories)),
    )
    .subscribe();

  subs$: Subscription[] = [];

  search = new FormControl<string>('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedCategory: ExpenseCategory,
  ) {
    this.destroyRef.onDestroy(() => {
      this.categories$.unsubscribe();
      this.subs$.forEach((s) => s.unsubscribe());
    });

    this.subs$.push(
      this.search.valueChanges
        .pipe(
          distinctUntilChanged(),
          map((query) =>
            this.categories().filter((category) => {
              if (query === '' || query === null) {
                return true;
              }
              return category.name.indexOf(query) !== -1;
            }),
          ),
          tap((categories) => this.categoriesFiltered.set(categories)),
        )
        .subscribe(),
    );
    this.categoryService.loadCategories();
  }

  selectCategory(category: ExpenseCategory): void {
    this.dialogRef.close(category);
  }
}
