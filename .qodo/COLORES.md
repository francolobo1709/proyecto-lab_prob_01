# 🎨 Sistema de Colores - Guía de Personalización

## 📋 Paleta Actual: Minimalista Moderna

### 🎯 Colores Principales
- **Primary:** `#2d3748` (Azul gris oscuro)
- **Secondary:** `#718096` (Gris medio)
- **Accent:** `#e53e3e` (Rojo coral)

### 📝 Cómo Cambiar la Paleta de Colores

#### Método 1: Modificar Variables CSS (Recomendado)
En el archivo `style.css`, busca la sección `:root` al inicio del archivo y modifica las variables:

```css
:root {
    /* Cambia estos valores por tus colores preferidos */
    --primary-color: #tu-color-primario;
    --accent-color: #tu-color-acento;
    --text-primary: #tu-color-texto;
    /* ... etc */
}
```

#### Método 2: Usar Paletas Predefinidas
Descomenta una de las paletas alternativas incluidas en el archivo:

1. **Paleta Monocromática** (Ya incluida, comentada)
2. **Paleta Azul Corporativa** (Próximamente)
3. **Paleta Verde Natura** (Próximamente)

## 🎨 Paletas Disponibles

### 1. Minimalista Moderna (Actual)
```css
--primary-color: #2d3748;     /* Azul gris oscuro */
--accent-color: #e53e3e;      /* Rojo coral */
--success-color: #48bb78;     /* Verde suave */
```

### 2. Monocromática (Incluida)
```css
--primary-color: #000000;     /* Negro puro */
--accent-color: #000000;      /* Negro puro */
--success-color: #000000;     /* Negro puro */
```

### 3. Azul Corporativa
```css
--primary-color: #1e40af;     /* Azul corporativo */
--accent-color: #3b82f6;      /* Azul claro */
--success-color: #10b981;     /* Verde esmeralda */
```

### 4. Verde Natura
```css
--primary-color: #047857;     /* Verde oscuro */
--accent-color: #059669;      /* Verde medio */
--success-color: #34d399;     /* Verde claro */
```

### 5. Púrpura Elegante
```css
--primary-color: #7c3aed;     /* Púrpura */
--accent-color: #a855f7;      /* Púrpura claro */
--success-color: #10b981;     /* Verde contraste */
```

## ⚡ Cambio Rápido de Paleta

### Paso 1: Copia la paleta deseada
```css
/* Ejemplo: Paleta Azul Corporativa */
:root {
    --primary-color: #1e40af;
    --primary-light: #3b82f6;
    --secondary-color: #6b7280;
    --accent-color: #3b82f6;
    --accent-hover: #2563eb;
    
    --text-primary: #111827;
    --text-secondary: #374151;
    --text-muted: #6b7280;
    
    --bg-primary: #ffffff;
    --bg-secondary: #f9fafb;
    --bg-tertiary: #f3f4f6;
    
    --border-color: #e5e7eb;
    --border-dark: #d1d5db;
    
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
}
```

### Paso 2: Reemplaza en style.css
Busca la sección `:root` y reemplaza todo el contenido con tu paleta elegida.

### Paso 3: Guarda y recarga
Los cambios se aplicarán inmediatamente en toda la página.

## 🛠️ Personalización Avanzada

### Crear Tu Propia Paleta
1. Elige un color principal para navegación y headers
2. Elige un color de acento para botones y enlaces
3. Define grises para texto y fondos
4. Usa herramientas como [Coolors.co](https://coolors.co) para generar paletas

### Variables Importantes
```css
--primary-color:    /* Navbar, headers principales */
--accent-color:     /* Botones CTA, enlaces importantes */
--text-primary:     /* Texto principal */
--bg-primary:       /* Fondo de tarjetas y contenido */
--success-color:    /* WhatsApp button, mensajes éxito */
```

## 📱 Consideraciones de Accesibilidad

- **Contraste mínimo:** 4.5:1 para texto normal
- **Contraste mínimo:** 3:1 para texto grande
- **Evita:** Solo color para transmitir información
- **Incluye:** Íconos y texto descriptivo

## 🎯 Ejemplos de Uso

### Cambio Completo a Tema Oscuro
```css
:root {
    --primary-color: #ffffff;
    --text-primary: #ffffff;
    --bg-primary: #1a202c;
    --bg-secondary: #2d3748;
    /* ... resto de variables */
}
```

### Solo Cambiar Color de Acento
```css
:root {
    /* Mantén todo igual, solo cambia: */
    --accent-color: #ff6b6b;      /* Nuevo color de botones */
    --accent-hover: #ff5252;      /* Hover del nuevo color */
}
```

## 🔄 Volver a la Paleta Original

Si quieres volver a los colores originales (verde WhatsApp), reemplaza las variables con:

```css
:root {
    --primary-color: #25d366;
    --accent-color: #25d366;
    --success-color: #25d366;
    /* ... resto como estaba */
}
```

---

**💡 Tip:** Siempre prueba tu nueva paleta en diferentes secciones del sitio antes de finalizar los cambios.