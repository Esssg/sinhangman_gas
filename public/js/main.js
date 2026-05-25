// Main JavaScript for Sinhangman Gas Website

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth <= 768;
}

function handleMapDisplay() {
    var desktopMap = document.getElementById('desktop-map');
    var mobileMap = document.getElementById('mobile-map');

    if (!desktopMap || !mobileMap) return;

    if (isMobileDevice()) {
        desktopMap.style.display = 'none';
        mobileMap.style.display = 'block';
    } else {
        desktopMap.style.display = 'block';
        mobileMap.style.display = 'none';
    }
}

function setupIntroAnimation() {
    var intro = document.getElementById('introScreen');
    if (!intro) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var storageKey = 'sinhangmanIntroSeen';

    function finish() {
        intro.classList.add('is-done');
        document.body.classList.remove('intro-lock');
    }

    if (reduceMotion || sessionStorage.getItem(storageKey) === 'true') {
        finish();
        return;
    }

    document.body.classList.add('intro-lock');
    sessionStorage.setItem(storageKey, 'true');
    window.setTimeout(finish, 1650);
}

function setupNavigation() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('primary-navigation');
    var links = document.querySelectorAll('.primary-nav a');
    var currentPath = window.location.pathname.replace(/\/$/, '') || '/';

    links.forEach(function(link) {
        var href = link.getAttribute('href');
        var normalized = href.replace(/\/$/, '') || '/';
        if (normalized === currentPath) {
            link.classList.add('is-active');
        }
    });

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function() {
        var isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isOpen));
        nav.classList.toggle('is-open', !isOpen);
    });

    links.forEach(function(link) {
        link.addEventListener('click', function() {
            toggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('is-open');
        });
    });
}

function setupHeroCanvas() {
    var canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var frame = 0;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
        var ratio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(canvas.offsetWidth * ratio);
        canvas.height = Math.floor(canvas.offsetHeight * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        seed();
    }

    function seed() {
        var count = Math.max(28, Math.min(84, Math.floor(canvas.offsetWidth / 16)));
        particles = Array.from({ length: count }, function(_, index) {
            return {
                x: (index * 97) % Math.max(canvas.offsetWidth, 1),
                y: (index * 53) % Math.max(canvas.offsetHeight, 1),
                r: 1 + (index % 4) * 0.55,
                dx: 0.25 + (index % 5) * 0.05,
                dy: 0.08 + (index % 7) * 0.03
            };
        });
    }

    function draw() {
        var width = canvas.offsetWidth;
        var height = canvas.offsetHeight;
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = 'rgba(198, 240, 34, 0.14)';
        ctx.lineWidth = 1;

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.x += reduceMotion ? 0 : p.dx;
            p.y += reduceMotion ? 0 : Math.sin((frame + i) * 0.018) * p.dy;
            if (p.x > width + 20) p.x = -20;
            if (p.y > height + 20) p.y = -20;
            if (p.y < -20) p.y = height + 20;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = i % 5 === 0 ? 'rgba(198, 240, 34, 0.7)' : 'rgba(255, 255, 255, 0.32)';
            ctx.fill();

            for (var j = i + 1; j < particles.length; j++) {
                var q = particles[j];
                var dist = Math.hypot(p.x - q.x, p.y - q.y);
                if (dist < 125) {
                    ctx.globalAlpha = (125 - dist) / 125;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
        frame += 1;
        requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
}

function setupInteractions() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal-item').forEach(function(el) {
        observer.observe(el);
    });

    document.querySelectorAll('form').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            var isValid = true;
            form.querySelectorAll('[required]').forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('field-error');
                } else {
                    field.classList.remove('field-error');
                }
            });
            if (!isValid) {
                e.preventDefault();
                alert('필수 항목을 모두 입력해주세요.');
            }
        });
    });

    document.querySelectorAll('input[type="tel"]').forEach(function(input) {
        input.addEventListener('input', function(e) {
            var value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
            if (value.length > 6) value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
            else if (value.length > 3) value = value.slice(0, 3) + '-' + value.slice(3);
            e.target.value = value;
        });
    });
}

function toggleCategory(element) {
    var header = element;
    var content = header.nextElementSibling;
    var isActive = header.classList.contains('active');

    document.querySelectorAll('.category-header').forEach(function(item) {
        item.classList.remove('active');
        item.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.category-content').forEach(function(item) {
        item.classList.remove('active');
    });

    if (!isActive && content) {
        header.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        content.classList.add('active');
    }
}

window.toggleCategory = toggleCategory;

document.addEventListener('DOMContentLoaded', function() {
    setupIntroAnimation();
    setupNavigation();
    setupHeroCanvas();
    setupInteractions();
    handleMapDisplay();
    window.addEventListener('resize', handleMapDisplay);
});
