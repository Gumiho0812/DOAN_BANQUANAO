document.addEventListener('DOMContentLoaded', function() {
    checkUserStatus();
    document.getElementById('btn-logout')?.addEventListener('click', function() {
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            localStorage.removeItem('currentUser');
            alert('Đã đăng xuất thành công!');
            checkUserStatus();
        }
    });
});

function checkUserStatus() {
    const currentUser = localStorage.getItem('currentUser');
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    
    if (currentUser) {
        const user = JSON.parse(currentUser);
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
        document.getElementById('user-greeting').textContent = `Xin chào, ${user.full_name}!`;
    } else {
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
    }
}