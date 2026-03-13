// ── CURSOR ──
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .skill-pill, .project-card, .edu-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

// ── NAVIGATION ──
const navLinks = document.querySelectorAll('.nav-links a[data-page]');
const pages = document.querySelectorAll('.page');
const menuBtn = document.querySelector('.menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

function showPage(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));
  const target = document.getElementById(pageId + '-page');
  if (target) { target.classList.add('active'); window.scrollTo(0, 0); }
  const activeLink = document.querySelector(`.nav-links a[data-page="${pageId}"]`);
  if (activeLink) activeLink.classList.add('active');
  initReveal();
  if (pageId === 'skills') initSkillBars();
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;
    showPage(page);
    if (navLinksContainer.classList.contains('open')) navLinksContainer.classList.remove('open');
  });
});

// Also handle .btn links with data-page
document.querySelectorAll('[data-page-btn]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    showPage(btn.dataset.pageBtn);
  });
});

menuBtn?.addEventListener('click', () => navLinksContainer.classList.toggle('open'));

// Close mobile nav when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('nav') && navLinksContainer.classList.contains('open')) {
    navLinksContainer.classList.remove('open');
  }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 40);
});

// ── REVEAL ON SCROLL ──
function initReveal() {
  const reveals = document.querySelectorAll('.page.active .reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}

// ── SKILL BARS ──
function initSkillBars() {
  const bars = document.querySelectorAll('.page.active .skill-bar-fill');
  bars.forEach(bar => {
    const pct = bar.dataset.pct;
    setTimeout(() => { bar.style.width = pct + '%'; }, 300);
  });
}

// ── CONTACT FORM ──
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.form-submit');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'var(--accent3)';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    this.reset();
  }, 3000);
});

// ── TYPED EFFECT ON HERO ──
const titles = ['CS Graduate', 'Data Mining Intern', 'Frontend Learner', 'Python Developer'];
let ti = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  if (!typedEl) return;
  const word = titles[ti];
  if (deleting) {
    typedEl.textContent = word.substring(0, ci--);
    if (ci < 0) { deleting = false; ti = (ti + 1) % titles.length; setTimeout(type, 400); return; }
  } else {
    typedEl.textContent = word.substring(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1600); return; }
  }
  setTimeout(type, deleting ? 50 : 90);
}
setTimeout(type, 1800);

// ── INIT ──
showPage('home');
