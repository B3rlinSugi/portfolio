<?php
require_once __DIR__ . '/../config/database.php';
requireLogin();
$pdo = getDB();

if (isset($_GET['hapus']) && isAdmin()) {
    $id  = (int)$_GET['hapus'];
    $cek = $pdo->prepare("SELECT COUNT(*) FROM siswa WHERE kelas_id=? AND status='aktif'");
    $cek->execute([$id]);
    if ($cek->fetchColumn() > 0) {
        flash('error', 'Kelas tidak bisa dihapus karena masih ada siswa aktif.');
    } else {
        $pdo->prepare("DELETE FROM kelas WHERE id=?")->execute([$id]);
        flash('success', 'Kelas berhasil dihapus.');
    }
    header('Location: /kelas/index.php'); exit;
}

$kelasList = $pdo->query("
    SELECT k.*, COUNT(s.id_siswa) AS jumlah_siswa
    FROM kelas k
    LEFT JOIN siswa s ON k.id=s.kelas_id AND s.status='aktif'
    GROUP BY k.id ORDER BY k.nama_kelas
")->fetchAll();
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Data Kelas — <?= APP_NAME ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link href="/assets/css/style.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
    <div class="container-fluid px-4">
        <a class="navbar-brand fw-bold" href="/index.php"><i class="fas fa-graduation-cap me-2"></i><?= APP_NAME ?></a>
        <div class="navbar-nav ms-auto flex-row gap-2">
            <?php if (isAdmin()): ?><a href="/kelas/tambah.php" class="btn btn-sm btn-light"><i class="fas fa-plus me-1"></i>Tambah Kelas</a><?php endif; ?>
            <a href="/auth/logout.php" class="btn btn-sm btn-danger"><i class="fas fa-sign-out-alt me-1"></i>Logout</a>
        </div>
    </div>
</nav>

<div class="container-fluid px-4 mt-5 pt-4">
    <?php $s=flash('success'); $e=flash('error');
    if($s):?><div class="alert alert-success alert-dismissible fade show mt-2"><?=htmlspecialchars($s)?><button class="btn-close" data-bs-dismiss="alert"></button></div><?php endif;?>
    <?php if($e):?><div class="alert alert-danger alert-dismissible fade show mt-2"><?=htmlspecialchars($e)?><button class="btn-close" data-bs-dismiss="alert"></button></div><?php endif;?>

    <div class="d-flex align-items-center justify-content-between mb-4 mt-2">
        <h4 class="fw-bold mb-0"><i class="fas fa-chalkboard me-2 text-success"></i>Data Kelas</h4>
    </div>

    <div class="row g-3">
        <?php foreach ($kelasList as $k): ?>
        <div class="col-md-4">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                    <div class="d-flex align-items-start justify-content-between">
                        <div>
                            <h6 class="fw-bold mb-1"><?= htmlspecialchars($k['nama_kelas']) ?></h6>
                            <small class="text-muted"><?= htmlspecialchars($k['jurusan']) ?></small>
                        </div>
                        <span class="badge bg-primary fs-6"><?= $k['jumlah_siswa'] ?> siswa</span>
                    </div>
                    <div class="mt-3 d-flex gap-2">
                        <a href="/siswa/index.php?kelas_id=<?= $k['id'] ?>" class="btn btn-sm btn-outline-primary"><i class="fas fa-users me-1"></i>Lihat Siswa</a>
                        <?php if (isAdmin()): ?>
                        <a href="/kelas/edit.php?id=<?= $k['id'] ?>" class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></a>
                        <a href="?hapus=<?= $k['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Hapus kelas ini?')"><i class="fas fa-trash"></i></a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
