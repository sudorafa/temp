import { Component, input, output } from '@angular/core';
import { HomeDashboard } from '../../../business/model/vibbra-nfmei.model';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChartDefaultComponent } from '../../../components/chart-default/chart.default.component';

@Component({
  selector: 'app-home-charts',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    ChartDefaultComponent,
    MatSelectModule,
  ],
  templateUrl: './home-charts.component.html',
  styleUrl: './home-charts.component.scss',
})
export class HomeChartsComponent {
  dashboard = input.required<HomeDashboard, HomeDashboard>({
    transform: (dashboard) => {
      this.selectedYear.setValue([...dashboard.years].pop() as number);
      return dashboard;
    },
  });

  selectedYear = new FormControl<number>(new Date().getFullYear());

  monthsChartSeries = [
    {
      legend: 'Receitas',
      property: 'invoices',
      color: '#85bb30',
    },
    {
      legend: 'Despesas',
      property: 'expenses',
      color: '#bf0202',
    },
  ];

  years = input.required<number[]>();
  changeYear = output<number>();
}
