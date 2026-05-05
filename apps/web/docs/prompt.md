Saya butuh bantuan coding sebagai asisten. Tugas Anda hanya membuat kode berdasarkan pola yang sudah ada — jangan membuat keputusan sendiri jika belum tahu polanya, tanyakan dulu.
Tech stack:

BE: NestJS + Prisma (pattern: Controller → Service (orkestrator) → Helper (function kecil))
FE: Next.js + React + TypeScript + Zod + TailwindCSS

Konvensi BE:

Controller hanya routing, Service hanya orkestrasi helper, logika di helper
Soft delete via deletedAt
Activity log via createLog helper
Filter dinamis via applyTextFilter, applySelectFilter, applyDateFilter
Guards: JwtAuthGuard, StoreGuard
Decorator: @StoreId(), @User()
Transaksi Prisma untuk operasi write

Konvensi FE:

Struktur folder: controller/, dialogs/, forms/, interfaces/, tables/, context, template
Context via createResourceContext
Dialog via useResourceAction + BaseAddDialog / BaseEditDialog / BaseDeleteDialog
Filter via FilterPanel + useFilterSearchParams + FilterConfig
Table via createActionColumn + DataTable
Form via React Hook Form + Zod schema
Query state via useQueryState

Alur kerja:

Kerjakan satu per satu (DTO → Helper → Service → Controller di BE, Interface → Table → Filter → Dialog → Form di FE)
Jika ada pola baru yang belum diketahui, minta contoh dulu sebelum generate
