// admin.js - Panel administrativo profesional

if (!window.BASE_URL) {
    window.BASE_URL = (() => {
        const href = window.location.href;
        if (href.includes('github.io') || href.includes('botidival')) {
            return '/botidival/';
        }
        return '/';
    })();
}

const STORAGE_KEYS = {
    pedidos: 'pedidosHistorial',
    promociones: 'promociones',
    carousel: 'carouselImages',
    delivery: 'deliveryStatus'
};

const ORDER_STATUS = ['nuevo', 'preparando', 'en-camino', 'entregado', 'cancelado'];

let editingPromoId = null;
let editingCarouselId = null;

function readStorageArray(key) {
    const parsed = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(parsed) ? parsed : [];
}

function writeStorageArray(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function ensurePedidosHaveStatus() {
    const pedidos = readStorageArray(STORAGE_KEYS.pedidos);
    let changed = false;
    pedidos.forEach((pedido) => {
        if (!pedido.estado) {
            pedido.estado = 'nuevo';
            changed = true;
        }
    });
    if (changed) {
        writeStorageArray(STORAGE_KEYS.pedidos, pedidos);
    }
}

function protectDashboard() {
    const isDashboard = window.location.href.includes('admin-dashboard.html');
    if (!isDashboard) return;

    if (typeof Auth === 'undefined') {
        alert('Error: Sistema de autenticacion no cargado.');
        window.location.href = window.BASE_URL + 'admin-login.html?error=system';
        return;
    }

    Auth.loadSession();
    if (!Auth.isAuthenticated() || !Auth.hasRole('admin')) {
        Auth.logout();
        window.location.href = window.BASE_URL + 'admin-login.html';
        return;
    }

    const user = Auth.getCurrentUser();
    const brand = document.querySelector('.navbar-brand');
    if (brand && user) brand.textContent = `Panel Admin - ${user.name}`;
    setupLogout();
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (!logoutBtn) return;
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Cerrar sesion de administrador?')) {
            Auth.logout();
            window.location.href = window.BASE_URL + 'admin-login.html?reason=logout';
        }
    });
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('[id$="Section"]');
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = `${link.getAttribute('data-section')}Section`;
            sections.forEach((section) => {
                section.style.display = 'none';
            });
            const target = document.getElementById(sectionId);
            if (target) target.style.display = 'block';
            navLinks.forEach((nav) => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function sumMoney(pedidos) {
    return pedidos.reduce((sum, p) => sum + (p?.costos?.total || 0), 0);
}

function getDashboardStats() {
    const pedidos = readStorageArray(STORAGE_KEYS.pedidos);
    const now = new Date();
    const dayStart = new Date(now);
    dayStart.setHours(0, 0, 0, 0);
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);
    const monthStart = new Date(now);
    monthStart.setDate(now.getDate() - 30);

    const today = pedidos.filter((p) => new Date(p.fecha) >= dayStart);
    const week = pedidos.filter((p) => new Date(p.fecha) >= weekStart);
    const month = pedidos.filter((p) => new Date(p.fecha) >= monthStart);

    return {
        totalPedidos: pedidos.length,
        pedidosHoy: today.length,
        ventasHoy: sumMoney(today),
        ventasSemana: sumMoney(week),
        ventasMes: sumMoney(month),
        ingresosTiempoReal: sumMoney(pedidos)
    };
}

function renderDashboard() {
    const stats = getDashboardStats();
    document.getElementById('metricPedidos').textContent = stats.totalPedidos;
    document.getElementById('metricPedidosHoy').textContent = stats.pedidosHoy;
    document.getElementById('metricVentasHoy').textContent = `$${stats.ventasHoy.toLocaleString('es-CL')}`;
    document.getElementById('metricVentasSemana').textContent = `$${stats.ventasSemana.toLocaleString('es-CL')}`;
    document.getElementById('metricVentasMes').textContent = `$${stats.ventasMes.toLocaleString('es-CL')}`;
    document.getElementById('metricIngresos').textContent = `$${stats.ingresosTiempoReal.toLocaleString('es-CL')}`;
}

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function savePromocion(event) {
    event.preventDefault();
    const imageFile = document.getElementById('promoImageFile').files[0];
    const imageUrl = document.getElementById('promoImageUrl').value.trim();
    const title = document.getElementById('promoTitle').value.trim();
    const description = document.getElementById('promoDescription').value.trim();
    const currentPrice = Number(document.getElementById('promoPrice').value || 0);
    const previousPriceValue = document.getElementById('promoPreviousPrice').value;
    const previousPrice = previousPriceValue ? Number(previousPriceValue) : null;

    if (!title || !description || !currentPrice) {
        alert('Completa titulo, descripcion y precio actual.');
        return;
    }

    let image = imageUrl;
    if (imageFile) {
        image = await readFileAsDataUrl(imageFile);
    }
    if (!image) {
        alert('Debes subir una imagen o pegar URL.');
        return;
    }

    const promociones = readStorageArray(STORAGE_KEYS.promociones);
    if (editingPromoId) {
        const promo = promociones.find((p) => p.id === editingPromoId);
        if (promo) {
            promo.image = image;
            promo.title = title;
            promo.description = description;
            promo.price = currentPrice;
            promo.previousPrice = previousPrice;
        }
    } else {
        promociones.unshift({
            id: Date.now(),
            image,
            title,
            description,
            price: currentPrice,
            previousPrice,
            active: true,
            createdAt: new Date().toISOString()
        });
    }
    writeStorageArray(STORAGE_KEYS.promociones, promociones);
    resetPromoForm();
    renderPromociones();
}

function editPromocion(id) {
    const promociones = readStorageArray(STORAGE_KEYS.promociones);
    const promo = promociones.find((p) => p.id === id);
    if (!promo) return;
    editingPromoId = id;
    document.getElementById('promoTitle').value = promo.title;
    document.getElementById('promoDescription').value = promo.description;
    document.getElementById('promoPrice').value = promo.price || '';
    document.getElementById('promoPreviousPrice').value = promo.previousPrice || '';
    document.getElementById('promoImageUrl').value = promo.image?.startsWith('data:') ? '' : promo.image;
    document.getElementById('promoSaveBtn').textContent = 'Actualizar promocion';
}

function deletePromocion(id) {
    if (!confirm('Eliminar esta promocion?')) return;
    const promociones = readStorageArray(STORAGE_KEYS.promociones).filter((p) => p.id !== id);
    writeStorageArray(STORAGE_KEYS.promociones, promociones);
    renderPromociones();
}

function togglePromocion(id) {
    const promociones = readStorageArray(STORAGE_KEYS.promociones);
    const promo = promociones.find((p) => p.id === id);
    if (!promo) return;
    promo.active = !promo.active;
    writeStorageArray(STORAGE_KEYS.promociones, promociones);
    renderPromociones();
}

function resetPromoForm() {
    editingPromoId = null;
    document.getElementById('promoCreateForm').reset();
    document.getElementById('promoSaveBtn').textContent = 'Guardar promocion';
}

function renderPromociones() {
    const promociones = readStorageArray(STORAGE_KEYS.promociones);
    const grid = document.getElementById('promocionesGrid');
    grid.innerHTML = promociones.map((promo) => `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${promo.image}" class="card-img-top" alt="${promo.title}" style="height:200px;object-fit:cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${promo.title}</h5>
                    <p class="card-text text-muted">${promo.description}</p>
                    <div class="mb-2">
                        ${promo.previousPrice ? `<span class="text-muted text-decoration-line-through me-2">$${promo.previousPrice.toLocaleString('es-CL')}</span>` : ''}
                        <span class="fw-bold text-success">$${promo.price.toLocaleString('es-CL')}</span>
                    </div>
                    <div class="mt-auto d-flex gap-2 flex-wrap">
                        <button class="btn btn-sm ${promo.active ? 'btn-warning' : 'btn-success'}" onclick="togglePromocion(${promo.id})">
                            ${promo.active ? 'Desactivar' : 'Activar'}
                        </button>
                        <button class="btn btn-sm btn-primary" onclick="editPromocion(${promo.id})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="deletePromocion(${promo.id})">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

async function saveCarouselImage(event) {
    event.preventDefault();
    const imageFile = document.getElementById('carouselImageFile').files[0];
    const imageUrl = document.getElementById('carouselImageUrl').value.trim();
    const title = document.getElementById('carouselImageTitle').value.trim();
    let image = imageUrl;
    if (imageFile) {
        image = await readFileAsDataUrl(imageFile);
    }
    if (!image) {
        alert('Debes subir imagen o URL.');
        return;
    }
    const images = readStorageArray(STORAGE_KEYS.carousel);
    if (editingCarouselId) {
        const current = images.find((img) => img.id === editingCarouselId);
        if (current) {
            current.image = image;
            current.title = title || current.title;
        }
    } else {
        images.push({ id: Date.now(), image, title: title || 'Imagen promocional', active: true });
    }
    writeStorageArray(STORAGE_KEYS.carousel, images);
    resetCarouselForm();
    renderCarouselAdmin();
}

function resetCarouselForm() {
    editingCarouselId = null;
    document.getElementById('carouselCreateForm').reset();
    document.getElementById('carouselSaveBtn').textContent = 'Guardar imagen';
}

function editCarouselImage(id) {
    const images = readStorageArray(STORAGE_KEYS.carousel);
    const item = images.find((img) => img.id === id);
    if (!item) return;
    editingCarouselId = id;
    document.getElementById('carouselImageTitle').value = item.title || '';
    document.getElementById('carouselImageUrl').value = item.image?.startsWith('data:') ? '' : item.image;
    document.getElementById('carouselSaveBtn').textContent = 'Actualizar imagen';
}

function deleteCarouselImage(id) {
    if (!confirm('Eliminar imagen del carrusel?')) return;
    const images = readStorageArray(STORAGE_KEYS.carousel).filter((img) => img.id !== id);
    writeStorageArray(STORAGE_KEYS.carousel, images);
    renderCarouselAdmin();
}

function moveCarouselImage(id, direction) {
    const images = readStorageArray(STORAGE_KEYS.carousel);
    const index = images.findIndex((img) => img.id === id);
    if (index < 0) return;
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= images.length) return;
    [images[index], images[nextIndex]] = [images[nextIndex], images[index]];
    writeStorageArray(STORAGE_KEYS.carousel, images);
    renderCarouselAdmin();
}

function toggleCarouselImage(id) {
    const images = readStorageArray(STORAGE_KEYS.carousel);
    const item = images.find((img) => img.id === id);
    if (!item) return;
    item.active = !item.active;
    writeStorageArray(STORAGE_KEYS.carousel, images);
    renderCarouselAdmin();
}

function renderCarouselAdmin() {
    const images = readStorageArray(STORAGE_KEYS.carousel);
    const grid = document.getElementById('carouselGrid');
    grid.innerHTML = images.map((item, idx) => `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${item.image}" alt="${item.title}" class="card-img-top" style="height:200px;object-fit:cover;">
                <div class="card-body">
                    <h6>${item.title || `Imagen ${idx + 1}`}</h6>
                    <div class="d-flex gap-2 flex-wrap">
                        <button class="btn btn-sm ${item.active ? 'btn-warning' : 'btn-success'}" onclick="toggleCarouselImage(${item.id})">${item.active ? 'Ocultar' : 'Mostrar'}</button>
                        <button class="btn btn-sm btn-primary" onclick="editCarouselImage(${item.id})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteCarouselImage(${item.id})">Eliminar</button>
                        <button class="btn btn-sm btn-outline-secondary" onclick="moveCarouselImage(${item.id}, -1)">↑</button>
                        <button class="btn btn-sm btn-outline-secondary" onclick="moveCarouselImage(${item.id}, 1)">↓</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getOrderStatusBadge(status) {
    const map = {
        nuevo: 'bg-primary',
        preparando: 'bg-warning text-dark',
        'en-camino': 'bg-info text-dark',
        entregado: 'bg-success',
        cancelado: 'bg-danger'
    };
    return map[status] || 'bg-secondary';
}

function updateOrderStatus(id, status) {
    const pedidos = readStorageArray(STORAGE_KEYS.pedidos);
    const pedido = pedidos.find((p) => p.id === id);
    if (!pedido) return;
    pedido.estado = status;
    writeStorageArray(STORAGE_KEYS.pedidos, pedidos);
    renderOrders();
    renderDashboard();
}

function renderOrders() {
    const tbody = document.getElementById('pedidosTableBody');
    let pedidos = readStorageArray(STORAGE_KEYS.pedidos);
    pedidos = pedidos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    tbody.innerHTML = pedidos.map((pedido) => `
        <tr>
            <td>${pedido.id}</td>
            <td>${new Date(pedido.fecha).toLocaleDateString('es-CL')} ${new Date(pedido.fecha).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}</td>
            <td>${pedido.cliente?.nombre || '-'}</td>
            <td><span class="badge ${pedido.tipo === 'delivery' ? 'bg-primary' : 'bg-secondary'}">${pedido.tipo === 'delivery' ? 'Delivery' : 'Presencial'}</span></td>
            <td><span class="badge ${getOrderStatusBadge(pedido.estado || 'nuevo')}">${pedido.estado || 'nuevo'}</span></td>
            <td>${pedido.cliente?.comuna || '-'} - ${pedido.cliente?.sector || '-'}</td>
            <td>$${(pedido.costos?.total || 0).toLocaleString('es-CL')}</td>
            <td>
                <div class="btn-group btn-group-sm mb-1">
                    ${ORDER_STATUS.map((status) => `<button class="btn btn-outline-dark" onclick="updateOrderStatus(${pedido.id}, '${status}')">${status}</button>`).join('')}
                </div>
                <button class="btn btn-sm btn-info" onclick="verDetallePedido(${pedido.id})">Detalle</button>
            </td>
        </tr>
    `).join('');
}

function verDetallePedido(id) {
    const pedidos = readStorageArray(STORAGE_KEYS.pedidos);
    const pedido = pedidos.find((p) => p.id === id);
    if (!pedido) return;

    document.getElementById('modalPedidoId').textContent = pedido.id;
    document.getElementById('modalClienteNombre').textContent = pedido.cliente?.nombre || '-';
    document.getElementById('modalClienteTelefono').textContent = pedido.cliente?.telefono || '-';
    document.getElementById('modalClienteComuna').textContent = pedido.cliente?.comuna || '-';
    document.getElementById('modalClienteSector').textContent = pedido.cliente?.sector || '-';
    document.getElementById('modalClienteDireccion').textContent = pedido.cliente?.direccion || '-';
    document.getElementById('modalClienteCoordenadas').textContent = pedido.cliente?.coordenadas || '-';
    document.getElementById('modalPedidoFecha').textContent = new Date(pedido.fecha).toLocaleString('es-CL');
    document.getElementById('modalPedidoTipo').textContent = pedido.tipo || '-';
    document.getElementById('modalPedidoComentarios').textContent = pedido.comentarios || '-';
    document.getElementById('modalSubtotal').textContent = (pedido.costos?.subtotal || 0).toLocaleString('es-CL');
    document.getElementById('modalDelivery').textContent = (pedido.costos?.delivery || 0).toLocaleString('es-CL');
    document.getElementById('modalTotal').textContent = (pedido.costos?.total || 0).toLocaleString('es-CL');
    document.getElementById('modalProductosTable').innerHTML = (pedido.productos || []).map((p) => `
        <tr>
            <td>${p.nombre}</td>
            <td>${p.cantidad}</td>
            <td>$${(p.precioUnitario || 0).toLocaleString('es-CL')}</td>
            <td>$${(p.subtotal || 0).toLocaleString('es-CL')}</td>
        </tr>
    `).join('');

    new bootstrap.Modal(document.getElementById('pedidoDetailModal')).show();
}

function triggerNewOrderAlert() {
    const alertEl = document.getElementById('newOrderAlert');
    if (alertEl) {
        alertEl.classList.remove('d-none');
        setTimeout(() => alertEl.classList.add('d-none'), 3500);
    }
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.12);
    } catch (_e) {
        // Sin audio disponible
    }
}

function watchOrdersRealtime() {
    const currentCount = readStorageArray(STORAGE_KEYS.pedidos).length;
    const prevCount = Number(sessionStorage.getItem('adminOrderCount') || 0);
    if (currentCount > prevCount && prevCount !== 0) {
        triggerNewOrderAlert();
    }
    sessionStorage.setItem('adminOrderCount', String(currentCount));
}

function setDeliveryStatus(status) {
    localStorage.setItem(STORAGE_KEYS.delivery, JSON.stringify(status));
    renderDeliveryStatus();
}

function renderDeliveryStatus() {
    const deliveryStatus = JSON.parse(localStorage.getItem(STORAGE_KEYS.delivery));
    const current = deliveryStatus !== null ? deliveryStatus : true;
    const dot = document.getElementById('deliveryStatusDot');
    const text = document.getElementById('deliveryStatusText');
    const message = document.getElementById('deliveryCurrentStatus');
    const activateBtn = document.getElementById('activateDeliveryBtn');
    const deactivateBtn = document.getElementById('deactivateDeliveryBtn');

    if (current) {
        dot.className = 'status-dot active';
        text.textContent = 'Delivery ACTIVO';
        message.textContent = 'Delivery Disponible para clientes.';
        activateBtn.style.display = 'none';
        deactivateBtn.style.display = 'inline-block';
    } else {
        dot.className = 'status-dot inactive';
        text.textContent = 'Delivery INACTIVO';
        message.textContent = 'Delivery No Disponible. Solo retiro presencial.';
        activateBtn.style.display = 'inline-block';
        deactivateBtn.style.display = 'none';
    }
}

function bootAdmin() {
    ensurePedidosHaveStatus();
    protectDashboard();
    setupNavigation();
    renderDashboard();
    renderPromociones();
    renderCarouselAdmin();
    renderOrders();
    renderDeliveryStatus();

    document.getElementById('promoCreateForm').addEventListener('submit', savePromocion);
    document.getElementById('carouselCreateForm').addEventListener('submit', saveCarouselImage);

    watchOrdersRealtime();
    setInterval(() => {
        renderDashboard();
        renderOrders();
        watchOrdersRealtime();
    }, 3000);

    window.addEventListener('storage', (event) => {
        if ([STORAGE_KEYS.pedidos, STORAGE_KEYS.promociones, STORAGE_KEYS.carousel, STORAGE_KEYS.delivery].includes(event.key)) {
            renderDashboard();
            renderPromociones();
            renderCarouselAdmin();
            renderOrders();
            renderDeliveryStatus();
            watchOrdersRealtime();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootAdmin);
} else {
    bootAdmin();
}

