# 🚀 Plan de Finalización: Migración a Firebase (Boti Dival)

Este plan detalla los pasos finales para completar la migración de la plataforma a una arquitectura 100% en la nube y en tiempo real, eliminando la dependencia de `localStorage` para datos críticos.

## Estado Actual de la Migración

- [x] **Infraestructura:** Vite configurado y Firebase inicializado.
- [x] **Autenticación:** Login de administrador seguro con Firebase Auth.
- [x] **Catálogo:** Productos y Promociones sincronizados con Firestore.
- [x] **Imágenes:** Integración con ImgBB API para carga de fotos.
- [ ] **Configuración Global:** Estado del Delivery y Horarios (Pendiente).
- [ ] **Pedidos:** Persistencia de pedidos en Firestore desde el cliente (Pendiente).

---

## Tareas Pendientes (Fase Final)

### 1. [NEW] Módulo de Configuración (Settings)
Actualmente, el botón "Activar/Desactivar Delivery" solo funciona localmente.
- **Crear** `src/services/settings.service.js` para manejar el documento `/settings/store` en Firestore.
- **Campos:** `deliveryEnabled` (boolean) y `closingTime` (string).
- **Admin:** Refactorizar `admin.js` para que los botones de delivery actualicen Firestore.
- **Cliente:** Refactorizar `main.js` para que escuche cambios en Firestore y muestre la barra de estado en tiempo real.

### 2. [MODIFY] Persistencia de Pedidos
Actualmente, los pedidos se envían a WhatsApp pero no se guardan en la base de datos del administrador.
- **Cliente:** En `main.js`, modificar `submitOrder` para llamar a `createOrderToDB` (de `orders.service.js`) antes de abrir WhatsApp.
- **Admin:** Asegurar que la tabla de pedidos en el dashboard se actualice automáticamente (ya existe el listener, solo falta que el cliente guarde los datos).

### 3. [CLEANUP] Limpieza de LocalStorage
- Eliminar inicializaciones de datos de ejemplo en `main.js` que ya no son necesarias.
- Asegurar que `localStorage` se use ÚNICAMENTE para el carrito de compras persistente.

---

## Verification Plan

### Automated Tests
- Ejecutar `npm run build` para asegurar que no hay errores de importación.

### Manual Verification
1. **Prueba de Delivery:** Cambiar el estado del delivery en el Admin y verificar que en el Index (cliente) cambie el mensaje instantáneamente sin recargar.
2. **Prueba de Pedido Real:** Realizar un pedido como cliente, verificar que se abre WhatsApp y, simultáneamente, verificar que el pedido aparece con sonido en el panel de Administración.
3. **Persistencia:** Recargar ambas páginas y verificar que los datos se mantienen consistentes desde Firebase.

---

> [!IMPORTANT]
> **¿Damos inicio a la ejecución de esta fase final?**
