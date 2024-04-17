import { Routes } from '@angular/router';
import {
  isNotUserAuthenticated,
  isUserAuthenticated,
} from './secutiry/user.activate';

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    canActivate: [isNotUserAuthenticated],
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    pathMatch: 'full',
    canActivate: [isNotUserAuthenticated],
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: 'not-found',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./template/main/main.component').then((m) => m.MainComponent),
    children: [
      {
        path: 'dashboard',
        pathMatch: 'full',
        canActivate: [isUserAuthenticated],
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: '',
        pathMatch: 'prefix',
        loadComponent: () =>
          import('./template/default/default.component').then(
            (m) => m.DefaultComponent,
          ),
        children: [
          {
            path: 'settings',
            pathMatch: 'full',
            canActivate: [isUserAuthenticated],
            loadComponent: () =>
              import('./pages/settings/settings.component').then(
                (m) => m.SettingsComponent,
              ),
          },
          {
            path: 'companies',
            pathMatch: 'full',
            canActivate: [isUserAuthenticated],
            loadComponent: () =>
              import('./pages/company/companies.component').then(
                (m) => m.CompaniesComponent,
              ),
          },
          {
            path: 'categories',
            pathMatch: 'full',
            canActivate: [isUserAuthenticated],
            loadComponent: () =>
              import('./pages/category/category.component').then(
                (m) => m.CategoryComponent,
              ),
          },
          {
            path: 'invoices',
            pathMatch: 'full',
            canActivate: [isUserAuthenticated],
            loadComponent: () =>
              import('./pages/invoice/invoice.component').then(
                (m) => m.InvoiceComponent,
              ),
          },
          {
            path: 'expenses',
            pathMatch: 'full',
            canActivate: [isUserAuthenticated],
            loadComponent: () =>
              import('./pages/expense/expense.component').then(
                (m) => m.ExpenseComponent,
              ),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
