<?php
require_once __DIR__ . '/../config/database.php';
requireLogin();
if (!isAdmin()) { flash('error','Hanya admin.'); header('Location: /kelas/index.php'); exit; }
$pdo = getDB();
$id  = (int)($_GET['id'] ?? 0);
$stmt = $pdo->prepare("SELECT * FROM kelas WHERE id=?");
$stmt->execute([$id]);
$kelas = $stmt->fetch();
if (!$kelas) { flash('error','Data tidak ditemukan.'); header('Location: /kelas/index.php'); exit; }

$errors = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama_kelas = trim($_POST['nama_kelas'] ?? '');
    $jurusan    = trim($_POST['jurusan'] ?? '');
    if (!$nama_kelas) $errors[] = 'Nama kelas wajib diisi.';
    if (!$jurusan)    $errors[] = 'Jurusan wajib diisi.';
    if (empty($errors)) {
        $pdo->prepare("UPDATE kelas SET nama_kelas=?,jurusan=? WHERE id=?")->execute([$nama_kelas, $jurusan, $id]);
        flash('success',"Kelas $nama_kelas berhasil diperbarui.");
        header('Location: /kelas/index.php'); exit;
    }
    $kelas = array_merge($kelas, $_POST);
}
?>
<!DOCTYPE html><html lang="id"><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Edit Kelas — <?= APP_NAME ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <style>body{background:#f8f9fc;font-family:'Poppins',sans-serif}</style>
</head><body>
<nav class="navbar navbar-dark bg-primary fixed-top px-4"><a class="navbar-brand fw-bold" href="/index.php"><i class="fas fa-graduation-cap me-2"></i><?= APP_NAME ?></a>
<a href="/kelas/index.php" class="btn btn-sm btn-outline-light ms-auto">← Kembali</a></nav>
<div class="container mt-5 pt-4" style="max-width:480px">
    <h4 class="fw-bold mb-4 mt-2">Edit Kelas</h4>
    <?php if($errors):?><div class="alert alert-danger"><?= htmlspecialchars($errors[0])?></div><?php endif;?>
    <div class="card border-0 shadow-sm"><div class="card-body p-4">
        <form method="POST">
            <div class="mb-3"><label class="form-label fw-semibold">Nama Kelas *</label>
            <input type="text" name="nama_kelas" class="form-control" value="<?=htmlspecialchars($kelas['nama_kelas'])?>" required></div>
            <div class="mb-4"><label class="form-label fw-semibold">Jurusan *</label>
            <input type="text" name="jurusan" class="form-control" value="<?=htmlspecialchars($kelas['jurusan'])?>" required></div>
            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-warning px-4"><i class="fas fa-save me-2"></i>Update</button>
                <a href="/kelas/index.php" class="btn btn-secondary px-4">Batal</a>
            </div>
        </form>
    </div></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body></html>
