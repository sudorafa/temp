import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BffModule } from './backend/bff/bff.module';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from './backend/bff/database/database.config';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MAT_DATE_LOCALE } from '@angular/material/core';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig)),
    provideEnvironmentNgxMask(maskConfig),
    [
      { provide: LOCALE_ID, useValue: 'pt-BR' },
      { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    ],
    BffModule,
  ],
};
