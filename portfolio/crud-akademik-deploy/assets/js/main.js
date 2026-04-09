// Sistem Data Akademik — main.js

document.addEventListener('DOMContentLoaded', function () {
    // Auto-dismiss alerts setelah 4 detik
    document.querySelectorAll('.alert-dismissible').forEach(function (alert) {
        setTimeout(function () {
            bootstrap.Alert.getOrCreateInstance(alert)?.close();
        }, 4000);
    });
});
