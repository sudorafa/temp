import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { InvoiceService } from '../../backend/bff/services/invoice.service';
import { ExpenseService } from '../../backend/bff/services/expense.service';
import {
  BehaviorSubject,
  Subject,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import {
  ChartWithMonth,
  ExpenseEntity,
  HomeDashboard,
  InvoiceEntity,
  UserSettings,
} from '../model/vibbra-nfmei.model';
import { UserSettingService } from '../../backend/bff/services/user-setting.service';
import {
  dateToMonthLiteral,
  portuguesMonths,
} from '../../utils/date.functions';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private invoiceService = inject(InvoiceService);
  private expenseService = inject(ExpenseService);
  private settingService = inject(UserSettingService);
  private destroyRef = inject(DestroyRef);

  dashboardEvent = new Subject<number>();
  dashboardList = new BehaviorSubject<HomeDashboard>({
    expenses: 0,
    years: [],
    invoices: {
      available: 0,
      current: 0,
    },
    balanceByMonth: [],
    expensesByCategory: [],
    expensesByMonth: [],
    invoicesAvailable: [],
    invoicesByMonth: [],
  });

  currentYear = signal(new Date().getFullYear());

  dashboard$ = this.dashboardEvent
    .pipe(
      tap((year) => this.currentYear.set(year)),
      switchMap(() => this.settingService.getSettings()),
      switchMap((settings) =>
        forkJoin<[InvoiceEntity[], ExpenseEntity[], UserSettings]>([
          this.invoiceService.getAll(),
          this.expenseService.getAll(),
          of(settings),
        ]),
      ),
      map(([invoices, expenses, settings]) => {
        let invoicesTotal = 0;
        const invoicesByMonth = new Map<string, number>();
        const expensesByMonth = new Map<string, number>();
        portuguesMonths.forEach((m) => {
          invoicesByMonth.set(m, 0);
          expensesByMonth.set(m, 0);
        });
        invoices.forEach(({ value, receivedDate }) => {
          const toSum = this.sumOnlyCurrentMonthYear(receivedDate, value);
          invoicesTotal += toSum;
          if (receivedDate.getFullYear() === this.currentYear()) {
            const month = dateToMonthLiteral(receivedDate);
            const toAddValue = invoicesByMonth.get(month) as number;
            invoicesByMonth.set(month, toAddValue + value);
          }
        });

        let expensesTotal = 0;
        expenses.forEach(({ value, paymentDate }) => {
          expensesTotal += this.sumOnlyCurrentMonthYear(paymentDate, value);
          if (paymentDate.getFullYear() === this.currentYear()) {
            const month = dateToMonthLiteral(paymentDate);
            const toAddValue = expensesByMonth.get(month) as number;
            expensesByMonth.set(month, toAddValue + value);
          }
        });

        const invoicesByMonthArr: ChartWithMonth[] = [];
        invoicesByMonth.forEach((v, k) => {
          invoicesByMonthArr.push({
            invoices: v,
            month: k,
            expenses: expensesByMonth.get(k) as number,
          });
        });

        const billingCeil = settings.billingCeil / 12;

        return {
          years: [2022, 2023, 2024],
          expenses: expensesTotal,
          invoices: {
            current: invoicesTotal,
            available: billingCeil - invoicesTotal,
          },
          invoicesByMonth: invoicesByMonthArr,
          balanceByMonth: [],
          expensesByCategory: [],
          expensesByMonth: [],
          invoicesAvailable: [],
        };
      }),
      tap((homeDashboard) => this.dashboardList.next(homeDashboard)),
    )
    .subscribe();

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.dashboard$.unsubscribe;
      this.dashboardEvent.unsubscribe();
    });
  }

  loadDashboard(year: number): void {
    this.dashboardEvent.next(year);
  }

  sumOnlyCurrentMonthYear(date: Date, value: number): number {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    if (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
      return value;
    }
    return 0;
  }
}
