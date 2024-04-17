import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SettingsMenuComponent } from '../settings-menu/settings-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenuComponent,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    RouterModule,
    SettingsMenuComponent,
  ],
  template: `
    <img src="assets/images/logo.png" />
    <app-menu></app-menu>
    <app-settings-menu></app-settings-menu>
  `,
  styles: `
    :host {
      display: flex;
      width: 100%;
      align-items: center;
      box-shadow: 0px 0px 10px var(--dark-color);
      position: fixed;
      top: 0;
      background-color: var(--light-color);
      z-index: 1;

      img {
        width: 120px;
        margin-right: auto;
      }

      @media (min-width: 768px) {
        app-settings-menu {
          margin-left: auto;
        }
      }
    }
  `,
})
export class HeaderComponent {}
