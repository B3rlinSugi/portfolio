<?php
require_once __DIR__ . '/../config/database.php';
requireLogin();
if (!isAdmin()) { flash('error','Hanya admin yang bisa menghapus data.'); header('Location: /siswa/index.php'); exit; }

$id  = $_GET['id'] ?? '';
$pdo = getDB();

$cek = $pdo->prepare("SELECT nama_lengkap FROM siswa WHERE id_siswa=?");
$cek->execute([$id]);
$siswa = $cek->fetch();

if ($siswa) {
    $pdo->prepare("UPDATE siswa SET status='nonaktif' WHERE id_siswa=?")->execute([$id]);
    flash('success', "Siswa {$siswa['nama_lengkap']} berhasil dihapus.");
} else {
    flash('error', 'Data tidak ditemukan.');
}

header('Location: /siswa/index.php');
exit;
