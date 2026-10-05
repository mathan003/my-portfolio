/**
 * Mathan M Portfolio — Modern JavaScript (ES6+)
 * 100% Vanilla JS • Zero External Dependencies • Pure Client-Side
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Elements Selection
     ========================================================================== */
  const header = document.getElementById('site-header');
  const menuBtn = document.getElementById('menu-btn');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('theme-toggle');
  const yearElement = document.getElementById('year');
  const backToTopBtn = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  // Modal Elements
  const modalBackdrop = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  /* ==========================================================================
     2. Dynamic Year
     ========================================================================== */
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     3. Theme Toggle (Dark / Light Mode)
     ========================================================================== */
  const savedTheme = localStorage.getItem('portfolio_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  /* ==========================================================================
     4. Mobile Navigation
     ========================================================================== */
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when clicking a link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          menuBtn.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (
        mainNav.classList.contains('open') &&
        !mainNav.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        mainNav.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================================
     5. Sticky Header & Scroll Spy
     ========================================================================== */
  const sections = document.querySelectorAll('main section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header shadow on scroll
    if (header) {
      if (scrollPos > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // ScrollSpy active link detection
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     6. Scroll Reveal Entrance Animations
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ==========================================================================
     7. Dynamic Skill Meter Counters
     ========================================================================== */
  const skillElements = document.querySelectorAll('.skill[data-target]');
  let skillsAnimated = false;

  const animateSkillMeters = () => {
    if (skillsAnimated) return;
    skillsAnimated = true;

    skillElements.forEach((skill) => {
      const targetPercent = parseInt(skill.getAttribute('data-target'), 10) || 0;
      const meter = skill.querySelector('.meter');
      const numSpan = skill.querySelector('.meter-num');
      let currentVal = 0;
      const duration = 1200; // ms
      const stepTime = Math.max(Math.floor(duration / targetPercent), 12);

      const timer = setInterval(() => {
        currentVal++;
        if (meter) {
          meter.style.setProperty('--p', String(currentVal));
        }
        if (numSpan) {
          numSpan.textContent = `${currentVal}%`;
        }

        if (currentVal >= targetPercent) {
          clearInterval(timer);
        }
      }, stepTime);
    });
  };

  const skillsSection = document.getElementById('skills');
  if (skillsSection && 'IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkillMeters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    skillsObserver.observe(skillsSection);
  } else {
    animateSkillMeters();
  }

  /* ==========================================================================
     8. Project Category Filtering
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ==========================================================================
     9. Interactive Project Details Modal
     ========================================================================== */
  const projectData = {
    automart: {
      title: 'AutoMart Car Showcase',
      category: 'Frontend & UI Showcase',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'CSS Grid'],
      description:
        'A comprehensive automotive showroom and discovery portal built with pure semantic HTML5, modern CSS3 layouts, and dynamic vanilla JS filtering. Designed with a sleek, premium automotive aesthetic.',
      features: [
        'Vehicle model comparison & detail preview modal',
        'Multi-attribute search and category filters (Sedan, SUV, Luxury)',
        'Fully responsive card grid and interactive specs breakdown',
        'Smooth inquiry workflows and test-drive booking interface'
      ]
    },
    menswear: {
      title: 'Men’s Wear E-Commerce',
      category: 'Storefront & UX',
      tech: ['HTML5', 'CSS3', 'Vanilla JS', 'Local Storage', 'Flexbox'],
      description:
        'A modern apparel shopping experience tailored for digital fashion retail. Features smooth catalog navigation, quick item previews, size selections, and client-side bag state.',
      features: [
        'Clean product display cards with hover micro-interactions',
        'Size, color, and fit selector tabs',
        'Client-side cart calculation with local storage persistence',
        'Optimized for mobile-first handheld shopping ergonomics'
      ]
    },
    portal: {
      title: 'Employee Portal Dashboard',
      category: 'Management & Dashboard UI',
      tech: ['HTML5', 'CSS3', 'JavaScript DOM', 'Data Tables', 'WCAG a11y'],
      description:
        'A structured workplace administration portal for managing staff profiles, department records, and performance milestones with high clarity and accessible color contrasts.',
      features: [
        'Live search and department filterable employee directory',
        'Clean tabular presentation with responsive card collapse on mobile',
        'Accessible modal dialogs for new employee registration',
        'High-contrast data badges and status indicators'
      ]
    },
    foodsite: {
      title: 'Food Selling Website',
      category: 'Landing Page & Catalog',
      tech: ['HTML5', 'CSS3', 'JavaScript ES6', 'Animations', 'Mobile UX'],
      description:
        'An appetite-inducing online food ordering showcase featuring vibrant imagery layouts, culinary category sliders, and nutritional detail tooltips.',
      features: [
        'Visual category tabs (Appetizers, Mains, Desserts, Beverages)',
        'Item quantity counters and quick cart summary dialog',
        'Fast page loads with lazy-loading markup and responsive images',
        'Interactive chef specials and customer reviews section'
      ]
    }
  };

  const openProjectModal = (projectId) => {
    const project = projectData[projectId];
    if (!project || !modalBackdrop || !modalBody) return;

    modalBody.innerHTML = `
      <span class="modal-category">${project.category}</span>
      <h3 class="modal-title" id="modal-title">${project.title}</h3>
      <p class="modal-desc">${project.description}</p>
      
      <div class="modal-tech-list">
        ${project.tech.map((t) => `<span class="modal-tech-item">${t}</span>`).join('')}
      </div>

      <div class="modal-features">
        <h4>Key Highlights &amp; Features</h4>
        <ul>
          ${project.features.map((f) => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-actions">
        <a href="#contact" class="btn modal-inquire-btn" id="modal-inquire-btn">Discuss Similar Project</a>
        <button class="outline" id="modal-close-action" type="button">Close</button>
      </div>
    `;

    modalBackdrop.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    // Hook modal internal buttons
    const closeAction = document.getElementById('modal-close-action');
    if (closeAction) {
      closeAction.addEventListener('click', closeProjectModal);
    }

    const inquireBtn = document.getElementById('modal-inquire-btn');
    if (inquireBtn) {
      inquireBtn.addEventListener('click', () => {
        closeProjectModal();
        const interestSelect = document.getElementById('contact-interest');
        if (interestSelect) {
          interestSelect.value = 'Frontend Development';
        }
      });
    }
  };

  const closeProjectModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  // Attach click events to project detail buttons and cards
  document.querySelectorAll('.project-details-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = btn.getAttribute('data-project');
      openProjectModal(pId);
    });
  });

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const pId = card.getAttribute('data-id');
      if (pId) openProjectModal(pId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modalBackdrop.hasAttribute('hidden')) {
        closeProjectModal();
      }
    });
  }

  /* ==========================================================================
     10. Pure Client-Side WhatsApp Contact Form (Zero Backend Dependency)
     ========================================================================== */
  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const interestSelect = document.getElementById('contact-interest');
    const messageInput = document.getElementById('contact-message');

    // Real-time error removal
    [nameInput, emailInput, phoneInput, interestSelect, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
        const errorEl = document.getElementById(`${input.id.replace('contact-', '')}-error`);
        if (errorEl) errorEl.textContent = '';
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      // Validate Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        showFieldError(nameInput, 'Please enter your name.');
        isValid = false;
      } else if (nameVal.length < 2) {
        showFieldError(nameInput, 'Name must be at least 2 characters.');
        isValid = false;
      }

      // Validate Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        showFieldError(emailInput, 'Please enter your email address.');
        isValid = false;
      } else if (!emailRegex.test(emailVal)) {
        showFieldError(emailInput, 'Please enter a valid email format.');
        isValid = false;
      }

      // Validate Phone (optional)
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';

      // Validate Interest
      const interestVal = interestSelect ? interestSelect.value : '';
      if (!interestVal) {
        showFieldError(interestSelect, 'Please select a service of interest.');
        isValid = false;
      }

      // Validate Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal) {
        showFieldError(messageInput, 'Please write a message.');
        isValid = false;
      } else if (messageVal.length < 5) {
        showFieldError(messageInput, 'Message should be at least 5 characters long.');
        isValid = false;
      }

      if (!isValid) return;

      // Pure client-side submission handling
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Format WhatsApp Message
      const waNumber = '919384098304';
      const formattedWhatsAppMessage = 
`Hello Mathan, I'm reaching out from your portfolio!

*Name:* ${nameVal}
*Email:* ${emailVal}
*Phone:* ${phoneVal || 'Not provided'}
*Interested In:* ${interestVal}

*Message:*
${messageVal}

────────────────────
Sent from Mathan M Portfolio Website`;

      const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(formattedWhatsAppMessage)}`;

      // Store in localStorage as client-side record
      const submissionData = {
        name: nameVal,
        email: emailVal,
        phone: phoneVal || 'N/A',
        interest: interestVal,
        message: messageVal,
        timestamp: new Date().toISOString()
      };

      try {
        const storedMessages = JSON.parse(localStorage.getItem('mathan_portfolio_messages') || '[]');
        storedMessages.push(submissionData);
        localStorage.setItem('mathan_portfolio_messages', JSON.stringify(storedMessages));
      } catch (err) {
        console.warn('LocalStorage unavailable:', err);
      }

      // Open WhatsApp directly
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Update UI with confirmation banner and direct click fallback
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
          <div class="whatsapp-status-box">
            <div class="whatsapp-status-header">
              <span class="status-check-badge">✔</span>
              <strong>Message formatted! Opening WhatsApp...</strong>
            </div>
            <p>
              Your message was prepared for Mathan (<strong>+91 93840 98304</strong>).
              If WhatsApp didn't open automatically, click the button below:
            </p>
            <div class="whatsapp-status-actions">
              <a class="btn btn-whatsapp-direct" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.27-2.42 5.82a8.196 8.196 0 01-5.82 2.41c-1.46 0-2.9-.38-4.17-1.11l-.3-.17-3.1 0.81 0.83-3.02-.2-.31a8.167 8.167 0 01-1.26-4.43c0-4.54 3.7-8.24 8.24-8.24zm-3.5 4.31c-.19 0-.41.07-.63.31-.22.25-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.66-1.17.2-.57.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28-.25-.12-1.45-.72-1.68-.8-.22-.08-.38-.12-.55.12-.16.25-.63.8-.77.96-.14.16-.28.18-.53.06-.25-.12-1.06-.39-2.02-1.24-.75-.67-1.26-1.49-1.41-1.74-.14-.25-.02-.38.11-.5.11-.11.25-.28.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42-.14-.01-.31-.01-.48-.01z"/>
                </svg>
                Continue to WhatsApp &rarr;
              </a>
              <button type="button" class="outline copy-msg-btn" id="copy-whatsapp-text">
                Copy Message
              </button>
            </div>
          </div>
        `;

        const copyBtn = document.getElementById('copy-whatsapp-text');
        if (copyBtn) {
          copyBtn.addEventListener('click', () => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(formattedWhatsAppMessage).then(() => {
                copyBtn.textContent = 'Copied!';
                showToast('WhatsApp message text copied!');
                setTimeout(() => {
                  copyBtn.textContent = 'Copy Message';
                }, 2000);
              });
            }
          });
        }

        contactForm.reset();
        showToast('Connecting to WhatsApp (+91 93840 98304)...');
      }, 350);
    });
  }

  function showFieldError(field, msg) {
    field.classList.add('is-invalid');
    const fieldId = field.id.replace('contact-', '');
    const errorEl = document.getElementById(`${fieldId}-error`);
    if (errorEl) {
      errorEl.textContent = msg;
    }
    field.focus();
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ==========================================================================
     11. Copy Email to Clipboard
     ========================================================================== */
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'mathan003m@gmail.com';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
          .then(() => handleCopySuccess())
          .catch(() => fallbackCopy(email));
      } else {
        fallbackCopy(email);
      }
    });
  }

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      handleCopySuccess();
    } catch (err) {
      showToast('Could not copy email');
    }
    document.body.removeChild(tempInput);
  }

  function handleCopySuccess() {
    const copyText = copyEmailBtn.querySelector('.copy-text');
    if (copyText) {
      const originalText = copyText.textContent;
      copyText.textContent = 'Copied!';
      setTimeout(() => {
        copyText.textContent = originalText;
      }, 2000);
    }
    showToast('Email address copied to clipboard!');
  }

  /* ==========================================================================
     12. Toast Notification Utility
     ========================================================================== */
  let toastTimer = null;
  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.removeAttribute('hidden');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.setAttribute('hidden', '');
    }, 3000);
  }
});

