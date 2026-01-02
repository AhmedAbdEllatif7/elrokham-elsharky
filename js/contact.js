/**
 * ملف الجافاسكريبت لصفحة الاتصال
 * يحتوي على التحقق المتقدم من النماذج والخرائط
 */

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة صفحة الاتصال
    initContactPage();
});

// تهيئة صفحة الاتصال
function initContactPage() {
    // تهيئة نموذج الاتصال المتقدم
    initAdvancedFormValidation();
    
    // تهيئة الخريطة التفاعلية
    initInteractiveMap();
    
    // تحسين تجربة المستخدم
    enhanceContactExperience();
    
    // تهيئة مقترحات الإدخال
    initInputSuggestions();
}

// التحقق المتقدم من النموذج
function initAdvancedFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    // التحقق في الوقت الفعلي
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', validateRealTime);
        input.addEventListener('blur', validateOnBlur);
    });
    
    // منع الإرسال المتكرر
    let isSubmitting = false;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        // التحقق النهائي
        if (!validateForm()) {
            showError('يرجى تصحيح الأخطاء قبل الإرسال');
            return;
        }
        
        isSubmitting = true;
        await submitForm();
        isSubmitting = false;
    });
}

// التحقق في الوقت الفعلي
function validateRealTime(e) {
    const input = e.target;
    const value = input.value.trim();
    const fieldName = input.getAttribute('name');
    
    // إزالة حالة الخطأ عند البدء بالكتابة
    input.classList.remove('error');
    clearError(fieldName);
    
    // التحقق حسب نوع الحقل
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                setError(fieldName, 'الاسم يجب أن يكون على الأقل حرفين');
                input.classList.add('error');
            }
            break;
            
        case 'phone':
            if (!isValidSaudiPhone(value)) {
                setError(fieldName, 'يرجى إدخال رقم هاتف سعودي صحيح');
                input.classList.add('error');
            }
            break;
            
        case 'email':
            if (value && !isValidEmail(value)) {
                setError(fieldName, 'البريد الإلكتروني غير صالح');
                input.classList.add('error');
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                setError(fieldName, 'الرسالة يجب أن تكون على الأقل 10 أحرف');
                input.classList.add('error');
            }
            break;
    }
}

// التحقق عند ترك الحقل
function validateOnBlur(e) {
    const input = e.target;
    const value = input.value.trim();
    const fieldName = input.getAttribute('name');
    
    if (input.hasAttribute('required') && value === '') {
        setError(fieldName, 'هذا الحقل مطلوب');
        input.classList.add('error');
    }
}

// التحقق من رقم الهاتف السعودي
function isValidSaudiPhone(phone) {
    // إزالة جميع الأحرف غير الرقمية
    const cleanPhone = phone.replace(/\D/g, '');
    
    // التحقق من الأرقام السعودية
    // 05xxxxxxxx أو +9665xxxxxxxx
    const saudiRegex = /^(009665|9665|\+9665|05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
    
    return saudiRegex.test(cleanPhone);
}

// تعيين رسالة خطأ
function setError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.opacity = '1';
    }
}

// مسح رسالة الخطأ
function clearError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.opacity = '0';
    }
}

// التحقق الكامل من النموذج
function validateForm() {
    const form = document.getElementById('contactForm');
    let isValid = true;
    
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        
        if (value === '') {
            setError(fieldName, 'هذا الحقل مطلوب');
            field.classList.add('error');
            isValid = false;
        }
    });
    
    return isValid;
}

// عرض رسالة خطأ عامة
function showError(message) {
    // إنشاء عنصر رسالة الخطأ إذا لم يكن موجوداً
    let errorAlert = document.querySelector('.form-error-alert');
    
    if (!errorAlert) {
        errorAlert = document.createElement('div');
        errorAlert.className = 'form-error-alert';
        errorAlert.style.cssText = `
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            border: 1px solid #f5c6cb;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        const form = document.getElementById('contactForm');
        form.insertBefore(errorAlert, form.firstChild);
    }
    
    errorAlert.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    errorAlert.style.display = 'flex';
    
    // إخفاء الرسالة بعد 5 ثوانٍ
    setTimeout(() => {
        errorAlert.style.display = 'none';
    }, 5000);
}

// إرسال النموذج
async function submitForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    
    // تعطيل الزر وعرض حالة التحميل
    submitBtn.disabled = true;
    submitText.textContent = 'جاري الإرسال...';
    submitSpinner.classList.remove('hidden');
    
    try {
        // جمع بيانات النموذج
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // هنا يمكنك إرسال البيانات إلى الخادم
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        
        // محاكاة الإرسال
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // عرض رسالة النجاح
        showSuccessMessage();
        
        // إعادة تعيين النموذج
        form.reset();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showError('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    } finally {
        // إعادة تمكين الزر وإخفاء حالة التحميل
        submitBtn.disabled = false;
        submitText.textContent = 'إرسال الرسالة';
        submitSpinner.classList.add('hidden');
    }
}

// عرض رسالة النجاح
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    
    if (successMessage) {
        successMessage.classList.remove('hidden');
        
        // إخفاء الرسالة بعد 5 ثوانٍ
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }
}

// تهيئة الخريطة التفاعلية
function initInteractiveMap() {
    const mapIframe = document.querySelector('.map-container iframe');
    
    if (!mapIframe) return;
    
    // تحسين تجربة تحميل الخريطة
    mapIframe.addEventListener('load', () => {
        console.log('Map loaded successfully');
        mapIframe.classList.add('loaded');
    });
    
    // إضافة معلومات إضافية للخريطة
    addMapInfo();
}

// إضافة معلومات إضافية للخريطة
function addMapInfo() {
    const mapContainer = document.querySelector('.map-container');
    
    if (!mapContainer) return;
    
    const infoBox = document.createElement('div');
    infoBox.className = 'map-info-box';
    infoBox.innerHTML = `
        <h4><i class="fas fa-info-circle"></i> معلومات الموقع</h4>
        <p><strong>العنوان:</strong> الرياض، حي المناخ، مخرج 18</p>
        <p><strong>أوقات الزيارة:</strong> الأحد - الخميس، 8 صباحاً - 5 مساءً</p>
        <p><strong>ملاحظة:</strong> يرجى الاتصال قبل الزيارة للتأكد من التواجد</p>
        <button id="getDirections" class="btn btn-small">
            <i class="fas fa-directions"></i> الحصول على اتجاهات
        </button>
    `;
    
    mapContainer.appendChild(infoBox);
    
    // إضافة وظيفة للحصول على اتجاهات
    document.getElementById('getDirections').addEventListener('click', () => {
        const address = encodeURIComponent('الرياض، حي المناخ، مخرج 18');
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
        window.open(googleMapsUrl, '_blank');
    });
}

// تحسين تجربة المستخدم لصفحة الاتصال
function enhanceContactExperience() {
    // إضافة تأثيرات للشبكة
    const contactGrid = document.querySelector('.contact-grid');
    
    if (contactGrid) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(contactGrid);
    }
    
    // إضافة اختصارات لوحة المفاتيح
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter لإرسال النموذج
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.click();
            }
        }
        
        // Esc لإلغاء التركيز
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
    });
    
    // حفظ النموذج تلقائياً
    initAutoSave();
}

// حفظ النموذج تلقائياً
function initAutoSave() {
    const form = document.getElementById('contactForm');
    const saveKey = 'contact_form_draft';
    
    if (!form) return;
    
    // تحميل المسودة المحفوظة
    const savedData = localStorage.getItem(saveKey);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = data[key];
                }
            });
            
            // عرض تنبيه
            showAutoSaveNotice('تم استعادة المسودة المحفوظة');
        } catch (e) {
            console.error('Error loading saved form:', e);
        }
    }
    
    // حفظ التغييرات
    form.addEventListener('input', debounce(() => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        localStorage.setItem(saveKey, JSON.stringify(data));
    }, 1000));
    
    // مسح المسودة عند الإرسال الناجح
    form.addEventListener('submit', () => {
        localStorage.removeItem(saveKey);
    });
}

// عرض إشعار الحفظ التلقائي
function showAutoSaveNotice(message) {
    const notice = document.createElement('div');
    notice.className = 'auto-save-notice';
    notice.textContent = message;
    notice.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4a6fa5;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notice);
    
    setTimeout(() => {
        notice.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notice.remove(), 300);
    }, 3000);
}

// تهيئة مقترحات الإدخال
function initInputSuggestions() {
    const serviceSelect = document.getElementById('service');
    
    if (!serviceSelect) return;
    
    // إضافة خاصية البحث للقائمة المنسدلة
    serviceSelect.addEventListener('focus', function() {
        this.size = 6;
    });
    
    serviceSelect.addEventListener('blur', function() {
        this.size = 1;
    });
    
    serviceSelect.addEventListener('keyup', function(e) {
        if (e.key.length === 1) {
            const searchTerm = this.value.toLowerCase();
            const options = Array.from(this.options);
            
            options.forEach(option => {
                option.style.display = option.text.toLowerCase().includes(searchTerm) ? 'block' : 'none';
            });
        }
    });
}

// دالة Debounce لتحسين الأداء
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// دالة Throttle لتحسين الأداء
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// تصدير الوظائف للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initContactPage,
        validateForm,
        submitForm,
        isValidSaudiPhone
    };
}