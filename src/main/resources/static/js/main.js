// Main JavaScript for Sinhangman Gas Website

// Intro Animation
function playIntroAnimation() {
    const introContainer = document.getElementById('intro-animation');
    const mainContent = document.getElementById('main-content');
    const subtitle = document.querySelector('.intro-subtitle');
    const title = document.querySelector('.intro-title');
    const imageContainer = document.querySelector('.intro-image-container');
    
    if (!introContainer || !mainContent) {
        return; // Not on homepage
    }
    
    // Prevent scrolling during animation
    document.body.style.overflow = 'hidden';
    
    // Text to animate
    const subtitleText = '부산, 경남 최고의 가스 공급 업체';
    const titleText = '신항만 가스';
    
    // Function to animate text character by character
    function animateText(element, text, delay) {
        return new Promise((resolve) => {
            let charIndex = 0;
            const interval = setInterval(() => {
                if (charIndex < text.length) {
                    const span = document.createElement('span');
                    span.textContent = text[charIndex];
                    span.style.animationDelay = `${charIndex * 0.05}s`;
                    element.appendChild(span);
                    charIndex++;
                } else {
                    clearInterval(interval);
                    setTimeout(resolve, delay);
                }
            }, 50);
        });
    }
    
    // Animation sequence
    async function runAnimation() {
        // Step 1: Animate subtitle
        await animateText(subtitle, subtitleText, 300);
        
        // Step 2: Animate title
        await animateText(title, titleText, 800);
        
        // Step 3: Show image from center
        imageContainer.classList.add('show');
        await new Promise(resolve => setTimeout(resolve, 400));
        
        // Step 4: Expand image to fullscreen
        imageContainer.classList.add('expand');
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Step 5: Fade out text
        introContainer.classList.add('fade-text');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Step 6: Show main content behind
        mainContent.style.opacity = '1';
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Step 7: Shrink image back to hero section position
        imageContainer.classList.add('shrink-to-hero');
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Step 8: Remove intro and enable scrolling
        introContainer.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    // Start animation
    runAnimation();
}

// Check if animation has been shown in this session
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    if (!hasSeenIntro) {
        sessionStorage.setItem('hasSeenIntro', 'true');
        playIntroAnimation();
    } else {
        // Skip animation
        const introContainer = document.getElementById('intro-animation');
        const mainContent = document.getElementById('main-content');
        if (introContainer && mainContent) {
            introContainer.style.display = 'none';
            mainContent.style.opacity = '1';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
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

