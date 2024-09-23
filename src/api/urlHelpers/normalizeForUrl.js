export const normalizeForUrl = (str) => {
  const normalizedString = str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .toLowerCase();
  return normalizedString.replace(/--+/g, '-').trim();
}