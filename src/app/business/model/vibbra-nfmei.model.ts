export type LoginForm = {
  email: string;
  password: string;
};

export type User = {
  id?: number;
  name: string;
  cnpj: string;
  email: string;
  company: string;
  phone: string;
  password: string;
};

export type AuthenticatedUser = {
  id?: number;
  user: User | number;
  logged: 0 | 1;
};

export type Company = {
  id?: number;
  cnpj: string;
  name: string;
  corporateName: string;
  user?: number;
};

export type ExpenseCategory = {
  id?: number;
  user?: number;
  name: string;
  description: string;
  archived: boolean;
};

export type UserSettings = {
  id?: number;
  user: number;
  billingCeil: number;
  emailNotification: boolean;
  smsNotification: boolean;
};

export type InvoiceEntity = {
  id?: number;
  user?: number;
  company: number;
  value: number;
  description: string;
  referenceMonth: Date;
  receivedDate: Date;
};

export type Invoice = {
  id?: number;
  user?: number;
  company?: Company;
  value: number;
  description: string;
  referenceMonth: Date;
  receivedDate: Date;
};

export type ExpenseEntity = {
  id?: number;
  category?: number;
  user?: number;
  company?: number;
  name: string;
  description: string;
  value: number;
  paymentDate: Date;
  referenceDate: Date;
};

export type Expense = {
  id?: number;
  category?: ExpenseCategory;
  user?: number;
  company?: Company;
  name: string;
  description: string;
  value: number;
  paymentDate: Date;
  referenceDate: Date;
};

export type HomeDashboard = {
  invoices: HomeInvoices;
  expenses: number;
  years: number[];
  invoicesAvailable: ChartDefault[];
  invoicesByMonth: ChartWithMonth[];
  expensesByMonth: ChartWithDate[];
  balanceByMonth: ChartWithDate[];
  expensesByCategory: ChartDefault[];
};

export type ChartWithMonth = {
  month: string;
  invoices: number;
  expenses: number;
};

export type ChartDefault = {
  value: number;
  category: string;
};

export type ChartWithDate = ChartDefault & {
  month: string;
};

export type AppearanceType = 'positive' | 'negative' | 'warning';

export type HomeInvoices = {
  current: number;
  available: number;
};

export type HomeInvoicesWithPercent = HomeInvoices & {
  percent: number;
  status: AppearanceType;
};

export type HomeLoadingFlags = {
  invoices: boolean;
  expenses: boolean;
  years: boolean;
  charts: boolean;
};

export type DefaultPage = {
  title: string;
  subtitle: string;
  icon: string;
};
