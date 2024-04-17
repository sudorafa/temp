import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { transformDisplayDate } from '../../../utils/date.functions';
import { AppearanceType } from '../../../business/model/vibbra-nfmei.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  currency = new CurrencyPipe('pt-BR');

  appearance = input.required<AppearanceType>();
  icon = input.required<string>();
  title = input.required<string>();
  displayDate = input.required<string, Date>({
    transform: transformDisplayDate,
  });
  value = input.required<string, number>({
    transform: (v) => this.currency.transform(v, 'BRL') as string,
  });
}
