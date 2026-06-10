📋 PANDUAN PROYEK PORTAL BEASISWA

✅ KONDISI SAAT INI:
   - Proyek berjalan sebagai aplikasi HTML/CSS/JS statis.
   - Semua login, dashboard, dan data simulasi di-handle di browser.
   - Tidak ada backend PHP/MySQL aktif untuk autentikasi.

✅ HALAMAN UTAMA YANG DIGUNAKAN:
   1. `index.html` — Halaman login utama
   2. `dashboard-mahasiswa.html` — Dashboard Mahasiswa
   3. `dashboard-verifikator.html` — Dashboard Verifikator
   4. `dashboard-admin.html` — Dashboard Admin
   5. `logout.html` — Hapus sesi login dan kembali ke login

✅ AKUN DEMO:
   - Mahasiswa: `22010101` / `22010101`
   - Verifikator: `verifikator123` / `verifikator123`
   - Admin: `admin` / `admin123`

📁 STRUKTUR PROYEK (HTML-ONLY):
   /projrctsaka/
   ├── index.html
   ├── dashboard-mahasiswa.html
   ├── dashboard-verifikator.html
   ├── dashboard-admin.html
   ├── logout.html
   ├── test-db.html
   ├── login_process.html (placeholder legacy)
   ├── auth.html (placeholder legacy)
   ├── koneksi.html (placeholder legacy)
   ├── app.js (tidak dipakai oleh halaman utama saat ini)
   ├── style.css (tidak dipakai oleh halaman utama saat ini)
   └── db_beasiswa.sql (referensi schema legacy)

⚠️ CATATAN PENTING:
   - Buka `index.html` langsung di browser atau lewat server statis.
   - Untuk login, gunakan akun demo di atas.
   - Jika membuka dashboard tanpa login, halaman akan mengarahkan kembali ke `index.html`.
   - `sessionStorage` digunakan untuk menjaga status login sementara.

🚀 FITUR SAAT INI:
   ✓ Login demo berbasis browser
   ✓ Dashboard role-based Mahasiswa / Verifikator / Admin
   ✓ Validasi sesi pada halaman dashboard
   ✓ Data simulasi disimpan di `localStorage`
   ✓ Desain modern dengan efek glassmorphism
