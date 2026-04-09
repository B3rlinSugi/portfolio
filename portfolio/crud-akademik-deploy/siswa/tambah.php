<?php
require_once __DIR__ . '/../config/database.php';
requireLogin();
$pdo = getDB();
$kelasList = $pdo->query("SELECT * FROM kelas ORDER BY nama_kelas")->fetchAll();
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $kelas_id      = (int)$_POST['kelas_id'];
    $nama_lengkap  = trim($_POST['nama_lengkap'] ?? '');
    $jenis_kelamin = $_POST['jenis_kelamin'] ?? '';
    $alamat        = trim($_POST['alamat'] ?? '');
    $email         = trim($_POST['email'] ?? '');
    $whatsapp      = trim($_POST['whatsapp'] ?? '');
    $tanggal_daftar = $_POST['tanggal_daftar'] ?? date('Y-m-d');

    if (!$kelas_id)     $errors[] = 'Pilih kelas.';
    if (!$nama_lengkap) $errors[] = 'Nama lengkap wajib diisi.';
    if (!$jenis_kelamin) $errors[] = 'Pilih jenis kelamin.';
    if (!$alamat)       $errors[] = 'Alamat wajib diisi.';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Format email tidak valid.';
    if (!$whatsapp)     $errors[] = 'Nomor WhatsApp wajib diisi.';

    // Cek email duplikat
    $cek = $pdo->prepare("SELECT id_siswa FROM siswa WHERE email=?");
    $cek->execute([$email]);
    if ($cek->fetch()) $errors[] = 'Email sudah terdaftar.';

    // Upload foto
    $fotoName = 'default.png';
    if (!empty($_FILES['foto_profil']['name'])) {
        $file     = $_FILES['foto_profil'];
        $allowed  = ['image/jpeg', 'image/png', 'image/webp'];
        $maxSize  = 2 * 1024 * 1024; // 2MB
        if (!in_array($file['type'], $allowed)) $errors[] = 'Format foto harus JPG, PNG, atau WebP.';
        elseif ($file['size'] > $maxSize)        $errors[] = 'Ukuran foto maksimal 2MB.';
        else {
            $ext      = pathinfo($file['name'], PATHINFO_EXTENSION);
            $fotoName = uniqid('siswa_') . '.' . $ext;
            $dest     = __DIR__ . '/../assets/img/siswa/' . $fotoName;
            if (!is_dir(dirname($dest))) mkdir(dirname($dest), 0755, true);
            move_uploaded_file($file['tmp_name'], $dest);
        }
    }

    if (empty($errors)) {
        $id = generateIdSiswa($pdo);
        $pdo->prepare("INSERT INTO siswa (id_siswa,kelas_id,tanggal_daftar,nama_lengkap,jenis_kelamin,alamat,email,whatsapp,foto_profil) VALUES (?,?,?,?,?,?,?,?,?)")
            ->execute([$id, $kelas_id, $tanggal_daftar, $nama_lengkap, $jenis_kelamin, $alamat, $email, $whatsapp, $fotoName]);
        flash('success', "Siswa $nama_lengkap berhasil ditambahkan dengan ID $id.");
        header('Location: /siswa/index.php'); exit;
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Tambah Siswa — <?= APP_NAME ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link href="/assets/css/style.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
    <div class="container-fluid px-4">
        <a class="navbar-brand fw-bold" href="/index.php"><i class="fas fa-graduation-cap me-2"></i><?= APP_NAME ?></a>
        <div class="navbar-nav ms-auto"><a href="/siswa/index.php" class="btn btn-sm btn-outline-light"><i class="fas fa-arrow-left me-1"></i>Kembali</a></div>
    </div>
</nav>

<div class="container-fluid px-4 mt-5 pt-4">
    <div class="d-flex align-items-center mb-4 mt-2">
        <h4 class="fw-bold mb-0"><i class="fas fa-user-plus me-2 text-primary"></i>Tambah Siswa Baru</h4>
    </div>

    <?php if ($errors): ?><div class="alert alert-danger"><ul class="mb-0"><?php foreach($errors as $e): ?><li><?= htmlspecialchars($e) ?></li><?php endforeach; ?></ul></div><?php endif; ?>

    <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
            <form method="POST" enctype="multipart/form-data">
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Nama Lengkap *</label>
                        <input type="text" name="nama_lengkap" class="form-control" value="<?= htmlspecialchars($_POST['nama_lengkap'] ?? '') ?>" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Kelas *</label>
                        <select name="kelas_id" class="form-select" required>
                            <option value="">-- Pilih Kelas --</option>
                            <?php foreach ($kelasList as $k): ?>
                            <option value="<?= $k['id'] ?>" <?= (($_POST['kelas_id'] ?? '') == $k['id']) ? 'selected' : '' ?>>
                                <?= htmlspecialchars($k['nama_kelas']) ?> — <?= htmlspecialchars($k['jurusan']) ?>
                            </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Jenis Kelamin *</label>
                        <select name="jenis_kelamin" class="form-select" required>
                            <option value="">-- Pilih --</option>
                            <option value="Laki-laki" <?= (($_POST['jenis_kelamin'] ?? '') === 'Laki-laki') ? 'selected' : '' ?>>Laki-laki</option>
                            <option value="Perempuan" <?= (($_POST['jenis_kelamin'] ?? '') === 'Perempuan') ? 'selected' : '' ?>>Perempuan</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Tanggal Daftar *</label>
                        <input type="date" name="tanggal_daftar" class="form-control" value="<?= htmlspecialchars($_POST['tanggal_daftar'] ?? date('Y-m-d')) ?>" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Email *</label>
                        <input type="email" name="email" class="form-control" value="<?= htmlspecialchars($_POST['email'] ?? '') ?>" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">WhatsApp *</label>
                        <input type="text" name="whatsapp" class="form-control" placeholder="08xxxxxxxxxx" value="<?= htmlspecialchars($_POST['whatsapp'] ?? '') ?>" required>
                    </div>
                    <div class="col-12">
                        <label class="form-label fw-semibold">Alamat *</label>
                        <textarea name="alamat" class="form-control" rows="2" required><?= htmlspecialchars($_POST['alamat'] ?? '') ?></textarea>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Foto Profil <small class="text-muted">(JPG/PNG, maks 2MB)</small></label>
                        <input type="file" name="foto_profil" class="form-control" accept="image/jpeg,image/png,image/webp" id="fotoInput">
                        <div class="mt-2">
                            <img id="preview" src="/assets/img/default.png" class="rounded border" width="80" height="80" style="object-fit:cover">
                        </div>
                    </div>
                </div>
                <div class="d-flex gap-2 mt-4">
                    <button type="submit" class="btn btn-primary px-4"><i class="fas fa-save me-2"></i>Simpan Siswa</button>
                    <a href="/siswa/index.php" class="btn btn-secondary px-4">Batal</a>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script>
document.getElementById('fotoInput').addEventListener('change', function(){
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => document.getElementById('preview').src = e.target.result;
        reader.readAsDataURL(file);
    }
});
</script>
</body>
</html>
