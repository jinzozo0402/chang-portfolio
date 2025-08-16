/**
 * VIDEO EDITOR PORTFOLIO - JAVASCRIPT
 * Black & White Creative Portfolio
 * Enhanced with smooth animations and interactions
 */

// =====================================================
// GLOBAL VARIABLES
// =====================================================
let isMenuOpen = false;
let cursor = null;
let cursorFollower = null;
let preloader = null;
let skillsAnimated = false;

// =====================================================
// DOCUMENT READY
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// =====================================================
// MAIN INITIALIZATION
// =====================================================
function initializePortfolio() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }

    // Initialize all components
    initPreloader();
    initCustomCursor();
    initNavigation();
    initScrollEffects();
    initPortfolioInteractions();
    initSkillsAnimation();
    initContactForm();
    initVideoPlayers();
    initParallaxEffects();
    initTypewriterEffect();
    
    // Add custom events
    addCustomEventListeners();
    
    console.log('🎬 Video Editor Portfolio initialized successfully!');
}

// =====================================================
// PRELOADER
// =====================================================
function initPreloader() {
    preloader = document.getElementById('preloader');
    
    if (preloader) {
        // Simulate loading time
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Remove from DOM after transition
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }, 2000);
    }
}

// =====================================================
// CUSTOM CURSOR
// =====================================================
function initCustomCursor() {
    cursor = document.querySelector('.custom-cursor');
    cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let cursorX = 0, cursorY = 0;
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows mouse immediately
        cursorX += (mouseX - cursorX) * 0.9;
        cursorY += (mouseY - cursorY) * 0.9;
        
        // Follower follows with delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .play-button, .hamburger, .portfolio-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(2)';
            cursorFollower.style.transform += ' scale(0.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(2)', '');
            cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(0.5)', '');
        });
    });
}

// =====================================================
// NAVIGATION
// =====================================================
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    if (!hamburger || !fullscreenMenu || !closeMenuBtn) return;
    
    // Open menu function
    function openMenu() {
        isMenuOpen = true;
        hamburger.classList.add('active');
        fullscreenMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close menu function
    function closeMenuHandler() {
        isMenuOpen = false;
        hamburger.classList.remove('active');
        fullscreenMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    hamburger.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenuHandler);
    
    // Menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            closeMenuHandler();
            
            setTimeout(() => {
                scrollToSection(targetSection);
            }, 600);
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenuHandler();
        }
    });
}

// =====================================================
// SCROLL EFFECTS
// =====================================================
function initScrollEffects() {
    const nav = document.querySelector('.main-nav');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Navigation background
        if (nav) {
            if (scrollY > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.95)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(0, 0, 0, 0.9)';
                nav.style.backdropFilter = 'blur(10px)';
            }
        }
        
        // Hide scroll indicator
        if (scrollIndicator) {
            if (scrollY > 200) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }
        
        // Skills section animation trigger
        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection && !skillsAnimated) {
            const rect = skillsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateSkillBars();
                skillsAnimated = true;
            }
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// =====================================================
// PORTFOLIO INTERACTIONS
// =====================================================
function initPortfolioInteractions() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        
        // Card hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        // Play button interactions
        if (playButton) {
            playButton.addEventListener('click', (e) => {
                e.stopPropagation();
                showVideoModal(card);
            });
        }
        
        // Card click to expand
        card.addEventListener('click', () => {
            expandPortfolioCard(card);
        });
    });
}

// =====================================================
// SKILLS ANIMATION
// =====================================================
function initSkillsAnimation() {
    // This will be triggered by scroll event
}

function animateSkillBars() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    skillProgressBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, index * 200);
    });
}

// =====================================================
// CONTACT FORM
// =====================================================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmission(contactForm);
    });
    
    // Form field animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'translateY(0)';
        });
    });
}

function handleFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<span>ĐANG GỬI...</span><i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitButton.innerHTML = '<span>ĐÃ GỬI!</span><i class="fas fa-check"></i>';
        submitButton.style.background = '#4ecdc4';
        
        // Reset after delay
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
            form.reset();
        }, 2000);
    }, 1500);
}

// =====================================================
// VIDEO PLAYERS
// =====================================================
function initVideoPlayers() {
    // Video modal functionality will be implemented here
}

function showVideoModal(card) {
    const projectTitle = card.querySelector('.project-title').textContent;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${projectTitle}</h3>
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-video">
                    <div class="video-placeholder">
                        <i class="fas fa-play"></i>
                        <p>Video sẽ được phát ở đây</p>
                        <small>Demo portfolio - Video thực tế sẽ được nhúng vào</small>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: modalFadeIn 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            position: relative;
            max-width: 80%;
            max-height: 80%;
            background: var(--color-gray-dark);
            border-radius: 12px;
            overflow: hidden;
            z-index: 1;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: var(--color-gray-medium);
        }
        
        .modal-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 5px;
        }
        
        .modal-video {
            aspect-ratio: 16/9;
            background: var(--color-black);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 400px;
        }
        
        .video-placeholder {
            text-align: center;
            color: #b0b0b0;
        }
        
        .video-placeholder i {
            font-size: 48px;
            margin-bottom: 20px;
            color: var(--color-accent);
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    
    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
    
    // Add modal to DOM
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal events
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeModalHandler);
    overlay.addEventListener('click', closeModalHandler);
    
    function closeModalHandler() {
        modal.style.animation = 'modalFadeIn 0.3s ease reverse';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }
        }, 300);
    }
}

// =====================================================
// PARALLAX EFFECTS
// =====================================================
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-visual, .about-visual');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        
        parallaxElements.forEach(element => {
            if (element) {
                element.style.transform = `translateY(${parallax}px)`;
            }
        });
    });
}

// =====================================================
// TYPEWRITER EFFECT
// =====================================================
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // Define the content with proper HTML structure
    const content = [
        { type: 'open', tag: 'span', class: 'highlight' },
        { type: 'text', content: 'TRANG NGUYỄN' },
        { type: 'close', tag: 'span' },
        { type: 'break' },
        { type: 'text', content: 'VIDEO EDITOR' }
    ];
    
    heroTitle.innerHTML = '';
    let currentIndex = 0;
    let currentTextIndex = 0;
    
    function typeWriter() {
        if (currentIndex >= content.length) return;
        
        const current = content[currentIndex];
        
        if (current.type === 'open') {
            heroTitle.innerHTML += `<${current.tag} class="${current.class}">`;
            currentIndex++;
            setTimeout(typeWriter, 50);
        } else if (current.type === 'close') {
            heroTitle.innerHTML += `</${current.tag}>`;
            currentIndex++;
            setTimeout(typeWriter, 50);
        } else if (current.type === 'break') {
            heroTitle.innerHTML += '<br>';
            currentIndex++;
            setTimeout(typeWriter, 200);
        } else if (current.type === 'text') {
            if (currentTextIndex < current.content.length) {
                heroTitle.innerHTML += current.content.charAt(currentTextIndex);
                currentTextIndex++;
                setTimeout(typeWriter, 100);
            } else {
                currentTextIndex = 0;
                currentIndex++;
                setTimeout(typeWriter, 200);
            }
        }
    }
    
    // Start typewriter after page load
    setTimeout(typeWriter, 1000);
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        const targetPosition = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function expandPortfolioCard(card) {
    // Create expanded view
    const expandedView = document.createElement('div');
    expandedView.className = 'portfolio-expanded';
    
    const projectTitle = card.querySelector('.project-title').textContent;
    const projectDescription = card.querySelector('.project-description').textContent;
    const projectTags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent);
    
    expandedView.innerHTML = `
        <div class="expanded-overlay">
            <div class="expanded-content">
                <div class="expanded-header">
                    <h2>${projectTitle}</h2>
                    <button class="expanded-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="expanded-body">
                    <div class="expanded-video">
                        <div class="video-preview">
                            <i class="fas fa-play"></i>
                            <p>Xem video</p>
                        </div>
                    </div>
                    <div class="expanded-info">
                        <p>${projectDescription}</p>
                        <div class="expanded-tags">
                            ${projectTags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="expanded-actions">
                            <button class="btn btn-primary">
                                <span>XEM FULL</span>
                                <i class="fas fa-external-link-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add expanded styles
    const expandedStyles = `
        .portfolio-expanded {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: expandedFadeIn 0.4s ease;
        }
        
        .expanded-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(20px);
        }
        
        .expanded-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background: var(--color-gray-dark);
            border-radius: 16px;
            overflow: hidden;
            z-index: 1;
        }
        
        .expanded-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px;
            background: var(--color-gray-medium);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .expanded-close {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 10px;
        }
        
        .expanded-body {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 40px;
            padding: 40px;
        }
        
        .expanded-video {
            aspect-ratio: 16/9;
            background: var(--color-black);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        
        .video-preview {
            text-align: center;
            color: #b0b0b0;
        }
        
        .video-preview i {
            font-size: 64px;
            margin-bottom: 20px;
            color: var(--color-accent);
        }
        
        .expanded-info p {
            color: #b0b0b0;
            line-height: 1.8;
            margin-bottom: 30px;
        }
        
        .expanded-tags {
            margin-bottom: 30px;
        }
        
        @keyframes expandedFadeIn {
            from { 
                opacity: 0; 
                transform: scale(0.8); 
            }
            to { 
                opacity: 1; 
                transform: scale(1); 
            }
        }
        
        @media (max-width: 768px) {
            .expanded-body {
                grid-template-columns: 1fr;
                gap: 30px;
                padding: 20px;
            }
        }
    `;
    
    // Add styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = expandedStyles;
    document.head.appendChild(styleSheet);
    
    // Add to DOM
    document.body.appendChild(expandedView);
    document.body.style.overflow = 'hidden';
    
    // Close events
    const closeBtn = expandedView.querySelector('.expanded-close');
    const overlay = expandedView.querySelector('.expanded-overlay');
    
    closeBtn.addEventListener('click', closeExpandedHandler);
    overlay.addEventListener('click', closeExpandedHandler);
    
    function closeExpandedHandler() {
        expandedView.style.animation = 'expandedFadeIn 0.4s ease reverse';
        setTimeout(() => {
            if (expandedView.parentNode) {
                document.body.removeChild(expandedView);
                document.body.style.overflow = '';
            }
        }, 400);
    }
}

// =====================================================
// CUSTOM EVENT LISTENERS
// =====================================================
function addCustomEventListeners() {
    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Update scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
    // Resize listener
    window.addEventListener('resize', () => {
        // Recalculate positions if needed
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Toggle menu with 'M' key
        if (e.key === 'm' || e.key === 'M') {
            const hamburger = document.getElementById('hamburger');
            if (hamburger && !isMenuOpen) {
                hamburger.click();
            }
        }
    });
}

// =====================================================
// PERFORMANCE MONITORING
// =====================================================
function initPerformanceMonitoring() {
    // Monitor performance and log to console
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`🚀 Portfolio loaded in ${loadTime}ms`);
            }, 0);
        });
    }
}

// =====================================================
// ACCESSIBILITY ENHANCEMENTS
// =====================================================
function initAccessibility() {
    // Add keyboard navigation support
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    // Ensure proper focus management
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #ff6b6b';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
        });
    });
}

// =====================================================
// ERROR HANDLING
// =====================================================
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

// Initialize performance monitoring and accessibility
initPerformanceMonitoring();
initAccessibility();

// Export functions for external use if needed
window.VideoEditorPortfolio = {
    scrollToSection,
    showVideoModal,
    expandPortfolioCard
};