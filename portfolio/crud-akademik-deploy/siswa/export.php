<?php
require_once __DIR__ . '/../config/database.php';
requireLogin();
$pdo = getDB();

$search  = trim($_GET['search'] ?? '');
$kelasId = (int)($_GET['kelas_id'] ?? 0);

$where  = ["s.status = 'aktif'"];
$params = [];
if ($search)  { $where[] = "(s.nama_lengkap LIKE ? OR s.id_siswa LIKE ?)"; $params = ["%$search%","%$search%"]; }
if ($kelasId) { $where[] = "s.kelas_id = ?"; $params[] = $kelasId; }
$whereStr = 'WHERE ' . implode(' AND ', $where);

$stmt = $pdo->prepare("SELECT s.*, k.nama_kelas FROM siswa s JOIN kelas k ON s.kelas_id=k.id $whereStr ORDER BY s.nama_lengkap");
$stmt->execute($params);
$siswas = $stmt->fetchAll();
$total  = count($siswas);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Data Siswa</title>
    <style>
        body  { font-family: Arial, sans-serif; font-size: 11px; margin: 20px; }
        h2, h4 { text-align: center; margin: 4px 0; }
        .sub  { text-align:center; color:#555; font-size:10px; margin-bottom:12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th    { background: #3a57e8; color: #fff; padding: 6px 8px; font-size: 10px; text-transform: uppercase; }
        td    { padding: 5px 8px; border-bottom: 1px solid #e8e8e8; }
        tr:nth-child(even) td { background: #f5f7ff; }
        .footer { text-align: center; margin-top: 16px; font-size: 10px; color: #999; }
        .btn  { padding: 6px 16px; background: #3a57e8; color: #fff; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 12px; font-size: 12px; }
        @media print { .btn, .no-print { display: none; } }
    </style>
</head>
<body>
<button class="btn no-print" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
<a href="/siswa/index.php" class="no-print" style="margin-left:8px;font-size:12px">← Kembali</a>

<h2><?= APP_NAME ?></h2>
<h4>Laporan Data Siswa</h4>
<p class="sub">Dicetak: <?= date('d F Y H:i') ?> | Total: <?= $total ?> siswa</p>

<table>
    <thead>
        <tr>
            <th>No</th>
            <th>ID Siswa</th>
            <th>Nama Lengkap</th>
            <th>Kelas</th>
            <th>Jenis Kelamin</th>
            <th>Email</th>
            <th>WhatsApp</th>
            <th>Alamat</th>
        </tr>
    </thead>
    <tbody>
    <?php foreach ($siswas as $i => $s): ?>
    <tr>
        <td><?= $i+1 ?></td>
        <td><?= htmlspecialchars($s['id_siswa']) ?></td>
        <td><?= htmlspecialchars($s['nama_lengkap']) ?></td>
        <td><?= htmlspecialchars($s['nama_kelas']) ?></td>
        <td><?= $s['jenis_kelamin'] ?></td>
        <td><?= htmlspecialchars($s['email']) ?></td>
        <td><?= htmlspecialchars($s['whatsapp']) ?></td>
        <td><?= htmlspecialchars($s['alamat']) ?></td>
    </tr>
    <?php endforeach; ?>
    </tbody>
</table>
<p class="footer"><?= APP_NAME ?> &copy; <?= date('Y') ?></p>
</body>
</html>
