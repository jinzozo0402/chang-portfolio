/**
 * 🎬 VIDEO EDITOR PORTFOLIO - JAVASCRIPT (SENIOR EDITION)
 * Core interactions, theme & language engines, and GSAP animations
 */

// =====================================================
// GLOBAL STATE & VARIABLES
// =====================================================
let lenisInstance = null;
let isMenuOpen = false;

// =====================================================
// DOCUMENT READY
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Core State Engines (Initializations)
    initLanguageEngine();
    initThemeEngine();
    
    // 2. Smooth Scroll & Animation Engines
    initSmoothScroll();
    initGSAPAnimations();
    
    // 3. UI Components & Micro-interactions
    initCustomCursor();
    initMagneticElements();
    initNavigation();
    initPortfolioFilters();
    initVideoModal();
    initContactForm();
    initPreloader();
    initTimecodeTicker();
    
    console.log('🎬 Senior Video Editor Portfolio Engine Loaded Successfully!');
});

// =====================================================
// 1. PRELOADER
// =====================================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    window.addEventListener('load', () => {
        // Fade out preloader using GSAP
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                preloader.style.display = 'none';
                // Trigger entry animations for Hero
                triggerHeroEntry();
            }
        });
    });
    
    // Fallback if load event takes too long
    setTimeout(() => {
        if (preloader.style.display !== 'none') {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => preloader.style.display = 'none'
            });
        }
    }, 4000);
}

// =====================================================
// 2. LANGUAGE ENGINE (BILINGUAL DETECT & SWITCH)
// =====================================================
function initLanguageEngine() {
    const langSwitcher = document.querySelector('.lang-switcher');
    if (!langSwitcher) return;
    
    // Determine initial language
    let lang = localStorage.getItem('preferred-lang');
    if (!lang) {
        const browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
        lang = browserLang.startsWith('en') ? 'en' : 'vi';
    }
    
    // Apply initial language
    setLanguage(lang);
    
    // Click toggle handler
    langSwitcher.addEventListener('click', () => {
        const currentLang = document.body.classList.contains('lang-en') ? 'en' : 'vi';
        const nextLang = currentLang === 'vi' ? 'en' : 'vi';
        
        // Dynamic switch animation
        gsap.to('.lang-slider-bg', {
            scaleX: 0.8,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                setLanguage(nextLang);
            }
        });
    });
}

function setLanguage(lang) {
    if (lang === 'en') {
        document.body.classList.remove('lang-vi');
        document.body.classList.add('lang-en');
        document.documentElement.setAttribute('lang', 'en');
    } else {
        document.body.classList.remove('lang-en');
        document.body.classList.add('lang-vi');
        document.documentElement.setAttribute('lang', 'vi');
    }
    localStorage.setItem('preferred-lang', lang);
    
    // Refresh accessibility descriptions if any
    const submitBtn = document.querySelector('.contact-form button[type="submit"] span');
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const msgInput = document.getElementById('message');
    
    if (lang === 'en') {
        if (emailInput) emailInput.placeholder = 'Your Email';
        if (nameInput) nameInput.placeholder = 'Your Name';
        if (msgInput) msgInput.placeholder = 'Your Message';
    } else {
        if (emailInput) emailInput.placeholder = 'Email';
        if (nameInput) nameInput.placeholder = 'Họ và tên';
        if (msgInput) msgInput.placeholder = 'Tin nhắn của bạn';
    }
    
    // Refresh ScrollTrigger to adjust heights if necessary
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}

// =====================================================
// 3. THEME ENGINE (DARK/LIGHT CONVERSION)
// =====================================================
function initThemeEngine() {
    const themeBtn = document.querySelector('.theme-toggle-btn');
    if (!themeBtn) return;
    
    // Determine initial theme
    let theme = localStorage.getItem('preferred-theme');
    if (!theme) {
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        theme = prefersLight ? 'light' : 'dark';
    }
    
    // Apply initial theme
    setTheme(theme);
    
    // Toggle click event
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Spin toggle icon
        gsap.to(themeBtn.querySelector('i:not(.sr-only)'), {
            rotation: '+=360',
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
                setTheme(nextTheme);
            }
        });
    });
}

function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    }
    localStorage.setItem('preferred-theme', theme);
}

// =====================================================
// 4. SMOOTH SCROLL (LENIS)
// =====================================================
function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;
    
    lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false
    });
    
    function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // Connect ScrollTrigger to Lenis scroll updates
    if (typeof ScrollTrigger !== 'undefined') {
        lenisInstance.on('scroll', ScrollTrigger.update);
    }
}

// =====================================================
// 5. GSAP ANIMATIONS (TIMELINE, REVEALS, FADERS)
// =====================================================
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // 5a. Stagger Section Headers reveals
    gsap.utils.toArray('.section-header').forEach(header => {
        const elements = header.querySelectorAll('.section-subtitle, .section-title, .section-description');
        gsap.from(elements, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });
    });
    
    // 5b. Multi-track Timeline Playhead Indicator Scroll Trigger
    const timelineSection = document.querySelector('.about-section');
    const playheadLine = document.querySelector('.timeline-playhead-line');
    
    if (timelineSection && playheadLine) {
        gsap.fromTo(playheadLine, 
            { left: '15%' }, 
            {
                scrollTrigger: {
                    trigger: timelineSection,
                    start: 'top 60%',
                    end: 'bottom 40%',
                    scrub: 1.5,
                },
                left: '85%',
                ease: 'none'
            }
        );
    }
    
    // 5c. Timeline track clips staggered fade in
    gsap.utils.toArray('.timeline-track').forEach((track, index) => {
        const clip = track.querySelector('.track-clip');
        const label = track.querySelector('.track-label');
        if (clip) {
            gsap.from([label, clip], {
                scrollTrigger: {
                    trigger: track,
                    start: 'top 90%',
                },
                opacity: 0,
                x: -30,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }
    });
    
    // 5d. Skills Audio Mixer Fader knobs & progress faders trigger
    gsap.utils.toArray('.skill-item').forEach(item => {
        const progress = item.querySelector('.skill-progress');
        const knob = item.querySelector('.fader-knob');
        const targetWidth = progress ? progress.getAttribute('data-width') : '0%';
        
        if (progress && knob) {
            gsap.fromTo(progress, { width: '0%' }, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 92%',
                },
                width: targetWidth,
                duration: 1.5,
                ease: 'power3.out'
            });
            
            gsap.fromTo(knob, { left: '0%' }, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 92%',
                },
                left: targetWidth,
                duration: 1.5,
                ease: 'power3.out'
            });
        }
    });
    
    // 5e. General Grid fade-up animations (Highlights, Contact Items)
    gsap.utils.toArray('.highlight-item, .contact-item, .contact-info .social-link').forEach((el, index) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 95%',
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
}

// Hero Entry Staggers (triggered after preloader clears)
function triggerHeroEntry() {
    if (typeof gsap === 'undefined') return;
    
    const tl = gsap.timeline();
    
    tl.from('.main-nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    tl.from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.5');
    
    tl.from('.hero-title', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.4');
    
    tl.from('.hero-description', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.6');
    
    tl.from('.hero-buttons .btn', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
    }, '-=0.5');
    
    tl.from('.hero-visual', {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power4.out'
    }, '-=0.8');
    
    tl.from('.stat-item', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.8');
}

// =====================================================
// 6. CUSTOM CURSOR & MAG-GLOW INTERACTIONS
// =====================================================
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    // Hide default cursor on desktop
    if (window.innerWidth > 1024) {
        document.body.style.cursor = 'none';
        
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });
        
        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { duration: 0.05, x: e.clientX, y: e.clientY });
            gsap.to(follower, { duration: 0.25, x: e.clientX, y: e.clientY });
        });
        
        // 6a. Cursor class hooks for specific hover types
        const hoverLinks = document.querySelectorAll('a, button, .hamburger, .lang-switcher, .theme-toggle-btn');
        hoverLinks.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover-active', 'cursor-hover-link');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover-active', 'cursor-hover-link');
            });
        });
        
        const hoverVideo = document.querySelectorAll('.portfolio-card, .video-frame, .play-icon');
        hoverVideo.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover-active', 'cursor-hover-video');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover-active', 'cursor-hover-video');
            });
        });
    } else {
        cursor.style.display = 'none';
        follower.style.display = 'none';
    }
}

// 6b. Magnetic Pulling Effect for Controls & Buttons
function initMagneticElements() {
    const magElements = document.querySelectorAll('.btn, .hamburger, .theme-toggle-btn, .lang-switcher, .social-link');
    
    if (window.innerWidth > 1024) {
        magElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Pull elements toward cursor (40% damping)
                gsap.to(el, {
                    x: x * 0.4,
                    y: y * 0.4,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            el.addEventListener('mouseleave', () => {
                // Return to normal elastic position
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });
    }
}

// =====================================================
// 7. FULLSCREEN NAVIGATION MENU
// =====================================================
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('fullscreen-menu');
    const closeBtn = document.getElementById('close-menu');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    if (!hamburger || !menu) return;
    
    function openMenu() {
        isMenuOpen = true;
        hamburger.classList.add('active');
        menu.classList.add('active');
        
        // Pin body scrolling via Lenis
        if (lenisInstance) lenisInstance.stop();
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        isMenuOpen = false;
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        
        // Restore scrolling
        if (lenisInstance) lenisInstance.start();
        document.body.style.overflow = '';
    }
    
    hamburger.addEventListener('click', () => {
        if (isMenuOpen) closeMenu();
        else openMenu();
    });
    
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    
    // Section Scrolling via Links
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // If it is a page anchor link, prevent default and scroll smoothly
            if (targetId.startsWith('#')) {
                e.preventDefault();
                closeMenu();
                
                // Timeout to allow menu close scale animation to clear
                setTimeout(() => {
                    const target = document.querySelector(targetId);
                    if (target) {
                        if (lenisInstance) {
                            lenisInstance.scrollTo(target, { offset: -80 });
                        } else {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }, 550);
            } else {
                // If it is a direct page link (like about-me.html), let the default navigation happen
                closeMenu();
            }
        });
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) closeMenu();
    });
}

// =====================================================
// 8. PORTFOLIO TABS FILTER SYSTEM (GSAP POWERED)
// =====================================================
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length === 0 || items.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active states
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterVal = btn.getAttribute('data-filter');
            
            // GSAP stagger out animation
            gsap.to(items, {
                opacity: 0,
                scale: 0.95,
                y: 15,
                duration: 0.3,
                stagger: 0.04,
                ease: 'power2.in',
                onComplete: () => {
                    items.forEach(item => {
                        const cat = item.getAttribute('data-category');
                        if (filterVal === 'all' || cat === filterVal) {
                            item.style.display = 'block';
                            gsap.to(item, {
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                duration: 0.5,
                                delay: 0.1,
                                ease: 'power3.out',
                                clearProps: 'transform'
                            });
                        } else {
                            item.style.display = 'none';
                        }
                    });
                    
                    // Recalculate ScrollTrigger points
                    if (typeof ScrollTrigger !== 'undefined') {
                        ScrollTrigger.refresh();
                    }
                }
            });
        });
    });
}

// =====================================================
// 9. VIDEO MODALS & LIGHTBOX ENGINE
// =====================================================
function initVideoModal() {
    const playButtons = document.querySelectorAll('.play-button, .play-icon');
    
    playButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Traverse up to find the closest card/parent containing data-youtube
            const cardParent = btn.closest('[data-youtube]');
            if (!cardParent) return;
            
            const youtubeId = cardParent.getAttribute('data-youtube');
            const titleElement = cardParent.querySelector('.project-title');
            const titleText = titleElement ? titleElement.textContent : 'Video Playback';
            
            openVideoLightbox(youtubeId, titleText);
        });
    });
}

function openVideoLightbox(youtubeId, title) {
    if (!youtubeId) return;
    
    // Create DOM structure
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-video">
                <iframe 
                    src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    if (lenisInstance) lenisInstance.stop();
    document.body.style.overflow = 'hidden';
    
    const content = modal.querySelector('.modal-content');
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    
    // GSAP open transition
    gsap.set(content, { scale: 0.95, opacity: 0 });
    gsap.to(overlay, { opacity: 1, duration: 0.3 });
    gsap.to(content, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' });
    
    // Close functions
    function destroyModal() {
        gsap.to(content, { scale: 0.95, opacity: 0, duration: 0.3, ease: 'power2.in' });
        gsap.to(overlay, { 
            opacity: 0, 
            duration: 0.3, 
            onComplete: () => {
                modal.remove();
                if (lenisInstance) lenisInstance.start();
                document.body.style.overflow = '';
            } 
        });
    }
    
    closeBtn.addEventListener('click', destroyModal);
    overlay.addEventListener('click', destroyModal);
    document.addEventListener('keydown', function escapeClose(e) {
        if (e.key === 'Escape') {
            destroyModal();
            document.removeEventListener('keydown', escapeClose);
        }
    });
}

// =====================================================
// 10. CONTACT FORM SUBMISSION MOCKUP
// =====================================================
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        const currentLang = document.body.classList.contains('lang-en') ? 'en' : 'vi';
        
        // Show loading state
        if (currentLang === 'en') {
            btn.innerHTML = '<span>SENDING...</span><i class="fas fa-spinner fa-spin"></i>';
        } else {
            btn.innerHTML = '<span>ĐANG GỬI...</span><i class="fas fa-spinner fa-spin"></i>';
        }
        btn.disabled = true;
        
        // Simulate AJAX request
        setTimeout(() => {
            if (currentLang === 'en') {
                btn.innerHTML = '<span>SENT SUCCESS!</span><i class="fas fa-check"></i>';
            } else {
                btn.innerHTML = '<span>ĐÃ GỬI THÀNH CÔNG!</span><i class="fas fa-check"></i>';
            }
            btn.style.background = 'var(--color-accent-teal)';
            btn.style.borderColor = 'var(--color-accent-teal)';
            btn.style.color = '#000000';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
                form.reset();
            }, 2500);
        }, 1500);
    });
}

// =====================================================
// 11. TIMECODE TICKER (REAL-TIME EDIT TICK)
// =====================================================
function initTimecodeTicker() {
    const timecodeElements = document.querySelectorAll('.live-timecode');
    if (timecodeElements.length === 0) return;
    
    const fps = 24;
    let frames = 0;
    
    setInterval(() => {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        
        frames = (frames + 1) % fps;
        const frms = String(frames).padStart(2, '0');
        
        timecodeElements.forEach(el => {
            el.textContent = `${hrs}:${mins}:${secs}:${frms}`;
        });
    }, 1000 / fps);
}