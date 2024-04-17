import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserSettingService } from '../../business/services/user-setting.service';
import { UserSettings } from '../../business/model/vibbra-nfmei.model';
import { Subject, distinctUntilChanged, switchMap } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatSlideToggleModule,
    NgxMaskDirective,
    CurrencyPipe,
  ],
  providers: [provideNgxMask()],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  currency = new CurrencyPipe('pt-BR');

  settings = signal<UserSettings>({
    billingCeil: 81_000,
    emailNotification: false,
    smsNotification: false,
    user: 0,
    id: 0,
  });

  billingCeil = new FormControl(1, [Validators.required, Validators.min(1)]);

  settingService = inject(UserSettingService);
  settings$ = this.settingService.loadSettings().subscribe((settings) => {
    this.settings.set(settings);
    this.billingCeil.setValue(settings.billingCeil);
  });

  updateQuery = new Subject<UserSettings>();
  update$ = this.updateQuery
    .pipe(
      distinctUntilChanged(),
      switchMap((settings) => this.settingService.updateSettings(settings)),
    )
    .subscribe();

  update(value: any): void {
    this.settings.update((s) => {
      const updated = {
        ...s,
        ...value,
      };
      this.updateQuery.next(updated);
      return updated;
    });
  }
}
