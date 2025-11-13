// 通用JavaScript功能 - 用于所有页面

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            // 检查是否是service.html页面的锚点链接（需要偏移）
            const isServicePage = window.location.pathname.includes('service.html');
            if (isServicePage) {
                const offset = 100; // 导航栏高度偏移
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// 汉堡菜单功能
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

function toggleMobileNav() {
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

if (hamburger) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileNav();
    });
}

// 点击菜单项目时关闭菜单
if (navMenu) {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                toggleMobileNav();
            }
        });
    });

    // 点击菜单外部区域时关闭菜单
    navMenu.addEventListener('click', function(e) {
        if (e.target === navMenu && navMenu.classList.contains('active')) {
            toggleMobileNav();
        }
    });
}

// 语系选择器功能
const languageBtn = document.getElementById('languageBtn');
const languageDropdown = document.getElementById('languageDropdown');

function toggleLanguageDropdown() {
    if (languageDropdown && languageBtn) {
        languageDropdown.classList.toggle('active');
        languageBtn.classList.toggle('active');
    }
}

function closeLanguageDropdown() {
    if (languageDropdown && languageBtn) {
        languageDropdown.classList.remove('active');
        languageBtn.classList.remove('active');
    }
}

if (languageBtn) {
    languageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleLanguageDropdown();
    });
}

// 点击菜单项目时更新按钮文字并关闭菜单
if (languageDropdown) {
    document.querySelectorAll('.language-dropdown a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLanguage = this.textContent;
            if (languageBtn) {
                languageBtn.textContent = selectedLanguage;
            }
            
            // 更新active状态
            document.querySelectorAll('.language-dropdown a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            
            closeLanguageDropdown();
        });
    });
}

// 点击外部区域时关闭下拉菜单
document.addEventListener('click', function(e) {
    if (languageBtn && languageDropdown) {
        if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
            closeLanguageDropdown();
        }
    }
});

// 滚动动画观察器
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // 主视觉区域的动画不重复触发，其他重复触发
            const isHeroElement = entry.target.classList.contains('hero-title-animated') ||
                entry.target.classList.contains('hero-subtitle-animated') ||
                entry.target.classList.contains('hero-cta-animated') ||
                entry.target.classList.contains('search-section-animated');

            if (!isHeroElement) {
                entry.target.classList.remove('visible');
            }
        }
    });
}, observerOptions);

// 观察所有动画元素
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale, .fade-in-zoom, .fade-in-slide, .fade-in-bounce, .hero-title-animated, .hero-subtitle-animated, .hero-cta-animated, .search-section-animated').forEach(el => {
        observer.observe(el);
    });
});

