// Modal functionality
const modals = document.querySelectorAll('.modal');
const authButtons = document.querySelectorAll('[data-modal]');
const switchModalLinks = document.querySelectorAll('.switch-modal');
const modalCloseButtons = document.querySelectorAll('.modal-close');

authButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('modal-hidden');
        }
    });
});

switchModalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetModalId = this.getAttribute('data-modal');
        
        // Close current modal
        modals.forEach(modal => modal.classList.add('modal-hidden'));
        
        // Open target modal
        const targetModal = document.getElementById(targetModalId);
        if (targetModal) {
            targetModal.classList.remove('modal-hidden');
        }
    });
});

modalCloseButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.closest('.modal').classList.add('modal-hidden');
    });
});

// Close modal when clicking outside
modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.add('modal-hidden');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter form submission
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        alert(`Thank you! Your email "${email}" has been registered.`);
        this.reset();
    }
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards and sections
document.querySelectorAll('.product-card, .about-text-col, .trends-header, .newsletter, .footer').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('Website loaded successfully!');

// Handle user login/logout status
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

// Logout functionality
document.getElementById('btn-logout')?.addEventListener('click', function() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        alert('Đã đăng xuất thành công!');
        checkUserStatus();
    }
});

// Check user status on page load
document.addEventListener('DOMContentLoaded', checkUserStatus);
