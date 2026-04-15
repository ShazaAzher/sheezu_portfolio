/* ── Navbar scroll ── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile menu ── */
const toggle   = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks  = mobileMenu.querySelectorAll('a');
toggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileLinks.forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ── Hero name animation ──
   Line 1 ("Shaza"): letter-by-letter reveal
   Line 2 ("Azher."): whole-word fade-up (shimmer gradient can't survive being split into spans)
── */
function animateLetters(el, baseDelay) {
  const text = el.textContent;
  el.textContent = '';
  [...text].forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = ch === ' ' ? '\u00a0' : ch;
    span.style.animationDelay = `${baseDelay + i * 0.065}s`;
    el.appendChild(span);
  });
}

animateLetters(document.getElementById('hero-line-1'), 0.3);

/* Line 2 fades up as one whole shimmer word */
const line2 = document.getElementById('hero-line-2');
line2.style.opacity = '0';
line2.style.transform = 'translateY(36px)';
line2.style.transition = 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)';
setTimeout(() => {
  line2.style.opacity = '1';
  line2.style.transform = 'translateY(0)';
}, 780);

/* ── Sparkles in hero ── */
(function createSparkles() {
  const hero = document.getElementById('hero');
  const positions = [
    { left: '15%', top: '22%', delay: '0s'   },
    { left: '80%', top: '14%', delay: '1.1s' },
    { left: '70%', top: '74%', delay: '2.3s' },
    { left: '26%', top: '80%', delay: '0.8s' },
    { left: '88%', top: '46%', delay: '3.0s' },
  ];
  positions.forEach(pos => {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = '✦';
    s.style.cssText = `left:${pos.left};top:${pos.top};animation-delay:${pos.delay}`;
    hero.appendChild(s);
  });
})();

/* ── Scroll reveal ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
