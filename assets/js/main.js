// ============================================
// DOM Ready Event
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initDarkMode();
    initFloatingWhatsApp();
    initCurrentYear();
    initSearch();
    initCart();
    initProducts();
    initPageSpecific();
});

// ============================================
// NAVBAR TOGGLE (Hamburger Menu)
// ============================================
function initNavbar() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburgerBtn || !navMenu) return;
    
    // Toggle mobile menu
    hamburgerBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || 
                                 hamburgerBtn.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// ============================================
// DARK MODE TOGGLE
// ============================================
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    if (!darkModeToggle) return;
    
    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.setAttribute('data-theme', 'dark');
        updateDarkModeIcon(true);
    } else {
        html.setAttribute('data-theme', 'light');
        updateDarkModeIcon(false);
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        const isDark = html.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateDarkModeIcon(false);
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateDarkModeIcon(true);
        }
    });
}

function updateDarkModeIcon(isDark) {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    const icon = darkModeToggle.querySelector('i');
    if (icon) {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        darkModeToggle.setAttribute('aria-label', 
            isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
}

// ============================================
// FLOATING WHATSAPP BUTTON
// ============================================
function initFloatingWhatsApp() {
    // Create WhatsApp button element
    const whatsappBtn = document.createElement('div');
    whatsappBtn.className = 'floating-whatsapp';
    whatsappBtn.innerHTML = `
        <a href="https://wa.me/6281212811406" target="_blank" class="whatsapp-btn-float" 
           aria-label="Chat dengan kami di WhatsApp">
            <i class="fab fa-whatsapp"></i>
            <span class="whatsapp-tooltip">Chat dengan kami</span>
        </a>
    `;
    
    // Add to body
    document.body.appendChild(whatsappBtn);
}

// ============================================
// CURRENT YEAR FOR FOOTER
// ============================================
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// PRODUCTS DATA
// ============================================
const products = [
    {
        id: 1,
        name: "Chanel No. 5 Refill",
        brand: "Chanel",
        description: "Parfum iconic dengan aroma bunga yang elegan dan timeless",
        price: 250000,
        image: "assets/images/products/chanel.jpg",
        keywords: "chanel no 5 parfum bunga elegan wanita"
    },
    {
        id: 2,
        name: "Dior Sauvage Refill",
        brand: "Dior",
        description: "Aroma segar dan maskulin dengan sentuhan amberwood",
        price: 280000,
        image: "assets/images/products/dior.jpg",
        keywords: "dior sauvage pria maskulin segar"
    },
    {
        id: 3,
        name: "Versace Eros Refill",
        brand: "Versace",
        description: "Aroma mint, apel hijau, dan lemon yang menyegarkan",
        price: 220000,
        image: "assets/images/products/versace.jpg",
        keywords: "versace eros pria segar citrus"
    },
    {
        id: 4,
        name: "Gucci Bloom Refill",
        brand: "Gucci",
        description: "Aroma floral yang lembut dengan sentuhan tuberose dan melati",
        price: 270000,
        image: "assets/images/products/gucci.jpg",
        keywords: "gucci bloom wanita floral bunga"
    },
    {
        id: 5,
        name: "Prada Luna Rossa Refill",
        brand: "Prada",
        description: "Aroma lavender, mint, dan sage yang sophisticated",
        price: 260000,
        image: "assets/images/products/prada.jpg",
        keywords: "prada luna rossa pria lavender"
    },
    {
        id: 6,
        name: "Chanel Coco Mademoiselle",
        brand: "Chanel",
        description: "Aroma oriental segar dengan sentuhan jeruk dan patchouli",
        price: 290000,
        image: "assets/images/products/chanel2.jpg",
        keywords: "chanel coco mademoiselle wanita oriental"
    },
    {
        id: 7,
        name: "Dior J'adore Refill",
        brand: "Dior",
        description: "Aroma melati, mawar, dan ylang-ylang yang mempesona",
        price: 275000,
        image: "assets/images/products/dior2.jpg",
        keywords: "dior jadore wanita floral mewah"
    },
    {
        id: 8,
        name: "Versace Bright Crystal",
        brand: "Versace",
        description: "Aroma yuzu, delima, dan magnolia yang menyegarkan",
        price: 240000,
        image: "assets/images/products/versace2.jpg",
        keywords: "versace bright crystal wanita segar"
    }
];

// ============================================
// PRODUCTS DISPLAY
// ============================================
function initProducts() {
    // Display featured products on homepage
    displayFeaturedProducts();
    
    // Display all products on products page
    displayAllProducts();
    
    // Initialize product filters
    initProductFilters();
}

function displayFeaturedProducts() {
    const productsGrid = document.querySelector('.featured-products .products-grid');
    if (!productsGrid) return;
    
    // Take first 4 products for featured
    const featuredProducts = products.slice(0, 4);
    
    productsGrid.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners to add-to-cart buttons
    attachProductEventListeners();
}

function displayAllProducts() {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = products.map(product => createProductCard(product)).join('');
    
    // Add event listeners to add-to-cart buttons
    attachProductEventListeners();
}

function createProductCard(product) {
    return `
        <div class="product-card" data-name="${product.name}" data-brand="${product.brand}" 
             data-keywords="${product.keywords}" data-price="${product.price}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">+ Keranjang</button>
                    <button class="view-details">Detail</button>
                </div>
            </div>
        </div>
    `;
}

function attachProductEventListeners() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                addToCart(product);
                showNotification('Produk ditambahkan ke keranjang!', 'success');
            }
        });
    });
    
    // View details buttons
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            showNotification(`Detail produk: ${productName}`, 'info');
        });
    });
}

// ============================================
// PRODUCT SEARCH FUNCTIONALITY
// ============================================
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput) return;
    
    // Perform search on input
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        performSearch(query);
    });
    
    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim().toLowerCase();
            performSearch(query);
        });
    }
    
    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.search-container') && searchResults) {
            searchResults.classList.remove('active');
        }
    });
}

function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    const productsContainer = document.getElementById('productsContainer');
    const noResults = document.getElementById('noResults');
    const filterResult = document.getElementById('filterResult');
    
    // If on products page, filter the products
    if (productsContainer) {
        filterProductsOnPage(query, productsContainer, noResults, filterResult);
        return;
    }
    
    // For other pages, show dropdown results
    if (!searchResults) return;
    
    if (query.length === 0) {
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
        return;
    }
    
    // Filter products based on query
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.keywords.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    
    // Display results
    if (filteredProducts.length > 0) {
        searchResults.innerHTML = filteredProducts.map(product => `
            <div class="search-result-item" data-id="${product.id}">
                <strong>${product.brand} - ${product.name}</strong><br>
                <small>Rp ${product.price.toLocaleString('id-ID')}</small>
            </div>
        `).join('');
        
        searchResults.classList.add('active');
        
        // Add click event to search results
        const resultItems = searchResults.querySelectorAll('.search-result-item');
        resultItems.forEach(item => {
            item.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                window.location.href = `products.html#product-${productId}`;
            });
        });
    } else {
        searchResults.innerHTML = '<div class="search-result-item">Tidak ada hasil ditemukan</div>';
        searchResults.classList.add('active');
    }
}

function filterProductsOnPage(query, container, noResults, filterResult) {
    const productCards = container.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    productCards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        const brand = card.getAttribute('data-brand').toLowerCase();
        const keywords = card.getAttribute('data-keywords').toLowerCase();
        
        const matches = query.length === 0 || 
                       name.includes(query) || 
                       brand.includes(query) || 
                       keywords.includes(query);
        
        if (matches) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide no results message
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
    
    // Update filter result text
    if (filterResult) {
        if (query.length === 0) {
            filterResult.textContent = 'Menampilkan semua produk';
        } else {
            filterResult.textContent = `Menampilkan ${visibleCount} produk untuk "${query}"`;
        }
    }
}

// ============================================
// PRODUCT FILTERS
// ============================================
function initProductFilters() {
    const brandFilter = document.getElementById('brandFilter');
    const sortPrice = document.getElementById('sortPrice');
    const resetFilter = document.getElementById('resetFilter');
    
    if (!brandFilter && !sortPrice) return;
    
    // Brand filter
    if (brandFilter) {
        brandFilter.addEventListener('change', applyFilters);
    }
    
    // Price sort
    if (sortPrice) {
        sortPrice.addEventListener('change', applyFilters);
    }
    
    // Reset filter
    if (resetFilter) {
        resetFilter.addEventListener('click', function() {
            if (brandFilter) brandFilter.value = 'all';
            if (sortPrice) sortPrice.value = 'default';
            applyFilters();
        });
    }
}

function applyFilters() {
    const brandFilter = document.getElementById('brandFilter');
    const sortPrice = document.getElementById('sortPrice');
    const productsContainer = document.getElementById('productsContainer');
    const noResults = document.getElementById('noResults');
    const filterResult = document.getElementById('filterResult');
    
    if (!productsContainer) return;
    
    let filteredProducts = [...products];
    
    // Apply brand filter
    if (brandFilter && brandFilter.value !== 'all') {
        filteredProducts = filteredProducts.filter(
            product => product.brand === brandFilter.value
        );
    }
    
    // Apply price sorting
    if (sortPrice && sortPrice.value !== 'default') {
        filteredProducts.sort((a, b) => {
            if (sortPrice.value === 'low-high') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
    }
    
    // Display filtered products
    productsContainer.innerHTML = filteredProducts.map(product => 
        createProductCard(product)
    ).join('');
    
    // Update UI
    if (noResults) {
        noResults.style.display = filteredProducts.length === 0 ? 'block' : 'none';
    }
    
    if (filterResult) {
        let resultText = `Menampilkan ${filteredProducts.length} produk`;
        if (brandFilter && brandFilter.value !== 'all') {
            resultText += ` dari brand ${brandFilter.value}`;
        }
        if (sortPrice && sortPrice.value !== 'default') {
            resultText += sortPrice.value === 'low-high' ? ' (termurah)' : ' (termahal)';
        }
        filterResult.textContent = resultText;
    }
    
    // Re-attach event listeners
    attachProductEventListeners();
}

// ============================================
// SHOPPING CART FUNCTIONALITY
// ============================================
function initCart() {
    const cartBtn = document.getElementById('cartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartOverlay = document.getElementById('cartOverlay');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Load cart from localStorage
    loadCart();
    
    // Open cart
    if (cartBtn) {
        cartBtn.addEventListener('click', toggleCart);
    }
    
    // Close cart
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', toggleCart);
    }
    
    // Close cart when clicking overlay
    if (cartOverlay) {
        cartOverlay.addEventListener('click', toggleCart);
    }
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cart = getCart();
            if (cart.items.length === 0) {
                showNotification('Keranjang belanja kosong!', 'warning');
                return;
            }
            
            const message = generateWhatsAppOrderMessage(cart);
            const whatsappUrl = `https://wa.me/6281212811406?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
}

let cart = {
    items: [],
    total: 0
};

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function loadCart() {
    const savedCart = getCart();
    cart = savedCart;
    updateCartUI();
}

function addToCart(product, quantity = 1) {
    const existingItem = cart.items.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    updateCartTotal();
    saveCart();
    updateCartUI();
}

function updateCartTotal() {
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function updateCartUI() {
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    // Update cart sidebar
    updateCartSidebar();
}

function updateCartSidebar() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.items.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Keranjang belanja kosong</p>';
    } else {
        cartItems.innerHTML = cart.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-info">
                    <h4>${item.brand} - ${item.name}</h4>
                    <div class="cart-item-price">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase">+</button>
                    </div>
                    <button class="cart-item-remove">Hapus</button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to quantity buttons
        const decreaseButtons = cartItems.querySelectorAll('.decrease');
        const increaseButtons = cartItems.querySelectorAll('.increase');
        const removeButtons = cartItems.querySelectorAll('.cart-item-remove');
        
        decreaseButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const itemId = parseInt(cartItem.getAttribute('data-id'));
                updateCartItemQuantity(itemId, -1);
            });
        });
        
        increaseButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const itemId = parseInt(cartItem.getAttribute('data-id'));
                updateCartItemQuantity(itemId, 1);
            });
        });
        
        removeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const itemId = parseInt(cartItem.getAttribute('data-id'));
                removeFromCart(itemId);
            });
        });
    }
    
    // Update total
    cartTotal.textContent = `Rp ${cart.total.toLocaleString('id-ID')}`;
}

function updateCartItemQuantity(productId, change) {
    const item = cart.items.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        cart.items = cart.items.filter(item => item.id !== productId);
    }
    
    updateCartTotal();
    saveCart();
    updateCartUI();
}

function removeFromCart(productId) {
    cart.items = cart.items.filter(item => item.id !== productId);
    updateCartTotal();
    saveCart();
    updateCartUI();
    showNotification('Produk dihapus dari keranjang', 'info');
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (!cartSidebar || !cartOverlay) return;
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    
    // Prevent body scrolling when cart is open
    document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : '';
}

function generateWhatsAppOrderMessage(cart) {
    let message = `Halo ONE PARFUME, saya ingin memesan:\n\n`;
    
    cart.items.forEach((item, index) => {
        message += `${index + 1}. ${item.brand} - ${item.name}\n`;
        message += `   Jumlah: ${item.quantity} x Rp ${item.price.toLocaleString('id-ID')}\n`;
        message += `   Subtotal: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n\n`;
    });
    
    message += `Total: Rp ${cart.total.toLocaleString('id-ID')}\n\n`;
    message += `Nama: [Isi Nama Anda]\n`;
    message += `Alamat: [Isi Alamat Lengkap]\n`;
    message += `No. HP: [Isi Nomor HP]\n\n`;
    message += `Terima kasih!`;
    
    return message;
}

// ============================================
// PAGE SPECIFIC FUNCTIONALITY
// ============================================
function initPageSpecific() {
    // Contact form handling
    initContactForm();
    
    // FAQ accordion
    initFAQAccordion();
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        
        // Simple validation
        if (!name || !email || !subject) {
            showNotification('Harap isi semua field yang wajib diisi', 'warning');
            return;
        }
        
        // In a real application, you would send this to a server
        // For now, just show success message
        showNotification('Pesan berhasil dikirim! Kami akan membalas secepatnya.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Simulate sending (remove in production)
        setTimeout(() => {
            console.log('Pesan terkirim:', { name, email, subject });
        }, 1000);
    });
}

function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#28a745' : 
                     type === 'warning' ? '#ffc107' : 
                     type === 'danger' ? '#dc3545' : '#17a2b8'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 2000;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// IMAGE ERROR HANDLING
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Handle broken images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50" y="50" font-family="Arial" font-size="14" fill="%23666" text-anchor="middle" dy=".3em">No Image</text></svg>';
            this.alt = 'Gambar tidak tersedia';
        });
    });
});

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('navMenu');
            const hamburgerBtn = document.getElementById('hamburgerBtn');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (hamburgerBtn) {
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                }
            }
        }
    }, 250);
});

// ============================================
// LAZY LOADING IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// ADD TO CART ANIMATION
// ============================================
function animateAddToCart(button) {
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// Update add to cart event listener to include animation
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart') || 
        e.target.closest('.add-to-cart')) {
        const button = e.target.classList.contains('add-to-cart') ? 
                      e.target : e.target.closest('.add-to-cart');
        animateAddToCart(button);
    }
});