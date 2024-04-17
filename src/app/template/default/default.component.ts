import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterOutlet } from '@angular/router';
import { PageService } from '../../business/services/page.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatDividerModule, MatIconModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent {
  page = inject(PageService).pageData;
  router = inject(Router);

  constructor() {
    setTimeout(() => {
      if (this.page().title === '') {
        this.router.navigate(['/dashboard']);
      }
    }, 200);
  }
}
