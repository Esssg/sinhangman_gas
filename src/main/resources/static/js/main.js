// Main JavaScript for Sinhangman Gas Website

// Safe storage check with fallback
function safeStorageGet(key) {
    try {
        return sessionStorage.getItem(key);
    } catch (e) {
        return null;
    }
}

function safeStorageSet(key, value) {
    try {
        sessionStorage.setItem(key, value);
        return true;
    } catch (e) {
        return false;
    }
}

// Skip animation for in-app browsers
function isInAppBrowser() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    // Check for common in-app browsers
    return (ua.indexOf('KAKAOTALK') > -1 || 
            ua.indexOf('NAVER') > -1 || 
            ua.indexOf('Instagram') > -1 ||
            ua.indexOf('FB') > -1 ||
            ua.indexOf('Line') > -1);
}

// Skip animation entirely and show content directly
function skipAnimation() {
    // Add class to body for CSS control
    document.body.classList.add('skip-intro');
    
    var introContainer = document.getElementById('intro-animation');
    var mainContent = document.getElementById('main-content');
    var hero = document.getElementById('hero');
    
    if (introContainer) {
        // Completely hide and remove from layout
        introContainer.style.display = 'none';
        introContainer.style.visibility = 'hidden';
        introContainer.style.opacity = '0';
        introContainer.style.pointerEvents = 'none';
        introContainer.style.zIndex = '-9999';
        // Remove from DOM flow completely
        introContainer.remove();
    }
    if (mainContent) {
        mainContent.style.opacity = '1';
        mainContent.style.visibility = 'visible';
    }
    if (hero) {
        hero.classList.add('bg-ready');
    }
    document.body.style.overflow = '';
    document.body.style.position = '';
}

// Intro Animation
function playIntroAnimation() {
    var introContainer = document.getElementById('intro-animation');
    var mainContent = document.getElementById('main-content');
    var subtitle = document.querySelector('.intro-subtitle');
    var title = document.querySelector('.intro-title');
    var imageContainer = document.querySelector('.intro-image-container');
    
    if (!introContainer || !mainContent) {
        return; // Not on homepage
    }
    
    // Error handling wrapper
    try {
        // Prevent scrolling during animation
        document.body.style.overflow = 'hidden';
        
        // Text to animate
        var subtitleText = '부산, 경남 최고의 가스 공급 업체';
        var titleText = '신항만 가스';
        
        // Function to animate text character by character
        function animateText(element, text, callback) {
            var charIndex = 0;
            var interval = setInterval(function() {
                if (charIndex < text.length) {
                    var span = document.createElement('span');
                    span.textContent = text[charIndex];
                    span.style.animationDelay = (charIndex * 0.05) + 's';
                    element.appendChild(span);
                    charIndex++;
                } else {
                    clearInterval(interval);
                    if (callback) {
                        setTimeout(callback, 300);
                    }
                }
            }, 50);
        }
        
        // Animation sequence using callbacks instead of async/await
        function runAnimation() {
            // Step 1: Animate subtitle
            animateText(subtitle, subtitleText, function() {
                // Step 2: Animate title
                animateText(title, titleText, function() {
                    setTimeout(function() {
                        // Step 3: Show image from center
                        imageContainer.classList.add('show');
                        
                        setTimeout(function() {
                            // Step 4: Expand image to fullscreen
                            imageContainer.classList.add('expand');
                            
                            setTimeout(function() {
                                // Step 5: Fade out text and make background transparent
                                introContainer.classList.add('fade-text');
                                introContainer.style.backgroundColor = 'transparent';
                                
                                setTimeout(function() {
                                    // Step 6: Show main content behind
                                    mainContent.style.opacity = '1';
                                    
                                    setTimeout(function() {
                                        // Step 7: Transform image to hero background position
                                        imageContainer.classList.add('shrink-to-hero');
                                        
                                        // Step 8: Start transitioning to hero background
                                        var hero = document.getElementById('hero');
                                        if (hero) {
                                            hero.classList.add('bg-ready');
                                        }
                                        
                                        setTimeout(function() {
                                            // Step 9: Complete animation
                                            imageContainer.style.opacity = '0';
                                            
                                            setTimeout(function() {
                                                // Step 10: Clean up and enable scrolling
                                                introContainer.classList.add('complete');
                                                imageContainer.classList.add('final');
                                                document.body.style.overflow = '';
                                            }, 500);
                                        }, 1500);
                                    }, 100);
                                }, 500);
                            }, 1200);
                        }, 400);
                    }, 800);
                });
            });
        }
        
        // Start animation with timeout fallback
        var animationTimeout = setTimeout(function() {
            // If animation takes too long, skip it
            skipAnimation();
        }, 10000); // 10 seconds timeout
        
        runAnimation();
        
        // Clear timeout if animation completes
        setTimeout(function() {
            clearTimeout(animationTimeout);
        }, 6000);
        
    } catch (error) {
        // If any error occurs, skip animation
        console.error('Animation error:', error);
        skipAnimation();
    }
}

// Check if animation has been shown in this session
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    // In-app browser detection - skip animation
    if (isInAppBrowser()) {
        skipAnimation();
    } else {
        var hasSeenIntro = safeStorageGet('hasSeenIntro');
        
        if (!hasSeenIntro) {
            safeStorageSet('hasSeenIntro', 'true');
            // Add a small delay to ensure DOM is fully ready
            setTimeout(function() {
                playIntroAnimation();
            }, 100);
        } else {
            // Skip animation
            skipAnimation();
        }
    }
} else {
    // Not on homepage - ensure hero background is visible if hero section exists
    var hero = document.getElementById('hero');
    if (hero) {
        hero.classList.add('bg-ready');
    }
}

// Mobile device detection for map display
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
           || (window.innerWidth <= 768);
}

// Handle map display based on device type
function handleMapDisplay() {
    const desktopMap = document.getElementById('desktop-map');
    const mobileMap = document.getElementById('mobile-map');
    
    if (desktopMap && mobileMap) {
        if (isMobileDevice()) {
            desktopMap.style.display = 'none';
            mobileMap.style.display = 'block';
            console.log('모바일 기기 감지: 모바일용 지도 표시');
        } else {
            desktopMap.style.display = 'block';
            mobileMap.style.display = 'none';
            console.log('데스크톱 기기 감지: iframe 지도 표시');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    // Handle scroll indicator
    const scrollIndicator = document.getElementById('scrollIndicator');
    const hero = document.getElementById('hero');
    
    if (scrollIndicator && hero) {
        // Smooth scroll when clicking the indicator
        scrollIndicator.addEventListener('click', function() {
            const servicesSection = document.querySelector('.services');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Hide/show scroll indicator based on scroll position
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const heroHeight = hero.offsetHeight;
            
            // Hide when scrolled past hero section
            if (scrollTop > heroHeight * 0.5) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Handle map display on location page
    handleMapDisplay();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '#d1d5db';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('필수 항목을 모두 입력해주세요.');
            }
        });
    });

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 6) {
                value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
            } else if (value.length > 3) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            }
            
            e.target.value = value;
        });
    });

    // Add active class to current nav item
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath.includes(link.getAttribute('href')) && link.getAttribute('href') !== '/')) {
            link.style.color = '#fbbf24';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and other elements
    const animatedElements = document.querySelectorAll('.service-card, .product-card, .feature');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        if (window.innerWidth <= 768 && nav) {
            // Mobile menu functionality can be added here
        }
    };

    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();
    
    // Update map display on window resize
    window.addEventListener('resize', handleMapDisplay);

    console.log('신항만 가스 웹사이트에 오신 것을 환영합니다!');
});

// Product category dropdown toggle
function toggleCategory(element) {
    const header = element;
    const content = header.nextElementSibling;
    const allHeaders = document.querySelectorAll('.category-header');
    const allContents = document.querySelectorAll('.category-content');
    
    // Close all other dropdowns
    allHeaders.forEach((h, index) => {
        if (h !== header) {
            h.classList.remove('active');
            allContents[index].classList.remove('active');
        }
    });
    
    // Toggle current dropdown
    header.classList.toggle('active');
    content.classList.toggle('active');
}

// Utility function to format phone numbers for display
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
        return match[1] + '-' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

// Utility function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

