-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2026 at 04:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_beasiswa`
--

-- --------------------------------------------------------

--
-- Table structure for table `beasiswa`
--

CREATE TABLE `beasiswa` (
  `id` int(11) NOT NULL,
  `nama` varchar(200) NOT NULL,
  `kuota` varchar(100) NOT NULL,
  `dana` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `beasiswa`
--

INSERT INTO `beasiswa` (`id`, `nama`, `kuota`, `dana`, `created_at`) VALUES
(1, 'Beasiswa Prestasi Unggul', '150 Mhs', 'Rp 5.000.000', '2026-06-03 12:30:17'),
(2, 'Beasiswa Bidikmisi Kampus', '300 Mhs', 'Rp 6.000.000', '2026-06-03 12:30:17');

-- --------------------------------------------------------

--
-- Table structure for table `dokumen`
--

CREATE TABLE `dokumen` (
  `id` int(11) NOT NULL,
  `nama_mhs` varchar(150) NOT NULL,
  `nim` varchar(50) NOT NULL,
  `jenis` varchar(200) NOT NULL,
  `tanggal` date NOT NULL,
  `status` enum('Belum Diperiksa','Disetujui','Ditolak') NOT NULL DEFAULT 'Belum Diperiksa',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dokumen`
--

INSERT INTO `dokumen` (`id`, `nama_mhs`, `nim`, `jenis`, `tanggal`, `status`, `created_at`) VALUES
(1, 'Budi Santoso', '22010101', 'Transkrip Nilai Semester 3', '2026-06-01', 'Belum Diperiksa', '2026-06-03 12:30:17'),
(2, 'Siti Rahma', '22010102', 'Surat Keterangan Tidak Mampu', '2026-06-02', 'Belum Diperiksa', '2026-06-03 12:30:17');

-- --------------------------------------------------------

--
-- Table structure for table `pendaftar`
--

CREATE TABLE `pendaftar` (
  `id` int(11) NOT NULL,
  `nama` varchar(150) NOT NULL,
  `nim` varchar(50) NOT NULL,
  `jurusan` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pendaftar`
--

INSERT INTO `pendaftar` (`id`, `nama`, `nim`, `jurusan`, `created_at`) VALUES
(1, 'Budi Santoso', '22010101', 'Teknik Informatika', '2026-06-03 12:30:17'),
(2, 'Siti Rahma', '22010102', 'Sistem Informasi', '2026-06-03 12:30:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Mahasiswa','Verifikator','Admin') NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `name`) VALUES
(1, '22010101', '$2y$10$4l9hBwPpbP8aXmwnM1DKgu2.C4EwBNRkZjZGtlFPYW01Bv9wvVOjy', 'Mahasiswa', 'Budi Santoso'),
(2, 'verifikator123', '$2y$10$MslurNpL8mb1CTP3w2fZl.Xrj3bBZj1.aLgIwfd.ljRZpVYa9uXBS', 'Verifikator', 'Petugas Seleksi'),
(3, 'admin', '$2y$10$Oe6I.vz0LKaH3bN7b9MdjuNf9DYkmey5up9F/1AptLskTLoon2cyG', 'Admin', 'Master Admin'),
(4, 'saka', '$2y$10$AeXKxamb.FhKZsx0tzN9uef2SB5CK58CVwmfVLB3GeMsmYxxPnyyy', 'Mahasiswa', 'saka');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `beasiswa`
--
ALTER TABLE `beasiswa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dokumen`
--
ALTER TABLE `dokumen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pendaftar`
--
ALTER TABLE `pendaftar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nim` (`nim`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `beasiswa`
--
ALTER TABLE `beasiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dokumen`
--
ALTER TABLE `dokumen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pendaftar`
--
ALTER TABLE `pendaftar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
