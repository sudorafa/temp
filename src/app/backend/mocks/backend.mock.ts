import {
  Company,
  ExpenseCategory,
  ExpenseEntity,
  InvoiceEntity,
} from '../../business/model/vibbra-nfmei.model';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { generate } from 'cnpj';

const categoriesMock: ExpenseCategory[] = [
  {
    archived: false,
    description: 'Pagamento de Aluguel do Escritório',
    name: 'Aluguel',
  },
  {
    archived: false,
    description: 'Pagamento do Plano de Internet',
    name: 'Internet',
  },
  {
    archived: false,
    description: 'Despesas com Energia Elétrica',
    name: 'Energia Elétrica',
  },
  { archived: false, description: 'Pagamento de Salários', name: 'Salários' },
  {
    archived: false,
    description: 'Manutenção e Reparos de Equipamentos',
    name: 'Manutenção de Equipamentos',
  },
  {
    archived: false,
    description: 'Pagamento de Licenças de Software',
    name: 'Licenças de Software',
  },
  {
    archived: false,
    description: 'Despesas com Equipamentos de TI',
    name: 'Equipamentos de TI',
  },
  {
    archived: false,
    description: 'Serviços de Consultoria em TI',
    name: 'Consultoria em TI',
  },
  {
    archived: false,
    description: 'Pagamento de Servidores Cloud',
    name: 'Servidores Cloud',
  },
  {
    archived: false,
    description: 'Despesas com Telefonia',
    name: 'Telefonia',
  },
];

const companiesMock = Array(20)
  .fill(null)
  .map((_): Company => {
    const companyType = ['ME', 'SA', 'LTDA', 'EIRELI', 'MEI'];
    const typeIndex = Math.round(Math.random() * companyType.length);
    const name = faker.company.name();
    const corporateName = `${name} ${companyType[typeIndex]}`;
    const cnpj = generate();
    return {
      name,
      corporateName,
      cnpj,
    };
  });

const years = [2022, 2023, 2024];
const invoicesMonths = Array(12)
  .fill(null)
  .map((m, i) => i);
const invoicesMock: InvoiceEntity[] = [];
const expensesMock: ExpenseEntity[] = [];
const today = new Date();
years.map((year) => {
  invoicesMonths.map((month) => {
    const nfQuantity = Math.ceil(Math.random() * 3);
    Array(nfQuantity)
      .fill(null)
      .map((_) => {
        const randomDay = Math.round(Math.random() * 29);
        const day = new Date(year, month, randomDay);
        if (day.getTime() > today.getTime()) {
          if (day.getMonth() > today.getMonth()) {
            return;
          }
          day.setDate(Math.round(Math.random() * today.getDate()));
        }
        invoicesMock.push({
          company: Math.round(Math.random() * companiesMock.length),
          description: faker.commerce.productDescription(),
          value: parseFloat(
            faker.commerce.price({ min: 250, max: 2500, dec: 2 }),
          ),
          referenceMonth: day,
          receivedDate: day,
        });
        const qtdExpenses = Math.ceil(Math.random() * 5);
        for (let i = 0; i < qtdExpenses; i++) {
          expensesMock.push({
            description: faker.commerce.productDescription(),
            name: faker.commerce.product(),
            value: parseFloat(
              faker.commerce.price({ min: 20, max: 400, dec: 2 }),
            ),
            referenceDate: day,
            paymentDate: day,
            company: Math.round(Math.random() * companiesMock.length),
            category: Math.round(Math.random() * categoriesMock.length),
          });
        }
      });
  });
});

const mocks = {
  categoriesMock,
  companiesMock,
  invoicesMock,
  expensesMock,
};

export default mocks;
