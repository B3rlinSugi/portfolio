<?php
require_once __DIR__ . '/../config/database.php';
requireLogin();
$pdo = getDB();

$id   = $_GET['id'] ?? '';
$stmt = $pdo->prepare("SELECT s.*, k.nama_kelas FROM siswa s JOIN kelas k ON s.kelas_id=k.id WHERE s.id_siswa=?");
$stmt->execute([$id]);
$siswa = $stmt->fetch();
if (!$siswa) { flash('error','Data tidak ditemukan.'); header('Location: /siswa/index.php'); exit; }

$kelasList = $pdo->query("SELECT * FROM kelas ORDER BY nama_kelas")->fetchAll();
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $kelas_id      = (int)$_POST['kelas_id'];
    $nama_lengkap  = trim($_POST['nama_lengkap'] ?? '');
    $jenis_kelamin = $_POST['jenis_kelamin'] ?? '';
    $alamat        = trim($_POST['alamat'] ?? '');
    $email         = trim($_POST['email'] ?? '');
    $whatsapp      = trim($_POST['whatsapp'] ?? '');
    $status        = $_POST['status'] ?? 'aktif';

    if (!$kelas_id)    $errors[] = 'Pilih kelas.';
    if (!$nama_lengkap) $errors[] = 'Nama wajib diisi.';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Format email tidak valid.';

    // Cek email duplikat (kecuali diri sendiri)
    $cek = $pdo->prepare("SELECT id_siswa FROM siswa WHERE email=? AND id_siswa!=?");
    $cek->execute([$email, $id]);
    if ($cek->fetch()) $errors[] = 'Email sudah digunakan siswa lain.';

    // Handle foto
    $fotoName = $siswa['foto_profil'];
    if (!empty($_FILES['foto_profil']['name'])) {
        $file = $_FILES['foto_profil'];
        $allowed = ['image/jpeg','image/png','image/webp'];
        if (!in_array($file['type'], $allowed)) $errors[] = 'Format foto tidak valid.';
        elseif ($file['size'] > 2*1024*1024)    $errors[] = 'Ukuran foto maks 2MB.';
        else {
            $ext      = pathinfo($file['name'], PATHINFO_EXTENSION);
            $fotoName = uniqid('siswa_') . '.' . $ext;
            $dest     = __DIR__ . '/../assets/img/siswa/' . $fotoName;
            if (!is_dir(dirname($dest))) mkdir(dirname($dest), 0755, true);
            move_uploaded_file($file['tmp_name'], $dest);
        }
    }

    if (empty($errors)) {
        $pdo->prepare("UPDATE siswa SET kelas_id=?,nama_lengkap=?,jenis_kelamin=?,alamat=?,email=?,whatsapp=?,foto_profil=?,status=? WHERE id_siswa=?")
            ->execute([$kelas_id,$nama_lengkap,$jenis_kelamin,$alamat,$email,$whatsapp,$fotoName,$status,$id]);
        flash('success',"Data $nama_lengkap berhasil diperbarui.");
        header('Location: /siswa/index.php'); exit;
    }
    $siswa = array_merge($siswa, $_POST);
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Edit Siswa — <?= APP_NAME ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
    <div class="container-fluid px-4">
        <a class="navbar-brand fw-bold" href="/index.php"><i class="fas fa-graduation-cap me-2"></i><?= APP_NAME ?></a>
        <a href="/siswa/index.php" class="btn btn-sm btn-outline-light ms-auto"><i class="fas fa-arrow-left me-1"></i>Kembali</a>
    </div>
</nav>

<div class="container-fluid px-4 mt-5 pt-4">
    <div class="d-flex align-items-center mb-4 mt-2">
        <h4 class="fw-bold mb-0"><i class="fas fa-user-edit me-2 text-warning"></i>Edit Data Siswa</h4>
        <span class="badge bg-secondary ms-3"><?= $id ?></span>
    </div>

    <?php if ($errors): ?><div class="alert alert-danger"><ul class="mb-0"><?php foreach($errors as $e): ?><li><?= htmlspecialchars($e) ?></li><?php endforeach; ?></ul></div><?php endif; ?>

    <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
            <form method="POST" enctype="multipart/form-data">
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Nama Lengkap *</label>
                        <input type="text" name="nama_lengkap" class="form-control" value="<?= htmlspecialchars($siswa['nama_lengkap']) ?>" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Kelas *</label>
                        <select name="kelas_id" class="form-select" required>
                            <?php foreach ($kelasList as $k): ?>
                            <option value="<?= $k['id'] ?>" <?= $siswa['kelas_id']==$k['id']?'selected':'' ?>><?= htmlspecialchars($k['nama_kelas']) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Jenis Kelamin *</label>
                        <select name="jenis_kelamin" class="form-select" required>
                            <option value="Laki-laki" <?= $siswa['jenis_kelamin']==='Laki-laki'?'selected':'' ?>>Laki-laki</option>
                            <option value="Perempuan" <?= $siswa['jenis_kelamin']==='Perempuan'?'selected':'' ?>>Perempuan</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Email *</label>
                        <input type="email" name="email" class="form-control" value="<?= htmlspecialchars($siswa['email']) ?>" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-semibold">WhatsApp *</label>
                        <input type="text" name="whatsapp" class="form-control" value="<?= htmlspecialchars($siswa['whatsapp']) ?>" required>
                    </div>
                    <div class="col-md-8">
                        <label class="form-label fw-semibold">Alamat *</label>
                        <textarea name="alamat" class="form-control" rows="2" required><?= htmlspecialchars($siswa['alamat']) ?></textarea>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Status</label>
                        <select name="status" class="form-select">
                            <option value="aktif"    <?= $siswa['status']==='aktif'   ?'selected':'' ?>>Aktif</option>
                            <option value="nonaktif" <?= $siswa['status']==='nonaktif'?'selected':'' ?>>Nonaktif</option>
                            <option value="lulus"    <?= $siswa['status']==='lulus'   ?'selected':'' ?>>Lulus</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Foto Profil <small class="text-muted">(biarkan kosong jika tidak ganti)</small></label>
                        <input type="file" name="foto_profil" class="form-control" accept="image/jpeg,image/png,image/webp" id="fotoInput">
                        <div class="mt-2">
                            <img id="preview" src="/assets/img/siswa/<?= htmlspecialchars($siswa['foto_profil']) ?>"
                                 onerror="this.src='/assets/img/default.png'"
                                 class="rounded border" width="80" height="80" style="object-fit:cover">
                        </div>
                    </div>
                </div>
                <div class="d-flex gap-2 mt-4">
                    <button type="submit" class="btn btn-warning px-4"><i class="fas fa-save me-2"></i>Update Data</button>
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
    if (file) { const r = new FileReader(); r.onload = e => document.getElementById('preview').src = e.target.result; r.readAsDataURL(file); }
});
</script>
</body>
</html>
