<?php
// Skrip helper: Hash semua password pengguna yang masih plaintext.
// Gunakan sekali: akses http://localhost/projrctsaka/hash_existing_passwords.php atau jalankan `php hash_existing_passwords.php`.

$DB_HOST = '127.0.0.1';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'db_beasiswa';

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($mysqli->connect_errno) {
    echo "Gagal koneksi: " . $mysqli->connect_error;
    exit(1);
}

$res = $mysqli->query("SELECT id, username, password FROM users");
if (!$res) {
    echo "Query gagal: " . $mysqli->error;
    exit(1);
}

$updated = 0;
$skipped = 0;
while ($row = $res->fetch_assoc()) {
    $id = $row['id'];
    $pwd = $row['password'];
    // Deteksi apakah sudah hashed (bcrypt/argon)
    if (strpos($pwd, '$2y$') === 0 || strpos($pwd, '$2a$') === 0 || strpos($pwd, '$argon2') === 0) {
        $skipped++;
        continue;
    }

    // Hash dan update
    $hash = password_hash($pwd, PASSWORD_DEFAULT);
    if ($hash === false) {
        echo "Gagal membuat hash untuk id=$id\n";
        continue;
    }
    $stmt = $mysqli->prepare('UPDATE users SET password = ? WHERE id = ?');
    $stmt->bind_param('si', $hash, $id);
    if ($stmt->execute()) $updated++;
    $stmt->close();
}
$res->free();
$mysqli->close();

echo "Selesai. Password ter-hash: $updated. Sudah hashed (dilewati): $skipped.";
