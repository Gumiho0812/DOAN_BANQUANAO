let products = [];
let cart = [];
let currentFilter = 'all';
let currentPriceRange = { min: 0, max: 500000 };
let selectedSizes = {};

// Load products from JSON
async function loadProducts() {
    try {
        const response = await fetch('../data/products.json');
        products = await response.json();
        renderProducts('all');
    } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
        // Fallback data
        products = [
            {
                id: 1,
                name: "Áo Thun Cơ Bản Trắng",
                category: "áo-thun",
                price: 199000,
                image: "../assets/images/product-1.jpg",
                description: "Áo thun cơ bản màu trắng, chất liệu cotton 100%, thoáng mát, dễ chăm sóc",
                stock: 50,
                sizes: ["XS", "S", "M", "L", "XL", "XXL"]
            },
            {
                id: 2,
                name: "Áo Khoác Jean Xanh",
                category: "áo-khoác",
                price: 599000,
                image: "../assets/images/product-2.jpg",
                description: "Áo khoác jean xanh đậm, form rộng, kiểu dáng vintage, dập nếp tinh tế",
                stock: 30,
                sizes: ["S", "M", "L", "XL", "XXL"]
            },
            {
                id: 3,
                name: "Quần Dài Đen Chuẩn",
                category: "quần-dài",
                price: 399000,
                image: "../assets/images/product-3.jpg",
                description: "Quần dài đen trơn, form ôm vừa phải, thoáng mát, phù hợp mọi dịp",
                stock: 45,
                sizes: ["28", "29", "30", "31", "32", "33", "34"]
            },
            {
                id: 4,
                name: "Quần Shorts Khaki",
                category: "quần-ngắn",
                price: 299000,
                image: "../assets/images/product-4.jpg",
                description: "Quần shorts khaki cổ điển, chiều dài gập gối, lịch lãm và thoáng mát",
                stock: 40,
                sizes: ["28", "29", "30", "31", "32", "33"]
            },
            {
                id: 5,
                name: "Áo Thun In Họa Tiết",
                category: "áo-thun",
                price: 249000,
                image: "../assets/images/product-5.jpg",
                description: "Áo thun cotton in họa tiết độc đáo, chất lượng in tốt, không phai màu",
                stock: 35,
                sizes: ["XS", "S", "M", "L", "XL", "XXL"]
            },
            {
                id: 6,
                name: "Belt Da Nâu",
                category: "phụ-kiện",
                price: 149000,
                image: "../assets/images/product-6.jpg",
                description: "Thắt lưng da thật màu nâu, khóa bạc, phù hợp với mọi kiểu quần áo",
                stock: 60,
                sizes: ["One Size"]
            }
        ];
        renderProducts('all');
    }
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    cart = savedCart ? JSON.parse(savedCart) : [];
    updateCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Render products based on filter
function renderProducts(filter = 'all') {
    currentFilter = filter;
    const productsGrid = document.getElementById('products-grid');
    const noProducts = document.getElementById('no-products');
    
    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(p => p.category === filter);
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter(p => 
        p.price >= currentPriceRange.min && p.price <= currentPriceRange.max
    );

    document.getElementById('products-count').textContent = filteredProducts.length;

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '';
        noProducts.style.display = 'block';
        return;
    }

    noProducts.style.display = 'none';
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.image.includes('product-') ? 
                    `<img src="${product.image}" alt="${product.name}" onerror="this.parentElement.textContent='[Ảnh sản phẩm]'">` : 
                    '[Ảnh sản phẩm]'
                }
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${formatPrice(product.price)}</p>
                <p class="product-stock">Kho: ${product.stock} sản phẩm</p>
                
                <div style="margin-bottom: 15px;">
                    <label style="font-weight: 600; font-size: 12px; color: var(--text-dark); display: block; margin-bottom: 8px; text-transform: uppercase;">Kích cỡ</label>
                    <div class="size-selector" data-product-id="${product.id}">
                        ${product.sizes.map(size => `
                            <button class="size-option" data-size="${size}" data-product-id="${product.id}">${size}</button>
                        `).join('')}
                    </div>
                </div>

                <div class="product-actions">
                    <div class="qty-selector">
                        <button class="qty-btn" data-qty-btn="minus" data-product-id="${product.id}">−</button>
                        <input type="number" class="qty-input" value="1" min="1" max="${product.stock}" data-qty-input="${product.id}">
                        <button class="qty-btn" data-qty-btn="plus" data-product-id="${product.id}">+</button>
                    </div>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">Thêm</button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners
    addProductEventListeners();
}

// Add event listeners to product controls
function addProductEventListeners() {
    // Size selection
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            const size = this.dataset.size;
            
            // Remove active from other sizes of same product
            document.querySelectorAll(`[data-product-id="${productId}"]`).forEach(b => {
                if (b.classList.contains('size-option')) {
                    b.classList.remove('selected');
                }
            });
            
            // Add active to clicked size
            this.classList.add('selected');
            selectedSizes[productId] = size;
        });
    });

    // Qty +/- buttons
    document.querySelectorAll('[data-qty-btn]').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            const input = document.querySelector(`[data-qty-input="${productId}"]`);
            const product = products.find(p => p.id === productId);
            let value = parseInt(input.value);

            if (this.dataset.qtyBtn === 'minus') {
                value = Math.max(1, value - 1);
            } else {
                value = Math.min(product.stock, value + 1);
            }
            input.value = value;
        });
    });

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            const product = products.find(p => p.id === productId);
            const input = document.querySelector(`[data-qty-input="${productId}"]`);
            const quantity = parseInt(input.value);
            const size = selectedSizes[productId];

            if (!size && product.sizes[0] !== 'One Size') {
                alert('Vui lòng chọn kích cỡ!');
                return;
            }

            addToCart(product, quantity, size || 'One Size');
            input.value = 1; // Reset quantity
        });
    });
}

// Add product to cart
function addToCart(product, quantity, size = 'One Size') {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            size: size,
            stock: product.stock
        });
    }

    saveCart();
    updateCart();
    alert(`Đã thêm ${quantity}x ${product.name} (Size: ${size}) vào giỏ hàng!`);
}

// Remove item from cart
function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    saveCart();
    updateCart();
}

// Clear cart
function clearCart() {
    if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
        cart = [];
        saveCart();
        updateCart();
    }
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Giỏ hàng trống</div>';
        cartTotal.textContent = '0₫';
        checkoutBtn.disabled = true;
        return;
    }

    checkoutBtn.disabled = false;

    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-name">${item.name}</div>
                <div style="font-size: 12px; color: var(--text-light); margin-bottom: 5px;">Size: ${item.size}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-qty">Số lượng: ${item.quantity}</div>
                <div style="margin-bottom: 8px; color: var(--primary-color); font-weight: 700;">
                    ${formatPrice(itemTotal)}
                </div>
                <span class="cart-item-remove" data-product-id="${item.id}" data-size="${item.size}">Xóa</span>
            </div>
        `;
    }).join('');

    cartTotal.textContent = formatPrice(total);

    // Add remove listeners
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFromCart(parseInt(this.dataset.productId), this.dataset.size);
        });
    });
}

// Format price to Vietnamese currency
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

// Filter button listeners
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    loadProducts();
    checkUserStatus();

    // Category filter buttons
    document.querySelectorAll('.filter-btn:not(.price-btn)').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn:not(.price-btn)').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            renderProducts(filter);
        });
    });

    // Price filter buttons
    document.querySelectorAll('.price-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.price-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentPriceRange = {
                min: parseInt(this.dataset.priceMin),
                max: parseInt(this.dataset.priceMax)
            };
            renderProducts(currentFilter);
        });
    });

    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', function() {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            alert('Vui lòng đăng nhập để thanh toán');
            window.location.href = 'login.html';
            return;
        }

        const user = JSON.parse(currentUser);
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        alert(`Cảm ơn ${user.full_name}!\n\nTổng tiền: ${formatPrice(total)}\n\nĐơn hàng của bạn sẽ được xử lý sớm.`);
        cart = [];
        saveCart();
        updateCart();
    });

    // Clear cart button
    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
});

// Check user status
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
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-logout')?.addEventListener('click', function() {
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            localStorage.removeItem('currentUser');
            alert('Đã đăng xuất thành công!');
            checkUserStatus();
        }
    });
});
