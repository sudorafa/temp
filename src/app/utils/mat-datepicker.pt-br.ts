import { Injectable } from '@angular/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';

@Injectable()
export class MatDatepickerPtBR extends MatDatepickerIntl {
  override calendarLabel: string = 'Calendar Label';
  override closeCalendarLabel: string = 'CLose Label';
  override nextMonthLabel: string = 'Próximo Mês Label';
  override nextMultiYearLabel: string = 'Próximo Multi Ano Label';
  override nextYearLabel: string = 'Próximo Ano Label';
  override openCalendarLabel: string = 'Abrir Calendario Label';
  override prevMonthLabel: string = 'Mês anterior Label';
  override prevMultiYearLabel: string = 'PRevio Multi Ano Label';
  override prevYearLabel: string = 'PRevio Ano Label';
  override switchToMonthViewLabel: string = 'Troca de Mes View';
  override switchToMultiYearViewLabel: string = 'Troca de Multi Ano View';

  override formatYearRange(start: string, end: string): string {
    return `${start} até ${end}`;
  }
}
