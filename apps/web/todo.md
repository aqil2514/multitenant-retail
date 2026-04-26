Berdasarkan roadmap tadi dan kondisi kamu sebagai solo developer sambilan, yang paling realistis dibangun pertama adalah:

---

**Fase 1 — Auth & Multi-Tenant Foundation**

Karena ini fondasi yang tidak bisa diskip:

```
1. Registrasi & Login (OAuth Google — sudah ada di CRM)
2. Buat Store setelah registrasi
3. Middleware isolasi data per store
4. Settings store dasar (nama warung, alamat, dll)
```

Tanpa ini, semua fitur lain tidak bisa dibangun dengan benar.

---

**Langsung dilanjut Fase 2 — Produk & Penjualan**

Karena ini yang paling sering dipakai setiap hari:

```
1. CRUD Produk (nama, harga, stok)
2. Transaksi Penjualan sederhana
3. Laporan penjualan dasar
```

---

**Kenapa bukan fitur lain dulu:**

- **Finansial** → butuh data transaksi dulu yang jadi sumbernya
- **CRM** → butuh data customer dari transaksi
- **Laporan kompleks** → butuh data yang cukup dulu
- **Mobile/Tauri** → web dulu, mobile belakangan

---

**Urutan konkretnya:**

```
Setup project → Auth → Multi-tenant → Produk → Penjualan
```

Kalau lima hal ini selesai dan berjalan dengan baik di warung kamu sendiri — fondasi sudah cukup kuat untuk lanjut ke fitur berikutnya.

Mau mulai dari setup project sekarang?