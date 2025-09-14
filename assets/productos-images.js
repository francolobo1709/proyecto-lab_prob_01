/**
 * Sistema de gestión de imágenes específico para productos
 * Optimizado para producción - Solo funciona en la sección de productos
 * Version: 1.0.0
 */

class ProductosImageManager {
    constructor() {
        this.productImages = {
            'laptop-pro-business': 'assets/images/products/vinagre 01.jpg',
            'microscopio-avanzado': 'assets/images/products/microscopio-avanzado.jpg',
            'centrifuga-alta-velocidad': 'assets/images/products/centrifuga-alta-velocidad.jpg',
            'espectrofotometro-uv': 'assets/images/products/espectrofotometro-uv.jpg',
            'balanza-analitica': 'assets/images/products/balanza-analitica.jpg',
            'autoclave-esterilizacion': 'assets/images/products/autoclave-esterilizacion.jpg',
            'campana-extractora': 'assets/images/products/campana-extractora.jpg',
            'ph-metro-digital': 'assets/images/products/ph-metro-digital.jpg',
            'incubadora-co2': 'assets/images/products/incubadora-co2.jpg'
        };
        
        // NUEVO: Imágenes de laboratorio
        this.laboratoryImages = {
            'telescopio-digital': 'assets/images/laboratory/etc01.jpg',
            'microscopio-principal': 'assets/images/laboratory/microscopio-principal.jpg',
            'laboratorio-general': 'assets/images/laboratory/laboratorio-general.jpg',
            'equipo-principal': 'assets/images/laboratory/equipo-principal.jpg'
        };
        
        this.currentSection = null;
        this.initialized = false;
        this.loadAttempts = new Map();
        this.maxRetries = 2;
        
        console.log('ProductosImageManager: Sistema inicializado con soporte para laboratorio');
        this.init();
    }
    
    init() {
        if (this.initialized) return;
        
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupObserver());
        } else {
            this.setupObserver();
        }
        
        this.initialized = true;
    }
    
    setupObserver() {
        // Observar cambios en el contenido principal
        const mainContent = document.querySelector('main');
        if (!mainContent) {
            console.warn('ProductosImageManager: No se encontró el elemento main');
            return;
        }
        
        // Observer para detectar cambios de sección
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    this.checkProductSection();
                }
            });
        });
        
        observer.observe(mainContent, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
        
        // Verificación inicial
        setTimeout(() => this.checkProductSection(), 100);
        
        console.log('ProductosImageManager: Observer configurado');
    }
    
    checkProductSection() {
        const visibleSections = document.querySelectorAll('section[style*="display: block"], section:not([style*="display: none"])');
        
        for (const section of visibleSections) {
            const sectionId = section.id;
            
            // Solo procesar secciones de productos Y laboratorio (nosotros)
            if (sectionId && (sectionId === 'productos' || sectionId.includes('detalle-') || sectionId === 'nosotros')) {
                if (this.currentSection !== sectionId) {
                    this.currentSection = sectionId;
                    console.log(`ProductosImageManager: Sección detectada: ${sectionId}`);
                    setTimeout(() => {
                        this.loadProductImages(section);
                        this.loadLaboratoryImages(section);
                    }, 200);
                }
                return;
            }
        }
        
        // Si no estamos en productos o laboratorio, limpiar la sección actual
        if (this.currentSection && !this.currentSection.includes('productos') && !this.currentSection.includes('detalle-') && this.currentSection !== 'nosotros') {
            this.currentSection = null;
        }
    }
    
    loadProductImages(section) {
        if (!section) return;
        
        const images = section.querySelectorAll('img[data-product-image]');
        console.log(`ProductosImageManager: Cargando ${images.length} imágenes de productos`);
        
        images.forEach(img => this.loadSingleImage(img));
    }
    
    // NUEVO: Método para cargar imágenes de laboratorio
    loadLaboratoryImages(section) {
        if (!section) return;
        
        const labImages = section.querySelectorAll('img[data-lab-image]');
        console.log(`ProductosImageManager: Cargando ${labImages.length} imágenes de laboratorio`);
        
        labImages.forEach(img => this.loadSingleLabImage(img));
    }
    
    loadSingleImage(img) {
        const productId = img.getAttribute('data-product-image');
        const imagePath = this.productImages[productId];
        
        if (!imagePath) {
            console.warn(`ProductosImageManager: No se encontró imagen para producto: ${productId}`);
            this.showImageError(img, 'Imagen no disponible');
            return;
        }
        
        // Verificar si ya se intentó cargar esta imagen
        const attemptKey = `${productId}-${imagePath}`;
        const attempts = this.loadAttempts.get(attemptKey) || 0;
        
        if (attempts >= this.maxRetries) {
            console.warn(`ProductosImageManager: Máximo de reintentos alcanzado para ${productId}`);
            this.showImageError(img, 'Error al cargar imagen');
            return;
        }
        
        // Mostrar indicador de carga
        this.showLoadingState(img);
        
        // Crear nueva imagen para precargar
        const tempImage = new Image();
        
        tempImage.onload = () => {
            console.log(`ProductosImageManager: Imagen cargada exitosamente: ${productId}`);
            img.src = imagePath;
            img.classList.add('loaded');
            this.hideLoadingState(img);
            this.loadAttempts.delete(attemptKey);
        };
        
        tempImage.onerror = () => {
            console.error(`ProductosImageManager: Error al cargar imagen: ${productId}`);
            this.loadAttempts.set(attemptKey, attempts + 1);
            
            if (attempts < this.maxRetries - 1) {
                // Reintentar después de un delay
                setTimeout(() => this.loadSingleImage(img), 1000 * (attempts + 1));
            } else {
                this.showImageError(img, 'No se pudo cargar la imagen');
            }
        };
        
        // Iniciar la carga con un pequeño delay para evitar problemas de timing
        setTimeout(() => {
            tempImage.src = imagePath;
        }, 100);
    }
    
    // NUEVO: Método para cargar imágenes individuales de laboratorio
    loadSingleLabImage(img) {
        const labId = img.getAttribute('data-lab-image');
        const imagePath = this.laboratoryImages[labId];
        
        if (!imagePath) {
            console.warn(`ProductosImageManager: No se encontró imagen de laboratorio: ${labId}`);
            this.showImageError(img, 'Imagen de laboratorio no disponible');
            return;
        }
        
        // Verificar si ya se intentó cargar esta imagen
        const attemptKey = `lab-${labId}-${imagePath}`;
        const attempts = this.loadAttempts.get(attemptKey) || 0;
        
        if (attempts >= this.maxRetries) {
            console.warn(`ProductosImageManager: Máximo de reintentos alcanzado para laboratorio ${labId}`);
            this.showImageError(img, 'Error al cargar imagen de laboratorio');
            return;
        }
        
        // Mostrar indicador de carga
        this.showLoadingState(img);
        
        // Crear nueva imagen para precargar
        const tempImage = new Image();
        
        tempImage.onload = () => {
            console.log(`ProductosImageManager: Imagen de laboratorio cargada exitosamente: ${labId}`);
            img.src = imagePath;
            img.classList.add('loaded');
            this.hideLoadingState(img);
            this.loadAttempts.delete(attemptKey);
        };
        
        tempImage.onerror = () => {
            console.error(`ProductosImageManager: Error al cargar imagen de laboratorio: ${labId}`);
            this.loadAttempts.set(attemptKey, attempts + 1);
            
            if (attempts < this.maxRetries - 1) {
                // Reintentar después de un delay
                setTimeout(() => this.loadSingleLabImage(img), 1000 * (attempts + 1));
            } else {
                this.showImageError(img, 'No se pudo cargar la imagen de laboratorio');
            }
        };
        
        // Iniciar la carga con un pequeño delay para evitar problemas de timing
        setTimeout(() => {
            tempImage.src = imagePath;
        }, 100);
    }
    
    showLoadingState(img) {
        const container = img.closest('.product-image-container') || img.parentElement;
        if (!container) return;
        
        // Remover estados anteriores
        this.clearImageStates(container);
        
        // Crear indicador de carga
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'image-loading';
        loadingDiv.textContent = 'Cargando imagen...';
        container.appendChild(loadingDiv);
        
        img.style.opacity = '0';
    }
    
    hideLoadingState(img) {
        const container = img.closest('.product-image-container') || img.parentElement;
        if (!container) return;
        
        this.clearImageStates(container);
        img.style.opacity = '1';
    }
    
    showImageError(img, message) {
        const container = img.closest('.product-image-container') || img.parentElement;
        if (!container) return;
        
        this.clearImageStates(container);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'image-error';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i><br>
            ${message}
        `;
        container.appendChild(errorDiv);
        
        img.style.opacity = '0';
    }
    
    clearImageStates(container) {
        const existingStates = container.querySelectorAll('.image-loading, .image-error');
        existingStates.forEach(el => el.remove());
    }
    
    // Método público para forzar recarga de imágenes
    reloadImages() {
        this.loadAttempts.clear();
        if (this.currentSection) {
            const section = document.getElementById(this.currentSection);
            if (section) {
                this.loadProductImages(section);
            }
        }
    }
}

// Inicializar el sistema cuando el script se carga
let productosImageManager = null;

// Función de inicialización global
function initProductosImageManager() {
    if (!productosImageManager) {
        productosImageManager = new ProductosImageManager();
        console.log('ProductosImageManager: Sistema inicializado globalmente');
    }
    return productosImageManager;
}

// Auto-inicialización
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductosImageManager);
} else {
    initProductosImageManager();
}

// Exportar para uso global
window.ProductosImageManager = ProductosImageManager;
window.productosImageManager = productosImageManager;
window.initProductosImageManager = initProductosImageManager;