const fs = require('fs');
const path = require('path');

const dir = 'c:\\class\\.vscode\\cricket';

const standardNavbar = `<!-- Navbar -->
  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="logo">
        <i class="ph ph-baseball logo-icon"></i>
        <span>CricElite</span>
      </a>
      
      <div class="nav-links">
        <div class="nav-dropdown">
          <a href="#" class="nav-link {home-active}">Home <i class="ph ph-caret-down" style="font-size: 12px; margin-left: 4px;"></i></a>
          <div class="dropdown-content">
            <a href="index.html" class="dropdown-item {index-active}">Home 1</a>
            <a href="home-2.html" class="dropdown-item {home-2-active}">Home 2</a>
          </div>
        </div>
        <a href="about.html" class="nav-link {about-active}">About</a>
        <a href="services.html" class="nav-link {services-active}">Services</a>
        <a href="academy-programs.html" class="nav-link {academy-programs-active}">Programs</a>
        <a href="ground-booking.html" class="nav-link {ground-booking-active}">Ground Booking</a>
        <a href="coaches.html" class="nav-link {coaches-active}">Coaches</a>
        <a href="gallery.html" class="nav-link {gallery-active}">Gallery</a>
        <a href="contact.html" class="nav-link {contact-active}">Contact</a>
      </div>

      <div class="nav-actions">
        <button class="icon-btn" id="theme-toggle" aria-label="Toggle Theme">
          <i class="ph ph-moon"></i>
        </button>
        <button class="icon-btn" id="rtl-toggle" aria-label="Toggle RTL">
          <i class="ph ph-arrows-left-right"></i>
        </button>
        <a href="dashboard.html" class="icon-btn" aria-label="Dashboard">
          <i class="ph ph-squares-four"></i>
        </a>
        <a href="register.html" class="btn btn-primary">Sign Up</a>
      </div>
      
      <button class="icon-btn mobile-menu-toggle">
        <i class="ph ph-list"></i>
      </button>
    </div>
  </nav>`;

const standardFooter = `<!-- Global Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-col">
          <a href="index.html" class="logo mb-2">
            <i class="ph ph-baseball logo-icon"></i>
            <span>CricElite</span>
          </a>
          <p class="mt-2 text-secondary">A professional cricket ecosystem combining elite<br>sports performance, stadium-grade experiences,<br>and modern digital booking technology.</p>
        </div>
        <div class="footer-col">
          <h4>Academy</h4>
          <div class="footer-links">
            <a href="academy-programs.html" class="footer-link">Programs</a>
            <a href="coaches.html" class="footer-link">Our Coaches</a>
            <a href="gallery.html" class="footer-link">Facility Gallery</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Bookings</h4>
          <div class="footer-links">
            <a href="ground-booking.html" class="footer-link">Ground Reservation</a>
            <a href="ground-booking.html" class="footer-link">Net Sessions</a>
            <a href="dashboard.html" class="footer-link">My Bookings</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <div class="footer-links">
            <a href="contact.html" class="footer-link">Contact Us</a>
            <a href="about.html" class="footer-link">About Us</a>
            <a href="blog.html" class="footer-link">Latest News</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 CricElite Academy & Ground Booking. All rights reserved. Designed for professional excellence.</p>
      </div>
    </div>
  </footer>`;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Navbar if exists
  const navRegex = /<!-- Navbar -->[\s\S]*?<\/nav>/;
  if (navRegex.test(content)) {
    let pageNav = standardNavbar;
    const pageKeys = ['index', 'home-2', 'about', 'services', 'academy-programs', 'ground-booking', 'coaches', 'gallery', 'contact'];
    
    pageKeys.forEach(key => {
      // Set active for the exact file match
      if (file === key + '.html') {
        pageNav = pageNav.replace(new RegExp(`{${key}-active}`, 'g'), 'active');
      } else {
        pageNav = pageNav.replace(new RegExp(`{${key}-active}`, 'g'), '');
      }
    });

    // Special case for Home parent
    if (file === 'index.html' || file === 'home-2.html') {
      pageNav = pageNav.replace(/{home-active}/g, 'active');
    } else {
      pageNav = pageNav.replace(/{home-active}/g, '');
    }

    content = content.replace(navRegex, pageNav);
  }

  // Replace Footer if exists
  const footerRegex = /<!-- Global Footer -->[\s\S]*?<\/footer>/;
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, standardFooter);
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Update V2 completed successfully.');
