<?php
header('Content-Type: application/json; charset=utf-8');

$DB_HOST = '127.0.0.1';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'db_beasiswa';

function respond($ok, $msg, $extra = []) {
    $out = array_merge(["success" => $ok, "message" => $msg], $extra);
    echo json_encode($out);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Metode harus POST');
}

$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$role = isset($_POST['role']) ? trim($_POST['role']) : '';

if ($username === '' || $password === '' || $role === '') {
    respond(false, 'Semua field harus diisi');
}

$roleMap = [
    'mahasiswa' => 'Mahasiswa',
    'verifikator' => 'Verifikator',
    'admin' => 'Admin'
];

if (!isset($roleMap[strtolower($role)])) {
    respond(false, 'Peran tidak valid');
}
$dbRole = $roleMap[strtolower($role)];

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($mysqli->connect_errno) {
    respond(false, 'Gagal terkoneksi ke database: ' . $mysqli->connect_error);
}

// Ambil user
$stmt = $mysqli->prepare('SELECT id, password FROM users WHERE username = ? AND role = ? LIMIT 1');
$stmt->bind_param('ss', $username, $dbRole);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows === 0) {
    $stmt->close();
    $mysqli->close();
    respond(false, 'Username atau peran tidak ditemukan');
}
$stmt->bind_result($id, $hash);
$stmt->fetch();
$stmt->close();

$loginOk = false;

// Deteksi apakah password sudah di-hash
$isHashed = preg_match('/^\$(2y|2a|argon2i|argon2id)\$/', $hash) === 1;
if ($isHashed) {
    $loginOk = password_verify($password, $hash);
} else {
    // Fallback untuk data lama yang masih plaintext
    if ($password === $hash) {
        $loginOk = true;
        $newHash = password_hash($password, PASSWORD_DEFAULT);
        if ($newHash !== false) {
            $update = $mysqli->prepare('UPDATE users SET password = ? WHERE id = ?');
            if ($update) {
                $update->bind_param('si', $newHash, $id);
                $update->execute();
                $update->close();
            }
        }
    }
}

if (!$loginOk) {
    $mysqli->close();
    respond(false, 'Password salah');
}

// Berhasil: buat sesi sederhana
session_start();
$_SESSION['user_id'] = $id;
$_SESSION['username'] = $username;
$_SESSION['role'] = $dbRole;

$dashboard = 'dashboard-mahasiswa.php';
if (strtolower($role) === 'verifikator') $dashboard = 'dashboard-verifikator.php';
if (strtolower($role) === 'admin') $dashboard = 'dashboard-admin.php';

$mysqli->close();
respond(true, 'Login berhasil', ['dashboard' => $dashboard]);
