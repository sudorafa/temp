import { Injectable, inject } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { User, UserSettings } from '../../../business/model/vibbra-nfmei.model';
import { VibbraTables } from '../database/tables.enum';
import { Observable, map, switchMap, tap } from 'rxjs';
import { AuthenticatedUserService } from './authenticated-user.service';

@Injectable({
  providedIn: 'root',
})
export class UserSettingService extends DatabaseService<UserSettings> {
  protected override table = VibbraTables.USER_SETTING;
  private authService = inject(AuthenticatedUserService);

  constructor() {
    super();
  }

  getSettings(): Observable<UserSettings> {
    return this.authService.getLogged().pipe(
      map((user) => user as User),
      switchMap((user) =>
        this.database.getByIndex<UserSettings>(
          VibbraTables.USER_SETTING,
          'user',
          user.id as number,
        ),
      ),
    );
  }
}
