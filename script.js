const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 35, 180)}ms`;
  observer.observe(el);
});

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.style.background = y > 20 ? 'rgba(11,11,12,.78)' : 'transparent';
  header.style.backdropFilter = y > 20 ? 'blur(18px)' : 'none';
  header.classList.toggle('scrolled', y > 20);
}, { passive: true });

// Subtle pointer interaction for desktop cards.
if (window.matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.project, .hero-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.setProperty('--mx', `${x * 2}`);
      card.style.setProperty('--my', `${y * 2}`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--mx', '0');
      card.style.setProperty('--my', '0');
    });
  });
}

// Smooth anchor navigation.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
