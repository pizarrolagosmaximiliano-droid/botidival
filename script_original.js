/* ==================== PRODUCTOS ==================== */

const PRODUCTS = [
    // Cervezas
    { id: 1, name: 'Cerveza Artesanal Golden', category: 'cervezas', price: 3500, image: 'https://images.unsplash.com/photo-1608270861620-7c80b6ff7435?w=400&h=400&fit=crop', description: '750ml - Dorada y refrescante', popular: true },
    { id: 2, name: 'Cerveza IPA Craft', category: 'cervezas', price: 4200, image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop', description: '750ml - Amarga y aromática' },
    { id: 3, name: 'Cerveza Stout Premium', category: 'cervezas', price: 4800, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', description: '750ml - Oscura y cremosa' },
    { id: 4, name: 'Six Pack Cerveza Lager', category: 'cervezas', price: 18900, image: 'https://images.unsplash.com/photo-1584225064536-c72e279bbc48?w=400&h=400&fit=crop', description: 'Pack 6 botellas de 330ml', popular: true },
    
    // Destilados
    { id: 5, name: 'Pisco Capel Añejo', category: 'destilados', price: 12900, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop', description: 'Botella 750ml - Premium', popular: true },
    { id: 6, name: 'Ron Bacardi 37.5%', category: 'destilados', price: 14900, image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop', description: 'Botella 750ml - Clásico' },
    { id: 7, name: 'Whisky Johnny Walker Red', category: 'destilados', price: 17900, image: 'https://images.unsplash.com/photo-1528826127821-9213ee3e50b7?w=400&h=400&fit=crop', description: 'Botella 750ml - Suave', popular: true },
    { id: 8, name: 'Vodka Smirnoff Premium', category: 'destilados', price: 13900, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=400&fit=crop', description: 'Botella 750ml - Premium' },
    
    // Vinos
    { id: 9, name: 'Vino Tinto Cabernet 2020', category: 'vinos', price: 8900, image: 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=400&h=400&fit=crop', description: 'Botella 750ml - Tinto robusto' },
    { id: 10, name: 'Vino Blanco Sauvignon', category: 'vinos', price: 9500, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop', description: 'Botella 750ml - Blanco fresco' },
    { id: 11, name: 'Espumante Champaña', category: 'vinos', price: 15900, image: 'https://images.unsplash.com/photo-1553691603-dedf7bf3c22b?w=400&h=400&fit=crop', description: 'Botella 750ml - Burbujeante', popular: true },
    { id: 12, name: 'Vino Rosado Pinot Grigio', category: 'vinos', price: 7900, image: 'https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400&h=400&fit=crop', description: 'Botella 750ml - Rosado suave' },
    
    // Hielo
    { id: 13, name: 'Hielo Bolsa Grande', category: 'hielo', price: 3500, image: 'https://images.unsplash.com/photo-1599599810694-0d5f896bb19e?w=400&h=400&fit=crop', description: '2kg - Cubos perfectos' },
    { id: 14, name: 'Hielo Bolsa Premium', category: 'hielo', price: 4900, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', description: '3kg - Cilindros premium' },
    { id: 15, name: 'Hielo Picado 5kg', category: 'hielo', price: 6900, image: 'https://images.unsplash.com/photo-1559040186-43ae7d0b5b4d?w=400&h=400&fit=crop', description: 'Perfecto para tragos' },
    
    // Snacks
    { id: 16, name: 'Mix de Frutos Secos', category: 'snacks', price: 4900, image: 'https://images.unsplash.com/photo-1585329967900-85d89d59e6e0?w=400&h=400&fit=crop', description: '200g - Premium variado' },
    { id: 17, name: 'Papas Chips Premium', category: 'snacks', price: 3900, image: 'https://images.unsplash.com/photo-1566479179815-4688157e8d6b?w=400&h=400&fit=crop', description: '150g - Variadas y crujientes' },
    { id: 18, name: 'Choclo Maíz Tostado', category: 'snacks', price: 2900, image: 'https://images.unsplash.com/photo-1541599468348-e96984315621?w=400&h=400&fit=crop', description: '200g - Salado y delicioso' },
    { id: 19, name: 'Kit Botanas Nocturno', category: 'snacks', price: 8900, image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop', description: 'Variado premium nocturno', popular: true },
    
    // Bebidas
    { id: 20, name: 'Bebida Energética Thunder', category: 'bebidas', price: 2500, image: 'https://images.unsplash.com/photo-1629203820195-928cd62b9a28?w=400&h=400&fit=crop', description: '350ml - Alta energía' },
    { id: 21, name: 'Gaseosa Premium 3L', category: 'bebidas', price: 4900, image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=400&fit=crop', description: 'Botella grande refrescante' },
    { id: 22, name: 'Agua Mineral Purísima', category: 'bebidas', price: 1900, image: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=400&h=400&fit=crop', description: 'Botella 500ml - Pura' },
    { id: 23, name: 'Jugo Natural Naranja 1L', category: 'bebidas', price: 3900, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop', description: 'Fresco y natural' },
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
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}'">
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
