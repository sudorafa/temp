import { DBConfig } from 'ngx-indexed-db';
import { schemas } from './entities';

export const dbConfig: DBConfig  = {
  name: 'vibbra-nfmei',
  version: 1,
  objectStoresMeta: schemas
};
