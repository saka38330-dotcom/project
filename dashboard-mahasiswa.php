<?php
session_start();
if (!isset($_SESSION['user_id']) || !isset($_SESSION['role']) || $_SESSION['role'] !== 'Mahasiswa') {
    header('Location: index.html');
    exit;
}
readfile('dashboard-mahasiswa.html');
