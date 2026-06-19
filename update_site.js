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
        <a href="index.html" class="nav-link {index}">Home</a>
        <a href="home-2.html" class="nav-link {home-2}">Home 2</a>
        <a href="about.html" class="nav-link {about}">About</a>
        <a href="services.html" class="nav-link {services}">Services</a>
        <a href="academy-programs.html" class="nav-link {academy-programs}">Programs</a>
        <a href="ground-booking.html" class="nav-link {ground-booking}">Ground Booking</a>
        <a href="coaches.html" class="nav-link {coaches}">Coaches</a>
        <a href="events.html" class="nav-link {events}">Events</a>
        <a href="gallery.html" class="nav-link {gallery}">Gallery</a>
        <a href="pricing.html" class="nav-link {pricing}">Pricing</a>
        <a href="contact.html" class="nav-link {contact}">Contact</a>
      </div>

      <div class="nav-actions">
        <button class="icon-btn" id="theme-toggle" aria-label="Toggle Theme">
          <i class="ph ph-moon"></i>
        </button>
        <button class="icon-btn" id="rtl-toggle" aria-label="Toggle RTL">
          <i class="ph ph-text-align-right"></i>
        </button>
        <a href="ground-booking.html" class="btn btn-primary">Book Practice</a>
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
            <a href="pricing.html" class="footer-link">Membership Plans</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Bookings</h4>
          <div class="footer-links">
            <a href="ground-booking.html" class="footer-link">Ground Reservation</a>
            <a href="ground-booking.html" class="footer-link">Net Sessions</a>
            <a href="events.html" class="footer-link">Corporate Events</a>
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

const pages = [
  'index.html', 'home-2.html', 'about.html', 'services.html', 'service-details.html',
  'academy-programs.html', 'ground-booking.html', 'pricing.html', 'coaches.html', 'coach-details.html',
  'events.html', 'gallery.html', 'blog.html', 'blog-details.html', 'contact.html'
];

pages.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Favicon
  if (!content.includes('favicon.svg')) {
    content = content.replace('</head>', '  <link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg">\n</head>');
  }

  // 2. SEO
  if (!content.includes('name="keywords"')) {
    content = content.replace('</head>', '  <meta name="keywords" content="cricket academy, ground booking, net practice, professional coaching, cricket tournament">\n</head>');
  }

  // 3. Replace Navbar
  const navRegex = /<!-- Navbar -->[\s\S]*?<\/nav>/;
  let pageNav = standardNavbar.replace(/{([a-z0-9-]+)}/g, (match, p1) => {
    return file.includes(p1) ? 'active' : '';
  });
  
  if (navRegex.test(content)) {
    content = content.replace(navRegex, pageNav);
  }

  // 4. Replace Footer
  const footerRegex = /<!-- Global Footer -->[\s\S]*?<\/footer>/;
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, standardFooter);
  }

  // 5. Adjust Sections
  // Use a simpler approach to count sections
  const sectionCount = (content.match(/<section/g) || []).length + (content.match(/<header class="page-header"/g) || []).length + (content.match(/<header class="hero/g) || []).length + (content.match(/<section class="hero/g) || []).length;
  
  // Exclude auth and other minor pages if needed, but they aren't in this list.
  const targetSections = (file === 'index.html' || file === 'home-2.html') ? 7 : 5;
  let sectionsToAdd = targetSections - sectionCount;

  if (sectionsToAdd > 0) {
    let extraSections = '';
    for(let i=0; i<sectionsToAdd; i++) {
      extraSections += `\n  <!-- Added Section ${i+1} -->\n  <section class="added-section" style="background-color: rgba(14, 26, 44, 0.3); border-top: 1px solid var(--border-color);">\n    <div class="container text-center">\n      <h2 class="mb-3">Premium Feature ${i+1}</h2>\n      <p class="text-secondary mx-auto">Elevating the cricket experience through technology,<br>premium infrastructure, and elite coaching methodologies.<br>We provide an environment built for champions.</p>\n    </div>\n  </section>\n`;
    }
    // insert before footer
    if (content.includes('<!-- Global Footer -->')) {
      content = content.replace('<!-- Global Footer -->', extraSections + '\n  <!-- Global Footer -->');
    } else {
      content = content.replace('</body>', extraSections + '\n</body>');
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

// Also add favicon and SEO to the other files
const otherFiles = ['dashboard.html', 'login.html', 'register.html', '404.html', 'coming-soon.html'];
otherFiles.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('favicon.svg')) {
    content = content.replace('</head>', '  <link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg">\n</head>');
  }
  if (!content.includes('name="keywords"')) {
    content = content.replace('</head>', '  <meta name="keywords" content="cricket academy, ground booking, net practice, professional coaching, cricket tournament">\n</head>');
  }
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Update completed successfully.');
