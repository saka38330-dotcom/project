<?php
session_start();
if (!isset($_SESSION['user_id']) || !isset($_SESSION['role']) || $_SESSION['role'] !== 'Admin') {
    header('Location: index.html');
    exit;
}
// Serve the existing HTML file
readfile('dashboard-admin.html');
