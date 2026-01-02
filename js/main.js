/**
 * الرخام الشرقي - الملف الرئيسي للجافاسكريبت
 * تم تحسينه للأداء ومتوافق مع ES6
 * يحتوي على جميع الوظائف الأساسية للموقع
 */

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة القائمة المتنقلة
    initMobileMenu();
    
    // تهيئة تأثيرات التمرير
    initScrollEffects();
    
    // تهيئة سنة حقوق النشر
    initCopyrightYear();
    
    // تهيئة جسيمات الخلفية
    initParticles();
    
    // تهيئة الدردشة
    initChatbot();
    
    // تهيئة التحقق من النماذج
    initFormValidation();
    
    // تهيئة التحميل البطيء للصور
    initLazyLoading();
    
    // تسجيل تحليلات الأداء (يمكن استبدالها بتحليلات Google)
    logPerformance();
});

// تهيئة القائمة المتنقلة
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                // منع التمرير عند فتح القائمة
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // إعادة التمرير
                document.body.style.overflow = '';
            }
        });
        
        // إغلاق القائمة عند النقر على رابط
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (event) => {
            if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
}

// تأثيرات التمرير
function initScrollEffects() {
    // تأثير الرأس عند التمرير
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(74, 111, 165, 0.1)';
        }
    });
    
    // الكشف عن العناصر عند التمرير للأنيميشن
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر التي تحتوي على كلاس animation
    document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
        observer.observe(el);
    });
    
    // التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                const mainNav = document.getElementById('mainNav');
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    document.body.style.overflow = '';
                }
                
                // التمرير إلى العنصر
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// سنة حقوق النشر
function initCopyrightYear() {
    const yearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// جسيمات الخلفية
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#4a6fa5', '#6b93c5', '#2c3e50']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4a6fa5',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 200,
                        line_linked: {
                            opacity: 0.2
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// نظام الدردشة
function initChatbot() {
    const chatbotTrigger = document.getElementById('chatbotTrigger');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatbot = document.getElementById('closeChatbot');
    
    if (chatbotTrigger && chatbotWindow && closeChatbot) {
        chatbotTrigger.addEventListener('click', () => {
            chatbotWindow.classList.toggle('active');
        });
        
        closeChatbot.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
        
        // إغلاق الدردشة عند النقر خارجها
        document.addEventListener('click', (event) => {
            if (!chatbotWindow.contains(event.target) && !chatbotTrigger.contains(event.target)) {
                chatbotWindow.classList.remove('active');
            }
        });
        
        // إغلاق الدردشة عند الضغط على زر Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && chatbotWindow.classList.contains('active')) {
                chatbotWindow.classList.remove('active');
            }
        });
    }
}

// التحقق من النماذج الأساسي
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                submitContactForm();
            }
        });
        
        // التحقق أثناء الكتابة
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearError);
        });
    }
}

// التحقق من حقل واحد
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    if (field.hasAttribute('required') && value === '') {
        field.classList.add('error');
        if (errorElement) errorElement.textContent = 'هذا الحقل مطلوب';
        return false;
    }
    
    if (fieldName === 'email' && value !== '' && !isValidEmail(value)) {
        field.classList.add('error');
        if (errorElement) errorElement.textContent = 'البريد الإلكتروني غير صالح';
        return false;
    }
    
    if (fieldName === 'phone' && !isValidPhone(value)) {
        field.classList.add('error');
        if (errorElement) errorElement.textContent = 'رقم الهاتف غير صالح';
        return false;
    }
    
    field.classList.remove('error');
    if (errorElement) errorElement.textContent = '';
    return true;
}

// التحقق من البريد الإلكتروني
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// التحقق من رقم الهاتف
function isValidPhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 9;
}

// مسح خطأ الحقل
function clearError(e) {
    const field = e.target;
    const fieldName = field.getAttribute('name');
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    field.classList.remove('error');
    if (errorElement) errorElement.textContent = '';
}

// التحقق من نموذج الاتصال الكامل
function validateContactForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const event = new Event('blur');
        field.dispatchEvent(event);
        
        if (field.classList.contains('error')) {
            isValid = false;
        }
    });
    
    return isValid;
}

// إرسال نموذج الاتصال
function submitContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    const successMessage = document.getElementById('successMessage');
    
    // عرض حالة التحميل
    submitBtn.disabled = true;
    submitText.textContent = 'جاري الإرسال...';
    submitSpinner.classList.remove('hidden');
    
    // محاكاة إرسال النموذج (استبدل هذا بـ AJAX حقيقي)
    setTimeout(() => {
        // إخفاء حالة التحميل
        submitBtn.disabled = false;
        submitText.textContent = 'إرسال الرسالة';
        submitSpinner.classList.add('hidden');
        
        // عرض رسالة النجاح
        successMessage.classList.remove('hidden');
        
        // إعادة تعيين النموذج بعد 5 ثوانٍ
        setTimeout(() => {
            form.reset();
            successMessage.classList.add('hidden');
        }, 5000);
        
        // هنا يمكنك إضافة كود إرسال النموذج الفعلي
        // مثلاً: fetch('process.php', { method: 'POST', body: new FormData(form) })
        console.log('Form submitted:', new FormData(form));
    }, 2000);
}

// التحميل البطيء للصور
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback للمتصفحات القديمة
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// تسجيل تحليلات الأداء
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const domReadyTime = perfData.domComplete - perfData.domLoading;
                
                console.log('Performance Metrics:');
                console.log(`Page Load Time: ${pageLoadTime}ms`);
                console.log(`DOM Ready Time: ${domReadyTime}ms`);
                
                // يمكن إرسال هذه البيانات إلى خدمة التحليلات
                // sendToAnalytics({ pageLoadTime, domReadyTime });
            }, 0);
        });
    }
}

// إدارة حالة الدردشة
let chatbotState = {
    isOpen: false,
    messages: []
};

// إرسال رسالة دردشة (مكان لعملية الدردشة المستقبلية)
function sendChatMessage(message) {
    chatbotState.messages.push({
        text: message,
        timestamp: new Date().toISOString(),
        sender: 'user'
    });
    
    // هنا يمكنك إضافة ردود ذكية بناءً على الرسالة
    const response = getChatbotResponse(message);
    
    chatbotState.messages.push({
        text: response,
        timestamp: new Date().toISOString(),
        sender: 'bot'
    });
    
    // تحديث واجهة الدردشة
    updateChatInterface();
}

// الحصول على رد الدردشة (بدائي - يمكن تطويره)
function getChatbotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('سعر') || lowerMessage.includes('تكلفة')) {
        return 'يمكننا تقديم عرض سعر دقيق بعد معرفة تفاصيل مشروعك. هل يمكنك زيارة صفحة الاتصال وتعبئة النموذج؟';
    }
    
    if (lowerMessage.includes('وقت') || lowerMessage.includes('مدة')) {
        return 'مدة التنفيذ تعتمد على حجم المشروع. بشكل عام، المشاريع المنزلية تستغرق 10-20 يوم عمل. لمزيد من التفاصيل، يمكنك مراجعة صفحة الأسئلة الشائعة.';
    }
    
    if (lowerMessage.includes('رخام') && lowerMessage.includes('طبيعي')) {
        return 'نعم، نوفر جميع أنواع الرخام الطبيعي من مصادر عالمية. يمكنك الاتصال بنا للاطلاع على العينات المتوفرة.';
    }
    
    return 'شكراً لرسالتك! يمكننا مساعدتك بشكل أفضل عبر الهاتف أو الواتساب. هل تفضل التواصل الآن؟';
}

// تحديث واجهة الدردشة (في حالة تطويرها)
function updateChatInterface() {
    // كود لتحديث واجهة الدردشة في المستقبل
}

// إدارة حالة الموقع
const siteState = {
    currentPage: window.location.pathname,
    userPreferences: {
        theme: 'light',
        language: 'ar'
    }
};

// اكتشاف الجهاز والمتصفح
function detectDevice() {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)|Tablet|Silk/i.test(userAgent);
    
    return {
        isMobile,
        isTablet,
        isDesktop: !isMobile && !isTablet,
        userAgent
    };
}

// تحسين تجربة المستخدم بناءً على الجهاز
function optimizeForDevice() {
    const device = detectDevice();
    
    if (device.isMobile) {
        // تحسينات للأجهزة المحمولة
        document.body.classList.add('mobile-device');
        
        // إضافة meta viewport ديناميكي إذا لزم الأمر
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
        }
    }
    
    if (device.isTablet) {
        document.body.classList.add('tablet-device');
    }
}

// تشغيل تحسينات الجهاز عند التحميل
window.addEventListener('load', optimizeForDevice);

// إدارة حالة التحميل
window.addEventListener('beforeunload', () => {
    // يمكن إضافة تنبيهات الحفظ إذا كان هناك نموذج غير محفوظ
});

// API لتحديث الموقع (للإصدارات المستقبلية)
class SiteAPI {
    static async submitForm(formData) {
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error submitting form:', error);
            throw error;
        }
    }
    
    static async getFAQs() {
        try {
            const response = await fetch('/api/faqs');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            throw error;
        }
    }
}

// تصدير الوظائف للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileMenu,
        initScrollEffects,
        validateField,
        submitContactForm
    };
}

/**
 * دالة خاصة للتعامل مع الروابط الداخلية بين الصفحات
 */
function handleCrossPageLinks() {
    // الحصول على معرف القسم من الـ URL إذا كان موجوداً
    const hash = window.location.hash;
    
    if (hash) {
        setTimeout(() => {
            scrollToSection(hash);
        }, 100);
    }
    
    // التعامل مع الروابط الداخلية في الصفحات الأخرى
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            const targetId = href.replace('#', '');
            
            // إذا كنا في نفس الصفحة (index.html)
            if (window.location.pathname.endsWith('index.html') || 
                window.location.pathname === '/' || 
                window.location.pathname.endsWith('/')) {
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                    const mainNav = document.getElementById('mainNav');
                    if (mainNav && mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                        document.body.style.overflow = '';
                    }
                    
                    // التمرير إلى العنصر
                    scrollToSection(href);
                }
            } else {
                // إذا كنا في صفحة أخرى، ننتقل إلى index.html مع المعرف
                e.preventDefault();
                window.location.href = `index.html${href}`;
            }
        });
    });
}

/**
 * دالة التمرير إلى قسم معين
 */
function scrollToSection(sectionId) {
    const targetElement = document.querySelector(sectionId);
    if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * تهيئة الصفحة عند التحميل - تحديث
 */
document.addEventListener('DOMContentLoaded', function() {
    // ... الكود الحالي ...
    
    // تهيئة الروابط بين الصفحات
    handleCrossPageLinks();
    
    // ... باقي الكود ...
});


/**
 * إضافة وظيفة المعرض للصور
 */
function initImageGallery() {
    const productImages = document.querySelectorAll('.product-img');
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <span class="modal-navigation modal-prev"><i class="fas fa-chevron-right"></i></span>
        <span class="modal-navigation modal-next"><i class="fas fa-chevron-left"></i></span>
        <img class="modal-content" src="" alt="معرض الصور">
    `;
    
    document.body.appendChild(modal);
    
    const modalImg = modal.querySelector('.modal-content');
    const closeBtn = modal.querySelector('.close-modal');
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');
    
    let currentImageIndex = 0;
    const images = Array.from(productImages);
    
    // عند النقر على صورة المنتج
    productImages.forEach((imgContainer, index) => {
        imgContainer.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                currentImageIndex = index;
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // إغلاق المعرض
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // النقر خارج الصورة لإغلاق
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // التنقل بين الصور
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        const img = images[currentImageIndex].querySelector('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    });
    
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const img = images[currentImageIndex].querySelector('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    });
    
    // إضافة اختصارات لوحة المفاتيح
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowRight') {
                prevBtn.click();
            } else if (e.key === 'ArrowLeft') {
                nextBtn.click();
            }
        }
    });
}

/**
 * تحديث تهيئة الصفحة
 */
document.addEventListener('DOMContentLoaded', function() {
    // ... الكود الحالي ...
    
    // تهيئة معرض الصور
    initImageGallery();
    
    // ... باقي الكود ...
});

/**
 * تحسين الزر في الكارد
 */
function enhanceCardButtons() {
    const cardButtons = document.querySelectorAll('.product-info .btn-small');
    
    cardButtons.forEach(btn => {
        // إضافة أيقونة للزر
        if (!btn.querySelector('i')) {
            btn.innerHTML = `<span>${btn.textContent}</span> <i class="fas fa-arrow-left"></i>`;
        }
        
        // إضافة تأثير hover
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// استدعاء الدالة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // ... الكود الحالي ...
    
    enhanceCardButtons();
    
    // ... باقي الكود ...
});