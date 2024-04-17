import { Injectable, inject } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, map, of, switchMap } from 'rxjs';
import { VibbraTables } from './tables.enum';
import {
  AuthenticatedUser,
  User,
} from '../../../business/model/vibbra-nfmei.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService<T> {
  protected table!: VibbraTables;
  protected database = inject(NgxIndexedDBService);

  constructor() {}

  create(entity: T): Observable<T> {
    return this.database
      .add<T>(this.table, entity)
      .pipe(map((key) => ('id' in key ? { ...key } : { ...entity, id: key })));
  }

  update(entity: T): Observable<T> {
    return this.database.update<T>(this.table, entity);
  }

  getById(id: number): Observable<T> {
    return this.database.getByID<T>(this.table, id);
  }

  getAll(): Observable<T[]> {
    return this.database.getAll<T>(this.table);
  }

  remove(id: number): Observable<T[]> {
    return this.database.delete<T>(this.table, id);
  }

  getUser(): Observable<number> {
    return this.database
      .getByIndex<AuthenticatedUser>(
        VibbraTables.AUTHENTICATED_USERS,
        'logged',
        1,
      )
      .pipe(map(({ user }) => user as number));
  }
}
