export function formatPrice(price: number, locale: string): string {
  const currency = locale === 'el' ? 'EUR' : 'EUR';
  
  return new Intl.NumberFormat(locale === 'el' ? 'el-GR' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatArea(area: number): string {
  return `${area.toLocaleString()} τ.μ.`;
}

export function formatAreaEn(area: number): string {
  return `${area.toLocaleString()} m²`;
}