import { NgModule } from '@angular/core';
import { AuthenticatedUserService } from './services/authenticated-user.service';
import { CompanyService } from './services/company.service';
import { ExpenseCategoryService } from './services/expense-category.service';
import { ExpenseService } from './services/expense.service';
import { InvoiceService } from './services/invoice.service';
import { UserSettingService } from './services/user-setting.service';
import { UserService } from './services/user.service';
import { NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';
import { dbConfig } from './database/database.config';
import { DatabaseService } from './database/database.service';

@NgModule({
  imports: [NgxIndexedDBModule, NgxIndexedDBModule.forRoot(dbConfig)],
  providers: [
    AuthenticatedUserService,
    CompanyService,
    ExpenseCategoryService,
    ExpenseService,
    InvoiceService,
    UserSettingService,
    UserService,
    DatabaseService,
    NgxIndexedDBService,
  ],
})
export class BffModule {}
