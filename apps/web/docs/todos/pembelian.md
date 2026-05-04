# 📋 Todo — Modul Pembelian

## Supplier
- [ ] List Supplier
- [X] Tambah Supplier
- [ ] Edit Supplier
- [ ] Hapus Supplier

## Purchase Order (PO)
- [ ] List PO
- [ ] Buat PO (pilih supplier, produk, qty, harga)
- [ ] Detail PO
- [ ] Edit PO (selama belum diterima)
- [ ] Batalkan PO
- [ ] Status PO (Draft → Dikirim → Sebagian Diterima → Selesai)

## Penerimaan Barang
- [ ] List Penerimaan
- [ ] Terima Barang dari PO (full / sebagian)
- [ ] Detail Penerimaan
- [ ] Stok otomatis bertambah saat penerimaan
- [ ] Jurnal otomatis saat penerimaan:
  - Debit: Persediaan Barang
  - Kredit: Hutang Dagang / Kas

## Retur Pembelian
- [ ] List Retur
- [ ] Buat Retur (dari penerimaan)
- [ ] Stok otomatis berkurang saat retur
- [ ] Jurnal otomatis saat retur:
  - Debit: Hutang Dagang / Kas
  - Kredit: Persediaan Barang

## Hutang Supplier
- [ ] List Hutang per Supplier
- [ ] Pembayaran Hutang
- [ ] Jurnal otomatis saat bayar hutang:
  - Debit: Hutang Dagang
  - Kredit: Kas / Bank