import { Component, input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import {
  AppearanceType,
  HomeInvoices,
  HomeInvoicesWithPercent,
} from '../../../business/model/vibbra-nfmei.model';

@Component({
  selector: 'app-home-top',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home-top.component.html',
  styleUrl: './home-top.component.scss',
})
export class HomeTopComponent {
  today = input.required<Date>();
  invoices = input.required<HomeInvoicesWithPercent, HomeInvoices>({
    transform: (i) => {
      const percent = (i.current / (i.available + i.current)) * 100;
      let status: AppearanceType = 'positive';
      if (percent >= 80) {
        status = 'warning';
      }

      if (percent >= 100) {
        status = 'negative';
      }

      return {
        ...i,
        percent,
        status,
      };
    },
  });

  expenses = input.required<number>();
}
