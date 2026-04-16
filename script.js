/* ==================== PRODUCTOS ==================== */

const PRODUCTS = [
    // Cervezas
    { id: 1, name: 'Cerveza Artesanal Golden', category: 'cervezas', price: 3500, image: 'https://www.ccu.cl/wp-content/uploads/2022/07/Cervezas_cero_CCU.jpeg', description: '750ml - Dorada y refrescante', popular: true },
    { id: 2, name: 'Cerveza IPA Craft', category: 'cervezas', price: 4200, image: 'https://santaritaonline.com/wp-content/uploads/2025/08/Cervezas.png', description: '750ml - Amarga y aromática' },
    { id: 3, name: 'Cerveza Stout Premium', category: 'cervezas', price: 4800, image: 'https://www.fassbiere.com/wp-content/uploads/Fassbiere-Importacion-de-Cervezas-Pils-Pilsen-Pilsner-Pilsener.jpg', description: '750ml - Oscura y cremosa' },
    { id: 4, name: 'Six Pack Cerveza Lager', category: 'cervezas', price: 18900, image: 'https://unimarc.vtexassets.com/arquivos/ids/255961/000000000000566684-DIS-01.jpg?v=639059117791930000', description: 'Pack 6 botellas de 330ml', popular: true },
    
    // Destilados
    { id: 5, name: 'Pisco Capel Añejo', category: 'destilados', price: 12900, image: 'https://lamarinamx.vtexassets.com/assets/vtex.file-manager-graphql/images/b80536ee-4533-4fba-a4aa-96cd870208db___ea73325bc4032ce4a28a3981c27af7a6.png', description: 'Botella 750ml - Premium', popular: true },
    { id: 6, name: 'Ron Bacardi 37.5%', category: 'destilados', price: 14900, image: 'https://ewine.cl/5472-thickbox_default/pack-12-mix-asegurado.jpg', description: 'Botella 750ml - Clásico' },
    { id: 7, name: 'Whisky Johnny Walker Red', category: 'destilados', price: 17900, image: 'https://ewine.cl/4580-medium_default/pack-12-cabernet-sauvignon-1865-vina-san-pedro.jpg', description: 'Botella 750ml - Suave', popular: true },
    { id: 8, name: 'Vodka Smirnoff Premium', category: 'destilados', price: 13900, image: 'https://ewine.cl/5461-home_default/pack-12-cabernet-sauvignon-mascara-de-fuego-chateau-los-boldos.jpg', description: 'Botella 750ml - Premium' },
    
    // Vinos
    { id: 9, name: 'Vino Tinto Cabernet 2020', category: 'vinos', price: 8900, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7CzWuF9nqZ1znsIDQxAsdI32leqjgtdlzMQ&s', description: 'Botella 750ml - Tinto robusto' },
    { id: 10, name: 'Vino Blanco Sauvignon', category: 'vinos', price: 9500, image: 'https://unimarc.vtexassets.com/arquivos/ids/203133/000000000000140169-UN-01.jpg?v=637388479600930000', description: 'Botella 750ml - Blanco fresco' },
    { id: 11, name: 'Espumante Champaña', category: 'vinos', price: 15900, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrI11WU3OScFAIMunSVjPYuZELuV26laqKuQ&s', description: 'Botella 750ml - Burbujeante', popular: true },
    { id: 12, name: 'Vino Rosado Pinot Grigio', category: 'vinos', price: 7900, image: 'https://santaisabel.vtexassets.com/arquivos/ids/409872/Vino-Santa-Emiliana-Sauvignon-Blanc-700-cc.jpg?v=638562256875500000', description: 'Botella 750ml - Rosado suave' },
    
    // Hielo
    { id: 13, name: 'Hielo Bolsa Grande', category: 'hielo', price: 3500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEpXPeiY2KFYwNXvIhfCv9n7sdVXedmny1GQ&s', description: '2kg - Cubos perfectos' },
    { id: 14, name: 'Hielo Bolsa Premium', category: 'hielo', price: 4900, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYsiJC_11ip55s9KHy5cuhxGZ5ftqmee7DDg&s', description: '3kg - Cilindros premium' },
    { id: 15, name: 'Hielo Picado 5kg', category: 'hielo', price: 6900, image: 'https://aguasmaquehua.cl/cdn/shop/files/Disenosintitulo_16.png?v=1757090433&width=1445', description: 'Perfecto para tragos' },
    
    // Snacks
    { id: 16, name: 'Mix de Frutos Secos', category: 'snacks', price: 4900, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQffHR1NRlcwTbmZNaSsRgF0kQigCJNxlpc1Q&s', description: '200g - Premium variado' },
    { id: 17, name: 'Papas Chips Premium', category: 'snacks', price: 3900, image: 'https://unimarc.vtexassets.com/arquivos/ids/248242/000000000000670480-UN-01.jpg.jpg?v=638808672705570000', description: '150g - Variadas y crujientes' },
    { id: 18, name: 'Tostitos', category: 'snacks', price: 2900, image: 'https://distribuidorasantiago.cl/wp-content/uploads/2025/06/PRODUCTOS-WEB-5-83.png', description: '200g - Salado y delicioso' },
    { id: 19, name: 'Snacks Mix', category: 'snacks', price: 8900, image: 'https://santaisabel.vtexassets.com/arquivos/ids/156208/Snack-Mix-original-320-g.jpg?v=637469292210100000', description: 'Variado premium nocturno', popular: true },
    
    // Bebidas
    { id: 20, name: 'Bebida Energética ', category: 'bebidas', price: 2500, image: 'https://i.bolder.run/r/czo0MDY0LGc6MTAwMHg/f5baa104/1008747-7798422620137.jpg', description: '350ml - Alta energía' },
    { id: 21, name: 'Gaseosa Premium 3L', category: 'bebidas', price: 4900, image: 'https://media.istockphoto.com/id/477567550/es/foto/bebidas-helada.jpg?s=612x612&w=0&k=20&c=utvO5blVI8Ti37mn4vHsxxDo5ZvWlQO1RV6mh5e_Uvs=', description: 'Botella grande refrescante' },
    { id: 22, name: 'Agua Mineral Purísima', category: 'bebidas', price: 1900, image: 'https://i5.walmartimages.cl/asr/aca7d9f7-b12f-4383-b0b0-ecb324541c76.83dc794b5d5658c529254ba6e956e449.jpeg', description: 'Botella 500ml - Pura' },
    { id: 23, name: 'Jugo Natural Naranja 1L', category: 'bebidas', price: 3900, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4G_uhNlGkt2ZFszVfMzLGPC57SoyWuE_foA&s', description: 'Fresco y natural' },
];

let cart = [];
let currentFilter = 'all';

/* ==================== CARRUSEL ==================== */

let currentSlide = 1;
const totalSlides = 3;
let slideInterval;

function initializeCarousel() {
    startSlideShow();
    updateIndicators();
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide > totalSlides) currentSlide = 1;
    if (currentSlide < 1) currentSlide = totalSlides;
    showSlide(currentSlide);
    resetSlideShow();
}

function goToSlide(slideNumber) {
    currentSlide = slideNumber;
    showSlide(currentSlide);
    resetSlideShow();
}

function showSlide(slideNumber) {
    // Ocultar todos los slides
    document.querySelectorAll('.carousel-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Mostrar slide actual
    const activeSlide = document.querySelector(`.carousel-slide[data-slide="${slideNumber}"]`);
    if (activeSlide) {
        activeSlide.classList.add('active');
    }
    
    updateIndicators();
}

function updateIndicators() {
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index + 1 === currentSlide);
    });
}

function startSlideShow() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Cambiar cada 5 segundos
}

function resetSlideShow() {
    clearInterval(slideInterval);
    startSlideShow();
}

/* ==================== INICIALIZACIÓN ==================== */

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderProducts(PRODUCTS);
    setupEventListeners();
    updateStatus();
    updateCartUI();
    initializeCarousel();
    setInterval(updateStatus, 60000); // Actualizar estado cada minuto
}

/* ==================== EVENT LISTENERS ==================== */

function setupEventListeners() {
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            const filtered = currentFilter === 'all' 
                ? PRODUCTS 
                : PRODUCTS.filter(p => p.category === currentFilter);
            renderProducts(filtered);
        });
    });

    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('focus', () => {
        document.getElementById('searchResults').classList.add('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            document.getElementById('searchResults').classList.remove('active');
        }
    });

    // Carrito
    document.querySelector('.cart-link').addEventListener('click', openCart);
    
    // Menu móvil
    const menuToggle = document.getElementById('menuToggle');
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        document.querySelector('.nav-links').classList.toggle('active');
    });

    // Cerrar menu al hacer clic en un link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('menuToggle').classList.remove('active');
            document.querySelector('.nav-links').classList.remove('active');
        });
    });
}

/* ==================== RENDERIZADO DE PRODUCTOS ==================== */

function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            ${product.popular ? '<div class="popular-badge">🔥 Popular</div>' : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://via.placeholder.com/400?text=Sin+imagen'; this.onerror=null;">
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryLabel(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toLocaleString('es-CL')}</div>
                <div class="product-actions">
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="addToCart(${product.id}, -1)">−</button>
                        <span class="qty-display" id="qty-${product.id}">0</span>
                        <button class="qty-btn" onclick="addToCart(${product.id}, 1)">+</button>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}, 1, true)">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Actualizar cantidades en el UI
    updateProductQuantityDisplay();
}

function getCategoryLabel(category) {
    const labels = {
        'cervezas': '🍺 Cervezas',
        'destilados': '🥃 Destilados',
        'vinos': '🍷 Vinos',
        'hielo': '🧊 Hielo',
        'snacks': '🍟 Snacks',
        'bebidas': '🥤 Bebidas'
    };
    return labels[category] || category;
}

/* ==================== CARRITO ==================== */

function addToCart(productId, quantity = 1, showNotification = false) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += quantity;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    } else if (quantity > 0) {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    updateCartUI();
    updateProductQuantityDisplay();

    if (showNotification) {
        showNotificationMessage(`✓ ${product.name} agregado al carrito`);
    }
}

function updateProductQuantityDisplay() {
    PRODUCTS.forEach(product => {
        const cartItem = cart.find(item => item.id === product.id);
        const qty = cartItem ? cartItem.quantity : 0;
        const display = document.getElementById(`qty-${product.id}`);
        if (display) {
            display.textContent = qty;
        }
    });
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const miniSummary = document.getElementById('miniSummary');
    const fullSections = document.getElementById('fullSections');
    const cartItems = document.getElementById('cartItems');
    const cartForm = document.getElementById('cartForm');
    const cartSummary = document.getElementById('cartSummary');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const summaryItems = document.getElementById('summaryItems');
    const summaryTotal = document.getElementById('summaryTotal');
    const emptyCart = document.querySelector('.empty-cart');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    summaryItems.textContent = totalItems;
    summaryTotal.textContent = `$${subtotal.toLocaleString('es-CL')}`;

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.innerHTML = '';
        miniSummary.style.display = 'none';
        fullSections.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        miniSummary.style.display = 'block';

        // Generar vista previa de productos en el resumen compacto
        const cartPreview = document.getElementById('cartPreview');
        cartPreview.innerHTML = cart.slice(0, 4).map(item => `
            <div class="cart-preview-item">
                <span class="cart-preview-name">${item.name}</span>
                <span class="cart-preview-qty">x${item.quantity}</span>
                <span class="cart-preview-price">$${(item.price * item.quantity).toLocaleString('es-CL')}</span>
            </div>
        `).join('');

        if (cart.length > 4) {
            cartPreview.innerHTML += `<div class="cart-preview-item" style="justify-content: center; font-size: 0.8rem; color: var(--text-secondary);">... y ${cart.length - 4} producto(s) más</div>`;
        }

        // Render items only when expanded
        if (fullSections.style.display !== 'none') {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toLocaleString('es-CL')} x ${item.quantity}</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="cart-item-qty">
                            <button onclick="addToCart(${item.id}, -1)">−</button>
                            <span>${item.quantity}</span>
                            <button onclick="addToCart(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="addToCart(${item.id}, -${item.quantity})">🗑️</button>
                    </div>
                </div>
            `).join('');

            document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString('es-CL')}`;
            document.getElementById('totalPrice').textContent = `$${subtotal.toLocaleString('es-CL')}`;
            
            cartForm.style.display = 'block';
            cartSummary.style.display = 'block';
            checkoutBtn.style.display = 'block';
        }
    }
}

// New compact cart functions
let cartExpanded = false;

function openCart() {
    openCartSummaryModal();
}

function closeCart() {
    document.getElementById('cartPanel').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    document.getElementById('miniMenu').style.display = 'none';
    cartExpanded = false;
}

function openCartSummaryModal() {
    const modal = document.createElement('div');
    modal.id = 'cartSummaryModal';
    modal.className = 'order-modal-overlay';

    if (cart.length === 0) {
        modal.innerHTML = `
            <div class="order-modal order-modal--small">
                <div class="order-modal-header">
                    <h3>🛒 Carrito vacío</h3>
                    <button class="modal-close" onclick="closeCartSummaryModal()">✕</button>
                </div>
                <div class="order-modal-content">
                    <p>Todavía no has agregado productos.</p>
                    <div class="order-actions" style="justify-content: center; margin-top: 16px;">
                        <button type="button" class="btn btn-primary" onclick="closeCartSummaryModal()">Cerrar</button>
                    </div>
                </div>
            </div>
        `;
    } else {
        const displayedItems = cart.slice(0, 4);
        const itemsHtml = displayedItems.map(item => `
            <div class="order-item">
                <div class="order-item-info">
                    <span class="order-item-name">${item.name}</span>
                    <span class="order-item-qty">x${item.quantity}</span>
                </div>
                <span class="order-item-price">$${(item.price * item.quantity).toLocaleString('es-CL')}</span>
            </div>
        `).join('');

        const moreCount = cart.length - displayedItems.length;
        const moreHtml = moreCount > 0 ? `
            <div class="order-item order-item-more">
                <span class="order-item-name">... y ${moreCount} producto(s) más</span>
            </div>
        ` : '';

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        modal.innerHTML = `
            <div class="order-modal order-modal--small">
                <div class="order-modal-header">
                    <h3>🛒 Tu Pedido</h3>
                    <button class="modal-close" onclick="closeCartSummaryModal()">✕</button>
                </div>
                <div class="order-modal-content">
                    <div class="order-summary">
                        <div class="order-items">
                            ${itemsHtml}
                            ${moreHtml}
                        </div>
                        <div class="order-total">
                            <strong>Total: $${total.toLocaleString('es-CL')}</strong>
                        </div>
                    </div>
                    <div class="order-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeCartSummaryModal()">Cerrar</button>
                        <button type="button" class="btn btn-primary" onclick="openOrderForm()">Continuar</button>
                    </div>
                </div>
            </div>
        `;
    }

    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCartSummaryModal();
        }
    });
    document.addEventListener('keydown', handleSummaryEscapeKey);
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeCartSummaryModal() {
    const modal = document.getElementById('cartSummaryModal');
    if (modal) {
        modal.classList.remove('active');
        document.removeEventListener('keydown', handleSummaryEscapeKey);
        setTimeout(() => modal.remove(), 300);
    }
}

function handleSummaryEscapeKey(event) {
    if (event.key === 'Escape') {
        closeCartSummaryModal();
    }
}


function setCompactMode(compact = true) {
    const miniSummary = document.getElementById('miniSummary');
    const fullSections = document.getElementById('fullSections');

    if (compact) {
        miniSummary.style.display = cart.length > 0 ? 'block' : 'none';
        fullSections.style.display = 'none';
        cartExpanded = false;
    } else {
        miniSummary.style.display = 'none';
        fullSections.style.display = 'block';
        cartExpanded = true;
        // Auto-expand cart items and form when opening full view
        updateCartUI();
        // Mostrar formulario automáticamente en modo expandido
        document.getElementById('cartForm').style.display = 'block';
        document.getElementById('cartSummary').style.display = 'block';
        document.getElementById('checkoutBtn').style.display = 'block';
    }
}

function toggleCartSection() {
    setCompactMode(!cartExpanded);
    if (cartExpanded) {
        updateStepIndicator(1); // Mostrar productos
    }
}

function updateStepIndicator(step) {
    // Reset all steps
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    
    // Activate current step
    for (let i = 1; i <= step; i++) {
        const stepElement = document.getElementById(`step${i}`);
        if (stepElement) {
            stepElement.classList.add('active');
        }
    }
}

function openOrderForm() {
    closeCartSummaryModal();
    // Crear modal de pedido profesional
    const modal = document.createElement('div');
    modal.id = 'orderModal';
    modal.className = 'order-modal-overlay';
    modal.innerHTML = `
        <div class="order-modal">
            <div class="order-modal-header">
                <h3>📋 Confirmar Pedido</h3>
                <button class="modal-close" onclick="closeOrderModal()">✕</button>
            </div>

            <div class="order-modal-content">
                <div class="order-summary">
                    <h4>Tu Pedido:</h4>
                    <div class="order-items">
                        ${cart.map(item => `
                            <div class="order-item">
                                <div class="order-item-info">
                                    <span class="order-item-name">${item.name}</span>
                                    <span class="order-item-qty">x${item.quantity}</span>
                                </div>
                                <span class="order-item-price">$${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-total">
                        <strong>Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('es-CL')}</strong>
                    </div>
                </div>

                <form class="order-form" onsubmit="submitOrder(event)">
                    <div class="form-section">
                        <h4>📍 Datos de Entrega</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Nombre completo *</label>
                                <input type="text" id="modalClientName" placeholder="Tu nombre completo" required>
                            </div>
                            <div class="form-group">
                                <label>Teléfono *</label>
                                <input type="tel" id="modalClientPhone" placeholder="+56 9 XXXX XXXX" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Dirección completa *</label>
                            <input type="text" id="modalClientAddress" placeholder="Dirección con referencias" required>
                        </div>
                        <div class="form-group">
                            <label>Comentarios</label>
                            <textarea id="modalClientComments" placeholder="Ej: Sin hielo, llamar al llegar..." rows="2"></textarea>
                        </div>
                    </div>

                    <div class="order-notice">
                        <p>⚠️ <strong>Importante:</strong> El costo de envío se calcula según la distancia. Te lo cotizamos al confirmar tu pedido.</p>
                    </div>

                    <div class="order-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeOrderModal()">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Enviar Pedido por WhatsApp 📲</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners para cerrar modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeOrderModal();
        }
    });

    document.addEventListener('keydown', handleEscapeKey);

    // Animar entrada
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeOrderModal();
    }
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.classList.remove('active');
        document.removeEventListener('keydown', handleEscapeKey);
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function submitOrder(event) {
    event.preventDefault();

    const name = document.getElementById('modalClientName').value.trim();
    const phone = document.getElementById('modalClientPhone').value.trim();
    const address = document.getElementById('modalClientAddress').value.trim();
    const comments = document.getElementById('modalClientComments').value.trim();

    // Validaciones
    if (!name) {
        alert('Por favor ingresa tu nombre completo');
        document.getElementById('modalClientName').focus();
        return;
    }

    if (!phone) {
        alert('Por favor ingresa tu número de teléfono');
        document.getElementById('modalClientPhone').focus();
        return;
    }

    const phoneRegex = /^(\+56\s?9|\+569|9)\s?\d{4}\s?\d{4}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('Formato de teléfono inválido. Usa +56 9 XXXX XXXX');
        document.getElementById('modalClientPhone').focus();
        return;
    }

    if (!address) {
        alert('Por favor ingresa tu dirección completa');
        document.getElementById('modalClientAddress').focus();
        return;
    }

    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    // Confirmación final
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const confirmMessage = `¿Confirmar pedido?\n\nProductos: ${cart.length}\nTotal: $${total.toLocaleString('es-CL')}\nDirección: ${address}\n\nSe abrirá WhatsApp para enviar el pedido.`;

    if (!confirm(confirmMessage)) {
        return;
    }

    // Generar mensaje de WhatsApp con formato de boleta
    const timestamp = new Date().toLocaleString('es-CL');
    const itemsList = cart.map((item, index) =>
        `${index + 1}. ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-CL')}`
    ).join('\n');

    const subtotal = total;

    let message = `NUEVA BOLETA DE PEDIDO BOTI DIVAL\n`;
    message += `========================================\n`;
    message += `Cliente: ${name}\n`;
    message += `Teléfono: ${phone}\n`;
    message += `Dirección: ${address}\n`;
    message += `Fecha / Hora: ${timestamp}\n`;
    message += `========================================\n`;
    message += `DETALLE DE PRODUCTOS:\n`;
    message += `${itemsList}\n`;
    message += `========================================\n`;
    message += `SUBTOTAL: $${subtotal.toLocaleString('es-CL')}\n`;
    message += `ENVÍO: A cotizar según distancia\n`;
    message += `TOTAL: $${subtotal.toLocaleString('es-CL')}\n`;

    if (comments) {
        message += `========================================\n`;
        message += `Comentarios:\n${comments}\n`;
    }

    message += `========================================\n`;
    message += `Por favor confirme disponibilidad y costo de envío.\n`;
    message += `Gracias por su preferencia.`;

    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/56964044114?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Limpiar carrito y cerrar modal
    setTimeout(() => {
        cart = [];
        updateCartUI();
        closeOrderModal();
        closeCart();
        alert('✅ ¡Pedido enviado exitosamente!\n\nTe contactaremos pronto por WhatsApp para confirmar los detalles.');
    }, 1000);
}

/* ==================== PROMOCIONES ==================== */

const PROMOS = [
    {
        id: 1001,
        name: 'Pack Pisco Party',
        price: 19900,
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop',
        description: 'Pisco Capel Añejo + Bebida 3L + Hielo premium + Copas'
    },
    {
        id: 1002,
        name: 'Combo Cervecero Premium',
        price: 24900,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        description: '6 Cervezas Artesanales + Snacks variados + Hielo'
    },
    {
        id: 1003,
        name: 'Kit Vino Nocturno',
        price: 29900,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
        description: '2 Vinos Premium + Hielo + Copas + Snacks gourmet'
    },
    {
        id: 1004,
        name: 'Combo Familiar',
        price: 27900,
        image: 'https://images.unsplash.com/photo-1608270861620-7c80b6ff7435?w=400&h=300&fit=crop',
        description: 'Vino + Cervezas + Snacks + Bebidas no alcohólicas'
    }
];

function addPromoToCart(promoId) {
    const promo = PROMOS.find(p => p.id === 1000 + promoId);
    if (!promo) return;

    // Agregar como producto especial
    const cartItem = cart.find(item => item.id === promo.id);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            ...promo,
            quantity: 1,
            category: 'promociones'
        });
    }

    updateCartUI();
    showNotificationMessage(`✓ ${promo.name} agregado al carrito`);
}

function scrollPromo(direction) {
    const track = document.querySelector('.promo-track');
    const cardWidth = 350; // Ancho aproximado de cada card
    const scrollAmount = cardWidth * direction;
    
    track.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

/* ==================== BÚSQUEDA ==================== */

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');

    if (query.length < 2) {
        resultsContainer.classList.remove('active');
        return;
    }

    const results = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        resultsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary);">No se encontraron productos</div>';
        resultsContainer.classList.add('active');
        return;
    }

    resultsContainer.innerHTML = results.map(product => `
        <div class="search-result-item" onclick="handleSearchResultClick(${product.id})">
            <div>
                <div style="margin-bottom: 4px;">
                    <span style="font-size: 1.2rem; margin-right: 8px;">${product.emoji}</span>
                    <strong>${product.name}</strong>
                </div>
                <small style="color: var(--text-secondary);">${product.description}</small>
            </div>
            <div style="color: var(--primary-color); font-weight: 600;">$${product.price.toLocaleString('es-CL')}</div>
        </div>
    `).join('');

    resultsContainer.classList.add('active');
}

function handleSearchResultClick(productId) {
    addToCart(productId, 1, true);
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').classList.remove('active');
    openCart();
}

/* ==================== HORARIOS Y ESTADO ==================== */

function updateStatus() {
    const statusBar = document.getElementById('statusBar');
    const statusText = document.getElementById('statusText');
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    let isOpen = false;
    let closeTime = '';

    // Domingo (0) a Jueves (4): abierto hasta 00:30 (30 minutos del día siguiente)
    // Viernes (5) y Sábado (6): abierto hasta 02:30 (150 minutos del día siguiente)

    if (day >= 0 && day <= 4) {
        // Abierto 24 horas hasta las 00:30 siguiente
        isOpen = true;
        if (currentTime >= 1440 - 30) { // Mínimo 00:30
            closeTime = 'hasta las 00:30';
        } else {
            closeTime = 'hasta las 00:30';
        }
    } else if (day === 5 || day === 6) {
        // Viernes y sábado abierto hasta 02:30
        isOpen = true;
        closeTime = 'hasta las 02:30';
    }

    if (isOpen) {
        statusText.textContent = `⏰ Abierto ${closeTime}`;
        statusText.classList.remove('closed');
    } else {
        statusText.textContent = '❌ Cerrado en estos momentos';
        statusText.classList.add('closed');
    }
}

// Mini menu functions
function showMiniMenu() {
    const menu = document.getElementById('miniMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function quickQuote() {
    showMiniMenu();
    if (cart.length === 0) {
        showNotificationMessage('🛒 Carrito vacío');
        return;
    }
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const message = `Hola Boti Dival! Cotización rápida:\n\n` +
        `${cart.reduce((sum, item) => sum + item.quantity, 0)} items\n` +
        `Subtotal: $${subtotal.toLocaleString('es-CL')}\n\n` +
        `Necesito cotizar envío.`;
    const url = `https://wa.me/56964044114?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    showNotificationMessage('💰 Cotización enviada por WhatsApp');
}

function clearCart() {
    if (confirm('¿Vaciar carrito?')) {
        cart = [];
        updateCartUI();
        showNotificationMessage('🗑️ Carrito vaciado');
        showMiniMenu();
    }
}

/* ==================== FINALIZAR PEDIDO ==================== */

function finalizeOrder() {
    const clientName = document.getElementById('clientName').value.trim();
    const clientAddress = document.getElementById('clientAddress').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();
    const clientComments = document.getElementById('clientComments').value.trim();

    // Validación mejorada
    if (!clientName) {
        showNotificationMessage('⚠️ Por favor ingresa tu nombre completo');
        document.getElementById('clientName').focus();
        return;
    }

    if (!clientAddress) {
        showNotificationMessage('⚠️ Por favor ingresa tu dirección completa');
        document.getElementById('clientAddress').focus();
        return;
    }

    if (!clientPhone) {
        showNotificationMessage('⚠️ Por favor ingresa tu número de teléfono');
        document.getElementById('clientPhone').focus();
        return;
    }

    // Validar formato de teléfono chileno
    const phoneRegex = /^(\+56\s?9|\+569|9)\s?\d{4}\s?\d{4}$/;
    if (!phoneRegex.test(clientPhone.replace(/\s/g, ''))) {
        showNotificationMessage('⚠️ Formato de teléfono inválido. Usa +56 9 XXXX XXXX');
        document.getElementById('clientPhone').focus();
        return;
    }

    if (cart.length === 0) {
        showNotificationMessage('🛒 Tu carrito está vacío');
        return;
    }

    // Mostrar confirmación antes de enviar
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    updateStepIndicator(3); // Paso de confirmación
    
    const confirmMessage = `¿Confirmar pedido?\n\n📦 ${totalItems} productos\n💰 Subtotal: $${subtotal.toLocaleString('es-CL')}\n📍 Entrega: ${clientAddress}\n\nSe abrirá WhatsApp para confirmar.`;
    
    if (!confirm(confirmMessage)) {
        updateStepIndicator(2); // Volver al formulario
        return;
    }

    // Generar mensaje
    const message = generateWhatsAppMessage(clientName, clientAddress, clientPhone, clientComments);
    
    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/56964044114?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Limpiar formulario y carrito
    setTimeout(() => {
        cart = [];
        document.getElementById('clientName').value = '';
        document.getElementById('clientAddress').value = '';
        document.getElementById('clientPhone').value = '';
        document.getElementById('clientComments').value = '';
        setCompactMode(true);
        showNotificationMessage('✅ ¡Pedido enviado! Te contactaremos pronto.');
        closeCart();
    }, 1000);
}

function generateWhatsAppMessage(name, address, phone, comments) {
    const timestamp = new Date().toLocaleString('es-CL');
    const itemsList = cart.map(item => 
        `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-CL')}`
    ).join('\n');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    let message = `🛒 *NUEVO PEDIDO BOTI DIVAL* 🛒\n\n`;
    message += `📌 *Información del Cliente*\n`;
    message += `👤 Nombre: ${name}\n`;
    message += `📞 Teléfono: ${phone}\n`;
    message += `📍 Dirección: ${address}\n`;
    message += `⏰ Fecha/Hora: ${timestamp}\n\n`;
    message += `📦 *Productos Pedidos (${totalItems} items)*\n`;
    message += itemsList + '\n\n';
    message += `💰 *Subtotal: $${subtotal.toLocaleString('es-CL')}*\n`;
    message += `🚚 Envío: A cotizar según distancia\n\n`;
    
    if (comments) {
        message += `📝 *Comentarios*\n${comments}\n\n`;
    }
    
    message += `✅ *Por favor confirma disponibilidad y costo de envío*\n`;
    message += `¡Gracias por tu pedido! 😊`;

    return message;
}

/* ==================== CONTACTO Y CONSULTAS ==================== */

function contactShipping() {
    const message = `Hola Boti Dival, me gustaría consultar sobre el costo de envío a mi zona. Mi dirección es: [Mi dirección]`;
    const whatsappUrl = `https://wa.me/56985062378?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

/* ==================== UTILIDADES ==================== */

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showNotificationMessage(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

/* ==================== EFECTO PARALLAX Y SCROLL ==================== */

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-animation');
    if (parallax) {
        parallax.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.5}px))`;
    }
});

/* ==================== ANIMACIONES DE SCROLL ==================== */

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Agregar clases de animación a elementos
    document.querySelectorAll('.promo-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        if (index % 2 === 0) {
            card.classList.add('animate-slide-left');
        } else {
            card.classList.add('animate-slide-right');
        }
        observer.observe(card);
    });

    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.add('animate-scale');
        observer.observe(card);
    });

    document.querySelectorAll('.location-info, .delivery-info').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

/* ==================== MEJORAS DE UX ==================== */

function addTouchFeedback() {
    // Agregar feedback táctil en móviles solo a botones y promociones
    document.querySelectorAll('.btn, .promo-card').forEach(el => {
        el.addEventListener('touchstart', () => {
            el.style.transform = 'scale(0.98)';
        });
        
        el.addEventListener('touchend', () => {
            el.style.transform = '';
        });
    });
}

function enhanceSearch() {
    // Mejorar búsqueda con debounce
    let searchTimeout;
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            handleSearch(e);
        }, 300);
    });
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K para focus en búsqueda
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
        
        // Escape para cerrar carrito
        if (e.key === 'Escape') {
            closeCart();
        }
    });
}

/* ==================== INICIALIZACIÓN MEJORADA ==================== */

function initializeApp() {
    renderProducts(PRODUCTS);
    setupEventListeners();
    updateStatus();
    updateCartUI();
    initializeCarousel();
    initScrollAnimations();
    addTouchFeedback();
    enhanceSearch();
    addKeyboardShortcuts();
    setInterval(updateStatus, 60000); // Actualizar estado cada minuto
    setupLazyLoad();
}

/* ==================== OPTIMIZACIÓN DE RENDIMIENTO ==================== */

function setupLazyLoad() {
    const lazyObserverOptions = {
        threshold: 0.1
    };

    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                lazyObserver.unobserve(entry.target);
            }
        });
    }, lazyObserverOptions);

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        lazyObserver.observe(card);
    });
}

/* ==================== DARK MODE (Automático según hora) ==================== */

function checkDarkMode() {
    const hour = new Date().getHours();
    // Modo nocturno activo desde las 18:00 hasta las 06:00
    if (hour >= 18 || hour < 6) {
        document.body.style.filter = 'brightness(0.98)';
    }
}

checkDarkMode();
setInterval(checkDarkMode, 600000); // Check cada 10 minutos

/* ==================== CONTADOR DE DEMANDA ==================== */

function updateDemandStatus() {
    // Simulación - en producción esto vendría de un servidor
    const hour = new Date().getHours();
    if (hour >= 22 || hour <= 2) {
        // "Alta demanda" en horarios pico nocturnos
        return true;
    }
    return Math.random() > 0.6;
}

/* ==================== SERVICE WORKER PARA PWA ==================== */

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
        // Service worker no disponible, continuar sin él
    });
}

/* ==================== MANEJO DE CONEXIÓN ==================== */

window.addEventListener('online', () => {
    showNotificationMessage('✓ Conexión establecida');
});

window.addEventListener('offline', () => {
    showNotificationMessage('⚠️ Sin conexión a internet');
});
