// ==================== CONFIGURACIÓN GLOBAL ====================
const WHATSAPP_NUMBER = '5491123456789'; // Reemplaza con tu número real

// ==================== NAVIGATION SYSTEM ====================
function showPage(pageId) {
    // Ocultar todas las páginas
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Mostrar la página seleccionada
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Actualizar navbar activo
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Cerrar menú móvil si está abierto
    closeMobileMenu();

    // Scroll to top suave
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Ejecutar JavaScript específico de cada página
    executePageScript(pageId);
}

function showProductDetail(productId) {
    // Ocultar todas las páginas
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Mostrar la página de detalle del producto
    const productPage = document.getElementById(productId);
    if (productPage) {
        productPage.classList.add('active');
    }

    // Actualizar navbar - quitar todos los activos
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Cerrar menú móvil si está abierto
    closeMobileMenu();

    // Scroll to top suave
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Inicializar página de detalle
    initProductDetailPage(productId);
}

function executePageScript(pageId) {
    switch(pageId) {
        case 'home':
            initHomePage();
            break;
        case 'productos':
            initProductosPage();
            break;
        case 'nosotros':
            initNosotrosPage();
            break;
        case 'contacto':
            initContactoPage();
            break;
    }
}

// ==================== PRODUCT DETAIL PAGE SCRIPTS ====================
function initProductDetailPage(productId) {
    console.log(`Página de detalle cargada: ${productId}`);
    
    // Animación de entrada para el contenido
    const detailContent = document.querySelector(`#${productId} .product-detail-content`);
    if (detailContent) {
        detailContent.style.opacity = '0';
        detailContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            detailContent.style.opacity = '1';
            detailContent.style.transform = 'translateY(0)';
            detailContent.style.transition = 'all 0.5s ease';
        }, 100);
    }

    // Configurar galería de imágenes
    setupProductGallery(productId);
}

function setupProductGallery(productId) {
    const galleryThumbs = document.querySelectorAll(`#${productId} .gallery-thumb`);
    const mainImage = document.querySelector(`#${productId} .product-image-placeholder`);

    galleryThumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remover clase activa de todos los thumbnails
            galleryThumbs.forEach(t => t.classList.remove('active'));
            
            // Agregar clase activa al thumbnail clickeado
            this.classList.add('active');
            
            // Aquí podrías cambiar la imagen principal si tuvieras imágenes reales
            console.log('Thumbnail clickeado:', this.querySelector('i').className);
        });
    });
}

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// ==================== NAVBAR SCROLL EFFECT ====================
// Efecto de scroll removido para mantener navbar estático

// ==================== HOME PAGE SCRIPTS ====================
function initHomePage() {
    console.log('Página Home cargada');
    
    // Animación para las tarjetas de características
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-in');
    });
}

// ==================== PRODUCTOS PAGE SCRIPTS ====================
function initProductosPage() {
    console.log('Página Productos cargada');
    
    // Animación de entrada para productos
    const productCards = document.querySelectorAll('.producto-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-in');
    });
    
    setupProductFilters();
}

function setupProductFilters() {
    console.log('Filtros de productos configurados');
    // Aquí se pueden agregar filtros por categoría, precio, etc.
}

function consultarProducto(nombreProducto, precio) {
    const message = encodeURIComponent(
        `¡Hola! Me interesa el ${nombreProducto} (${precio}). ¿Podrías darme más información y disponibilidad?`
    );
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// ==================== NOSOTROS PAGE SCRIPTS ====================
function initNosotrosPage() {
    console.log('Página Nosotros cargada');
    
    // Animaciones para la timeline
    animateTimeline();
}

function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'all 0.5s ease';
        }, index * 200);
    });
}

// ==================== CONTACTO PAGE SCRIPTS ====================
function initContactoPage() {
    console.log('Página Contacto cargada');
    
    // Reinicializar formulario
    resetContactForm();
    
    // Configurar validaciones específicas
    setupContactValidation();
}

function resetContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
        document.querySelectorAll('.category-option').forEach(option => {
            option.classList.remove('selected');
        });
        hideMessages();
    }
}

function setupContactValidation() {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    if (nameInput) {
        nameInput.addEventListener('input', function() {
            validateName(this.value);
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            validatePhone(this.value);
        });
    }

    if (messageInput) {
        messageInput.addEventListener('input', function() {
            validateMessage(this.value);
        });
    }
}

function validateName(name) {
    return name.trim().length >= 2;
}

function validatePhone(phone) {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone.trim());
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// ==================== CONTACTO FORM FUNCTIONS ====================
function selectCategory(category) {
    // Limpiar selecciones previas
    document.querySelectorAll('.category-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Seleccionar la nueva categoría
    const categoryInput = document.querySelector(`#${category}`);
    const categoryOption = categoryInput.closest('.category-option');
    
    if (categoryInput && categoryOption) {
        categoryInput.checked = true;
        categoryOption.classList.add('selected');
    }
}

function validateContactForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const category = document.querySelector('input[name="category"]:checked');

    if (!name || !phone || !message || !category) {
        showMessage('error', 'Por favor, completa todos los campos obligatorios.');
        return false;
    }

    if (!validateName(name)) {
        showMessage('error', 'El nombre debe tener al menos 2 caracteres.');
        return false;
    }

    if (!validatePhone(phone)) {
        showMessage('error', 'Por favor, ingresa un número de teléfono válido.');
        return false;
    }

    if (!validateMessage(message)) {
        showMessage('error', 'El mensaje debe tener al menos 10 caracteres.');
        return false;
    }

    return true;
}

function showMessage(type, text) {
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    
    hideMessages();
    
    if (type === 'success') {
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        errorMsg.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${text}`;
        errorMsg.style.display = 'block';
        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Auto-hide después de 5 segundos
    setTimeout(hideMessages, 5000);
}

function hideMessages() {
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    
    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';
}

function formatWhatsAppMessage() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const category = document.querySelector('input[name="category"]:checked').value;
    
    const categoryLabels = {
        'general': 'Consulta General',
        'soporte': 'Soporte Técnico',
        'ventas': 'Ventas',
        'reclamo': 'Reclamo'
    };

    let whatsappMessage = `🌟 *Nueva Consulta Web*\n\n`;
    whatsappMessage += `👤 *Nombre:* ${name}\n`;
    whatsappMessage += `📱 *Teléfono:* ${phone}\n`;
    if (email) whatsappMessage += `✉️ *Email:* ${email}\n`;
    whatsappMessage += `📋 *Tipo:* ${categoryLabels[category]}\n\n`;
    whatsappMessage += `💬 *Mensaje:*\n${message}\n\n`;
    whatsappMessage += `⏰ *Enviado el:* ${new Date().toLocaleString('es-AR')}`;

    return encodeURIComponent(whatsappMessage);
}

function sendToWhatsApp() {
    if (!validateContactForm()) return;

    const message = formatWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Mostrar mensaje de éxito y limpiar formulario
    showMessage('success', '¡Mensaje enviado correctamente! Te contactaremos pronto por WhatsApp.');
    setTimeout(() => {
        resetContactForm();
    }, 2000);
}

// ==================== FLOATING WHATSAPP ====================
function openDirectWhatsApp() {
    const message = encodeURIComponent('¡Hola! Me gustaría hacer una consulta desde su sitio web.');
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar página de inicio
    initHomePage();
    
    // Configurar formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendToWhatsApp();
        });
    }

    // Cerrar menú móvil al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Cerrar menú móvil al hacer clic fuera
    document.addEventListener('click', function(e) {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });

    console.log('✅ Sitio web inicializado correctamente');
});

// ==================== UTILIDADES ADICIONALES ====================

// Función para agregar productos dinámicamente
function addProduct(name, price, icon, description) {
    const productHTML = `
        <div class="producto-card">
            <div class="producto-image">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="producto-content">
                <h3>${name}</h3>
                <div class="producto-price">${price}</div>
                <p>${description}</p>
                <button class="cta-button" onclick="consultarProducto('${name}', '${price}')">
                    <i class="fab fa-whatsapp"></i> Consultar
                </button>
            </div>
        </div>
    `;
    
    const productosGrid = document.getElementById('productosGrid');
    if (productosGrid) {
        productosGrid.innerHTML += productHTML;
    }
}

// Función para cambiar el número de WhatsApp dinámicamente
function updateWhatsAppNumber(newNumber) {
    window.WHATSAPP_NUMBER = newNumber;
    console.log(`Número de WhatsApp actualizado: ${newNumber}`);
}

// Animación suave al cargar la página
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
