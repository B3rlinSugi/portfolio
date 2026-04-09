-- =============================================
-- CRUD APP v2.0 — Sistem Data Akademik
-- Improved: PDO, login auth, multi-tabel, FK
-- =============================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;


-- Tabel Users (Login)
CREATE TABLE IF NOT EXISTS users (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    nama       VARCHAR(100) NOT NULL,
    email      VARCHAR(100) UNIQUE NOT NULL,
    password   VARCHAR(255) NOT NULL,
    role       ENUM('admin','staff') DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- password = "admin123" (bcrypt)
INSERT INTO users (nama, email, password, role) VALUES
('Administrator', 'admin@akademik.com', '$2y$10$ffMTis6jVwb6S8NxeFJvHuFazPmR.vK5ImMbia4Ti.jjek9MtOzP.', 'admin'),
('Staff TU', 'staff@akademik.com', '$2y$10$ffMTis6jVwb6S8NxeFJvHuFazPmR.vK5ImMbia4Ti.jjek9MtOzP.', 'staff');

-- Tabel Kelas
CREATE TABLE IF NOT EXISTS kelas (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    nama_kelas VARCHAR(50) NOT NULL,
    jurusan    VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO kelas (nama_kelas, jurusan) VALUES
('Web Development',   'Teknologi Informasi'),
('Mobile Development','Teknologi Informasi'),
('Data Analysis',     'Teknologi Informasi'),
('Web Design',        'Desain Komunikasi Visual'),
('Digital Marketing', 'Bisnis Digital');

-- Tabel Siswa
CREATE TABLE IF NOT EXISTS siswa (
    id_siswa      VARCHAR(10) PRIMARY KEY,
    kelas_id      INT NOT NULL,
    tanggal_daftar DATE NOT NULL,
    nama_lengkap  VARCHAR(100) NOT NULL,
    jenis_kelamin ENUM('Laki-laki','Perempuan') NOT NULL,
    alamat        VARCHAR(255) NOT NULL,
    email         VARCHAR(100) NOT NULL,
    whatsapp      VARCHAR(20) NOT NULL,
    foto_profil   VARCHAR(100) DEFAULT 'default.png',
    status        ENUM('aktif','nonaktif','lulus') DEFAULT 'aktif',
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kelas_id) REFERENCES kelas(id) ON DELETE RESTRICT,
    INDEX idx_nama (nama_lengkap),
    INDEX idx_kelas (kelas_id)
) ENGINE=InnoDB;

-- Data dummy siswa
INSERT INTO siswa (id_siswa, kelas_id, tanggal_daftar, nama_lengkap, jenis_kelamin, alamat, email, whatsapp) VALUES
('ID-00001', 1, '2024-01-15', 'Budi Santoso',    'Laki-laki', 'Jakarta Selatan',    'budi@mail.com',    '08123456789'),
('ID-00002', 4, '2024-01-15', 'Siti Rahayu',     'Perempuan', 'Bandung, Jawa Barat','siti@mail.com',    '08234567890'),
('ID-00003', 5, '2024-01-16', 'Andi Wijaya',     'Laki-laki', 'Yogyakarta',         'andi@mail.com',    '08345678901'),
('ID-00004', 4, '2024-02-01', 'Dewi Anggraeni',  'Perempuan', 'Bekasi, Jawa Barat', 'dewi@mail.com',    '08456789012'),
('ID-00005', 1, '2024-02-03', 'Rizky Ramadhan',  'Laki-laki', 'Depok, Jawa Barat',  'rizky@mail.com',   '08567890123'),
('ID-00006', 1, '2024-02-10', 'Annisa Putri',    'Perempuan', 'Surabaya, Jawa Timur','annisa@mail.com',  '08678901234'),
('ID-00007', 2, '2024-03-01', 'Fajar Nugroho',   'Laki-laki', 'Semarang, Jawa Tengah','fajar@mail.com', '08789012345'),
('ID-00008', 3, '2024-03-05', 'Mira Kusuma',     'Perempuan', 'Medan, Sumatera Utara','mira@mail.com',  '08890123456');

SET FOREIGN_KEY_CHECKS = 1;
