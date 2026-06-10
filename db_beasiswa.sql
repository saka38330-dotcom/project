CREATE DATABASE IF NOT EXISTS db_beasiswa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_beasiswa;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Mahasiswa','Verifikator','Admin') NOT NULL,
    name VARCHAR(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users (username, password, role, name) VALUES
('22010101', '22010101', 'Mahasiswa', 'Budi Santoso'),
('verifikator123', 'verifikator123', 'Verifikator', 'Petugas Seleksi'),
('admin', 'admin123', 'Admin', 'Master Admin');

CREATE TABLE IF NOT EXISTS pendaftar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    nim VARCHAR(50) NOT NULL UNIQUE,
    jurusan VARCHAR(150) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO pendaftar (nama, nim, jurusan) VALUES
('Budi Santoso', '22010101', 'Teknik Informatika'),
('Siti Rahma', '22010102', 'Sistem Informasi');

CREATE TABLE IF NOT EXISTS beasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(200) NOT NULL,
    kuota VARCHAR(100) NOT NULL,
    dana VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO beasiswa (nama, kuota, dana) VALUES
('Beasiswa Prestasi Unggul', '150 Mhs', 'Rp 5.000.000'),
('Beasiswa Bidikmisi Kampus', '300 Mhs', 'Rp 6.000.000');

CREATE TABLE IF NOT EXISTS dokumen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_mhs VARCHAR(150) NOT NULL,
    nim VARCHAR(50) NOT NULL,
    jenis VARCHAR(200) NOT NULL,
    tanggal DATE NOT NULL,
    status ENUM('Belum Diperiksa','Disetujui','Ditolak') NOT NULL DEFAULT 'Belum Diperiksa',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO dokumen (nama_mhs, nim, jenis, tanggal, status) VALUES
('Budi Santoso', '22010101', 'Transkrip Nilai Semester 3', '2026-06-01', 'Belum Diperiksa'),
('Siti Rahma', '22010102', 'Surat Keterangan Tidak Mampu', '2026-06-02', 'Belum Diperiksa');
