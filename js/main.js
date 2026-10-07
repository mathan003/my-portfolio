/**
 * Mathan M Portfolio — Ultra-Modern Animated JavaScript
 * 100% Client-Side • Zero External Dependencies • High Performance
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. DOM Element References
     ========================================================================== */
  const header = document.getElementById('site-header');
  const menuBtn = document.getElementById('menu-btn');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('theme-toggle');
  const yearElement = document.getElementById('year');
  const backToTopBtn = document.getElementById('back-to-top');
  const scrollProgressCircle = document.getElementById('scroll-progress-circle');
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

  // Hero Tilt Card
  const heroTiltCard = document.getElementById('hero-tilt-card');

  // Background Canvas
  const bgCanvas = document.getElementById('bg-canvas');

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
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  /* ==========================================================================
     4. Mobile Navigation Drawer
     ========================================================================== */
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          menuBtn.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

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
  }

  /* ==========================================================================
     5. Header Scroll Effect & Back-to-Top Progress Ring
     ========================================================================== */
  const circumference = 2 * Math.PI * 20; // r=20
  if (scrollProgressCircle) {
    scrollProgressCircle.style.strokeDasharray = `${circumference}`;
  }

  function handleScroll() {
    const scrollY = window.scrollY;

    // Header blur / shadow
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll progress ring
    if (scrollProgressCircle) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      const offset = circumference - progress * circumference;
      scrollProgressCircle.style.strokeDashoffset = `${offset}`;
    }

    // Scrollspy active nav link
    const sections = document.querySelectorAll('section[id]');
    let currentSectionId = '';

    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     6. Background Interactive Canvas (Nodes & Warm Ambient Mesh)
     ========================================================================== */
  if (bgCanvas && bgCanvas.getContext) {
    const ctx = bgCanvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: -1000, y: -1000, radius: 140 };

    function resizeCanvas() {
      width = bgCanvas.width = window.innerWidth;
      height = bgCanvas.height = window.innerHeight;
      initParticles();
    }

    function initParticles() {
      particles = [];
      const particleCount = Math.floor(Math.min(width, 1400) / 32);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.4 ? 'rgba(245, 184, 0, ' : 'rgba(56, 189, 248, '
        });
      }
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interaction with mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}0.45)`;
        ctx.fill();

        // Connect nearby particles with subtle line
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(245, 184, 0, ${0.15 * (1 - dist2 / 110)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateCanvas);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    resizeCanvas();
    animateCanvas();
  }

  /* ==========================================================================
     7. 3D Tilt Effect on Hero Portrait
     ========================================================================== */
  function attachTiltEffect(cardElement, targetSelector) {
    if (!cardElement) return;
    const target = cardElement.querySelector(targetSelector) || cardElement;
    cardElement.addEventListener('mousemove', (e) => {
      const rect = cardElement.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateY = (x / (rect.width / 2)) * 8;
      const rotateX = -(y / (rect.height / 2)) * 8;

      target.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    cardElement.addEventListener('mouseleave', () => {
      target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  attachTiltEffect(heroTiltCard, '.portrait-frame');
  const aboutTiltCard = document.getElementById('about-tilt-card');
  attachTiltEffect(aboutTiltCard, '.about-poster-stage');

  /* ==========================================================================
     8. Scroll Reveal Animations (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ==========================================================================
     9. Animated Circular Skill Meters (Counter & SVG Stroke)
     ========================================================================== */
  const meterCards = document.querySelectorAll('.skill-meter-card');
  const meterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const target = parseInt(card.getAttribute('data-target') || '90', 10);
          const circle = card.querySelector('.meter-circle');
          const valEl = card.querySelector('.meter-val');

          if (circle) {
            circle.style.setProperty('--percent', target);
          }

          if (valEl) {
            let start = 0;
            const stepTime = Math.max(15, Math.floor(1200 / target));
            const timer = setInterval(() => {
              start++;
              valEl.textContent = `${start}%`;
              if (start >= target) {
                clearInterval(timer);
                valEl.textContent = `${target}%`;
              }
            }, stepTime);
          }

          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.25 }
  );

  meterCards.forEach((card) => meterObserver.observe(card));

  /* ==========================================================================
     10. Project Filtering
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card, .work-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          // Smooth fade in
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ==========================================================================
     11. Project Details Modal (Deep Dive Previews)
     ========================================================================== */
  const projectData = {
    ecommerce: {
      title: '01. E-Commerce Website (NCPL Computers & CCTV)',
      category: 'Computer & CCTV Camera Sales & Services',
      tech: ['React.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript', 'WhatsApp API'],
      description:
        'A full-featured commercial storefront built for computer sales, CCTV surveillance equipment, and repair services. Features an interactive product catalog, WhatsApp instant ordering workflow, and embedded interactive map location.',
      features: [
        'Dynamic product catalog with multi-category filters (Desktops, Laptops, CCTV Solutions)',
        'Live shopping cart with automated bill estimate',
        'Direct 1-click WhatsApp order generation with full cart summary',
        'Interactive Google Maps store locator and contact enquiry form'
      ]
    },
    carbuying: {
      title: '02. Car Buying Website (SB Cars)',
      category: 'Automotive Showroom & Inventory Portal',
      tech: ['React.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript (ES6+)'],
      description:
        'A comprehensive automotive marketplace portal where users can browse car listings, inspect vehicle specifications, book test drives, and submit direct enquiries. Includes an administrative portal for managing car inventory.',
      features: [
        'Vehicle model showcase with high-res photo gallery and specs comparison',
        'Multi-attribute search and category filters (Sedan, SUV, Hatchback, Luxury)',
        'Online test-drive booking and customer enquiry form',
        'Responsive administrative dashboard for inventory and pricing management'
      ]
    },
    employee: {
      title: '03. Employee Management System',
      category: 'HR Management & Payroll Automation',
      tech: ['Python', 'Django', 'SQLite', 'Bootstrap', 'REST APIs'],
      description:
        'A workplace HR management portal for tracking employee records, punch-in/out attendance, leave management, work update logs, and automated salary calculations with detailed monthly payslips.',
      features: [
        'Attendance tracking with punch-in/out timestamps and leave approval workflow',
        'Salary and compensation calculation engine based on working days and overtime',
        'Employee directory with searchable profile cards and role permissions',
        'Department-wise reporting with downloadable administrative records'
      ]
    },
    student: {
      title: '04. Student Management System',
      category: 'Academic Administration & Records',
      tech: ['Python', 'Django', 'SQLite', 'Bootstrap', 'CSS3'],
      description:
        'A complete educational administration system designed to manage student admissions, academic batches, fee collections with payment status badges, daily attendance, and student photo directories.',
      features: [
        'Student profile management with batch categorization and photo storage',
        'Fee ledger tracking with Paid/Pending status badges and receipts',
        'Daily roll-call attendance logger and percentage calculator',
        'Exam grading and progress reporting module'
      ]
    },
    billing: {
      title: '05. Billing Project (SmartBilling POS & MathanHub)',
      category: 'Retail Point-of-Sale & Inventory Suite',
      tech: ['Python', 'Django', 'SQLite', 'Bootstrap', 'REST API', 'JavaScript'],
      description:
        'A high-performance retail billing and inventory management software (SmartBilling POS). Enables instant barcode scanning, rapid invoice generation, GST tax calculation, stock tracking, and daily sales dashboards.',
      features: [
        'Rapid barcode-driven Point-of-Sale (POS) cash and wholesale checkout',
        'Automated GST tax calculation and instant thermal receipt printing',
        'Live stock inventory management with low-stock alerts and SKU lookup',
        'Daily, weekly, and monthly sales analytics dashboard with revenue charts'
      ]
    },
    menswear: {
      title: '06. Men’s Wear Website (StyleHub)',
      category: 'Fashion Apparel & Online Storefront',
      tech: ['React.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'],
      description:
        'A modern responsive men’s fashion e-commerce storefront showcasing seasonal collections, interactive size & color pickers, client-side shopping cart persistence, and an administrative order management system.',
      features: [
        'Trendy apparel display cards with hover zoom and quick item previews',
        'Interactive size, fit, and color variation selection',
        'Persistent client-side shopping bag with local storage support',
        'Responsive layout optimized for handheld mobile-first shopping'
      ]
    }
  };

  const modalButtons = document.querySelectorAll('.project-modal-btn');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data || !modalBody || !modalBackdrop) return;

    modalBody.innerHTML = `
      <div class="modal-category">${escapeHTML(data.category)}</div>
      <h2 class="modal-title" id="modal-title">${escapeHTML(data.title)}</h2>
      <p class="modal-desc">${escapeHTML(data.description)}</p>

      <h3 class="modal-subtitle">Key Features &amp; Architecture:</h3>
      <ul class="modal-features">
        ${data.features.map((feat) => `<li>${escapeHTML(feat)}</li>`).join('')}
      </ul>

      <h3 class="modal-subtitle">Technologies Applied:</h3>
      <div class="modal-tech">
        ${data.tech.map((t) => `<span>${escapeHTML(t)}</span>`).join('')}
      </div>

      <div style="display:flex; gap:12px; margin-top:20px; flex-wrap:wrap;">
        <a class="btn btn-primary" href="https://wa.me/919384098304?text=${encodeURIComponent(`Hi Mathan, I would like to discuss your project: ${data.title}`)}" target="_blank" rel="noopener noreferrer">
          Discuss This Project &rarr;
        </a>
        <button class="btn btn-secondary" onclick="document.getElementById('project-modal').setAttribute('hidden', '')">Close</button>
      </div>
    `;

    modalBackdrop.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalBackdrop) return;
    modalBackdrop.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  modalButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      if (id) openProjectModal(id);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeProjectModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modalBackdrop.hasAttribute('hidden')) {
        closeProjectModal();
      }
    });
  }

  /* ==========================================================================
     12. Instant WhatsApp Contact Form Integration
     ========================================================================== */
  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const interestSelect = document.getElementById('contact-interest');
    const messageInput = document.getElementById('contact-message');

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
      if (formStatus) {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
      }

      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        showFieldError(nameInput, 'Please enter your name.');
        isValid = false;
      } else if (nameVal.length < 2) {
        showFieldError(nameInput, 'Name must be at least 2 characters.');
        isValid = false;
      }

      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        showFieldError(emailInput, 'Please enter your email address.');
        isValid = false;
      } else if (!emailRegex.test(emailVal)) {
        showFieldError(emailInput, 'Please enter a valid email format.');
        isValid = false;
      }

      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const interestVal = interestSelect ? interestSelect.value : '';
      if (!interestVal) {
        showFieldError(interestSelect, 'Please select a service.');
        isValid = false;
      }

      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal) {
        showFieldError(messageInput, 'Please write a message.');
        isValid = false;
      } else if (messageVal.length < 5) {
        showFieldError(messageInput, 'Message should be at least 5 characters long.');
        isValid = false;
      }

      if (!isValid) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Format WhatsApp Message
      const waNumber = '919384098304';
      const formattedWhatsAppMessage = 
`Hello Mathan! I'm reaching out from your portfolio:

*Name:* ${nameVal}
*Email:* ${emailVal}
*Phone:* ${phoneVal || 'Not provided'}
*Service Needed:* ${interestVal}

*Message:*
${messageVal}

────────────────────
Sent from Mathan M Portfolio Website`;

      const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(formattedWhatsAppMessage)}`;

      // Save submission client-side in localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('mathan_portfolio_messages') || '[]');
        stored.push({
          name: nameVal,
          email: emailVal,
          phone: phoneVal || 'N/A',
          interest: interestVal,
          message: messageVal,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('mathan_portfolio_messages', JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage unavailable:', err);
      }

      // Open WhatsApp directly
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <div class="whatsapp-status-box">
              <div class="whatsapp-status-header">
                <strong>✔ Message Prepared! Opening WhatsApp...</strong>
              </div>
              <p>Your message was formatted for Mathan (+91 93840 98304). If WhatsApp didn't open automatically, click below:</p>
              <div class="whatsapp-status-actions">
                <a class="btn-whatsapp-direct" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">
                  Open WhatsApp Chat &rarr;
                </a>
                <button type="button" class="copy-msg-btn" id="copy-whatsapp-text">Copy Text</button>
              </div>
            </div>
          `;

          const copyBtn = document.getElementById('copy-whatsapp-text');
          if (copyBtn) {
            copyBtn.addEventListener('click', () => {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(formattedWhatsAppMessage).then(() => {
                  copyBtn.textContent = 'Copied!';
                  showToast('WhatsApp text copied to clipboard!');
                  setTimeout(() => { copyBtn.textContent = 'Copy Text'; }, 2000);
                });
              }
            });
          }
        }

        contactForm.reset();
        showToast('Connecting to WhatsApp (+91 93840 98304)...');
      }, 400);
    });
  }

  function showFieldError(field, msg) {
    if (!field) return;
    field.classList.add('is-invalid');
    const fieldId = field.id.replace('contact-', '');
    const errorEl = document.getElementById(`${fieldId}-error`);
    if (errorEl) errorEl.textContent = msg;
    field.focus();
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ==========================================================================
     13. Copy Email to Clipboard
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
    const copyText = copyEmailBtn ? copyEmailBtn.querySelector('.copy-text') : null;
    if (copyText) {
      const orig = copyText.textContent;
      copyText.textContent = 'Copied!';
      setTimeout(() => { copyText.textContent = orig; }, 2000);
    }
    showToast('Email address copied: mathan003m@gmail.com');
  }

  /* ==========================================================================
     14. Global Toast Notification
     ========================================================================== */
  let toastTimer = null;
  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.removeAttribute('hidden');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.setAttribute('hidden', '');
    }, 3200);
  }
});
