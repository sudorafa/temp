import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { VibbraTables } from '../database/tables.enum';
import { Company } from '../../../business/model/vibbra-nfmei.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends DatabaseService<Company> {
  protected override table = VibbraTables.COMPANIES;
  constructor() {
    super();
  }
}
