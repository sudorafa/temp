import { Injectable, inject } from '@angular/core';
import { ExpenseCategoryService } from '../../backend/bff/services/expense-category.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { ExpenseCategory } from '../model/vibbra-nfmei.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryBackend = inject(ExpenseCategoryService);

  categoriesEvent = new Subject<void>();
  categoriesList = new BehaviorSubject<ExpenseCategory[]>([]);
  categories$ = this.categoriesEvent
    .pipe(
      switchMap(() => this.categoryBackend.getAll()),
      map((categories) => categories.filter((c) => !c.archived).reverse()),
      tap((categories) => this.categoriesList.next(categories)),
    )
    .subscribe();

  loadCategories(): void {
    this.categoriesEvent.next();
  }

  updateCategory(category: ExpenseCategory): Observable<ExpenseCategory> {
    return this.categoryBackend.getUser().pipe(
      map((user) => {
        if (category.id === null || category.id === undefined) {
          delete category.id;
        }
        return { user, category };
      }),
      switchMap(({ user, category }) =>
        !category.id
          ? this.categoryBackend.create({ ...category, user })
          : this.categoryBackend.update({ ...category, user }),
      ),
      tap(() => this.loadCategories()),
    );
  }
}
