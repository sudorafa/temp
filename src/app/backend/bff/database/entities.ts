import { ObjectStoreMeta } from 'ngx-indexed-db';
import { VibbraTables } from './tables.enum';

export const userSchema: ObjectStoreMeta = {
  store: VibbraTables.USERS,
  storeConfig: {
    keyPath: 'id',
    autoIncrement: true,
    unique: true,
  },
  storeSchema: [
    { name: 'email', keypath: 'email', options: { unique: true } },
    { name: 'cnpj', keypath: 'cnpj', options: { unique: false } },
    { name: 'name', keypath: 'name', options: { unique: false } },
    { name: 'company', keypath: 'company', options: { unique: false } },
    { name: 'phone', keypath: 'phone', options: { unique: false } },
    { name: 'password', keypath: 'password', options: { unique: false } },
  ],
};

export const authenticatedUserSchema: ObjectStoreMeta = {
  store: VibbraTables.AUTHENTICATED_USERS,
  storeConfig: {
    keyPath: 'id',
    autoIncrement: true,
    unique: true,
  },
  storeSchema: [
    { name: 'user', keypath: 'user', options: { unique: false } },
    { name: 'logged', keypath: 'logged', options: { unique: false } },
  ],
};

export const companySchema: ObjectStoreMeta = {
  store: VibbraTables.COMPANIES,
  storeConfig: {
    keyPath: 'id',
    autoIncrement: true,
    unique: true,
  },
  storeSchema: [
    { name: 'user', keypath: 'user', options: { unique: false } },
    { name: 'cnpj', keypath: 'cnpj', options: { unique: false } },
    { name: 'name', keypath: 'name', options: { unique: false } },
    {
      name: 'corporateName',
      keypath: 'corporateName',
      options: { unique: false },
    },
  ],
};

export const expenseCategorySchema: ObjectStoreMeta = {
  store: VibbraTables.EXPENSE_CATEGORIES,
  storeConfig: {
    keyPath: 'id',
    autoIncrement: true,
    unique: true,
  },
  storeSchema: [
    { name: 'user', keypath: 'user', options: { unique: false } },
    { name: 'name', keypath: 'name', options: { unique: false } },
    { name: 'description', keypath: 'description', options: { unique: false } },
    { name: 'archived', keypath: 'archived', options: { unique: false } },
  ],
};

export const userSettingsSchema: ObjectStoreMeta = {
  store: VibbraTables.USER_SETTING,
  storeConfig: {
    keyPath: 'id',
    autoIncrement: true,
    unique: true,
  },
  storeSchema: [
    { name: 'user', keypath: 'user', options: { unique: true } },
    {
      name: 'billingCeil',
      keypath: 'billingCeil',
      options: { unique: false },
    },
    {
      name: 'emailNotification',
      keypath: 'emailNotification',
      options: { unique: false },
    },
    {
      name: 'smsNotification',
      keypath: 'smsNotification',
      options: { unique: false },
    },
  ],
};

export const invoiceSchema: ObjectStoreMeta = {
  store: VibbraTables.INVOICES,
  storeConfig: {
    keyPath: 'id',
    autoIncrement: true,
    unique: true,
  },
  storeSchema: [
    { name: 'user', keypath: 'user', options: { unique: false } },
    { name: 'company', keypath: 'company', options: { unique: false } },
    { name: 'value', keypath: 'value', options: { unique: false } },
    { name: 'description', keypath: 'description', options: { unique: false } },
    {
      name: 'referenceMonth',
      keypath: 'referenceMonth',
      options: { unique: false },
    },
    {
      name: 'receivedDate',
      keypath: 'receivedDate',
      options: { unique: false },
    },
  ],
};

export const expenseSchema: ObjectStoreMeta = {
  store: VibbraTables.EXPENSES,
  storeConfig: {
    keyPath: 'id',
    autoIncrement: true,
    unique: true,
  },
  storeSchema: [
    { name: 'user', keypath: 'user', options: { unique: false } },
    { name: 'name', keypath: 'name', options: { unique: false } },
    { name: 'category', keypath: 'category', options: { unique: false } },
    { name: 'description', keypath: 'description', options: { unique: false } },
    { name: 'value', keypath: 'value', options: { unique: false } },
    {
      name: 'paymentDate',
      keypath: 'paymentDate',
      options: { unique: false },
    },
    {
      name: 'referenceDate',
      keypath: 'referenceDate',
      options: { unique: false },
    },
    {
      name: 'company',
      keypath: 'company',
      options: { unique: false },
    },
  ],
};

export const schemas: ObjectStoreMeta[] = [
  userSchema,
  authenticatedUserSchema,
  companySchema,
  expenseCategorySchema,
  userSettingsSchema,
  invoiceSchema,
  expenseSchema,
];
