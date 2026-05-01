/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { formatDate } from './format-date';

/**
 * Mapping label untuk setiap field dari tipe `T`.
 * Digunakan untuk mengganti nama field teknis menjadi label yang lebih mudah dibaca.
 *
 * @example
 * // { name: 'Nama', parentId: 'Kategori Induk' }
 */
type FieldLabel<T> = { [K in keyof T]?: string };

/**
 * Mapping resolver untuk field-field tertentu dari tipe `T`.
 * Digunakan untuk mengubah nilai mentah (misal: UUID) menjadi representasi
 * yang lebih mudah dibaca (misal: nama kategori).
 *
 * @example
 * // { parentId: async (id) => category.findUnique(id)?.name ?? '-' }
 */
type ResolverMap<T> = {
  [K in keyof T]?: (value: unknown) => Promise<string> | string;
};

/**
 * Opsi untuk fungsi `detectChanges`.
 *
 * @template T - Tipe objek yang dibandingkan
 */
interface DetectChangesOptions<T extends object> {
  /** Data sebelum perubahan */
  before: T;
  /** Data setelah perubahan */
  after: T;
  /**
   * Label untuk setiap field. Jika tidak diisi, nama field akan digunakan sebagai label.
   *
   * @example
   * labels: { name: 'Nama', parentId: 'Kategori Induk' }
   */
  labels?: FieldLabel<T>;
  /**
   * Resolver untuk mengubah nilai field menjadi string yang lebih readable.
   * Berguna untuk field yang menyimpan UUID atau kode referensi.
   *
   * @example
   * resolvers: {
   *   parentId: async (id) => {
   *     const parent = await prisma.productCategory.findUnique({ where: { id } });
   *     return parent?.name ?? 'Tidak ada';
   *   }
   * }
   */
  resolvers?: ResolverMap<T>;
  /**
   * Daftar field yang diabaikan saat perbandingan.
   *
   * @example
   * exclude: ['id', 'createdAt', 'updatedAt']
   */
  exclude?: (keyof T)[];
}

/**
 * Hasil dari fungsi `detectChanges`.
 */
interface ChangeResult {
  /** `true` jika ada minimal satu field yang berubah */
  hasChanges: boolean;
  /**
   * Kumpulan perubahan dalam format `label: "sebelum → sesudah"`.
   *
   * @example
   * // { 'Nama': '"Minuman" → "Minuman Dingin"', 'Kategori Induk': '"Tidak ada" → "Makanan"' }
   */
  changes: Record<string, string>;
}

/**
 * Mendeteksi perubahan antara dua objek dan mengembalikan daftar field yang berubah
 * beserta nilai sebelum dan sesudahnya dalam format yang mudah dibaca.
 *
 * @template T - Tipe objek yang dibandingkan
 * @param options - Opsi konfigurasi perbandingan
 * @returns Objek berisi `hasChanges` dan `changes`
 *
 * @example
 * const { hasChanges, changes } = await detectChanges({
 *   before: oldCategory,
 *   after: newCategory,
 *   exclude: ['id', 'storeId', 'createdAt', 'updatedAt'],
 *   labels: {
 *     name: 'Nama',
 *     description: 'Deskripsi',
 *     parentId: 'Kategori Induk',
 *   },
 *   resolvers: {
 *     parentId: async (id) => {
 *       if (!id) return 'Tidak ada';
 *       const parent = await prisma.productCategory.findUnique({ where: { id } });
 *       return parent?.name ?? 'Tidak diketahui';
 *     },
 *   },
 * });
 *
 * // hasChanges: true
 * // changes: { 'Nama': '"Minuman" → "Minuman Dingin"' }
 */
export async function detectChanges<T extends object>(
  options: DetectChangesOptions<T>,
): Promise<ChangeResult> {
  const {
    before,
    after,
    labels = {} as FieldLabel<T>,
    resolvers = {} as ResolverMap<T>,
    exclude = [],
  } = options;

  const changes: Record<string, string> = {};
  const keys = Object.keys(after) as (keyof T)[];

  /**
   * Mengubah nilai apapun menjadi string yang aman untuk ditampilkan.
   * - `null` / `undefined` → `'-'`
   * - `Date` → format tanggal lokal
   * - `object` → JSON string
   * - `string`, `number`, `boolean` → nilai aslinya
   */
  const format = (val: unknown): string => {
    if (val === null || val === undefined) return '-';
    if (val instanceof Date)
      return formatDate(val, 'Senin, 29 Desember 2025, 09:21');
    if (typeof val === 'object') return JSON.stringify(val);
    if (typeof val === 'string') return val;
    if (typeof val === 'number' || typeof val === 'boolean') return String(val);
    return '-';
  };

  for (const key of keys) {
    if (exclude.includes(key)) continue;

    const beforeVal = before[key];
    const afterVal = after[key];

    if (beforeVal === afterVal) continue;

    const label = labels[key] ?? String(key);
    const resolver = resolvers[key];

    if (resolver) {
      const [beforeStr, afterStr] = await Promise.all([
        resolver(beforeVal),
        resolver(afterVal),
      ]);
      changes[label] = `"${beforeStr}" → "${afterStr}"`;
    } else {
      changes[label] = `"${format(beforeVal)}" → "${format(afterVal)}"`;
    }
  }

  return {
    hasChanges: Object.keys(changes).length > 0,
    changes,
  };
}
