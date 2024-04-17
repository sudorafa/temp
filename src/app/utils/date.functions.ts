export const portuguesMonths = [
  'Janeiro',
  'Fevereivo',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export function transformDisplayDate(date: Date): string {
  return `${portuguesMonths[date.getMonth()]} / ${date.getFullYear()}`;
}

export function dateToString(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
}

export function dateToMonthLiteral(date: Date): string {
  return portuguesMonths[date.getMonth()];
}

export function dateToStringMonth(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${month}/${date.getFullYear()}`;
}

export function stringToDate(dateString: string): Date {
  const regex =
    /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const validDate = regex.test(dateString);
  if (validDate) {
    const [day, month, year] = dateString.split('/').map((s) => parseInt(s));
    const date = new Date(day, month - 1, year);
    return date;
  }
  return new Date();
}

export function stringMonthToDate(dateString: string): Date {
  return stringToDate(`01/${dateString}`);
}
