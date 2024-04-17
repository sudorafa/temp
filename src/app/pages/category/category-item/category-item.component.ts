import { Component, input, output } from '@angular/core';
import { ExpenseCategory } from '../../../business/model/vibbra-nfmei.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss',
})
export class CategoryItemComponent {
  showAction = input(true);
  category = input.required<ExpenseCategory>();
  edit = output();
  archive = output();
}
