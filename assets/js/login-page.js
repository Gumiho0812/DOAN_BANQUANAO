document.addEventListener('DOMContentLoaded', function() {
    loadUsers().then(() => {
        setupLoginPage();
        checkLoggedInUser();
    });
});

function setupLoginPage() {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', handleLoginPage);
    }
}

function handleLoginPage(e) {
    e.preventDefault();
    clearErrors('login-form');

    const phone = document.getElementById('login-phone').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const loginError = document.getElementById('login-error');

    let hasError = false;

    if (!phone) {
        showError('login-phone', 'Vui lòng nhập số điện thoại');
        hasError = true;
    } else if (!validators.phone(phone)) {
        showError('login-phone', 'Số điện thoại không hợp lệ');
        hasError = true;
    }

    if (!password) {
        showError('login-password', 'Vui lòng nhập mật khẩu');
        hasError = true;
    }

    if (hasError) return;

    const user = users.find(u => u.phone_number === phone && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Đăng nhập thành công! Xin chào ${user.full_name}`);
        document.getElementById('login-form').reset();
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        loginError.textContent = 'Số điện thoại hoặc mật khẩu không chính xác';
        loginError.classList.add('show');
    }
}

function checkLoggedInUser() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'index.html';
    }
}