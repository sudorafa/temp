import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSettings } from '../model/vibbra-nfmei.model';
import { UserSettingService as Backend } from '../../backend/bff/services/user-setting.service';

@Injectable({
  providedIn: 'root',
})
export class UserSettingService {
  private settingsBackend = inject(Backend);

  loadSettings(): Observable<UserSettings> {
    return this.settingsBackend.getSettings();
  }

  updateSettings(settings: UserSettings): Observable<UserSettings> {
    return this.settingsBackend.update(settings);
  }
}
