// ==================== PRELOADER ====================
window.addEventListener('load', () => {
  const p = document.getElementById('preloader');
  p.style.opacity = '0';
  setTimeout(() => p.style.display = 'none', 700);
});

// ==================== FOOTER YEAR ====================
document.getElementById('year').textContent = new Date().getFullYear();

// ==================== MOBILE MENU ====================
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
mobileMenu?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.add('hidden'))
);

// ==================== SCROLL PROGRESS BAR ====================
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progressBar.style.width = scrolled + '%';
});

// ==================== NAV BACKGROUND ON SCROLL ====================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('shadow-lg', 'bg-ink-950/90');
  } else {
    nav.classList.remove('shadow-lg', 'bg-ink-950/90');
  }
});

// ==================== BACK TO TOP ====================
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 500);
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ==================== REVEAL ON SCROLL ====================
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ==================== ACTIVE NAV LINK ====================
const sections = ['about','skills','experience','projects','certs','contact'];
const navLinks = document.querySelectorAll('.nav-link');
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting){
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      active?.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(id => { const el = document.getElementById(id); if (el) spy.observe(el); });

// ==================== TYPING EFFECT ====================
const roles = [
  'break software',
  'automate everything',
  'catch bugs early',
  'ship reliable code',
  'engineer quality'
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 40 : 90);
}
if (typedEl) type();

// ==================== COPY EMAIL ====================
const copyBtn = document.getElementById('copyEmail');
const copyStatus = document.getElementById('copyStatus');
copyBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('caarlcena@gmail.com');
    copyStatus.style.opacity = '1';
    setTimeout(() => copyStatus.style.opacity = '0', 1800);
  } catch (e) { console.warn('Clipboard failed', e); }
});

// ==================== ANIMATED STAT COUNTER ====================
const counters = document.querySelectorAll('[data-count]');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = +el.dataset.count;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 30));
      const tick = () => {
        current += step;
        if (current >= target) { el.textContent = target + '+'; return; }
        el.textContent = current;
        requestAnimationFrame(tick);
      };
      tick();
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

// ==================== PROFICIENCY BAR ANIMATION ====================
document.querySelectorAll('.fill').forEach(bar => {
  bar.style.setProperty('--w', bar.style.width);
  bar.style.width = '0';
});
const proObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.fill').forEach(bar => {
        bar.style.width = bar.style.getPropertyValue('--w');
      });
      proObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.proficiency').forEach(el => proObs.observe(el));

// ==================== SKILL CARD SPOTLIGHT ====================
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  });
});