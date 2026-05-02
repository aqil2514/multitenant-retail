interface FormatRupiahOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  fallback?: string;
}

export function formatRupiah(
  value: string | number | null | undefined,
  options: FormatRupiahOptions = {},
): string {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    fallback = '-',
  } = options;

  if (value === null || value === undefined) return fallback;

  const number = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(number)) return fallback;

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(number);
}