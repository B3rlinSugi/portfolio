<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:16213e,100:0f3460&height=180&section=header&text=CRUD%20Akademik%20Deployment&fontSize=38&fontColor=e94560&animation=fadeIn&fontAlignY=38&desc=Deployment%20Guide%20%7C%20PHP%208%20%7C%20Shared%20Hosting%20%7C%20MySQL&descAlignY=55&descColor=a8b2d8" />

[![PHP](https://img.shields.io/badge/PHP-8.0+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)
[![Status](https://img.shields.io/badge/Status-Deployed-brightgreen?style=for-the-badge)](https://crud-akademik.42web.io)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Academic%20System-4e73df?style=for-the-badge&logo=vercel&logoColor=white)](https://crud-akademik.42web.io)

</div>

---

## 📌 Overview

**CRUD Akademik Deployment** adalah repositori khusus yang dioptimalkan untuk rilis produksi dan dokumentasi langkah-langkah deployment dari Sistem Data Akademik. Repositori ini berisi snapshot stabil dari aplikasi manajemen sekolah yang siap diluncurkan di lingkungan shared hosting atau server VPS.

> 💡 **Tujuan Repositori:** Memastikan proses integrasi dari server pengembangan (*local*) ke server produksi (*live*) berjalan lancar dengan konfigurasi yang tepat.

---

## ⚙️ DevOps & Deployment Steps

Proses deployment proyek ini mengikuti alur kerja best-practice untuk PHP native:

### 1. Persiapan Produksi
- **Asset Minification**: Semua file CSS dan JS dikirimkan dalam format terkompresi untuk efisiensi bandwidth.
- **Environment Hardening**: Pembersihan file log pengembangan dan `.git` sebelum upload.
- **Configuration Split**: Pemisahan `config.php` untuk local vs production.

### 2. Migrasi Database
- Ekspor skema database dengan mesin **InnoDB** untuk menjaga fungsionalitas Foreign Key.
- Penyesuaian `SQL_MODE` pada server hosting agar kompatibel dengan query modern PHP 8.

### 3. Server-Side Setup
- **PHP Version**: Dipastikan berjalan minimal pada PHP 8.0+.
- **SSL Installation**: Penerapan HTTPS melalui Let's Encrypt / Cloudflare.
- **PDO Extension**: Aktivasi ekstensi `pdo_mysql` pada panel kontrol hosting (cPanel/DirectAdmin).

---

## 🏗️ Technical Architecture

```
┌─────────────────┐        FTP/Git Push        ┌─────────────────┐
│  LOCAL DEV      │ ─────────────────────────▶ │  PROD SERVER    │
│  PHP 8 / MySQL  │                            │  LSCache / Nginx│
└─────────────────┘                            └─────────────────┘
                                                       │
                                               ┌───────▼───────┐
                                               │   LIVE SITE   │
                                               │   .42web.io   │
                                               └───────────────┘
```

---

## 🚀 Panduan Instalasi Cepat

1.  **Ekstrak** semua file di direktori `public_html` atau root server Anda.
2.  **Buat database** baru melalui MySQL Database Wizard.
3.  **Import** file SQL di folder `database/`.
4.  **Edit** `config/database.php` dan sesuaikan dengan DB_NAME, DB_USER, dan DB_PASS yang baru dibuat.
5.  Sesuaikan hak akses folder (`755` untuk folder, `644` untuk file).

---

## 👤 Author

<div align="center">

**Berlin Sugiyanto Hutajulu**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-berlinsugi-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/berlinsugi)
[![Portfolio](https://img.shields.io/badge/Portfolio-berlinsugi.vercel.app-4e73df?style=for-the-badge&logo=vercel&logoColor=white)](https://berlinsugi.vercel.app)

---

Optimized Deployment Blueprint · High Efficiency Academic Systems

</div>
