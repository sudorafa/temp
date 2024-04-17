import { DefaultPage } from '../model/vibbra-nfmei.model';

const routerDataMap = new Map<string, DefaultPage>();
routerDataMap.set('/settings', {
  title: 'Preferências',
  subtitle: 'Configure aqui notificações, valores e suas informações',
  icon: 'tune',
});

routerDataMap.set('/categories', {
  title: 'Categorias de despesas',
  subtitle: 'Organize suas despesas usando categorias',
  icon: 'category',
});

routerDataMap.set('/companies', {
  title: 'Empresas parceiras',
  subtitle: 'Gerenciamento de clientes e parceiros',
  icon: 'factory',
});

routerDataMap.set('/invoices', {
  title: 'Notas ficais',
  subtitle: 'Gerenciamento de notas ficais',
  icon: 'receipt-long',
});

routerDataMap.set('/expenses', {
  title: 'Despesas',
  subtitle: 'Gerenciamento de despesas',
  icon: 'account_balance_wallet',
});

export const getRouterData = (url: string): DefaultPage | undefined => {
  if (routerDataMap.has(url)) {
    return routerDataMap.get(url);
  }
  return undefined;
};
