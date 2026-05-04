# Feature Inventory

Dokumen ini merangkum fitur yang saat ini sudah tersedia atau sudah memiliki route pada project `apps/web`.

## Gambaran umum

Project ini adalah aplikasi **retail multi-tenant** berbasis web. Indikasi utamanya terlihat dari penggunaan route dinamis `storeSlug`, menu sidebar berbasis toko, modul produk, serta modul keuangan.

## Struktur akses aplikasi

| Area | Route | Status | Catatan |
| --- | --- | --- | --- |
| Landing page | `/` | Placeholder | Saat ini masih menampilkan `Soon`. |
| Login | `/login` | Tersedia | Halaman login sudah ada. |
| Protected area | `/(protected)` | Tersedia | Layout memeriksa autentikasi dan redirect bila perlu. |
| Onboarding toko | `/onboarding` | Tersedia | Digunakan untuk persiapan awal toko. |
| Store workspace | `/:storeSlug/*` | Tersedia | Area kerja utama per toko / tenant. |

## Daftar fitur

| Fitur | Route | Status | Catatan implementasi |
| --- | --- | --- | --- |
| Login | `/login` | Tersedia | Halaman login tersedia dan menjadi pintu masuk utama user. |
| Validasi akses private | `/(protected)` | Tersedia | User tanpa autentikasi diarahkan ke login. |
| Validasi kepemilikan toko | `/(protected)` | Tersedia | User tanpa toko diarahkan ke onboarding. |
| Onboarding toko | `/onboarding` | Tersedia | Sudah ada halaman persiapan / setup toko. |
| Dashboard toko | `/:storeSlug/dashboard` | Placeholder | Route tersedia, tetapi isi halaman masih sangat minimal. |
| List produk | `/:storeSlug/products/list` | Tersedia | Sudah ada halaman khusus daftar produk. |
| Kategori produk | `/:storeSlug/products/category` | Tersedia | Sudah ada halaman khusus kategori produk. |
| Daftar akun | `/:storeSlug/finance/accounts` | Tersedia | Modul keuangan untuk chart of accounts sudah ada. |
| Jurnal umum | `/:storeSlug/finance/journals` | Tersedia | Modul pencatatan jurnal sudah tersedia. |
| Buku besar | `/:storeSlug/finance/ledger` | Tersedia | Modul pelaporan / penelusuran ledger sudah tersedia. |
| Audit log | `/:storeSlug/general/audit-logs` | Tersedia | Riwayat aktivitas sistem sudah memiliki halaman sendiri. |
| Pengaturan toko | `/:storeSlug/settings/store` | Tersedia | Pengaturan data toko sudah memiliki halaman sendiri. |

## Bukti route utama

### 1. Login
- File: `src/app/(auth)/login/page.tsx`
- Judul halaman: `Login`

### 2. Protected layout
- File: `src/app/(protected)/layout.tsx`
- Fungsi utama:
  - memeriksa autentikasi user
  - redirect ke `/login` bila belum login
  - redirect ke `/onboarding` bila user belum memiliki toko

### 3. Workspace per toko
- File: `src/app/(protected)/[storeSlug]/layout.tsx`
- Fungsi utama:
  - membungkus area aplikasi dengan sidebar dan header
  - menjadi shell utama halaman internal toko

### 4. Modul produk
- List produk: `src/app/(protected)/[storeSlug]/products/list/page.tsx`
- Kategori produk: `src/app/(protected)/[storeSlug]/products/category/page.tsx`

### 5. Modul keuangan
- Daftar akun: `src/app/(protected)/[storeSlug]/finance/accounts/page.tsx`
- Jurnal umum: `src/app/(protected)/[storeSlug]/finance/journals/page.tsx`
- Buku besar: `src/app/(protected)/[storeSlug]/finance/ledger/page.tsx`

### 6. Modul audit dan pengaturan
- Audit log: `src/app/(protected)/[storeSlug]/general/audit-logs/page.tsx`
- Pengaturan toko: `src/app/(protected)/[storeSlug]/settings/store/page.tsx`

## Kesimpulan

Fitur yang paling jelas sudah terbentuk adalah:
- autentikasi dan proteksi akses,
- onboarding toko,
- master data produk,
- akuntansi dasar,
- audit log,
- serta pengaturan toko.

Bagian yang masih terlihat belum selesai terutama:
- landing page root `/`,
- dan dashboard `/:storeSlug/dashboard`.
