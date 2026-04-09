<?php
require_once __DIR__ . '/../config/database.php';
requireLogin();
$pdo  = getDB();
$user = currentUser();

// Search & filter
$search  = trim($_GET['search'] ?? '');
$kelasId = (int)($_GET['kelas_id'] ?? 0);
$perPage = 10;
$page    = max(1, (int)($_GET['page'] ?? 1));
$offset  = ($page - 1) * $perPage;

$where  = ["s.status = 'aktif'"];
$params = [];
if ($search)  { $where[] = "(s.nama_lengkap LIKE ? OR s.id_siswa LIKE ? OR s.email LIKE ?)"; $params = array_merge($params, ["%$search%","%$search%","%$search%"]); }
if ($kelasId) { $where[] = "s.kelas_id = ?"; $params[] = $kelasId; }
$whereStr = 'WHERE ' . implode(' AND ', $where);

$total = $pdo->prepare("SELECT COUNT(*) FROM siswa s $whereStr");
$total->execute($params);
$totalRows = (int)$total->fetchColumn();
$totalPages = ceil($totalRows / $perPage);

$stmt = $pdo->prepare("
    SELECT s.*, k.nama_kelas FROM siswa s
    JOIN kelas k ON s.kelas_id = k.id
    $whereStr
    ORDER BY s.created_at DESC
    LIMIT $perPage OFFSET $offset
");
$stmt->execute($params);
$siswas = $stmt->fetchAll();

$kelasList = $pdo->query("SELECT * FROM kelas ORDER BY nama_kelas")->fetchAll();
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Data Siswa — <?= APP_NAME ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link href="/assets/css/style.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
    <div class="container-fluid px-4">
        <a class="navbar-brand fw-bold" href="/index.php"><i class="fas fa-graduation-cap me-2"></i><?= APP_NAME ?></a>
        <div class="navbar-nav ms-auto flex-row align-items-center gap-2">
            <a href="/siswa/export.php?<?= http_build_query(['search'=>$search,'kelas_id'=>$kelasId]) ?>" class="btn btn-sm btn-outline-light"><i class="fas fa-file-pdf me-1"></i>Export PDF</a>
            <a href="/auth/logout.php" class="btn btn-sm btn-danger"><i class="fas fa-sign-out-alt me-1"></i>Logout</a>
        </div>
    </div>
</nav>

<div class="container-fluid px-4 mt-5 pt-4">
    <?php $s=flash('success'); $e=flash('error');
    if($s):?><div class="alert alert-success alert-dismissible fade show mt-2"><i class="fas fa-check-circle me-1"></i><?=htmlspecialchars($s)?><button class="btn-close" data-bs-dismiss="alert"></button></div><?php endif;?>
    <?php if($e):?><div class="alert alert-danger alert-dismissible fade show mt-2"><?=htmlspecialchars($e)?><button class="btn-close" data-bs-dismiss="alert"></button></div><?php endif;?>

    <div class="d-flex align-items-center justify-content-between mb-4 mt-2">
        <div>
            <h4 class="fw-bold mb-0"><i class="fas fa-users me-2 text-primary"></i>Data Siswa</h4>
            <small class="text-muted"><?= $totalRows ?> siswa ditemukan</small>
        </div>
        <a href="/siswa/tambah.php" class="btn btn-primary"><i class="fas fa-plus me-2"></i>Tambah Siswa</a>
    </div>

    <!-- Filter -->
    <div class="card border-0 shadow-sm mb-3">
        <div class="card-body py-3">
            <form method="GET" class="row g-2 align-items-end">
                <div class="col-md-5">
                    <input type="text" name="search" class="form-control" placeholder="Cari nama, ID, atau email..." value="<?= htmlspecialchars($search) ?>">
                </div>
                <div class="col-md-3">
                    <select name="kelas_id" class="form-select">
                        <option value="">Semua Kelas</option>
                        <?php foreach ($kelasList as $k): ?>
                        <option value="<?= $k['id'] ?>" <?= $kelasId == $k['id'] ? 'selected' : '' ?>><?= htmlspecialchars($k['nama_kelas']) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="col-md-auto">
                    <button type="submit" class="btn btn-primary"><i class="fas fa-search me-1"></i>Cari</button>
                    <a href="/siswa/index.php" class="btn btn-outline-secondary ms-1">Reset</a>
                </div>
            </form>
        </div>
    </div>

    <!-- Table -->
    <div class="card border-0 shadow-sm">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead class="table-primary">
                        <tr>
                            <th>ID Siswa</th>
                            <th>Foto</th>
                            <th>Nama Lengkap</th>
                            <th>Kelas</th>
                            <th>Jenis Kelamin</th>
                            <th>Email</th>
                            <th>WhatsApp</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php if ($siswas): foreach ($siswas as $s): ?>
                    <tr>
                        <td><code><?= $s['id_siswa'] ?></code></td>
                        <td>
                            <img src="/assets/img/siswa/<?= htmlspecialchars($s['foto_profil']) ?>"
                                 onerror="this.src='/assets/img/default.png'"
                                 class="rounded-circle border" width="36" height="36" style="object-fit:cover">
                        </td>
                        <td class="fw-semibold"><?= htmlspecialchars($s['nama_lengkap']) ?></td>
                        <td><span class="badge bg-primary"><?= htmlspecialchars($s['nama_kelas']) ?></span></td>
                        <td>
                            <span class="badge <?= $s['jenis_kelamin']==='Laki-laki' ? 'bg-info' : 'bg-warning text-dark' ?>">
                                <?= $s['jenis_kelamin'] ?>
                            </span>
                        </td>
                        <td><?= htmlspecialchars($s['email']) ?></td>
                        <td><?= htmlspecialchars($s['whatsapp']) ?></td>
                        <td class="text-center">
                            <a href="/siswa/detail.php?id=<?= $s['id_siswa'] ?>" class="btn btn-sm btn-info text-white" title="Detail"><i class="fas fa-eye"></i></a>
                            <a href="/siswa/edit.php?id=<?= $s['id_siswa'] ?>" class="btn btn-sm btn-warning" title="Edit"><i class="fas fa-edit"></i></a>
                            <?php if (isAdmin()): ?>
                            <button class="btn btn-sm btn-danger" title="Hapus"
                                onclick="if(confirm('Hapus siswa <?= htmlspecialchars($s['nama_lengkap']) ?>?')) window.location='/siswa/hapus.php?id=<?= $s['id_siswa'] ?>'">
                                <i class="fas fa-trash"></i>
                            </button>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endforeach; else: ?>
                    <tr><td colspan="8" class="text-center py-5 text-muted"><i class="fas fa-inbox fa-2x mb-2 d-block"></i>Tidak ada data siswa</td></tr>
                    <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>

        <?php if ($totalPages > 1): ?>
        <div class="card-footer bg-white d-flex align-items-center justify-content-between">
            <small class="text-muted">Halaman <?= $page ?> dari <?= $totalPages ?></small>
            <nav><ul class="pagination pagination-sm mb-0">
                <?php for ($i = 1; $i <= $totalPages; $i++): ?>
                <li class="page-item <?= $i === $page ? 'active' : '' ?>">
                    <a class="page-link" href="?<?= http_build_query(['search'=>$search,'kelas_id'=>$kelasId,'page'=>$i]) ?>"><?= $i ?></a>
                </li>
                <?php endfor; ?>
            </ul></nav>
        </div>
        <?php endif; ?>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
