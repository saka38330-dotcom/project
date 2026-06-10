<?php
header('Content-Type: application/json; charset=utf-8');

// Konfigurasi koneksi - sesuaikan jika perlu
$DB_HOST = '127.0.0.1';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'db_beasiswa';

// Fungsi bantu untuk respon JSON
function respond($ok, $msg) {
    echo json_encode(["success" => $ok, "message" => $msg]);
    exit;
}

// Pastikan method POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Metode harus POST');
}

// Ambil input
$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$role = isset($_POST['role']) ? trim($_POST['role']) : '';

if ($username === '' || $password === '' || $role === '') {
    respond(false, 'Semua field harus diisi');
}

// Normalisasi role ke format DB (capitalize)
$roleMap = [
    'mahasiswa' => 'Mahasiswa',
    'verifikator' => 'Verifikator',
    'admin' => 'Admin'
];

if (!isset($roleMap[strtolower($role)])) {
    respond(false, 'Peran tidak valid');
}
$dbRole = $roleMap[strtolower($role)];

// Koneksi DB
$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($mysqli->connect_errno) {
    respond(false, 'Gagal terkoneksi ke database: ' . $mysqli->connect_error);
}

// Cek duplikat username untuk role yang sama
$stmt = $mysqli->prepare('SELECT id FROM users WHERE username = ? AND role = ? LIMIT 1');
$stmt->bind_param('ss', $username, $dbRole);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    $stmt->close();
    $mysqli->close();
    respond(false, 'Akun dengan username dan peran tersebut sudah ada');
}
$stmt->close();

// Hash password
$hash = password_hash($password, PASSWORD_DEFAULT);
if ($hash === false) {
    $mysqli->close();
    respond(false, 'Gagal membuat hash password');
}

// Insert user (nama diset sama dengan username sementara)
$name = $username;
$ins = $mysqli->prepare('INSERT INTO users (username, password, role, name) VALUES (?, ?, ?, ?)');
if (!$ins) {
    $mysqli->close();
    respond(false, 'Prepare failed: ' . $mysqli->error);
}
$ins->bind_param('ssss', $username, $hash, $dbRole, $name);
if (!$ins->execute()) {
    $ins->close();
    $mysqli->close();
    respond(false, 'Gagal menyimpan akun: ' . $ins->error);
}
$ins->close();
$mysqli->close();

respond(true, 'Registrasi berhasil');
