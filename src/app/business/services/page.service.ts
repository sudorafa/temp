import { Injectable, signal } from '@angular/core';
import { DefaultPage } from '../model/vibbra-nfmei.model';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  pageData = signal<DefaultPage>({
    icon: '',
    subtitle: '',
    title: '',
  });

  constructor() {}

  setInfoPage(info: DefaultPage): void {
    this.pageData.set(info);
  }
}
