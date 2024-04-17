import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

type MenuItem = {
  path: string[];
  label: string;
  icon: string;
};

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  menu: MenuItem[] = [
    {
      label: 'Dashboard',
      path: ['/dashboard'],
      icon: 'dashboard',
    },
    {
      label: 'Notas Fiscais',
      path: ['/invoices'],
      icon: 'receipt-long',
    },
    {
      label: 'Despesas',
      path: ['/expenses'],
      icon: 'account_balance_wallet',
    },
  ];
}
