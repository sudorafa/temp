import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../business/services/authentication.service';
import { tap } from 'rxjs';

type SettingsItem = {
  action: () => void;
  label: string;
  icon: string;
};

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './settings-menu.component.html',
  styleUrl: './settings-menu.component.scss',
})
export class SettingsMenuComponent {
  private router = inject(Router);
  private authService = inject(AuthenticationService);
  private logoutSubs$ = this.authService.logoutEvent
    .pipe(tap(() => this.router.navigate(['/login'])))
    .subscribe();

  settings: SettingsItem[] = [
    {
      label: 'Preferências',
      icon: 'tune',
      action: () => this.router.navigate(['/settings']),
    },
    {
      label: 'Clientes',
      icon: 'factory',
      action: () => this.router.navigate(['/companies']),
    },
    {
      label: 'Categorias de Despesas',
      icon: 'category',
      action: () => this.router.navigate(['/categories']),
    },
    {
      label: 'Sair',
      icon: 'logout',
      action: () => this.logout(),
    },
  ];

  logout(): void {
    this.authService.logout();
  }
}
