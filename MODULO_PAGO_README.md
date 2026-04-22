# Módulo de Pago - Sistema de Ventas con Delivery

## Descripción

Se ha implementado un módulo de pago completo que se activa inmediatamente al presionar el icono del carrito (🛒). Incluye selección de comuna/sector, cálculo automático de delivery, total actualizado, opciones de ubicación y envío directo a WhatsApp.

## Funcionalidades

### 🛒 Activación Inmediata
- Al presionar el carrito, se abre directamente el panel lateral con el flujo de pago
- No hay modales intermedios - flujo directo al checkout

### 📍 Selección de Comuna y Sector
- Lista desplegable con comunas de la Región de O'Higgins
- Sectores específicos por comuna con costos de delivery diferenciados
- Cálculo automático del costo de envío al seleccionar sector

### 💰 Cálculo Automático
- Subtotal de productos
- Costo de delivery según zona
- Total actualizado en tiempo real

### 📍 Opciones de Ubicación
- **Geolocalización automática**: Botón para obtener coordenadas GPS
- **Ingreso manual**: Campo para coordenadas personalizadas
- Integración con mapas (opcional para futuras versiones)

### 📋 Resumen del Pedido
- Vista completa antes de confirmar
- Detalles del cliente, productos, costos y ubicación
- Opción de modificar o confirmar

### 📲 Integración WhatsApp
- Mensaje preformateado con todos los detalles
- Envío directo al número de Boti Dival
- Limpieza automática del carrito después del envío

## Zonas de Delivery

### Coltauco
- Centro: $0 (gratis)
- Norte/Sur: $1,000
- Este/Oeste: $1,500

### Otras Comunas
- Doñihue: $2,000 - $3,000
- Machalí: $2,500 - $3,500
- Rancagua: $3,000 - $4,000
- Graneros: $3,500 - $4,500
- San Vicente: $4,000 - $5,000
- Peumo: $4,500 - $5,500
- Las Cabras: $5,000 - $6,000
- Mostazal: $5,500 - $6,500
- Codegua: $6,000 - $7,000

## Flujo de Usuario

1. **Agregar productos** al carrito
2. **Presionar carrito** → Se abre panel lateral automáticamente
3. **Seleccionar comuna** → Se cargan sectores disponibles
4. **Seleccionar sector** → Se calcula delivery automáticamente
5. **Ingresar datos personales** (nombre, teléfono, dirección)
6. **Opcional: Adjuntar ubicación** (GPS o manual)
7. **Ver resumen** → Revisar todos los detalles
8. **Confirmar y enviar** → WhatsApp con mensaje completo

## Archivos Modificados

- `index.html`: Actualizado formulario del carrito
- `script.js`: Nuevas funciones de delivery y pago
- `styles.css`: Estilos para opciones de ubicación y resumen

## Notas Técnicas

- **Responsive**: Funciona en móviles y desktop
- **Validaciones**: Campos requeridos y formato de teléfono
- **Geolocalización**: Compatible con navegadores modernos
- **WhatsApp**: Enlaces directos con mensajes preformateados
- **Limpieza**: Carrito se vacía automáticamente después del pedido

## Próximas Mejoras

- Integración con Google Maps para selección visual de ubicación
- Sistema de pagos online (WebPay, etc.)
- Historial de pedidos
- Notificaciones push
- Descuentos por zona</content>
<parameter name="filePath">c:\Users\maxim\Desktop\Boti Dival\MODULO_PAGO_README.md