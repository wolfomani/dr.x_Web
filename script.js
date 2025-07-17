// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 15, 35, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(15, 15, 35, 0.9)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
const animateElements = document.querySelectorAll('.card, .feature, .algorithm-category, .code-example');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        typeWriter(heroTitle, titleText, 50);
    }
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.particles');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Dynamic gradient animation for buttons
function animateGradient(element) {
    let angle = 0;
    
    setInterval(() => {
        angle += 1;
        if (angle >= 360) angle = 0;
        
        element.style.background = `linear-gradient(${angle}deg, #41d1ff 0%, #bd34fe 50%, #ff6b9d 100%)`;
    }, 50);
}

// Apply gradient animation to primary buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        animateGradient(btn);
    });
});

// Code syntax highlighting (simple)
function highlightCode() {
    const codeBlocks = document.querySelectorAll('code');
    
    codeBlocks.forEach(block => {
        let html = block.innerHTML;
        
        // Highlight keywords
        html = html.replace(/\b(def|return|if|else|while|for|import|from|class|try|except|with|as)\b/g, 
            '<span style="color: #bd34fe; font-weight: bold;">$1</span>');
        
        // Highlight strings
        html = html.replace(/(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g, 
            '<span style="color: #41d1ff;">$1$2$3</span>');
        
        // Highlight numbers
        html = html.replace(/\b(\d+)\b/g, 
            '<span style="color: #ffa726;">$1</span>');
        
        // Highlight comments
        html = html.replace(/(#.*$)/gm, 
            '<span style="color: #6c7293; font-style: italic;">$1</span>');
        
        block.innerHTML = html;
    });
}

// Initialize code highlighting
document.addEventListener('DOMContentLoaded', highlightCode);

// Add hover effects to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(65, 209, 255, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
});

// Add click effect to algorithm list items
document.querySelectorAll('.algorithm-list li').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        document.querySelectorAll('.algorithm-list li').forEach(li => {
            li.classList.remove('active');
            li.style.color = '';
            li.style.background = '';
        });
        
        // Add active class to clicked item
        this.classList.add('active');
        this.style.color = '#41d1ff';
        this.style.background = 'rgba(65, 209, 255, 0.1)';
        this.style.borderRadius = '4px';
        this.style.padding = '8px';
        this.style.margin = '2px 0';
    });
});

// Floating animation for contact items
document.querySelectorAll('.contact-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
    item.style.animation = 'float 3s ease-in-out infinite';
});

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .algorithm-list li {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .contact-item {
        animation: float 3s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
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
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Header scroll effect (throttled)
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 15, 35, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(15, 15, 35, 0.9)';
        header.style.boxShadow = 'none';
    }
}, 16)); // ~60fps

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Activate special effect
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        konamiCode = [];
    }
});

console.log('🚀 مرحباً بك في عالم الذكاء الاصطناعي والخوارزميات!');
console.log('💡 نصيحة: جرب الكونامي كود للحصول على مفاجأة!');

