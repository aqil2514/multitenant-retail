User login
    │
    ├── Generate access_token  (exp: 15 menit)
    └── Generate refresh_token (exp: 7 hari)
          │
          ├── access_token  → simpan di cookie
          ├── refresh_token → simpan di cookie
          └── jti + userId + device + ip → simpan di DB
                

Request API
    │
    ├── access_token valid → lanjut ✅
    └── access_token expired (401)
          │
          └── Axios interceptor tangkap 401
                │
                └── Hit /auth/refresh
                      │
                      ├── Ambil refresh_token dari cookie
                      ├── Decode → ambil jti
                      ├── Cari jti di DB → cocok? ✅
                      ├── Cek expiresAt di DB → belum expired? ✅
                      ├── Update lastUsedAt di DB
                      └── Generate access_token baru → set cookie baru
                            │
                            ├── Berhasil → ulangi request original ✅
                            └── Gagal (jti tidak ada / expired)
                                  │
                                  └── Hapus session di DB
                                      Hapus kedua cookie
                                      Redirect login ⛔