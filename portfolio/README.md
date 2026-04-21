<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:020617,50:0f172a,100:1e293b&height=200&section=header&text=Hacker%20OS%20Portfolio&fontSize=50&fontColor=38bdf8&animation=fadeIn&fontAlignY=38&desc=Berlin%20Sugiyanto%20-%20Backend%20Engineer%20Portfolio&descAlignY=55&descColor=94a3b8" />

<a href="https://readme-typing-svg.herokuapp.com"><img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&size=16&duration=3000&pause=1000&color=38BDF8&center=true&vCenter=true&width=435&lines=🚀+High-Performance+Interactive+Portfolio;🔥+React+%2B+Vite+%2B+GPU-Accelerated+CSS;💻+Built+for+Senior+Backend+Engineers" alt="Typing SVG" /></a>

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://berlinsugi.vercel.app/)

</div>

---

## 📌 Overview

**Hacker OS Portfolio** adalah portofolio interaktif berperforma tinggi yang mensimulasikan lingkungan ruang kontrol operasional (*mission control*). Dibangun menggunakan **React** dan **Vite**, aplikasi ini didesain khusus untuk menampilkan kapabilitas rekayasa teknis seorang **Backend Developer** kepada perekrut dan engineer senior, lengkap dengan efek visual 3D, animasi CSS terakselerasi GPU, dan performa mulus tanpa *lag*.

> 💡 **Tujuan Visual:** *"Don't just tell them you can code, show them a system initialization."* Dilengkapi dengan **CLI JSON Compiler Loading Screen** dan representasi layout arsitektur sistem.

---

## ✨ Fitur Unggulan

### 🖥️ CLI JSON Compiler Loader
Saat pertama kali dikunjungi, pengguna akan disambut oleh simulasi *terminal boot sequence* bergaya IDE Material Theme. Animasi ini mengeksekusi inisialisasi lingkungan *backend* dan mencetak objek profil pengguna secara dinamis dalam format JSON dengan *neon syntax highlighting*.

### ⚡ GPU-Accelerated Scroll Hooks
Sistem animasi gulir (*scroll*) menggunakan arsitektur kustom berbasis `IntersectionObserver` — memastikan portofolio ini mampu berjalan di atas 60 FPS pada semua perangkat pintar, membuang limitasi *main thread lag* yang kerap terjadi pada library animasi konvensional.

### 🛠️ Architecture Case Studies
Dilengkapi dengan modal **ProjectDetailModal** yang interaktif, menampilkan studi kasus proyek backend secara mendalam dengan penjabaran alur (workflow) diagram, mekanisme keamanan (seperti JWT & RBAC), serta rasionalisasi basis data (seperti InnoDB).

---

## 🏗️ Struktur Arsitektur (Data Flow)

Berikut adalah abstraksi dari alur pergerakan data pada sistem front-end interaktif ini (Diagram otomatis *Mermaid* ini dapat dirender langsung oleh GitHub):

```mermaid
graph TD
    Client["🌐 Client Browser (React SPA)"]
    Loader["⚙️ CLI JSON Loader Component"]
    IntersectionObserver["👁️ Scroll Reveal Engine (Optimization)"]
    Data["📊 portfolioData.js (Central State)"]
    
    UI["📱 Presentation Layer"]
    Hero["Hero Section"]
    About["About Section"]
    Projects["Backend Projects Grid"]
    
    Client --> Loader
    Loader -.->|System Ready 100%| Client
    Client --> IntersectionObserver
    
    IntersectionObserver --> UI
    Data --> UI
    
    UI --> Hero
    UI --> About
    UI --> Projects
```

---

## 🚀 Instalasi Lokal

Ingin menjalankan arsitektur portofolio ini di mesin lokal Anda?

```bash
# 1. Clone repositori ini
git clone https://github.com/B3rlinSugi/portfolio.git

# 2. Masuk ke direktori
cd portfolio

# 3. Install NPM dependencies
npm install

# 4. Jalankan server lokal (Vite)
npm run dev

# 5. Akses melalui peramban: 
# http://localhost:5173
```

---

## 👤 Tentang Author

<div align="center">

**Berlin Sugiyanto Hutajulu**  
*Junior Backend Developer*

[![GitHub](https://img.shields.io/badge/GitHub-B3rlinSugi-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/B3rlinSugi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-berlinsugi-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/berlinsugi)

</div>
