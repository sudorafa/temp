import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import {
  Company,
  Expense,
  ExpenseCategory,
  ExpenseEntity,
} from '../../../business/model/vibbra-nfmei.model';
import { VibbraTables } from '../database/tables.enum';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService extends DatabaseService<ExpenseEntity> {
  protected override table = VibbraTables.EXPENSES;

  constructor() {
    super();
  }

  getList(): Observable<Expense[]> {
    return this.getAll().pipe(
      switchMap((expenseEntity) => {
        if (expenseEntity.length === 0) {
          return of([]);
        }
        return forkJoin<[ExpenseEntity[], ExpenseCategory[], Company[]]>([
          of(expenseEntity),
          this.categoriesRepository(expenseEntity),
          this.companiesRepository(expenseEntity),
        ]);
      }),
      map(([expenseEntity, categories, companies]) => {
        return expenseEntity.map<Expense>((entity) => ({
          ...entity,
          company: companies.find((c) => c.id === entity.company),
          category: categories.find(
            (c) => c.id === entity.category,
          ) as ExpenseCategory,
        }));
      }),
    );
  }

  private categoriesRepository(
    expenseEntity: ExpenseEntity[],
  ): Observable<ExpenseCategory[]> {
    const categories: number[] = [];
    expenseEntity.forEach((e) => {
      if (typeof e.category === 'number') {
        categories.push(e.category);
      }
    });

    let categoriesRepository = of([]);

    if (categories.length > 0) {
      categoriesRepository = this.database.bulkGet<ExpenseCategory>(
        VibbraTables.EXPENSE_CATEGORIES,
        categories,
      );
    }

    return categoriesRepository;
  }

  private companiesRepository(
    expenseEntity: ExpenseEntity[],
  ): Observable<Company[]> {
    const companies: number[] = [];
    expenseEntity.forEach((e) => {
      if (typeof e.company === 'number') {
        companies.push(e.company);
      }
    });

    let companiesRepository = of([]);

    if (companies.length > 0) {
      companiesRepository = this.database.bulkGet<Company>(
        VibbraTables.COMPANIES,
        companies,
      );
    }

    return companiesRepository;
  }
}
