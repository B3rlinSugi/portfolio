<?php
require_once __DIR__ . '/../config/database.php';
requireLogin();
$pdo  = getDB();
$id   = $_GET['id'] ?? '';
$stmt = $pdo->prepare("SELECT s.*, k.nama_kelas, k.jurusan FROM siswa s JOIN kelas k ON s.kelas_id=k.id WHERE s.id_siswa=?");
$stmt->execute([$id]);
$siswa = $stmt->fetch();
if (!$siswa) { flash('error','Data tidak ditemukan.'); header('Location: /siswa/index.php'); exit; }
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Detail Siswa — <?= APP_NAME ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body style="background:#f8f9fc;font-family:'Poppins',sans-serif">
<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
    <div class="container-fluid px-4">
        <a class="navbar-brand fw-bold" href="/index.php"><i class="fas fa-graduation-cap me-2"></i><?= APP_NAME ?></a>
        <a href="/siswa/index.php" class="btn btn-sm btn-outline-light ms-auto"><i class="fas fa-arrow-left me-1"></i>Kembali</a>
    </div>
</nav>

<div class="container px-4 mt-5 pt-4">
    <div class="mb-4 mt-2">
        <h4 class="fw-bold"><i class="fas fa-user me-2 text-primary"></i>Detail Siswa</h4>
    </div>

    <div class="row g-3">
        <div class="col-lg-4">
            <div class="card border-0 shadow-sm text-center">
                <div class="card-body p-4">
                    <img src="/assets/img/siswa/<?= htmlspecialchars($siswa['foto_profil']) ?>"
                         onerror="this.src='/assets/img/default.png'"
                         class="rounded-circle border mb-3" width="100" height="100" style="object-fit:cover">
                    <h5 class="fw-bold"><?= htmlspecialchars($siswa['nama_lengkap']) ?></h5>
                    <span class="badge bg-primary"><?= htmlspecialchars($siswa['nama_kelas']) ?></span><br>
                    <small class="text-muted"><?= htmlspecialchars($siswa['jurusan']) ?></small>
                    <div class="mt-3">
                        <span class="badge <?= $siswa['jenis_kelamin']==='Laki-laki'?'bg-info':'bg-warning text-dark' ?> me-1"><?= $siswa['jenis_kelamin'] ?></span>
                        <span class="badge <?= $siswa['status']==='aktif'?'bg-success':($siswa['status']==='lulus'?'bg-primary':'bg-secondary') ?>"><?= ucfirst($siswa['status']) ?></span>
                    </div>
                    <div class="d-flex gap-2 justify-content-center mt-3">
                        <a href="/siswa/edit.php?id=<?= $id ?>" class="btn btn-sm btn-warning"><i class="fas fa-edit me-1"></i>Edit</a>
                        <?php if (isAdmin()): ?>
                        <a href="/siswa/hapus.php?id=<?= $id ?>" class="btn btn-sm btn-danger" onclick="return confirm('Hapus siswa ini?')"><i class="fas fa-trash me-1"></i>Hapus</a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white py-3 border-0">
                    <h6 class="fw-bold mb-0"><i class="fas fa-info-circle me-2 text-primary"></i>Informasi Lengkap</h6>
                </div>
                <div class="card-body">
                    <div class="row g-3">
                        <?php $fields = [
                            ['ID Siswa', $siswa['id_siswa']],
                            ['Tanggal Daftar', date('d F Y', strtotime($siswa['tanggal_daftar']))],
                            ['Email', $siswa['email']],
                            ['WhatsApp', $siswa['whatsapp']],
                            ['Alamat', $siswa['alamat']],
                        ]; foreach ($fields as [$label, $val]): ?>
                        <div class="col-md-6">
                            <div class="text-muted small fw-semibold text-uppercase mb-1"><?= $label ?></div>
                            <div class="fw-semibold"><?= htmlspecialchars($val) ?></div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
