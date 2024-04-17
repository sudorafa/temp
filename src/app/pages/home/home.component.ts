import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CardComponent } from './card/card.component';
import { HomeDashboard } from '../../business/model/vibbra-nfmei.model';
import { HomeTopComponent } from './home-top/home-top.component';
import { DashboardService } from '../../business/services/dashboard.service';
import { Subscription, tap } from 'rxjs';
import { HomeChartsComponent } from './home-charts/home-charts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, HomeTopComponent, HomeChartsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  dashboardService = inject(DashboardService);
  destroyRef = inject(DestroyRef);

  dashboard = signal<HomeDashboard>({
    invoices: {
      available: 0,
      current: 0,
    },
    expenses: 0,
    years: [2024, 2023, 2022],
    balanceByMonth: [],
    expensesByCategory: [],
    expensesByMonth: [],
    invoicesAvailable: [],
    invoicesByMonth: [],
  });

  years: number[] = [];

  today = signal<Date>(new Date());

  dashboard$ = this.dashboardService.dashboardList
    .pipe(
      tap((dashboard) => this.dashboard.set(dashboard)),
      tap((dashboard) => {
        if (this.years.length === 0) {
          this.years = dashboard.years;
        }
      }),
    )
    .subscribe();

  subs$: Subscription[] = [];

  constructor() {
    this.destroyRef.onDestroy(() => this.subs$.map((s) => s.unsubscribe));
    this.changeYear(new Date().getFullYear());
  }

  changeYear(year: number): void {
    this.dashboardService.loadDashboard(year);
  }
}
