import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { ExpenseCategory } from '../../../business/model/vibbra-nfmei.model';
import { VibbraTables } from '../database/tables.enum';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseCategoryService extends DatabaseService<ExpenseCategory> {
  protected override table = VibbraTables.EXPENSE_CATEGORIES;
  constructor() {
    super();
  }

  getList(): Observable<ExpenseCategory[]> {
    return super
      .getAll()
      .pipe(map((list) => list.filter((category) => !category.archived)));
  }
}
