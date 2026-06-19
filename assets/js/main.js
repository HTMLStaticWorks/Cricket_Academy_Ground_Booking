/* 
====================================================================
  Main JavaScript for Cricket Academy
==================================================================== 
*/

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Theme Toggle System (supports both desktop & mobile toggle buttons)
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  
  function updateThemeIcons() {
    const isLightMode = document.body.classList.contains('light-mode');
    themeToggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (isLightMode) {
          icon.className = 'ph ph-sun';
        } else {
          icon.className = 'ph ph-moon';
        }
      }
    });
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLightMode = document.body.classList.contains('light-mode');
      localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
      updateThemeIcons();
    });
  });

  // Load saved theme
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    updateThemeIcons();
  }

  // RTL Toggle System (supports both desktop & mobile toggle buttons)
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isRtl = document.body.getAttribute('dir') === 'rtl';
      const nextDir = isRtl ? 'ltr' : 'rtl';
      document.body.setAttribute('dir', nextDir);
      localStorage.setItem('dir', nextDir);
    });
  });

  // Load saved direction
  if (localStorage.getItem('dir') === 'rtl') {
    document.body.setAttribute('dir', 'rtl');
  }

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isActive = navLinks.classList.contains('active');
      document.body.style.overflow = isActive ? 'hidden' : '';
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        icon.className = isActive ? 'ph ph-x' : 'ph ph-list';
      }
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('.nav-link:not(.desktop-only > a)');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.className = 'ph ph-list';
        }
      });
    });
  }

  // Scroll to Top Button System
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to Top');
  scrollTopBtn.innerHTML = '<i class="ph ph-caret-up"></i>';
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Dynamic Footer Social Icons Injection
  const footerLogo = document.querySelector('.footer-top .footer-col .logo');
  if (footerLogo) {
    const parentCol = footerLogo.parentElement;
    if (parentCol && !parentCol.querySelector('.social-links')) {
      const socialLinksDiv = document.createElement('div');
      socialLinksDiv.className = 'social-links';
      socialLinksDiv.innerHTML = `
        <a href="#" class="social-icon" aria-label="Facebook"><i class="ph ph-facebook-logo"></i></a>
        <a href="#" class="social-icon" aria-label="Twitter/X"><i class="ph ph-twitter-logo"></i></a>
        <a href="#" class="social-icon" aria-label="Instagram"><i class="ph ph-instagram-logo"></i></a>
        <a href="#" class="social-icon" aria-label="YouTube"><i class="ph ph-youtube-logo"></i></a>
      `;
      parentCol.appendChild(socialLinksDiv);
    }
  }

  // Accordion Logic
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close other items
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});
