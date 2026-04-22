# Panel Administrativo - Sistema de Ventas con Delivery

Este panel administrativo web responsivo permite gestionar un sistema de ventas con delivery, incluyendo integración con WhatsApp.

## Características

- **Login de Administrador**: Autenticación simple para acceder al panel.
- **Dashboard Moderno**: Diseño con cards para estadísticas clave.
- **Responsivo**: Adaptado para móviles y tablets usando Bootstrap.
- **Integración WhatsApp**: Envío de mensajes a clientes directamente desde el panel.

## Archivos

- `admin-login.html`: Página de login.
- `admin-dashboard.html`: Dashboard principal con navegación.
- `admin.css`: Estilos adicionales para el diseño.
- `admin.js`: Funcionalidad JavaScript para interactividad.

## Cómo Usar

1. Abre `admin-login.html` en tu navegador.
2. Ingresa las credenciales:
   - Usuario: `admin`
   - Contraseña: `password`
3. Una vez logueado, accede al dashboard con secciones para:
   - Dashboard: Estadísticas generales.
   - Pedidos: Gestión de pedidos con botones para contactar vía WhatsApp.
   - Productos: Lista de productos.
   - Clientes: Gestión de clientes.
   - WhatsApp: Envío manual de mensajes.

## Integración WhatsApp

- En la sección de Pedidos, hay botones para enviar mensajes predefinidos a clientes.
- En la sección WhatsApp, puedes enviar mensajes personalizados a números específicos.
- Utiliza enlaces `https://wa.me/` para abrir WhatsApp Web o la app.

## Notas

- Los datos son mock (simulados). En un entorno real, conecta a una API backend.
- La autenticación es básica; en producción, usa un sistema seguro.
- Asegúrate de que el navegador permita pop-ups para los enlaces de WhatsApp.

## Tecnologías Usadas

- HTML5
- CSS3
- JavaScript (ES6)
- Bootstrap 5.3.0
- Font Awesome para iconos