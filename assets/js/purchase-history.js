document.addEventListener('DOMContentLoaded', function() {
    checkUserStatus();
    loadOrderHistory();

    document.getElementById('btn-logout')?.addEventListener('click', function() {
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            localStorage.removeItem('currentUser');
            alert('Đã đăng xuất thành công!');
            checkUserStatus();
            loadOrderHistory(); // Reload orders after logout
        }
    });
});

function loadOrderHistory() {
    const currentUserData = localStorage.getItem('currentUser');
    const container = document.getElementById('order-history-container');
    const noOrdersMessage = document.getElementById('no-orders-message');
    const loginPrompt = document.getElementById('login-prompt');

    container.innerHTML = '';
    noOrdersMessage.style.display = 'none';
    loginPrompt.style.display = 'none';

    if (!currentUserData) {
        loginPrompt.style.display = 'block';
        return;
    }

    const currentUser = JSON.parse(currentUserData);
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
    const userOrders = purchaseHistory.filter(order => order.user_id === currentUser.user_id);

    if (userOrders.length === 0) {
        noOrdersMessage.style.display = 'block';
        return;
    }

    userOrders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date)); // Sort by most recent

    userOrders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';

        const orderHeader = `
            <div class="order-header">
                <div>
                    <span class="order-id">Mã đơn: ${order.order_id}</span>
                    <span class="order-date">Ngày đặt: ${new Date(order.order_date).toLocaleDateString('vi-VN')}</span>
                </div>
                <div class="order-total">
                    Tổng tiền: <strong>${formatPrice(order.total_amount)}</strong>
                </div>
            </div>
        `;

        const orderItems = order.items.map(item => `
            <div class="order-item">
                <span class="item-name">${item.name} (Size: ${item.size})</span>
                <span class="item-qty">SL: ${item.quantity}</span>
                <span class="item-price">${formatPrice(item.price)}</span>
            </div>
        `).join('');

        orderCard.innerHTML = orderHeader + `<div class="order-items-container">${orderItems}</div>`;
        container.appendChild(orderCard);
    });
}

function checkUserStatus() {
    const currentUser = localStorage.getItem('currentUser');
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    
    if (currentUser) {
        const user = JSON.parse(currentUser);
        authButtons.style.display = 'none';
        userMenu.style.display = 'block'; // Use block to show dropdown
        document.getElementById('user-greeting').textContent = `Xin chào, ${user.full_name}!`;
    } else {
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}