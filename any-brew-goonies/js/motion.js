// ==========================================================================
// Motion JavaScript - Any Brew Goonies-Inspired Landing Page
// ==========================================================================

class MotionController {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupParallax();
    // this.setupParticleSystem(); // Disabled to remove particles
    // this.setupTextAnimations(); // Disabled to prevent hero text animations
    this.setupLoadingAnimations();
  }

  // Scroll-triggered animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('[class*="animate-"]').forEach(el => {
      observer.observe(el);
    });
  }

  // Animate individual elements
  animateElement(element) {
    const classes = element.className.split(' ');
    
    classes.forEach(className => {
      if (className.startsWith('animate-')) {
        element.classList.add('animate');
        
        // Add specific animation based on class
        switch (className) {
          case 'animate-fade-up':
            this.fadeUp(element);
            break;
          case 'animate-slide-left':
            this.slideLeft(element);
            break;
          case 'animate-slide-right':
            this.slideRight(element);
            break;
          case 'animate-scale':
            this.scaleIn(element);
            break;
          case 'animate-rotate':
            this.rotateIn(element);
            break;
        }
      }
    });
  }

  // Animation methods
  fadeUp(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'all 0.6s ease-out';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }

  slideLeft(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateX(-50px)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'all 0.6s ease-out';
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }

  slideRight(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateX(50px)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'all 0.6s ease-out';
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }

  scaleIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'all 0.6s ease-out';
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    });
  }

  rotateIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'rotate(-10deg) scale(0.8)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'all 0.6s ease-out';
      element.style.opacity = '1';
      element.style.transform = 'rotate(0deg) scale(1)';
    });
  }

  // Hover effects
  setupHoverEffects() {
    // Add hover effects to interactive elements
    document.querySelectorAll('.btn, .adventure-card, .crew-member, .testimonial-card').forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.addHoverEffect(element);
      });

      element.addEventListener('mouseleave', () => {
        this.removeHoverEffect(element);
      });
    });
  }

  addHoverEffect(element) {
    element.classList.add('hover-lift', 'hover-glow');
    
    // Add subtle animation
    element.style.transition = 'all 0.3s ease';
  }

  removeHoverEffect(element) {
    element.classList.remove('hover-lift', 'hover-glow');
  }

  // Parallax effects
  setupParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-fast');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.classList.contains('parallax-fast') ? 0.5 : 0.3;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Particle system
  setupParticleSystem() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `;
    
    hero.appendChild(particlesContainer);

    // Create particles
    this.createParticles(particlesContainer);
  }

  createParticles(container) {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      this.createParticle(container);
    }
  }

  createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 3;
    const duration = Math.random() * 3 + 2;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: var(--treasure-gold);
      border-radius: 50%;
      left: ${x}%;
      top: ${y}%;
      opacity: 0.6;
      animation: particleFloat ${duration}s ease-in-out infinite;
      animation-delay: ${delay}s;
    `;
    
    container.appendChild(particle);
  }

  // Text animations
  setupTextAnimations() {
    // Animate text on scroll
    const textElements = document.querySelectorAll('h1, h2, h3');
    
    textElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.animateText(element);
      });
    });
  }

  animateText(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.animation = `textReveal 0.6s ease forwards`;
      span.style.animationDelay = `${index * 0.05}s`;
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      
      element.appendChild(span);
    });
  }

  // Loading animations
  setupLoadingAnimations() {
    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', (e) => {
        if (button.href && button.href.includes('#')) {
          this.addLoadingEffect(button);
        }
      });
    });
  }

  addLoadingEffect(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.classList.add('btn-loading');
    
    // Remove loading effect after animation
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('btn-loading');
    }, 1000);
  }

  // Utility methods
  debounce(func, wait) {
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

  throttle(func, limit) {
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
}

// Initialize motion controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MotionController();
});

// Add CSS for particle animation
const particleStyles = `
  @keyframes particleFloat {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
      opacity: 1;
    }
  }
  
  .btn-loading {
    position: relative;
    pointer-events: none;
  }
  
  .btn-loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes textReveal {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject particle styles
const styleSheet = document.createElement('style');
styleSheet.textContent = particleStyles;
document.head.appendChild(styleSheet);
