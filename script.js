$(document).ready(function() {
    // 1. MANEJO DE TEMA
    const btnTheme = document.getElementById('toggle-theme');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    btnTheme.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 2. LOGICA DE ACCESO
    $('#loginForm, #regForm').submit(function(e) {
        e.preventDefault();
        $('#auth-section').fadeOut(500, function() {
            $('#store-section').removeClass('hidden').fadeIn();
            renderProducts();
        });
    });

    $('.message a').click(function(){
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
});

// 3. BASE DE DATOS: 10 CATEGORÍAS x 3 PRODUCTOS = 30 PRODUCTOS
const products = [
    // 1. PROCESADORES
    { id: 1, cat: "Procesadores", name: "Intel i5-12400F", desc: "6 núcleos, 4.4GHz", price: 3200, icon: "💎" },
    { id: 2, cat: "Procesadores", name: "AMD Ryzen 5 5600X", desc: "6 núcleos, 3.7GHz", price: 3600, icon: "🔥" },
    { id: 3, cat: "Procesadores", name: "Intel i9-13900K", desc: "24 núcleos, 5.8GHz", price: 12500, icon: "👑" },

    // 2. TARJETAS DE VIDEO (GPU)
    { id: 4, cat: "Tarjetas de Video", name: "NVIDIA RTX 3060", desc: "12GB GDDR6, Ray Tracing", price: 6500, icon: "🎮" },
    { id: 5, cat: "Tarjetas de Video", name: "NVIDIA RTX 4080", desc: "16GB GDDR6X, DLSS 3", price: 24000, icon: "⚡" },
    { id: 6, cat: "Tarjetas de Video", name: "Radeon RX 6700 XT", desc: "12GB GDDR6, AMD Infinity", price: 7800, icon: "🚀" },

    // 3. TARJETAS MADRE
    { id: 7, cat: "Tarjetas Madre", name: "ASUS Prime B550M-A", desc: "Micro-ATX, AM4, PCIe 4.0", price: 2100, icon: "📟" },
    { id: 8, cat: "Tarjetas Madre", name: "MSI Z790 Tomahawk", desc: "LGA 1700, DDR5, WiFi 6", price: 5800, icon: "📟" },
    { id: 9, cat: "Tarjetas Madre", name: "Gigabyte X670E Aorus", desc: "AM5, DDR5, Enthusiast", price: 8200, icon: "📟" },

    // 4. MEMORIA RAM
    { id: 10, cat: "Memoria RAM", name: "Corsair Vengeance 16GB", desc: "DDR4 3200MHz (2x8GB)", price: 1100, icon: "🧠" },
    { id: 11, cat: "Memoria RAM", name: "Kingston Fury 32GB", desc: "DDR5 5200MHz RGB", price: 2800, icon: "🌈" },
    { id: 12, cat: "Memoria RAM", name: "G.Skill Trident Z5 64GB", desc: "DDR5 6000MHz Extreme", price: 5500, icon: "💎" },

    // 5. ALMACENAMIENTO (SSD)
    { id: 13, cat: "Almacenamiento", name: "SSD Kingston NV2 1TB", desc: "NVMe Gen 4x4, 3500MB/s", price: 1200, icon: "💾" },
    { id: 14, cat: "Almacenamiento", name: "Samsung 980 Pro 2TB", desc: "NVMe Gen 4, 7000MB/s", price: 3400, icon: "🚀" },
    { id: 15, cat: "Almacenamiento", name: "SSD Crucial MX500 4TB", desc: "SATA III, 560MB/s", price: 4800, icon: "📦" },

    // 6. FUENTES DE PODER
    { id: 16, cat: "Fuentes de Poder", name: "EVGA 600W W1", desc: "80 Plus White, Certificada", price: 1150, icon: "🔌" },
    { id: 17, cat: "Fuentes de Poder", name: "Corsair RM850x", desc: "80 Plus Gold, Modular", price: 2900, icon: "🥇" },
    { id: 18, cat: "Fuentes de Poder", name: "ASUS ROG Thor 1200W", desc: "80 Plus Platinum, OLED", price: 7200, icon: "⚡" },

    // 7. ENFRIAMIENTO
    { id: 19, cat: "Enfriamiento", name: "Cooler Master Hyper 212", desc: "Disipador por Aire, RGB", price: 850, icon: "❄️" },
    { id: 20, cat: "Enfriamiento", name: "NZXT Kraken Elite 360", desc: "Líquida AIO, Pantalla LCD", price: 5600, icon: "💧" },
    { id: 21, cat: "Enfriamiento", name: "Noctua NH-D15", desc: "Doble Torre, Ultra Silencioso", price: 2200, icon: "🌬️" },

    // 8. GABINETES
    { id: 22, cat: "Gabinetes", name: "NZXT H5 Flow", desc: "Compacto ATX, Cristal Templado", price: 1950, icon: "🏗️" },
    { id: 23, cat: "Gabinetes", name: "Lian Li PC-O11 Dynamic", desc: "Diseño Cámara Dual, Premium", price: 3800, icon: "🏛️" },
    { id: 24, cat: "Gabinetes", name: "Corsair 4000D Airflow", desc: "Gestión de cables optimizada", price: 2100, icon: "📦" },

    // 9. MONITORES
    { id: 25, cat: "Monitores", name: "Gigabyte G24F 24\"", desc: "1080p, 165Hz, IPS", price: 3800, icon: "🖥️" },
    { id: 26, cat: "Monitores", name: "Samsung Odyssey G7 27\"", desc: "1440p, 240Hz, Curvo QLED", price: 11500, icon: "👁️" },
    { id: 27, cat: "Monitores", name: "LG UltraGear 32\"", desc: "4K, 144Hz, Nano IPS", price: 15800, icon: "📺" },

    // 10. PERIFÉRICOS
    { id: 28, cat: "Periféricos", name: "Logitech G Pro X Superlight", desc: "Mouse Wireless, 63g", price: 2400, icon: "🖱️" },
    { id: 29, cat: "Periféricos", name: "Razer Huntsman V2", desc: "Teclado Óptico Analógico", price: 4200, icon: "⌨️" },
    { id: 30, cat: "Periféricos", name: "HyperX Cloud II Wireless", desc: "Headset 7.1 Surround", price: 2800, icon: "🎧" }
];

let cart = [];

// 4. FUNCION RENDERIZAR CON SEPARADORES DE CATEGORÍA
function renderProducts() {
    const grid = $('#products-grid');
    grid.empty();

    // Obtener nombres únicos de categorías
    const categories = [...new Set(products.map(p => p.cat))];

    categories.forEach(category => {
        // Añadir encabezado de categoría que ocupe todo el ancho
        grid.append(`
            <div class="category-header" style="grid-column: 1 / -1; margin-top: 30px; border-left: 4px solid var(--accent-neon); padding-left: 15px;">
                <h2 style="color: var(--accent-neon); text-transform: uppercase;">${category}</h2>
            </div>
        `);

        // Filtrar productos de esa categoría
        const filtered = products.filter(p => p.cat === category);
        
        filtered.forEach(p => {
            grid.append(`
                <div class="product-card">
                    <div>
                        <div style="font-size: 35px; margin-bottom: 10px;">${p.icon}</div>
                        <h3>${p.name}</h3>
                        <p style="font-size: 0.8em; opacity: 0.8; height: 40px;">${p.desc}</p>
                    </div>
                    <div>
                        <div style="font-size: 1.3em; color: var(--accent-neon); font-weight: bold; margin: 15px 0;">$${p.price.toLocaleString()}</div>
                        <button class="btn-neon btn-block" onclick="addToCart(${p.id})">AÑADIR</button>
                    </div>
                </div>
            `);
        });
    });
}

// 5. LÓGICA DEL CARRITO
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const total = cart.reduce((suma, item) => suma + item.price, 0);
    $('#cart-total').text(total.toLocaleString(undefined, {minimumFractionDigits: 2}));
    const lista = $('#cart-items');
    lista.empty();
    cart.forEach(item => {
        lista.append(`<div class="cart-item-row"><span>• ${item.name}</span><span>$${item.price.toLocaleString()}</span></div>`);
    });
}

function clearCart() {
    if(confirm("¿Vaciar todo el carrito?")) {
        cart = [];
        actualizarCarritoUI();
    }
}

function checkout() {
    if (cart.length === 0) return alert("El carrito está vacío.");
    alert("🚀 ¡Compra Finalizada!\nTotal: $" + $('#cart-total').text());
    cart = [];
    actualizarCarritoUI();
}