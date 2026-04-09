<?php
require_once __DIR__ . '/config/database.php';
requireLogin();
$pdo  = getDB();
$user = currentUser();

$totalSiswa   = $pdo->query("SELECT COUNT(*) FROM siswa WHERE status='aktif'")->fetchColumn();
$totalKelas   = $pdo->query("SELECT COUNT(*) FROM kelas")->fetchColumn();
$totalLakiLaki = $pdo->query("SELECT COUNT(*) FROM siswa WHERE jenis_kelamin='Laki-laki' AND status='aktif'")->fetchColumn();
$totalPerempuan = $pdo->query("SELECT COUNT(*) FROM siswa WHERE jenis_kelamin='Perempuan' AND status='aktif'")->fetchColumn();

// Statistik per kelas
$perKelas = $pdo->query("
    SELECT k.nama_kelas, k.jurusan, COUNT(s.id_siswa) as jumlah
    FROM kelas k
    LEFT JOIN siswa s ON k.id = s.kelas_id AND s.status='aktif'
    GROUP BY k.id ORDER BY jumlah DESC
")->fetchAll();

// Siswa terbaru
$siswaRecent = $pdo->query("
    SELECT s.*, k.nama_kelas FROM siswa s JOIN kelas k ON s.kelas_id=k.id
    ORDER BY s.created_at DESC LIMIT 5
")->fetchAll();

$chartLabels = array_column($perKelas, 'nama_kelas');
$chartData   = array_column($perKelas, 'jumlah');
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Dashboard — <?= APP_NAME ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="/assets/css/style.css" rel="stylesheet">
</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
    <div class="container-fluid px-4">
        <a class="navbar-brand fw-bold" href="/index.php">
            <i class="fas fa-graduation-cap me-2"></i><?= APP_NAME ?>
        </a>
        <div class="navbar-nav ms-auto flex-row align-items-center gap-3">
            <a href="/siswa/export.php" class="btn btn-sm btn-outline-light">
                <i class="fas fa-file-pdf me-1"></i>Export PDF
            </a>
            <div class="dropdown">
                <a href="#" class="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown">
                    <i class="fas fa-user-circle me-1"></i><?= htmlspecialchars($user['nama']) ?>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><span class="dropdown-item-text small text-muted">Role: <?= $user['role'] ?></span></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="/auth/logout.php"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</nav>

<div class="container-fluid px-4 mt-5 pt-4">
    <?php $s = flash('success'); $e = flash('error');
    if ($s): ?><div class="alert alert-success alert-dismissible fade show mt-2"><i class="fas fa-check-circle me-2"></i><?= htmlspecialchars($s) ?><button class="btn-close" data-bs-dismiss="alert"></button></div><?php endif; ?>
    <?php if ($e): ?><div class="alert alert-danger alert-dismissible fade show mt-2"><i class="fas fa-exclamation-circle me-2"></i><?= htmlspecialchars($e) ?><button class="btn-close" data-bs-dismiss="alert"></button></div><?php endif; ?>

    <!-- Page header -->
    <div class="d-flex align-items-center justify-content-between mb-4 mt-2">
        <div>
            <h4 class="fw-bold mb-0">Dashboard</h4>
            <small class="text-muted"><?= date('l, d F Y') ?></small>
        </div>
        <a href="/siswa/tambah.php" class="btn btn-primary">
            <i class="fas fa-plus me-2"></i>Tambah Siswa
        </a>
    </div>

    <!-- Stats -->
    <div class="row g-3 mb-4">
        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm border-start border-primary border-4">
                <div class="card-body d-flex align-items-center">
                    <div class="flex-grow-1">
                        <div class="text-uppercase text-muted small fw-bold mb-1">Total Siswa Aktif</div>
                        <div class="h3 fw-bold mb-0"><?= $totalSiswa ?></div>
                    </div>
                    <i class="fas fa-users fa-2x text-primary opacity-50"></i>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm border-start border-success border-4">
                <div class="card-body d-flex align-items-center">
                    <div class="flex-grow-1">
                        <div class="text-uppercase text-muted small fw-bold mb-1">Total Kelas</div>
                        <div class="h3 fw-bold mb-0"><?= $totalKelas ?></div>
                    </div>
                    <i class="fas fa-chalkboard fa-2x text-success opacity-50"></i>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm border-start border-info border-4">
                <div class="card-body d-flex align-items-center">
                    <div class="flex-grow-1">
                        <div class="text-uppercase text-muted small fw-bold mb-1">Siswa Laki-laki</div>
                        <div class="h3 fw-bold mb-0"><?= $totalLakiLaki ?></div>
                    </div>
                    <i class="fas fa-male fa-2x text-info opacity-50"></i>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm border-start border-warning border-4">
                <div class="card-body d-flex align-items-center">
                    <div class="flex-grow-1">
                        <div class="text-uppercase text-muted small fw-bold mb-1">Siswa Perempuan</div>
                        <div class="h3 fw-bold mb-0"><?= $totalPerempuan ?></div>
                    </div>
                    <i class="fas fa-female fa-2x text-warning opacity-50"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="row g-3 mb-4">
        <!-- Chart -->
        <div class="col-xl-7">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-header bg-white py-3 border-0">
                    <h6 class="fw-bold text-primary mb-0"><i class="fas fa-chart-bar me-2"></i>Jumlah Siswa per Kelas</h6>
                </div>
                <div class="card-body">
                    <canvas id="chartKelas" height="220"></canvas>
                </div>
            </div>
        </div>
        <!-- Siswa Terbaru -->
        <div class="col-xl-5">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
                    <h6 class="fw-bold text-primary mb-0"><i class="fas fa-clock me-2"></i>Siswa Terbaru</h6>
                    <a href="/siswa/index.php" class="btn btn-sm btn-outline-primary">Lihat Semua</a>
                </div>
                <div class="card-body p-0">
                    <?php foreach ($siswaRecent as $s): ?>
                    <div class="d-flex align-items-center px-3 py-2 border-bottom">
                        <div class="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3" style="width:36px;height:36px">
                            <i class="fas fa-user text-primary small"></i>
                        </div>
                        <div class="flex-grow-1">
                            <div class="fw-semibold small"><?= htmlspecialchars($s['nama_lengkap']) ?></div>
                            <div class="text-muted" style="font-size:.75rem"><?= htmlspecialchars($s['nama_kelas']) ?></div>
                        </div>
                        <span class="badge <?= $s['jenis_kelamin']==='Laki-laki' ? 'bg-info' : 'bg-warning text-dark' ?> small">
                            <?= $s['jenis_kelamin'] === 'Laki-laki' ? 'L' : 'P' ?>
                        </span>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>

    <!-- Nav tabs: Siswa | Kelas -->
    <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-white border-0">
            <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item"><a class="nav-link active fw-semibold" href="/siswa/index.php"><i class="fas fa-users me-1"></i>Data Siswa</a></li>
                <li class="nav-item"><a class="nav-link fw-semibold" href="/kelas/index.php"><i class="fas fa-chalkboard me-1"></i>Data Kelas</a></li>
            </ul>
        </div>
        <div class="card-body text-center py-5 text-muted">
            <i class="fas fa-arrow-up fa-2x mb-2 d-block"></i>
            Klik tab di atas untuk mengelola data
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
new Chart(document.getElementById('chartKelas'), {
    type: 'bar',
    data: {
        labels: <?= json_encode($chartLabels) ?>,
        datasets: [{
            label: 'Jumlah Siswa',
            data: <?= json_encode($chartData) ?>,
            backgroundColor: ['#4e73df','#1cc88a','#36b9cc','#f6c23e','#e74a3b'],
            borderRadius: 6,
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
    }
});
</script>
</body>
</html>
