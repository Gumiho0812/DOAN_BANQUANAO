document.addEventListener('DOMContentLoaded', function() {
    loadUsers().then(() => {
        setupRegisterPage();
        checkLoggedInUser();
    });
});

function setupRegisterPage() {
    const form = document.getElementById('register-form');
    if (form) {
        form.addEventListener('submit', handleRegisterPage);
    }
}

function handleRegisterPage(e) {
    e.preventDefault();
    clearErrors('register-form');

    const fullName = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    const address = document.getElementById('register-address').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const confirmPassword = document.getElementById('register-confirm-password').value.trim();
    const registerError = document.getElementById('register-error');

    let hasError = false;

    if (!fullName) {
        showError('register-name', 'Vui lòng nhập họ và tên');
        hasError = true;
    } else if (!validators.name(fullName)) {
        showError('register-name', 'Họ và tên phải ít nhất 3 ký tự');
        hasError = true;
    }

    if (!email) {
        showError('register-email', 'Vui lòng nhập email');
        hasError = true;
    } else if (!validators.email(email)) {
        showError('register-email', 'Email không hợp lệ');
        hasError = true;
    } else if (users.some(u => u.email === email)) {
        showError('register-email', 'Email đã được đăng ký');
        hasError = true;
    }

    if (!phone) {
        showError('register-phone', 'Vui lòng nhập số điện thoại');
        hasError = true;
    } else if (!validators.phone(phone)) {
        showError('register-phone', 'Số điện thoại không hợp lệ (10 chữ số)');
        hasError = true;
    } else if (users.some(u => u.phone_number === phone)) {
        showError('register-phone', 'Số điện thoại đã được đăng ký');
        hasError = true;
    }

    if (!address) {
        showError('register-address', 'Vui lòng nhập địa chỉ');
        hasError = true;
    } else if (!validators.address(address)) {
        showError('register-address', 'Địa chỉ phải ít nhất 5 ký tự');
        hasError = true;
    }

    if (!password) {
        showError('register-password', 'Vui lòng nhập mật khẩu');
        hasError = true;
    } else if (!validators.password(password)) {
        showError('register-password', 'Mật khẩu phải ít nhất 6 ký tự');
        hasError = true;
    }

    if (!confirmPassword) {
        showError('register-confirm-password', 'Vui lòng xác nhận mật khẩu');
        hasError = true;
    } else if (password !== confirmPassword) {
        showError('register-confirm-password', 'Mật khẩu xác nhận không khớp');
        hasError = true;
    }

    if (hasError) return;

    const newUserId = Math.max(...users.map(u => u.user_id), 1000) + 1;
    const newUser = {
        user_id: newUserId,
        full_name: fullName,
        email: email,
        password: password,
        phone_number: phone,
        address: address,
        joined_date: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    alert(`Đăng ký thành công! Mã khách hàng: ${newUserId}\nXin chào ${fullName}`);
    document.getElementById('register-form').reset();
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function checkLoggedInUser() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'index.html';
    }
}