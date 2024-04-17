import { Component, input, output } from '@angular/core';
import { Company } from '../../../business/model/vibbra-nfmei.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

type FormattedCompany = Company & {
  formattedCnpj: string;
};

@Component({
  selector: 'app-company-item',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgxMaskPipe, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './company-item.component.html',
  styleUrl: './company-item.component.scss',
})
export class CompanyItemComponent {
  showAction = input(true);
  mask = new NgxMaskPipe();
  company = input.required<FormattedCompany, Company>({
    transform: (c) => {
      const formattedCnpj = this.mask.transform(c.cnpj, '00.000.000/0000-00');
      return { ...c, formattedCnpj };
    },
  });
  edit = output();
}
