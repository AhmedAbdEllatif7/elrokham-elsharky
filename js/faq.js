/**
 * ملف الجافاسكريبت لصفحة الأسئلة الشائعة
 * يحتوي على وظائف البحث والتفعيل
 */

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة صفحة الأسئلة الشائعة
    initFAQPage();
});

// تهيئة صفحة الأسئلة الشائعة
function initFAQPage() {
    // تهيئة البحث
    initFAQSearch();
    
    // تهيئة تفعيل/إلغاء تفعيل الأسئلة
    initFAQToggle();
    
    // تحسين تجربة المستخدم
    enhanceFAQExperience();
}

// البحث في الأسئلة الشائعة
function initFAQSearch() {
    const searchInput = document.getElementById('faqSearch');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        let hasResults = false;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            const isVisible = question.includes(searchTerm) || answer.includes(searchTerm);
            
            item.style.display = isVisible ? 'block' : 'none';
            
            if (isVisible) {
                hasResults = true;
                
                // إبراز النص المطابق
                if (searchTerm.length > 0) {
                    highlightText(item, searchTerm);
                }
            }
        });
        
        // عرض رسالة إذا لم توجد نتائج
        showNoResultsMessage(!hasResults && searchTerm.length > 0);
    });
    
    // مسح النتائج عند الضغط على Escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            this.dispatchEvent(new Event('input'));
        }
    });
}

// إبراز النص المطابق
function highlightText(element, searchTerm) {
    const textElements = element.querySelectorAll('.faq-question h3, .faq-answer p');
    
    textElements.forEach(textElement => {
        const originalText = textElement.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const highlightedText = originalText.replace(regex, '<mark>$1</mark>');
        
        textElement.innerHTML = highlightedText;
    });
}

// عرض رسالة عدم وجود نتائج
function showNoResultsMessage(show) {
    let noResultsMessage = document.querySelector('.no-results-message');
    
    if (show && !noResultsMessage) {
        noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results-message';
        noResultsMessage.innerHTML = `
            <i class="fas fa-search"></i>
            <p>لم يتم العثور على نتائج تطابق بحثك</p>
            <small>جرب استخدام كلمات بحث مختلفة أو تصفح جميع الأسئلة</small>
        `;
        
        const faqContainer = document.querySelector('.faq-container');
        if (faqContainer) {
            faqContainer.parentNode.insertBefore(noResultsMessage, faqContainer.nextSibling);
        }
    } else if (!show && noResultsMessage) {
        noResultsMessage.remove();
    }
}

// تفعيل/إلغاء تفعيل الأسئلة
function initFAQToggle() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // إغلاق جميع الأسئلة الأخرى
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const answer = item.querySelector('.faq-answer');
                    answer.style.maxHeight = null;
                }
            });
            
            // تبديل حالة السؤال الحالي
            if (!isActive) {
                faqItem.classList.add('active');
                const answer = faqItem.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                
                // تمرير إلى السؤال المفتوح
                setTimeout(() => {
                    faqItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            } else {
                faqItem.classList.remove('active');
                const answer = faqItem.querySelector('.faq-answer');
                answer.style.maxHeight = null;
            }
        });
    });
    
    // فتح السؤال الأول تلقائياً
    const firstFaqItem = document.querySelector('.faq-item');
    if (firstFaqItem) {
        firstFaqItem.classList.add('active');
        const answer = firstFaqItem.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    }
}

// تحسين تجربة المستخدم للأسئلة الشائعة
function enhanceFAQExperience() {
    // إضافة تأثيرات عند التمرير
    const faqItems = document.querySelectorAll('.faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    faqItems.forEach(item => {
        observer.observe(item);
    });
    
    // تحسين إمكانية الوصول
    document.querySelectorAll('.faq-question').forEach(question => {
        question.setAttribute('role', 'button');
        question.setAttribute('tabindex', '0');
        
        // إضافة الدعم للوحة المفاتيح
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // إضافة أزرار النسخ للأسئلة المهمة
    addCopyButtons();
}

// إضافة أزرار نسخ للإجابات المهمة
function addCopyButtons() {
    const importantAnswers = document.querySelectorAll('.faq-answer');
    
    importantAnswers.forEach(answer => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-answer-btn';
        copyButton.innerHTML = '<i class="far fa-copy"></i> نسخ الإجابة';
        copyButton.setAttribute('aria-label', 'نسخ الإجابة');
        
        copyButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const answerText = answer.textContent.trim();
            copyToClipboard(answerText);
            
            // تغيير النص مؤقتاً للإشارة إلى النجاح
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
            this.classList.add('copied');
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.classList.remove('copied');
            }, 2000);
        });
        
        answer.querySelector('.faq-answer-content').appendChild(copyButton);
    });
}

// نسخ النص إلى الحافظة
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    textarea.select();
    textarea.setSelectionRange(0, 99999); // للهواتف المحمولة
    
    try {
        document.execCommand('copy');
        console.log('Text copied to clipboard');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textarea);
}

// تصدير الوظائف للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFAQPage,
        initFAQSearch,
        initFAQToggle,
        copyToClipboard
    };
}