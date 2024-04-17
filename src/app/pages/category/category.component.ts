import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ExpenseCategory } from '../../business/model/vibbra-nfmei.model';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormModalComponent } from './category-form-modal/category-form-modal.component';
import { Subscription, tap } from 'rxjs';
import { CategoryService } from '../../business/services/category.service';
import { CategoryItemComponent } from './category-item/category-item.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    DialogModule,
    CategoryItemComponent,
    MatSnackBarModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  modal = inject(MatDialog);
  destroyRef = inject(DestroyRef);
  categoryService = inject(CategoryService);
  snack = inject(MatSnackBar);

  categories = signal<ExpenseCategory[]>([]);

  categories$ = this.categoryService.categoriesList
    .pipe(tap((categories) => this.categories.set(categories)))
    .subscribe();

  subs$: Subscription[] = [];

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.categories$.unsubscribe();
      this.subs$.forEach((s) => s.unsubscribe());
    });
    this.categoryService.loadCategories();
  }

  create(): void {
    this.modal.open(CategoryFormModalComponent, {
      data: {
        category: {
          archived: false,
          description: '',
          name: '',
          id: undefined,
        },
        modal: {
          action: 'Cadastrar',
          title: 'Adicionar Categoria',
        },
      },
    });
  }

  edit(category: ExpenseCategory): void {
    this.modal.open(CategoryFormModalComponent, {
      data: {
        category,
        modal: {
          action: 'Atualizar',
          title: 'Salvar Categoria',
        },
      },
    });
  }

  archive(category: ExpenseCategory): void {
    this.subs$.push(this.updateCategorySub({ ...category, archived: true }));

    const snack = this.snack.open(
      `Categoria ${category.name} está arquivada`,
      'Desfazer',
      {
        duration: 5000,
      },
    );

    const sub = snack
      .onAction()
      .pipe(
        tap(() =>
          this.subs$.push(
            this.updateCategorySub({ ...category, archived: false }),
          ),
        ),
      )
      .subscribe();
    this.subs$.push(sub);
  }

  updateCategorySub(category: ExpenseCategory): Subscription {
    return this.categoryService.updateCategory(category).subscribe();
  }
}
