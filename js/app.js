// ==========================================================================
// Main App JavaScript - Any Brew Goonies-Inspired Landing Page
// ==========================================================================

class CoffeeAdventure {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupScrollAnimations();
    this.setupAdventureCards();
    this.setupCrewMembers();
    this.setupScrollIndicator();
    this.setupParallax();
    this.setupTeamSlideshow();
    // this.setupHeroScrollZoom(); // Disabled to keep hero image static
    this.setupCardParallax();
    this.setupSectionThemes();
    this.enableStackedCards();
    this.setupHeroTextSlideOff();
    this.setupSectionTransitions();
    this.setupBoldTextAnimation();
    this.setupTestimonialAnimations();
    // this.setupParticles(); // Disabled to remove particles
  }

  // Navigation functionality
  setupNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect on navigation
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    });

    // Mobile navigation toggle
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav--open');
        navToggle.classList.toggle('nav-toggle--active');
      });

      // Close mobile nav when clicking on links
      navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          navLinks.classList.remove('nav--open');
          navToggle.classList.remove('nav-toggle--active');
        }
      });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Hero text slide off when scrolling
  setupHeroTextSlideOff() {
    const heroText = document.querySelector('.hero__text');
    const firstSection = document.querySelector('.make-any-drink');
    
    if (!heroText || !firstSection) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // When first section comes into view, slide hero text off
          heroText.classList.add('slide-off');
        } else {
          // When first section leaves view, bring hero text back
          heroText.classList.remove('slide-off');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(firstSection);
  }

  // Section transitions
  setupSectionTransitions() {
    const sections = document.querySelectorAll('.snap-section');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

    sections.forEach(el => observer.observe(el));
  }

  // Bold text animation and team cards replacement
  setupBoldTextAnimation() {
    const boldText = document.querySelector('.bold-animation');
    const teamSlideshow = document.querySelector('.team-slideshow');
    
    if (!boldText || !teamSlideshow) return;

    // Initially hide team cards
    teamSlideshow.style.display = 'none';

    // Trigger bold animation when section comes into view
    const boldObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start the bold animation
          boldText.classList.add('animate');
        }
      });
    }, { threshold: 0.3 });

    // Replace with team cards when bold text scrolls out of view
    const teamObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          // Bold text has scrolled out of view, show team cards
          boldText.style.display = 'none';
          teamSlideshow.style.display = 'block';
        } else {
          // Bold text is back in view, hide team cards
          boldText.style.display = 'block';
          teamSlideshow.style.display = 'none';
        }
      });
    }, { threshold: 0.1 });

    boldObserver.observe(boldText);
    teamObserver.observe(boldText);
  }

  // Testimonial scroll animations
  setupTestimonialAnimations() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length === 0) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add stagger delay based on card index
          const index = Array.from(testimonialCards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 200); // 200ms stagger between each card
        }
      });
    }, { threshold: 0.2 });

    testimonialCards.forEach(card => observer.observe(card));
  }

  // Instruction card image parallax (subtle)
  setupCardParallax() {
    const cards = document.querySelectorAll('.instruction-card .card-image img');
    if (cards.length === 0) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          cards.forEach(img => {
            const rect = img.getBoundingClientRect();
            const viewH = window.innerHeight || document.documentElement.clientHeight;
            const center = rect.top + rect.height / 2;
            const distanceFromCenter = (center - viewH / 2) / viewH; // -0.5..0.5
            const offset = distanceFromCenter * -16; // px
            img.style.setProperty('--card-parallax', offset + 'px');
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Subtle background accent shift per section
  setupSectionThemes() {
    const sectionThemeMap = [
      { selector: '.hero', theme: 'theme-hero' },
      { selector: '#make-any-drink', theme: 'theme-make' },
      { selector: '.enjoy-perfect-coffee', theme: 'theme-enjoy' },
      { selector: '.built-by-people', theme: 'theme-built' },
      { selector: '.customer-validation', theme: 'theme-testimonials' },
      { selector: '.final-cta', theme: 'theme-cta' }
    ];

    const sections = sectionThemeMap
      .map(({ selector, theme }) => ({ el: document.querySelector(selector), theme }))
      .filter(({ el }) => !!el);

    if (sections.length === 0) return;

    const body = document.body;
    const themes = sections.map(s => s.theme);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

    sections.forEach(({ el }) => observer.observe(el));
  }

  // Enable stacked-card experience on desktop for instruction cards
  enableStackedCards() {
    const section = document.querySelector('.make-any-drink');
    const container = document.querySelector('.drink-instructions');
    if (!section || !container) return;

    const applyMode = () => {
      const desktop = window.innerWidth >= 1025;
      if (desktop) {
        section.classList.add('stacked-mode');
        this.initStackedZOrder(container);
        this.bindStackedScroll(container);
      } else {
        section.classList.remove('stacked-mode');
      }
    };

    applyMode();
    window.addEventListener('resize', this.debounce(applyMode, 200));
  }

  initStackedZOrder(container) {
    const cards = container.querySelectorAll('.instruction-card');
    cards.forEach((card, index) => {
      card.style.zIndex = String(index + 5); // later cards on top by default (but below headers)
    });
  }

  bindStackedScroll(container) {
    const cards = Array.from(container.querySelectorAll('.instruction-card'));
    if (cards.length === 0) return;

    const TOP_OFFSET = 120; // px from top to consider a card "stuck"
    const BOTTOM_OFFSET = 200; // px from bottom to ensure card doesn't go below footer

    const onScroll = () => {
      // Reset z-indices to ascending order (but below headers)
      cards.forEach((card, index) => {
        card.style.zIndex = String(index + 5);
      });

      // Get viewport height and footer position
      const viewportHeight = window.innerHeight;
      const footer = document.querySelector('.footer');
      const footerTop = footer ? footer.getBoundingClientRect().top : viewportHeight;
      
      // Calculate bottom boundary to ensure card doesn't go below footer
      // Use the smaller of: (viewport - offset) or (footer top - offset)
      const bottomBoundary = Math.min(viewportHeight - BOTTOM_OFFSET, footerTop - BOTTOM_OFFSET);

      // Determine current active (stuck) card and the incoming one
      let activeIndex = -1;
      for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect();
        // Check if card is within the allowed range (above TOP_OFFSET and above bottom boundary)
        if (rect.top <= TOP_OFFSET && rect.bottom <= bottomBoundary) {
          activeIndex = i;
        } else {
          break;
        }
      }

      const incomingIndex = Math.min(activeIndex + 1, cards.length - 1);

      // Boost incoming card to always render above the stuck one (but below headers)
      if (incomingIndex >= 0) {
        cards[incomingIndex].style.zIndex = '15';
      }

      // Optionally nudge the stuck one smaller to keep the next fully visible
      cards.forEach((card, index) => {
        if (index <= activeIndex) {
          card.style.transform = 'scale(0.98)';
        } else {
          card.style.transform = '';
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
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
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    // Add animation classes to elements
    document.querySelectorAll('.adventure-card, .crew-member, .testimonial-card').forEach((el, index) => {
      el.classList.add('animate-on-scroll');
      el.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // Adventure cards interactivity
  setupAdventureCards() {
    document.querySelectorAll('.adventure-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('hover-lift', 'hover-glow');
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('hover-lift', 'hover-glow');
      });

      card.addEventListener('click', () => {
        const adventure = card.dataset.adventure;
        this.showAdventureDetails(adventure);
      });
    });
  }

  // Crew members interactivity
  setupCrewMembers() {
    document.querySelectorAll('.crew-member').forEach(member => {
      member.addEventListener('mouseenter', () => {
        member.classList.add('hover-lift', 'hover-glow');
      });

      member.addEventListener('mouseleave', () => {
        member.classList.remove('hover-lift', 'hover-glow');
      });

      member.addEventListener('click', () => {
        const memberName = member.querySelector('h3').textContent;
        this.showCrewDetails(memberName);
      });
    });
  }

  // Scroll progress indicator
  setupScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '<div class="scroll-progress"></div>';
    document.body.appendChild(scrollIndicator);

    const progressBar = scrollIndicator.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }

  // Parallax effects
  setupParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-fast');
    
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.classList.contains('parallax-fast') ? 0.5 : 0.3;
        const yPos = -(scrolled * speed);
        element.style.setProperty('--parallax-offset', `${yPos}px`);
      });
    });
  }

  // Hero scroll zoom/blur (non-blocking, image only)
  setupHeroScrollZoom() {
    const heroImg = document.querySelector('.hero-scroll-zoom');
    if (!heroImg) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const viewportH = window.innerHeight || document.documentElement.clientHeight;
          const y = window.scrollY || window.pageYOffset || 0;
          const progress = Math.max(0, Math.min(1, y / viewportH));

          // Map progress to transform/filter variables
          const translateY = -(progress * 120); // px - much more dramatic
          const scale = 1 + progress * 0.8;    // up to ~1.8 - huge zoom
          const blur = progress * 12;          // up to 12px - heavy blur

          heroImg.style.setProperty('--hero-translate', translateY + 'px');
          heroImg.style.setProperty('--hero-scale', scale);
          heroImg.style.setProperty('--hero-blur', blur + 'px');

          if (y > 10) document.body.classList.add('scrolling');
          else document.body.classList.remove('scrolling');
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialize on load
  }

  // Team slideshow functionality
  setupTeamSlideshow() {
    const slides = document.querySelectorAll('.team-slide');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length === 0) return;

    // Function to show a specific slide
    const showSlide = (index) => {
      // Remove active class from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      navDots.forEach(dot => dot.classList.remove('active'));
      
      // Add active class to current slide and dot
      slides[index].classList.add('active');
      navDots[index].classList.add('active');
      
      currentSlide = index;
    };

    // Function to go to next slide
    const nextSlide = () => {
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    };

    // Function to start auto-advance
    const startAutoAdvance = () => {
      slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    };

    // Function to stop auto-advance
    const stopAutoAdvance = () => {
      clearInterval(slideInterval);
    };

    // Add click event listeners to navigation dots
    navDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoAdvance();
        startAutoAdvance(); // Restart auto-advance after manual navigation
      });
    });

    // Pause auto-advance on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
      slideshowContainer.addEventListener('mouseenter', stopAutoAdvance);
      slideshowContainer.addEventListener('mouseleave', startAutoAdvance);
    }

    // Start auto-advance
    startAutoAdvance();
  }

  // Particle effects
  setupParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    hero.appendChild(particlesContainer);

    // Create floating particles
    for (let i = 0; i < 20; i++) {
      this.createParticle(particlesContainer);
    }
  }


  createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 3 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
    container.appendChild(particle);
  }

  // Adventure details modal
  showAdventureDetails(adventure) {
    const details = {
      hot: {
        title: 'Hot Coffee Adventure',
        description: 'Bold and powerful, like the morning sun breaking through the clouds.',
        features: ['Rich, full-bodied flavor', 'Perfect for cold mornings', 'Instant energy boost']
      },
      iced: {
        title: 'Iced Coffee Quest',
        description: 'Cool and refreshing, like a mountain stream on a hot day.',
        features: ['Crisp, clean taste', 'Perfect for warm weather', 'Refreshing and energizing']
      },
      latte: {
        title: 'Latte Expedition',
        description: 'Smooth and creamy, like a cloud floating in the sky.',
        features: ['Silky smooth texture', 'Perfect milk-to-coffee ratio', 'Luxurious experience']
      },
      any: {
        title: 'Infinite Possibilities',
        description: 'Any drink you can imagine, perfectly crafted for you.',
        features: ['Unlimited customization', 'Personalized to your taste', 'Endless adventure']
      }
    };

    this.showModal(details[adventure]);
  }

  // Crew details modal
  showCrewDetails(memberName) {
    const details = {
      'Mikey': {
        title: 'Mikey - The Visionary Leader',
        description: 'The coffee shop owner who started this incredible journey. With decades of experience serving customers and perfecting the art of coffee.',
        skills: ['Customer Service Excellence', 'Business Leadership', 'Coffee Passion']
      },
      'Chunk': {
        title: 'Chunk - The Technical Genius',
        description: 'The expert barista who knows every detail of coffee preparation. A perfectionist who ensures every cup is crafted to perfection.',
        skills: ['Barista Mastery', 'Technical Precision', 'Quality Control']
      },
      'Data': {
        title: 'Data - The Master Inventor',
        description: 'The master roaster who brings decades of craft and innovation to every blend. Always experimenting with new techniques and flavors.',
        skills: ['Roasting Innovation', 'Flavor Development', 'Technical Expertise']
      },
      'Mouth': {
        title: 'Mouth - The Science Communicator',
        description: 'The data scientist who translates complex algorithms into perfect personalization. Making the impossible possible through technology.',
        skills: ['Data Science', 'Personalization', 'Technology Integration']
      }
    };

    this.showModal(details[memberName]);
  }

  // Modal functionality
  showModal(data) {
    // Remove existing modal
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
      existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <ul class="modal-features">
          ${data.features ? data.features.map(feature => `<li>${feature}</li>`).join('') : ''}
          ${data.skills ? data.skills.map(skill => `<li>${skill}</li>`).join('') : ''}
        </ul>
      </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles
    const modalStyles = `
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
      }
      
      .modal-content {
        position: relative;
        background: var(--color-cream);
        border-radius: var(--radius-lg);
        padding: 2rem;
        max-width: 500px;
        width: 100%;
        box-shadow: var(--shadow-xl);
        border: 2px solid var(--treasure-gold);
        animation: scaleIn 0.3s ease-out;
      }
      
      .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--treasure-gold);
        cursor: pointer;
        padding: 0.5rem;
      }
      
      .modal-content h2 {
        color: var(--treasure-gold);
        margin-bottom: 1rem;
      }
      
      .modal-content p {
        color: var(--color-text-light);
        margin-bottom: 1.5rem;
      }
      
      .modal-features {
        list-style: none;
        padding: 0;
      }
      
      .modal-features li {
        padding: 0.5rem 0;
        color: var(--color-text);
        border-bottom: 1px solid rgba(255, 215, 0, 0.2);
      }
      
      .modal-features li:last-child {
        border-bottom: none;
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);

    // Close modal functionality
    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.remove();
      styleSheet.remove();
    });

    modal.querySelector('.modal-overlay').addEventListener('click', () => {
      modal.remove();
      styleSheet.remove();
    });

    // Close on escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        styleSheet.remove();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CoffeeAdventure();
});

// Add some utility functions
window.CoffeeAdventure = {
  // Utility function to add animation classes
  addAnimationClass: (element, className) => {
    element.classList.add(className);
  },

  // Utility function to remove animation classes
  removeAnimationClass: (element, className) => {
    element.classList.remove(className);
  },

  // Utility function to check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};
