/**
 * Sistema de gestión de imágenes de detalle para productos
 * Maneja la carga dinámica de galerías de productos con 3 imágenes cada uno
 * Autor: Sistema de Laboratorio
 * Versión: 1.0
 */

class DetallesImageManager {
    constructor() {
        // Mapeo de imágenes de detalle - 3 imágenes por producto
        this.detallesImages = {
            'laptop-pro-business': [
                '../images/detalles/imagenvin01.jpg',
                '../images/detalles/laptop-pro-business-2.jpg', 
                '../images/detalles/laptop-pro-business-3.jpg'
            ],
            'smartphone-ultra': [
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/smartphone-ultra-1.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/smartphone-ultra-2.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/smartphone-ultra-3.jpg'
            ],
            'camara-profesional-4k': [
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/camara-profesional-4k-1.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/camara-profesional-4k-2.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/camara-profesional-4k-3.jpg'
            ],
            'tablet-diseño-grafico': [
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/tablet-diseño-grafico-1.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/tablet-diseño-grafico-2.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/tablet-diseño-grafico-3.jpg'
            ],
            'auriculares-premium': [
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/auriculares-premium-1.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/auriculares-premium-2.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/auriculares-premium-3.jpg'
            ],
            'smartwatch-deportivo': [
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/smartwatch-deportivo-1.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/smartwatch-deportivo-2.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/smartwatch-deportivo-3.jpg'
            ],
            'drone-profesional': [
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/drone-profesional-1.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/drone-profesional-2.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/drone-profesional-3.jpg'
            ],
            'consola-gaming': [
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/consola-gaming-1.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/consola-gaming-2.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/consola-gaming-3.jpg'
            ],
            'robot-aspiradora': [
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/robot-aspiradora-1.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/robot-aspiradora-2.jpg',
                '/Poryecto%20Ing.%20Guzman/assets/images/detalles/robot-aspiradora-3.jpg'
            ]
        };

        // Control de intentos de carga y configuración
        this.loadAttempts = new Map();
        this.maxRetries = 3;
        this.currentSection = null;

        console.log('DetallesImageManager: Sistema inicializado');
        console.log(`DetallesImageManager: ${Object.keys(this.detallesImages).length} productos con galerías configuradas`);
        
        this.init();
    }

    init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupObservers());
        } else {
            this.setupObservers();
        }
    }

    setupObservers() {
        // Observer para cambios de sección
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.classList.contains('active') && target.classList.contains('product-detail')) {
                        this.loadDetailImages(target);
                    }
                }
            });
        });

        // Observar secciones de productos
        const productSections = document.querySelectorAll('.product-detail');
        productSections.forEach(section => {
            observer.observe(section, { attributes: true, attributeFilter: ['class'] });
        });

        // Cargar imágenes si hay una sección activa
        const activeSection = document.querySelector('.product-detail.active');
        if (activeSection) {
            this.loadDetailImages(activeSection);
        }
    }

    loadDetailImages(section) {
        if (!section) return;
        
        this.currentSection = section.id;
        console.log(`DetallesImageManager: Cargando imágenes de detalle para sección: ${this.currentSection}`);

        // Buscar elementos con data-gallery-index
        const galleryElements = section.querySelectorAll('[data-gallery-index]');
        console.log(`DetallesImageManager: Encontrados ${galleryElements.length} elementos de galería`);

        galleryElements.forEach(element => this.loadSingleDetailImage(element));

        // También cargar imagen principal si existe
        const mainImageElement = section.querySelector('.product-image-placeholder[data-product-id]');
        if (mainImageElement) {
            this.loadMainDetailImage(mainImageElement);
        }
    }

    loadSingleDetailImage(element) {
        const productId = element.getAttribute('data-product-id');
        const galleryIndex = parseInt(element.getAttribute('data-gallery-index')) || 0;
        
        if (!productId) {
            console.warn('DetallesImageManager: Elemento sin data-product-id');
            return;
        }

        const productImages = this.detallesImages[productId];
        
        if (!productImages || !productImages[galleryIndex]) {
            console.warn(`DetallesImageManager: No se encontró imagen de detalle para ${productId} índice ${galleryIndex}`);
            this.showImageError(element, 'Imagen no disponible');
            return;
        }

        const imagePath = productImages[galleryIndex];
        
        // Verificar si ya se intentó cargar esta imagen
        const attemptKey = `${productId}-${galleryIndex}-${imagePath}`;
        const attempts = this.loadAttempts.get(attemptKey) || 0;
        
        if (attempts >= this.maxRetries) {
            console.warn(`DetallesImageManager: Máximo de reintentos alcanzado para ${productId}-${galleryIndex}`);
            this.showImageError(element, 'Error al cargar imagen');
            return;
        }
        
        // Mostrar indicador de carga
        this.showLoadingState(element);
        
        // Crear nueva imagen para precargar
        const tempImage = new Image();
        
        tempImage.onload = () => {
            console.log(`DetallesImageManager: Imagen de detalle cargada exitosamente: ${productId}-${galleryIndex}`);
            // Crear elemento img si no existe
            let imgElement = element.querySelector('img');
            if (!imgElement) {
                imgElement = document.createElement('img');
                element.innerHTML = ''; // Limpiar contenido existente (iconos)
                element.appendChild(imgElement);
            }
            imgElement.src = imagePath;
            imgElement.alt = `Detalle ${galleryIndex + 1} de ${productId}`;
            imgElement.classList.add('loaded');
            imgElement.style.width = '100%';
            imgElement.style.height = '100%';
            imgElement.style.objectFit = 'cover';
            this.hideLoadingState(element);
            this.loadAttempts.delete(attemptKey);
        };
        
        tempImage.onerror = () => {
            console.error(`DetallesImageManager: Error al cargar imagen de detalle: ${productId}-${galleryIndex}`);
            this.loadAttempts.set(attemptKey, attempts + 1);
            
            if (attempts < this.maxRetries - 1) {
                // Reintentar después de un delay
                setTimeout(() => this.loadSingleDetailImage(element), 1000 * (attempts + 1));
            } else {
                this.showImageError(element, 'No se pudo cargar la imagen');
            }
        };
        
        // Iniciar la carga con un pequeño delay para evitar problemas de timing
        setTimeout(() => {
            tempImage.src = imagePath;
        }, 100);
    }

    loadMainDetailImage(element) {
        const productId = element.getAttribute('data-product-id');
        
        if (!productId) {
            console.warn('DetallesImageManager: Elemento principal sin data-product-id');
            return;
        }

        const productImages = this.detallesImages[productId];
        
        if (!productImages || !productImages[0]) {
            console.warn(`DetallesImageManager: No se encontró imagen principal de detalle para ${productId}`);
            return; // No mostrar error para imagen principal, usar la imagen normal
        }

        const imagePath = productImages[0]; // Usar la primera imagen como principal
        
        // Mostrar indicador de carga
        this.showLoadingState(element);
        
        // Crear nueva imagen para precargar
        const tempImage = new Image();
        
        tempImage.onload = () => {
            console.log(`DetallesImageManager: Imagen principal de detalle cargada: ${productId}`);
            // Crear elemento img si no existe
            let imgElement = element.querySelector('img');
            if (!imgElement) {
                imgElement = document.createElement('img');
                element.innerHTML = ''; // Limpiar contenido existente
                element.appendChild(imgElement);
            }
            imgElement.src = imagePath;
            imgElement.alt = `Imagen principal de ${productId}`;
            imgElement.classList.add('loaded');
            imgElement.style.width = '100%';
            imgElement.style.height = '100%';
            imgElement.style.objectFit = 'cover';
            this.hideLoadingState(element);
        };
        
        tempImage.onerror = () => {
            console.error(`DetallesImageManager: Error al cargar imagen principal de detalle: ${productId}`);
            this.hideLoadingState(element);
            // No mostrar error, dejar que el sistema normal de productos maneje esto
        };
        
        // Iniciar la carga
        setTimeout(() => {
            tempImage.src = imagePath;
        }, 100);
    }

    showLoadingState(element) {
        // Remover estados anteriores
        this.clearImageStates(element);
        
        // Crear indicador de carga
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'image-loading';
        loadingDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i><br>Cargando detalle...';
        loadingDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: var(--color-primary);
            font-size: 0.9rem;
            z-index: 2;
            background: rgba(255,255,255,0.9);
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        `;
        element.appendChild(loadingDiv);
    }
    
    hideLoadingState(element) {
        this.clearImageStates(element);
    }
    
    showImageError(element, message) {
        this.clearImageStates(element);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'image-error';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i><br>
            ${message}
        `;
        errorDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #999;
            font-size: 0.8rem;
            z-index: 2;
            background: rgba(245,245,245,0.9);
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        `;
        element.appendChild(errorDiv);
    }
    
    clearImageStates(element) {
        const existingStates = element.querySelectorAll('.image-loading, .image-error');
        existingStates.forEach(el => el.remove());
    }

    // Método público para forzar recarga de imágenes de detalle
    reloadDetailImages() {
        this.loadAttempts.clear();
        if (this.currentSection) {
            const section = document.getElementById(this.currentSection);
            if (section) {
                this.loadDetailImages(section);
            }
        }
    }

    // Método para agregar nuevas imágenes de detalle dinámicamente
    addProductDetail(productId, imagesPaths) {
        if (Array.isArray(imagesPaths) && imagesPaths.length <= 3) {
            this.detallesImages[productId] = imagesPaths;
            console.log(`DetallesImageManager: Agregadas imágenes de detalle para ${productId}`);
        } else {
            console.warn('DetallesImageManager: Se requiere un array de máximo 3 rutas de imagen');
        }
    }

    // Método para obtener información de un producto
    getProductDetailInfo(productId) {
        return {
            productId: productId,
            images: this.detallesImages[productId] || [],
            hasDetails: !!this.detallesImages[productId]
        };
    }
}

// Inicializar el sistema cuando el script se carga
let detallesImageManager;

if (typeof window !== 'undefined') {
    // Esperar a que el script de productos se cargue primero
    const initDetalles = () => {
        detallesImageManager = new DetallesImageManager();
        window.detallesImageManager = detallesImageManager;
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDetalles);
    } else {
        initDetalles();
    }
}