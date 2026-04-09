<?php
require_once __DIR__ . '/config/database.php';
startSession();
if (!empty($_SESSION['user_id'])) { header('Location: /index.php'); exit; }

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$email || !$password) {
        $error = 'Email dan password wajib diisi!';
    } else {
        $pdo  = getDB();
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id']   = $user['id'];
            $_SESSION['user_nama'] = $user['nama'];
            $_SESSION['user_role'] = $user['role'];
            session_regenerate_id(true);
            header('Location: /index.php');
            exit;
        }
        $error = 'Email atau password salah!';
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login — <?= APP_NAME ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { background: linear-gradient(135deg,#667eea,#764ba2); min-height:100vh; font-family:'Poppins',sans-serif; display:flex; align-items:center; }
        .card { border:none; border-radius:1.25rem; box-shadow:0 1.5rem 4rem rgba(0,0,0,.2); }
        .btn-login { background:linear-gradient(135deg,#667eea,#764ba2); border:none; font-weight:600; }
        .btn-login:hover { opacity:.9; }
    </style>
</head>
<body>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-5 col-lg-4">
            <div class="card">
                <div class="card-body p-5">
                    <div class="text-center mb-4">
                        <div class="mb-3" style="width:64px;height:64px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto">
                            <i class="fas fa-graduation-cap text-white fa-2x"></i>
                        </div>
                        <h5 class="fw-bold"><?= APP_NAME ?></h5>
                        <p class="text-muted small">Masuk ke sistem</p>
                    </div>
                    <?php if ($error): ?>
                    <div class="alert alert-danger py-2 small"><i class="fas fa-exclamation-circle me-1"></i><?= htmlspecialchars($error) ?></div>
                    <?php endif; ?>
                    <form method="POST">
                        <div class="mb-3">
                            <label class="form-label fw-semibold small">Email</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-envelope text-muted"></i></span>
                                <input type="email" name="email" class="form-control" placeholder="email@domain.com"
                                       value="<?= htmlspecialchars($_POST['email'] ?? '') ?>" required autofocus>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="form-label fw-semibold small">Password</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-lock text-muted"></i></span>
                                <input type="password" name="password" class="form-control" placeholder="Password" required>
                                <button class="btn btn-outline-secondary" type="button" onclick="
                                    const p=this.previousElementSibling;
                                    p.type=p.type==='password'?'text':'password';
                                    this.innerHTML=p.type==='password'?'<i class=\'fas fa-eye\'></i>':'<i class=\'fas fa-eye-slash\'></i>'">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-login btn-primary w-100 py-2 text-white">
                            <i class="fas fa-sign-in-alt me-2"></i>Masuk
                        </button>
                    </form>
                    <div class="text-center mt-3">
                        <small class="text-muted">Admin: <code>admin@akademik.com</code> / <code>password123</code></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
