<?php
define('DB_HOST', getenv('MYSQLHOST') ?: 'sql305.infinityfree.com');
define('DB_PORT', getenv('MYSQLPORT') ?: '3306');
define('DB_NAME', getenv('MYSQLDATABASE') ?: 'if0_41615552_crudakademik');
define('DB_USER', getenv('MYSQLUSER') ?: 'if0_41615552');
define('DB_PASS', getenv('MYSQLPASSWORD') ?: 'Berlin0821');
define('APP_NAME', 'Sistem Data Akademik');

function getDB(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO(
                'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME . ';charset=utf8mb4',
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );
        } catch (PDOException $e) {
            die('<div style="font-family:sans-serif;padding:30px;color:red">
                <b>Koneksi database gagal.</b> Pastikan MySQL aktif dan database <b>' . DB_NAME . '</b> sudah diimport.<br>
                <small>' . $e->getMessage() . '</small></div>');
        }
    }
    return $pdo;
}

function startSession(): void
{
    if (session_status() === PHP_SESSION_NONE)
        session_start();
}

function requireLogin(): void
{
    startSession();
    if (empty($_SESSION['user_id'])) {
        header('Location: /login.php');
        exit;
    }
}

function currentUser(): array
{
    startSession();
    return ['id' => $_SESSION['user_id'] ?? 0, 'nama' => $_SESSION['user_nama'] ?? '', 'role' => $_SESSION['user_role'] ?? ''];
}

function isAdmin(): bool
{
    return currentUser()['role'] === 'admin';
}

function flash(string $key, string $msg = ''): ?string
{
    startSession();
    if ($msg !== '') {
        $_SESSION['flash'][$key] = $msg;
        return null;
    }
    $v = $_SESSION['flash'][$key] ?? null;
    unset($_SESSION['flash'][$key]);
    return $v;
}

function generateIdSiswa(PDO $pdo): string
{
    $last = $pdo->query("SELECT id_siswa FROM siswa ORDER BY id_siswa DESC LIMIT 1")->fetchColumn();
    $num = $last ? (int) substr($last, 3) + 1 : 1;
    return 'ID-' . str_pad($num, 5, '0', STR_PAD_LEFT);
}
