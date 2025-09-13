# Mi Empresa - Sitio Web Corporativo

Un sitio web moderno y responsivo para empresas, con integración de WhatsApp para contacto directo.

## 📁 Estructura del Proyecto

```
.qodo/
├── index.html          # Estructura principal del sitio web
├── style.css           # Estilos CSS organizados por secciones
├── index.js            # Lógica JavaScript modular
└── README.md           # Documentación del proyecto
```

## 🚀 Características

- **Diseño Responsivo**: Compatible con dispositivos móviles, tablets y escritorio
- **Navegación SPA**: Navegación de una sola página sin recargas
- **Integración WhatsApp**: Contacto directo por WhatsApp desde formularios
- **Animaciones CSS**: Efectos visuales suaves y profesionales
- **Menú Móvil**: Hamburger menu para dispositivos móviles
- **Formulario de Contacto**: Sistema completo de validación y envío

## 📄 Páginas Incluidas

1. **Home**: Página principal con hero section y características
2. **Productos**: Catálogo de productos con botones de consulta
3. **Nosotros**: Historia de la empresa y valores
4. **Contacto**: Formulario completo con categorías de consulta

## ⚙️ Configuración

### Número de WhatsApp
Edita el archivo `index.js` y cambia el número de WhatsApp:

```javascript
const WHATSAPP_NUMBER = '5491123456789'; // Reemplaza con tu número real
```

### Personalización de Colores
Los colores principales están definidos en `style.css`:

```css
--primary-color: #25D366;    /* Verde WhatsApp */
--secondary-color: #128C7E;  /* Verde oscuro */
--gradient-start: #667eea;   /* Azul claro */
--gradient-end: #764ba2;     /* Púrpura */
```

## 🛠️ Instalación y Uso

1. **Clona o descarga** los archivos del proyecto
2. **Configura el número de WhatsApp** en `index.js`
3. **Personaliza el contenido** en `index.html`
4. **Ajusta los estilos** según tu marca en `style.css`
5. **Sube los archivos** a tu servidor web

## 📱 Funcionalidades de WhatsApp

### Botón Flotante
- Botón fijo en la esquina inferior derecha
- Mensaje predefinido para consultas generales

### Formulario de Contacto
- Validación completa de campos
- Formateo automático de mensajes
- Categorización de consultas:
  - Consulta General
  - Soporte Técnico
  - Ventas
  - Reclamos

### Productos
- Consulta directa por producto
- Información del producto incluida en el mensaje

## 🎨 Personalización

### Agregar Nuevos Productos
Usa la función `addProduct()` en JavaScript:

```javascript
addProduct('Nuevo Producto', '$99.999', 'icono', 'Descripción del producto');
```

### Cambiar Información de la Empresa
Edita directamente el contenido en `index.html`:
- Nombre de la empresa en el logo
- Textos descriptivos
- Información de contacto

### Modificar Estilos
Los estilos están organizados por secciones en `style.css`:
- Estilos globales
- Navbar
- Páginas específicas
- Responsive design

## 📞 Soporte

Para consultas sobre personalización o soporte técnico, contacta a través del sistema de WhatsApp integrado en el sitio.

## 📝 Licencia

Este proyecto está disponible para uso comercial y personal.

---

**Desarrollado con 💚 para facilitar la comunicación empresarial a través de WhatsApp**