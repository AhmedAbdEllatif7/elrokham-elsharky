/**
 * ملف الجافاسكريبت لصفحة المنتجات
 */

document.addEventListener('DOMContentLoaded', function() {
    initProductsPage();
});

function initProductsPage() {
    // بيانات المنتجات
    const products = [
        {
            id: 1,
            name: "ألواح رخام كبيرة",
            description: "ألواح رخام طبيعية كبيرة الحجم للواجهات والمساحات الفخمة بألوان وتصاميم متنوعة",
            image: "images/products/marble-slabs.jpg",
            category: ["natural", "slabs"],
            price: "السعر حسب المقاس"
        },
        {
            id: 2,
            name: "بلاط الأرضيات الرخامي",
            description: "بلاط رخامي عالي الجودة للأرضيات بأشكال وألوان تناسب جميع الأذواق",
            image: "images/products/marble-tiles.jpg",
            category: ["natural", "tiles"],
            price: "من 150 ريال/م²"
        },
        {
            id: 3,
            name: "بلاط الحوائط الرخامي",
            description: "بلاط رخامي للحوائط بتصاميم عصرية تضيف لمسة أناقة للمساحات الداخلية",
            image: "images/products/wall-tiles.jpg",
            category: ["natural", "tiles"],
            price: "من 120 ريال/م²"
        },
        {
            id: 4,
            name: "الدرج الرخامي الكلاسيكي",
            description: "سلالم ودرج رخامية فاخرة بتصميم كلاسيكي أنيق يناسب القصور والفلل الفاخرة",
            image: "images/products/marble-stairs.jpg",
            category: ["natural", "decor"],
            price: "السعر حسب التصميم"
        },
        {
            id: 5,
            name: "أحواض المطابخ الرخامية",
            description: "أحواض رخامية للمطابخ بتصاميم عصرية ومتانة عالية مقاومة للخدوش والبقع",
            image: "images/products/marble-sinks.jpg",
            category: ["natural", "decor"],
            price: "من 800 ريال"
        },
        {
            id: 6,
            name: "جلسات الشبابيك الرخامية",
            description: "جلسات ونوافذ رخامية بتصاميم فريدة تضيف لمسة جمالية للمساحات الداخلية",
            image: "images/products/marble-windows.jpg",
            category: ["natural", "decor"],
            price: "السعر حسب المقاس"
        },
        {
            id: 7,
            name: "رخام صناعي للكاونترات",
            description: "رخام صناعي عالي الجودة للكاونترات والمطابخ بتصاميم متنوعة وألوان متعددة",
            image: "images/products/artificial-counter.jpg",
            category: ["artificial", "decor"],
            price: "من 400 ريال/م²"
        },
        {
            id: 8,
            name: "ديكورات رخامية مخصصة",
            description: "تصميم وتنفيذ ديكورات رخامية مخصصة حسب طلب العميل بأشكال فنية مبتكرة",
            image: "images/products/marble-decor.jpg",
            category: ["natural", "artificial", "decor"],
            price: "السعر حسب التصميم"
        },
        {
            id: 9,
            name: "رخام كرارة أبيض",
            description: "رخام كرارة إيطالي أبيض نقي بأنماط رمادية، مثالي للفخامة والأناقة",
            image: "images/products/carrara-white.jpg",
            category: ["natural", "slabs"],
            price: "من 350 ريال/م²"
        },
        {
            id: 10,
            name: "رخام إمبرادور براون",
            description: "رخام إمبرادور براون بأنماط ذهبية، مثالي للأرضيات والجدران",
            image: "images/products/emperador-brown.jpg",
            category: ["natural", "tiles", "slabs"],
            price: "من 280 ريال/م²"
        },
        {
            id: 11,
            name: "رخام صناعي كوارتز",
            description: "رخام صناعي من الكوارتز، مقاوم للخدوش والحرارة، بألوان متنوعة",
            image: "images/products/quartz-artificial.jpg",
            category: ["artificial", "slabs"],
            price: "من 320 ريال/م²"
        },
        {
            id: 12,
            name: "تلبيسات أعمدة رخامية",
            description: "تلبيسات رخامية للأعمدة والأعمدة الداخلية والخارجية بتصاميم كلاسيكية وعصرية",
            image: "images/products/column-cladding.jpg",
            category: ["natural", "decor"],
            price: "السعر حسب المقاس"
        }
    ];

    // عناصر DOM
    const productsContainer = document.getElementById('productsContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('productSearch');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // متغيرات حالة
    let currentFilter = 'all';
    let currentSearch = '';
    let displayedProducts = 6;
    const productsPerLoad = 6;

    // تهيئة الصفحة
    renderProducts();
    initEventListeners();

    function renderProducts() {
        // تصفية المنتجات
        let filteredProducts = products.filter(product => {
            // تصفية حسب الفئة
            const categoryMatch = currentFilter === 'all' || product.category.includes(currentFilter);
            
            // تصفية حسب البحث
            const searchMatch = currentSearch === '' || 
                product.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                product.description.toLowerCase().includes(currentSearch.toLowerCase());
            
            return categoryMatch && searchMatch;
        });

        // تقليل عدد المنتجات المعروضة
        const productsToShow = filteredProducts.slice(0, displayedProducts);

        // إعادة تعيين الحاوية
        productsContainer.innerHTML = '';

        // عرض المنتجات
        productsToShow.forEach(product => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
        });

        // التحكم في زر "تحميل المزيد"
        if (displayedProducts >= filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }

        // رسالة إذا لم توجد نتائج
        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>لم يتم العثور على منتجات</h3>
                    <p>جرب استخدام كلمات بحث مختلفة أو اختر فئة أخرى</p>
                </div>
            `;
            loadMoreBtn.style.display = 'none';
        }
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card fade-up';
        card.dataset.category = product.category.join(' ');
        
        card.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-overlay">
                    <a href="contact.html?product=${encodeURIComponent(product.name)}" class="btn btn-small">طلب استشارة</a>
                </div>
            </div>
            <div class="product-info">
                <div class="product-categories">
                    ${product.category.map(cat => `<span class="product-category">${getCategoryName(cat)}</span>`).join('')}
                </div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <a href="contact.html?product=${encodeURIComponent(product.name)}" class="product-action">
                        <i class="fas fa-arrow-left"></i> طلب عرض سعر
                    </a>
                </div>
            </div>
        `;
        
        return card;
    }

    function getCategoryName(category) {
        const categories = {
            'natural': 'رخام طبيعي',
            'artificial': 'رخام صناعي',
            'slabs': 'ألواح رخام',
            'tiles': 'بلاط رخام',
            'decor': 'ديكورات'
        };
        return categories[category] || category;
    }

    function initEventListeners() {
        // مرشحات الفئة
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // إزالة النشاط من جميع الأزرار
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // إضافة النشاط للزر المحدد
                this.classList.add('active');
                // تحديث الفئة الحالية
                currentFilter = this.dataset.filter;
                // إعادة تعيين المنتجات المعروضة
                displayedProducts = productsPerLoad;
                // إعادة عرض المنتجات
                renderProducts();
            });
        });

        // شريط البحث
        searchInput.addEventListener('input', function() {
            currentSearch = this.value;
            displayedProducts = productsPerLoad;
            renderProducts();
        });

        // زر تحميل المزيد
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                displayedProducts += productsPerLoad;
                renderProducts();
                
                // التمرير لأسفل قليلاً
                setTimeout(() => {
                    loadMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            });
        }

        // استعلام URL للبحث عن منتج محدد
        const urlParams = new URLSearchParams(window.location.search);
        const productParam = urlParams.get('product');
        if (productParam) {
            searchInput.value = productParam;
            currentSearch = productParam;
            renderProducts();
        }
    }
}