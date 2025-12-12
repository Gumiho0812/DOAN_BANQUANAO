const validators = {
    name: (val) => val.trim().length >= 3,
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    phone: (val) => /^[0-9]{10}$/.test(val.replace(/\s+/g, '')),
    subject: (val) => val.trim().length >= 5,
    message: (val) => val.trim().length >= 10
};

document.addEventListener('DOMContentLoaded', function() {
    checkUserStatus();
    setupContactForm();
});

function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleContactSubmit);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    clearErrors('contact-form');

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    let hasError = false;

    if (!name) {
        showError('contact-name', 'Vui lòng nhập họ và tên');
        hasError = true;
    } else if (!validators.name(name)) {
        showError('contact-name', 'Họ và tên phải ít nhất 3 ký tự');
        hasError = true;
    }

    if (!email) {
        showError('contact-email', 'Vui lòng nhập email');
        hasError = true;
    } else if (!validators.email(email)) {
        showError('contact-email', 'Email không hợp lệ');
        hasError = true;
    }

    if (!phone) {
        showError('contact-phone', 'Vui lòng nhập số điện thoại');
        hasError = true;
    } else if (!validators.phone(phone)) {
        showError('contact-phone', 'Số điện thoại phải có 10 chữ số');
        hasError = true;
    }

    if (!subject) {
        showError('contact-subject', 'Vui lòng nhập tiêu đề');
        hasError = true;
    } else if (!validators.subject(subject)) {
        showError('contact-subject', 'Tiêu đề phải ít nhất 5 ký tự');
        hasError = true;
    }

    if (!message) {
        showError('contact-message', 'Vui lòng nhập tin nhắn');
        hasError = true;
    } else if (!validators.message(message)) {
        showError('contact-message', 'Tin nhắn phải ít nhất 10 ký tự');
        hasError = true;
    }

    if (hasError) return;

    // Save contact message to localStorage
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        date: new Date().toISOString()
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    // Show success message
    const successMsg = document.getElementById('success-message');
    successMsg.classList.add('show');
    document.getElementById('contact-form').reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 5000);
}

document.getElementById('btn-logout')?.addEventListener('click', function() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        alert('Đã đăng xuất thành công!');
        checkUserStatus();
    }
});