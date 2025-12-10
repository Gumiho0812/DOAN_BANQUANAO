// Authentication Script
let users = [
    {
        "user_id": 1001,
        "full_name": "Nguyễn Văn A",
        "email": "nguyenvana@example.com",
        "password": "khach1001@",
        "phone_number": "0987654321",
        "address": "Số 6, Đường XYZ, Quận ABC",
        "joined_date": "2025-12-11T10:00:00Z"
    },
    {
        "user_id": 1002,
        "full_name": "Trần Thị B",
        "email": "tranthib@example.com",
        "password": "khach1002@",
        "phone_number": "0912345678",
        "address": "Phòng 601, Chung cư N6",
        "joined_date": "2025-12-11T10:05:00Z"
    }
];

// Load user data from JSON (optional)
async function loadUsers() {
    try {
        const response = await fetch('../../data/user.json');
        if (response.ok) {
            const data = await response.json();
            users = data.users;
        }
    } catch (error) {
        console.log('Using default users data');
        // Use default users defined above
    }
    
    // Load any previously registered users from localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        try {
            const additionalUsers = JSON.parse(storedUsers);
            users = [...users, ...additionalUsers];
        } catch (e) {
            console.log('Error loading stored users');
        }
    }
}

// Validation Functions
const validators = {
    phone: (phone) => {
        const phoneRegex = /^(0|84)[0-9]{9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    },
    email: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    password: (password) => {
        return password.length >= 6;
    },
    name: (name) => {
        return name.trim().length >= 3;
    },
    address: (address) => {
        return address.trim().length >= 5;
    }
};

// Clear error messages
function clearErrors(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('input-error');
    });
    const errorMsgs = form.querySelectorAll('.error-msg');
    errorMsgs.forEach(msg => {
        msg.textContent = '';
        msg.style.display = 'none';
    });
}

// Show error for specific field
function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorMsg = document.getElementById(fieldId + '-error');
    
    if (input && errorMsg) {
        input.classList.add('input-error');
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    }
}

// Update auth buttons after login/register
function updateAuthButtons(user) {
    const authButtons = document.querySelector('.auth-buttons');
    if (user) {
        authButtons.innerHTML = `<span style="color: white; font-weight: 600;">Xin chào, ${user.full_name}</span>`;
    }
}

// Check if user is already logged in
function checkLoggedInUser() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        updateAuthButtons(user);
    }
}

// Load users when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadUsers().then(() => {
        console.log('Users loaded:', users);
        
        // Setup form listeners after DOM is ready
        setupFormListeners();
        
        // Check if user is already logged in
        checkLoggedInUser();
    });
});

// Setup form listeners
function setupFormListeners() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    clearErrors('login-form');
    
    const phone = document.getElementById('login-phone').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const loginError = document.getElementById('login-error');
    
    let hasError = false;
    
    // Validate phone
    if (!phone) {
        showError('login-phone', 'Vui lòng nhập số điện thoại');
        hasError = true;
    } else if (!validators.phone(phone)) {
        showError('login-phone', 'Số điện thoại không hợp lệ');
        hasError = true;
    }
    
    // Validate password
    if (!password) {
        showError('login-password', 'Vui lòng nhập mật khẩu');
        hasError = true;
    }
    
    if (hasError) return;
    
    // Check credentials
    const user = users.find(u => u.phone_number === phone && u.password === password);
    
    if (user) {
        // Login success
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Đăng nhập thành công! Xin chào ${user.full_name}`);
        document.getElementById('login-modal').classList.add('modal-hidden');
        document.getElementById('login-form').reset();
        updateAuthButtons(user);
    } else {
        // Login failed
        loginError.textContent = 'Số điện thoại hoặc mật khẩu không chính xác';
        loginError.style.display = 'block';
    }
}

// Handle register
function handleRegister(e) {
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
    
    // Validate full name
    if (!fullName) {
        showError('register-name', 'Vui lòng nhập họ và tên');
        hasError = true;
    } else if (!validators.name(fullName)) {
        showError('register-name', 'Họ và tên phải ít nhất 3 ký tự');
        hasError = true;
    }
    
    // Validate email
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
    
    // Validate phone
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
    
    // Validate address
    if (!address) {
        showError('register-address', 'Vui lòng nhập địa chỉ');
        hasError = true;
    } else if (!validators.address(address)) {
        showError('register-address', 'Địa chỉ phải ít nhất 5 ký tự');
        hasError = true;
    }
    
    // Validate password
    if (!password) {
        showError('register-password', 'Vui lòng nhập mật khẩu');
        hasError = true;
    } else if (!validators.password(password)) {
        showError('register-password', 'Mật khẩu phải ít nhất 6 ký tự');
        hasError = true;
    }
    
    // Validate confirm password
    if (!confirmPassword) {
        showError('register-confirm-password', 'Vui lòng xác nhận mật khẩu');
        hasError = true;
    } else if (password !== confirmPassword) {
        showError('register-confirm-password', 'Mật khẩu xác nhận không khớp');
        hasError = true;
    }
    
    if (hasError) return;
    
    // Register success - create new user
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
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    alert(`Đăng ký thành công! Mã khách hàng: ${newUserId}\nXin chào ${fullName}`);
    document.getElementById('register-modal').classList.add('modal-hidden');
    document.getElementById('register-form').reset();
    updateAuthButtons(newUser);
}
