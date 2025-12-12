document.addEventListener('DOMContentLoaded', function() {
    // Check user status from main.js or auth.js if it's not already handled
    if (typeof checkUserStatus === 'function') {
        checkUserStatus();
    }

    // Load modals dynamically
    createModals();

    // Setup modal triggers and functionality
    loadUsers().then(() => {
        setupModalEventListeners();
        setupLoginForm();
        setupRegisterForm();
    });

    // Logout functionality
    const logoutButton = document.getElementById('btn-logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            if (confirm('Bạn có chắc muốn đăng xuất?')) {
                localStorage.removeItem('currentUser');
                alert('Đã đăng xuất thành công!');
                if (typeof checkUserStatus === 'function') {
                    checkUserStatus(); // Update UI
                }
                window.location.reload(); // Or redirect to home
            }
        });
    }
});

function createModals() {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
        <!-- Login Modal -->
        <div id="login-modal" class="modal modal-hidden">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h2>ĐĂNG NHẬP</h2>
                <form id="login-form" class="auth-form">
                    <div class="form-group">
                        <input type="tel" id="login-phone" placeholder="Số điện thoại" required>
                        <span class="error-msg" id="login-phone-error"></span>
                    </div>
                    <div class="form-group">
                        <input type="password" id="login-password" placeholder="Mật khẩu" required>
                        <span class="error-msg" id="login-password-error"></span>
                    </div>
                    <div class="error-msg" id="login-error" style="display:none;"></div>
                    <button type="submit" class="btn btn-outline">Đăng Nhập</button>
                </form>
                <p>Chưa có tài khoản? <a href="#" class="switch-modal" data-modal="register-modal">Đăng ký ngay</a></p>
            </div>
        </div>

        <!-- Register Modal -->
        <div id="register-modal" class="modal modal-hidden">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h2>ĐĂNG KÝ</h2>
                <form id="register-form" class="auth-form">
                    <div class="form-group">
                        <input type="text" id="register-name" placeholder="Họ và tên" required>
                        <span class="error-msg" id="register-name-error"></span>
                    </div>
                    <div class="form-group">
                        <input type="email" id="register-email" placeholder="Email" required>
                        <span class="error-msg" id="register-email-error"></span>
                    </div>
                    <div class="form-group">
                        <input type="tel" id="register-phone" placeholder="Số điện thoại" required>
                        <span class="error-msg" id="register-phone-error"></span>
                    </div>
                    <div class="form-group">
                        <input type="text" id="register-address" placeholder="Địa chỉ" required>
                        <span class="error-msg" id="register-address-error"></span>
                    </div>
                    <div class="form-group">
                        <input type="password" id="register-password" placeholder="Mật khẩu" required>
                        <span class="error-msg" id="register-password-error"></span>
                    </div>
                    <div class="form-group">
                        <input type="password" id="register-confirm-password" placeholder="Xác nhận mật khẩu" required>
                        <span class="error-msg" id="register-confirm-error"></span>
                    </div>
                    <div class="error-msg" id="register-error" style="display:none;"></div>
                    <button type="submit" class="btn btn-primary">Đăng Ký</button>
                </form>
                <p>Đã có tài khoản? <a href="#" class="switch-modal" data-modal="login-modal">Đăng nhập ngay</a></p>
            </div>
        </div>
    `;
    document.body.appendChild(modalContainer);
}

// Note: The functions setupModalEventListeners, setupLoginForm, setupRegisterForm,
// and their handlers (handleLogin, handleRegister) are assumed to be in auth.js.
// If they are not, they should be moved there or included here.
// For this example, I'll assume they are globally available from auth.js.

// The `checkUserStatus` function is assumed to be in `main.js`
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