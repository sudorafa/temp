import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { getRouterData } from './business/config/router-data.config';
import { PageService } from './business/services/page.service';
import { filter, map, tap } from 'rxjs';
import { DefaultPage } from './business/model/vibbra-nfmei.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
  styles: ``,
})
export class AppComponent {
  private router = inject(Router);
  private pageService = inject(PageService);

  routerSub$ = this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event as NavigationEnd),
      map(({ url }) => getRouterData(url)),
      filter((data) => data !== undefined && 'title' in data),
      map((data) => data as DefaultPage),
      tap((data) => this.pageService.setInfoPage(data)),
    )
    .subscribe();

  constructor() {}
}
