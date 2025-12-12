const tips = [
    {
        id: 1,
        icon: "📏",
        title: "Hướng Dẫn Chọn Size",
        description: "Mẹo chọn kích cỡ phù hợp với vóc dáng để thoải mái và tự tin.",
        content: `
            <h2 class="tip-modal-title">📏 Hướng Dẫn Chọn Size</h2>
            <p>Chọn size phù hợp là điều quan trọng để bạn cảm thấy thoải mái và tự tin. Dưới đây là hướng dẫn chi tiết:</p>
            <strong>Áo Thun & Áo Khoác:</strong>
            <ul>
                <li><strong>XS/S:</strong> Chiều cao dưới 1m65, vóc dáng nhỏ</li>
                <li><strong>M:</strong> Chiều cao 1m65-1m75, vóc dáng trung bình</li>
                <li><strong>L:</strong> Chiều cao 1m75-1m80, vóc dáng lớn</li>
                <li><strong>XL/XXL:</strong> Chiều cao trên 1m80, hoặc thích form rộng</li>
            </ul>
            <strong>Quần Dài:</strong>
            <ul>
                <li><strong>28-29:</strong> Chiều cao dưới 1m65</li>
                <li><strong>30-31:</strong> Chiều cao 1m65-1m75</li>
                <li><strong>32-33:</strong> Chiều cao 1m75-1m85</li>
                <li><strong>34+:</strong> Chiều cao trên 1m85</li>
            </ul>
            <p><strong>💡 Tip:</strong> Nếu không chắc, chọn size to hơn là tốt hơn vì NHÀ SIIX yêu thích form relaxed fit!</p>
        `
    },
    {
        id: 2,
        icon: "🧺",
        title: "Cách Bảo Quản Quần Áo",
        description: "Những lưu ý để giữ quần áo bền đẹp và tránh phai màu.",
        content: `
            <h2 class="tip-modal-title">🧺 Cách Bảo Quản Quần Áo</h2>
            <p>Bảo quản đúng cách sẽ giúp quần áo của bạn bền lâu và không bị phai màu:</p>
            <strong>Giặt Giũ:</strong>
            <ul>
                <li>Giặt nước lạnh (dưới 30°C) để bảo vệ màu sắc</li>
                <li>Lộn áo ra trước khi giặt máy</li>
                <li>Tách áo thun với quần để tránh bám màu</li>
                <li>Dùng nước xả vải để giữ mềm</li>
            </ul>
            <strong>Phơi & Bảo Quản:</strong>
            <ul>
                <li>Phơi ở nơi thoáng mát, không phơi nắng trực tiếp</li>
                <li>Treo áo hoặc gấp nhẹ nhàng, tránh nếp</li>
                <li>Để trong tủ thoáng, tránh ẩm mốc</li>
                <li>Dùng túi kín để bảo vệ khỏi bụi</li>
            </ul>
            <p><strong>💡 Tip:</strong> Cotton cần thoáng khí, nên tất lấy áo ra khỏi tủ định kỳ!</p>
        `
    },
    {
        id: 3,
        icon: "🎨",
        title: "Mix & Match Outfit",
        description: "Cách phối đồ để tạo ra những bộ outfit trendy và hợp mọi dịp.",
        content: `
            <h2 class="tip-modal-title">🎨 Mix & Match Outfit</h2>
            <p>NHÀ SIIX được thiết kế để dễ dàng kết hợp tạo nên những bộ outfit phong cách:</p>
            <strong>Streetwear Casual:</strong>
            <ul>
                <li>Áo Thun + Quần Cargo + Sneaker = Chill & Cool</li>
                <li>Áo Khoác Jean + Quần Dài + Boots = Urban Style</li>
                <li>Graphic Tee + Shorts + Sandal = Summer Vibe</li>
            </ul>
            <strong>Smart Casual:</strong>
            <ul>
                <li>Áo Thun Trắng + Quần Chinos + Giày Da = Lịch Lãm</li>
                <li>Áo Khoác + Quần Jeans + Giày Cupsole = Tinh Tế</li>
            </ul>
            <strong>Nguyên Tắc Mix & Match:</strong>
            <ul>
                <li>Luôn có 1 item basic (áo thun, quần đen) để làm nền</li>
                <li>Kết hợp màu sắc: đen trắng chủ, màu sắc phụ</li>
                <li>Cân bằng form: áo rộng thì quần ôm, và ngược lại</li>
            </ul>
            <p><strong>💡 Tip:</strong> Thử những kết hợp không mong đợi, bạn sẽ tìm ra style riêng của mình!</p>
        `
    },
    {
        id: 4,
        icon: "👔",
        title: "Phong Cách Streetwear",
        description: "Hiểu rõ hơn về xu hướng Streetwear hiện đại.",
        content: `
            <h2 class="tip-modal-title">👔 Phong Cách Streetwear</h2>
            <p>Streetwear không chỉ là một xu hướng, nó là một cách sống mà NHÀ SIIX hết lòng ủng hộ:</p>
            <strong>Đặc Điểm Streetwear:</strong>
            <ul>
                <li>Form Relaxed/Oversized - thoải mái và thể hiện cá tính</li>
                <li>Graphic Print độc đáo - thể hiện góc nhìn riêng</li>
                <li>Mix hợp lý - kết hợp high-end với thường dân</li>
                <li>Chất liệu bền bỉ - Cotton, Kaki, Denim chất lượng</li>
            </ul>
            <strong>Icons Streetwear:</strong>
            <ul>
                <li>Cargo Pants - Tính năng + Thời trang</li>
                <li>Graphic Tee - Cách nói chuyện không lời</li>
                <li>Áo Khoác Jean - Evergreen classic</li>
                <li>Sneaker - Tinh thần tự do</li>
            </ul>
            <p><strong>💡 Tip:</strong> Streetwear là về sự tự tin và cá tính, không phải theo đúng quy tắc!</p>
        `
    },
    {
        id: 5,
        icon: "🌤️",
        title: "Lựa Chọn Quần Áo Theo Mùa",
        description: "Hướng dẫn chọn quần áo phù hợp cho từng mùa trong năm.",
        content: `
            <h2 class="tip-modal-title">🌤️ Lựa Chọn Quần Áo Theo Mùa</h2>
            <p>Việt Nam có khí hậu nóng ẩm, nhưng vẫn có những sự thay đổi theo mùa:</p>
            <strong>Mùa Hè (4-9):</strong>
            <ul>
                <li>Áo thun thoáng, cotton 100%</li>
                <li>Quần shorts hoặc quần 7/10 tay</li>
                <li>Chọn màu sáng, hút ẩm</li>
            </ul>
            <strong>Mùa Thu/Đông (10-3):</strong>
            <ul>
                <li>Áo khoác nhẹ, hoodie để layering</li>
                <li>Quần dài khi đi du lịch miền Bắc</li>
                <li>Có thể dùng crewneck long-sleeve</li>
            </ul>
            <strong>Tips Chung:</strong>
            <ul>
                <li>Luôn ưu tiên chất liệu thoáng khí</li>
                <li>Layering giúp linh hoạt thích nghi nhiệt độ</li>
                <li>Chọn màu neutral dễ mix & match</li>
            </ul>
            <p><strong>💡 Tip:</strong> Ở Việt Nam, mua áo khoác nhẹ là bắt buộc cho du lịch hoặc nơi máy lạnh!</p>
        `
    },
    {
        id: 6,
        icon: "💎",
        title: "Chất Liệu & Chất Lượng",
        description: "Hiểu rõ các loại chất liệu để lựa chọn sản phẩm tốt nhất.",
        content: `
            <h2 class="tip-modal-title">💎 Chất Liệu & Chất Lượng</h2>
            <p>Chất liệu tốt = Áo bền + Thoải mái + Đẹp lâu. NHÀ SIIX chỉ dùng chất liệu cao cấp:</p>
            <strong>Cotton 100%:</strong>
            <ul>
                <li>✓ Thoáng khí tốt nhất</li>
                <li>✓ Hút ẩm, mềm mại</li>
                <li>✓ An toàn với da nhạy cảm</li>
                <li>✗ Cần chăm sóc kỹ để tránh co lại</li>
            </ul>
            <strong>Cotton Blended (80% Cotton + 20% Poly):</strong>
            <ul>
                <li>✓ Cân bằng thoáng khí + bền</li>
                <li>✓ Ít co lại, dễ bảo quản</li>
                <li>✓ Giá tốt</li>
            </ul>
            <strong>Kaki/Twill:</strong>
            <ul>
                <li>✓ Bền & chất lượng cao</li>
                <li>✓ Độ bám tốt, giữ form</li>
                <li>✓ Phù hợp cho quần dài/short</li>
            </ul>
            <p><strong>💡 Tip:</strong> Chất liệu Cotton cao cấp có độ mịn và độ giãn tốt hơn!</p>
        `
    }
];

document.addEventListener('DOMContentLoaded', function() {
    renderTips();
    checkUserStatus();
});

function renderTips() {
    const grid = document.getElementById('tips-grid');
    grid.innerHTML = tips.map(tip => `
        <div class="tip-card">
            <div class="tip-icon">${tip.icon}</div>
            <div class="tip-content">
                <h3 class="tip-title">${tip.title}</h3>
                <p class="tip-description">${tip.description}</p>
                <button class="tip-btn" onclick="openTipModal(${tip.id})">Đọc Thêm</button>
            </div>
        </div>
    `).join('');
}

function openTipModal(id) {
    const tip = tips.find(t => t.id === id);
    const modal = document.getElementById('tip-modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = tip.content;
    modal.classList.add('show');
}

function closeTipModal() {
    const modal = document.getElementById('tip-modal');
    modal.classList.remove('show');
}

document.getElementById('modal-close').addEventListener('click', closeTipModal);
document.getElementById('tip-modal').addEventListener('click', function(e) {
    if (e.target === this) closeTipModal();
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

document.getElementById('btn-logout')?.addEventListener('click', function() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        alert('Đã đăng xuất thành công!');
        checkUserStatus();
    }
});