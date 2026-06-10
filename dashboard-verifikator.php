<?php
session_start();
if (!isset($_SESSION['user_id']) || !isset($_SESSION['role']) || $_SESSION['role'] !== 'Verifikator') {
    header('Location: index.html');
    exit;
}
readfile('dashboard-verifikator.html');
