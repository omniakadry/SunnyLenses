// Enhanced JavaScript for Sunny Lenses Website

class SunnyLensesApp {
  constructor() {
    this.currentSlide = 0;
    this.reviews = [
      {
        image: 'https://i.pinimg.com/736x/55/bc/d3/55bcd3cbea2341b3a3ef80b55f12bc69.jpg',
        quote: "It's such a game changer, and if you wear prescription glasses, I'd say life-changing.",
        name: 'Mia C.',
        rating: 5,
        verified: true,
        timeAgo: '2 weeks ago'
      },
      {
        image: 'https://i.pinimg.com/736x/46/64/4b/46644b4806468c39e52ae30cf8bf80f4.jpg',
        quote: "The fit is perfect and the quality is outstanding. Best glasses I've ever owned!",
        name: 'jasmine D.',
        rating: 5,
        verified: true,
        timeAgo: '1 month ago'
      },
      {
        image: 'https://i.pinimg.com/1200x/44/18/89/441889fc7f42f934510c5f54fdb2374a.jpg',
        quote: "Amazing service and the custom fit makes all the difference. Highly recommended!",
        name: 'Sarah M.',
        rating: 5,
        verified: true,
        timeAgo: '3 weeks ago'
      }
    ];

    this.isAutoSliding = true;
    this.autoSlideInterval = null;
    this.lastScrollTop = 0;
    
    this.init();
  }

  init() {
    this.showLoadingScreen();
    this.setupEventListeners();
    this.initializeAnimations();
    this.startReviewSlider();
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.setupBackToTop();
    this.setupCartCounter();
    this.hideLoadingScreen();
  }

  showLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'flex';
    }
  }

  hideLoadingScreen() {
    setTimeout(() => {
      const loadingScreen = document.querySelector('.loading-screen');
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }
    }, 1500);
  }

  setupEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Button hover effects with ripple
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('mouseenter', this.createRippleEffect.bind(this));
    });

    // Gallery item interactions
    this.setupGalleryEffects();

    // Feature card interactions
    this.setupFeatureCardEffects();

    // Action card interactions
    this.setupActionCardEffects();
  }

  createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  setupGalleryEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        galleryItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.style.opacity = '0.6';
            otherItem.style.transform = 'scale(0.95)';
          }
        });
      });

      item.addEventListener('mouseleave', () => {
        galleryItems.forEach(otherItem => {
          otherItem.style.opacity = '1';
          otherItem.style.transform = 'scale(1)';
        });
      });
    });
  }

  setupFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        // Animate timeline progress
        const timeline = document.querySelector('.timeline-progress');
        if (timeline) {
          timeline.style.width = `${((index + 1) / featureCards.length) * 100}%`;
        }
      });
    });
  }

  setupActionCardEffects() {
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.card-icon');
        if (icon) {
          icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
      });

      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.card-icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
  }

  initializeAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Special handling for different elements
          if (entry.target.classList.contains('feature-card')) {
            this.animateFeatureCard(entry.target);
          }
          
          if (entry.target.classList.contains('action-card')) {
            this.animateActionCard(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.addEventListener('DOMContentLoaded', () => {
      // Feature cards
      const featureCards = document.querySelectorAll('.feature-card');
      featureCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
      });

      // Style sections
      const styleText = document.querySelector('.style-text');
      const styleGallery = document.querySelector('.style-gallery');
      
      if (styleText) {
        styleText.classList.add('slide-in-left');
        observer.observe(styleText);
      }
      
      if (styleGallery) {
        styleGallery.classList.add('slide-in-right');
        observer.observe(styleGallery);
      }

      // Action cards
      const actionCards = document.querySelectorAll('.action-card');
      actionCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
      });
    });
  }

  animateFeatureCard(card) {
    const icon = card.querySelector('.feature-icon');
    const arrow = card.querySelector('.feature-arrow');
    
    setTimeout(() => {
      if (icon) icon.style.transform = 'scale(1.1)';
      if (arrow) {
        arrow.style.opacity = '1';
        arrow.style.transform = 'translateX(0)';
      }
    }, 300);
  }

  animateActionCard(card) {
    const icon = card.querySelector('.card-icon');
    
    setTimeout(() => {
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
      }
    }, 200);
  }

  startReviewSlider() {
    this.renderReview();
    this.bindSliderEvents();
    this.startAutoSlide();
  }

  bindSliderEvents() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.pauseAutoSlide();
        this.prevSlide();
        this.resumeAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.pauseAutoSlide();
        this.nextSlide();
        this.resumeAutoSlide();
      });
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.pauseAutoSlide();
        this.goToSlide(index);
        this.resumeAutoSlide();
      });
    });

    // Pause on hover
    const reviewSlider = document.querySelector('.review-slider');
    if (reviewSlider) {
      reviewSlider.addEventListener('mouseenter', () => this.pauseAutoSlide());
      reviewSlider.addEventListener('mouseleave', () => this.resumeAutoSlide());
    }
  }

  renderReview() {
    const review = this.reviews[this.currentSlide];
    const reviewContent = document.querySelector('.review-content');
    const indicators = document.querySelectorAll('.indicator');
    
    if (reviewContent) {
      // Add fade out effect
      reviewContent.style.opacity = '0';
      reviewContent.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        reviewContent.innerHTML = `
          <div class="review-image">
            <img src="${review.image}" alt="Customer ${review.name}" loading="lazy">
            <div class="review-rating">
              ${this.generateStars(review.rating)}
            </div>
          </div>
          <div class="review-text">
            <blockquote>"${review.quote}"</blockquote>
            <cite>${review.name}</cite>
            <div class="review-meta">
              <span>Verified Purchase</span>
              <span>•</span>
              <span>${review.timeAgo}</span>
            </div>
          </div>
        `;
        
        // Fade in effect
        reviewContent.style.opacity = '1';
        reviewContent.style.transform = 'translateY(0)';
      }, 150);
    }

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });
  }

  generateStars(rating) {
    return Array(5).fill(0).map((_, i) => 
      `<i class="fas fa-star${i < rating ? '' : ' opacity-30'}"></i>`
    ).join('');
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.reviews.length;
    this.renderReview();
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.reviews.length - 1 : this.currentSlide - 1;
    this.renderReview();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.renderReview();
  }

  startAutoSlide() {
    if (this.isAutoSliding) {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
  }

  pauseAutoSlide() {
    this.isAutoSliding = false;
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  resumeAutoSlide() {
    this.isAutoSliding = true;
    this.startAutoSlide();
  }

  setupScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Header effects
      if (scrollTop > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Hide/show header on scroll
      if (scrollTop > this.lastScrollTop && scrollTop > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      
      this.lastScrollTop = scrollTop;

      // Parallax effect for hero image
      const heroImage = document.querySelector('.hero-image img');
      if (heroImage) {
        const parallaxSpeed = 0.5;
        heroImage.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
      }

      // Back to top button
      const backToTop = document.querySelector('.back-to-top');
      if (backToTop) {
        if (scrollTop > 500) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    });
  }

  setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
          if (mobileMenuToggle.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
          } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
          }
        });
      });

      // Close mobile menu when clicking on links
      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
          
          const spans = mobileMenuToggle.querySelectorAll('span');
          spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
          });
        });
      });
    }
  }

  setupBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  setupCartCounter() {
    const cartBtn = document.querySelector('.btn-cart');
    const cartCount = document.querySelector('.cart-count');
    
    if (cartBtn && cartCount) {
      cartBtn.addEventListener('click', () => {
        // Simulate adding item to cart
        let currentCount = parseInt(cartCount.textContent);
        currentCount++;
        cartCount.textContent = currentCount;
        
        // Animate cart icon
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
          cartBtn.style.transform = 'scale(1)';
        }, 200);
        
        // Show notification
        this.showNotification('Item added to cart!', 'success');
      });
    }
  }

  showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Performance optimization
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

  // Lazy loading for images
  setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }
}

// Additional CSS for enhanced effects
const enhancedStyles = `
  .notification {
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    background: var(--primary-yellow);
    color: var(--text-dark);
    font-weight: 600;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: var(--shadow-lg);
  }

  .notification.error {
    background: #ff4757;
    color: white;
  }

  .notification.success {
    background: #2ed573;
    color: white;
  }

  .nav-menu.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    padding: 2rem;
    box-shadow: var(--shadow-lg);
    border-radius: 0 0 16px 16px;
  }

  .nav-menu.active li {
    margin: 0.5rem 0;
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .lazy {
    opacity: 0;
    transition: opacity 0.3s;
  }

  .lazy.loaded {
    opacity: 1;
  }

  /* Enhanced hover effects */
  .feature-card:hover .feature-icon {
    animation: bounce 0.6s ease;
  }

  @keyframes bounce {
    0%, 20%, 60%, 100% { transform: translateY(0) scale(1); }
    40% { transform: translateY(-10px) scale(1.1); }
    80% { transform: translateY(-5px) scale(1.05); }
  }

  .gallery-item::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, var(--primary-yellow), var(--dark-yellow));
    opacity: 0;
    transition: opacity 0.3s ease;
    mix-blend-mode: overlay;
  }

  .gallery-item:hover::after {
    opacity: 0.2;
  }

  /* Smooth transitions for all interactive elements */
  * {
    transition-property: transform, opacity, background-color, border-color, box-shadow;
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

// Inject enhanced styles
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedStyles;
document.head.appendChild(styleSheet);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new SunnyLensesApp();
});

// Add loading state management
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Console message
console.log('🌟 Sunny Lenses - Enhanced UI/UX Experience Loaded! 👓✨');