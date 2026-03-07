const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
  setTimeout(() => preloader?.classList.add('is-hidden'), 700);
});

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach((el) => revealObserver.observe(el));

function initGallerySlider() {
  const slider = document.querySelector('[data-slider]');
  if (!slider) return;

  const slides = [...slider.querySelectorAll('.gallery-slide')];
  const dotsWrap = slider.querySelector('[data-dots]');
  const prevBtn = slider.querySelector('[data-prev]');
  const nextBtn = slider.querySelector('[data-next]');
  let index = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
    dot.addEventListener('click', () => showSlide(i));
    dotsWrap?.appendChild(dot);
  });

  const dots = dotsWrap ? [...dotsWrap.querySelectorAll('button')] : [];

  function showSlide(newIndex) {
    index = (newIndex + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  }

  function start() {
    stop();
    timer = window.setInterval(() => showSlide(index + 1), 4500);
  }

  function stop() {
    if (timer) window.clearInterval(timer);
  }

  prevBtn?.addEventListener('click', () => {
    showSlide(index - 1);
    start();
  });
  nextBtn?.addEventListener('click', () => {
    showSlide(index + 1);
    start();
  });

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('touchstart', stop, { passive: true });
  slider.addEventListener('touchend', start, { passive: true });

  showSlide(0);
  start();
}

function initTestimonials() {
  const cards = [...document.querySelectorAll('[data-testimonials] .testimonial-card')];
  if (!cards.length) return;

  let index = 0;
  cards[0].classList.add('is-active');
  window.setInterval(() => {
    cards[index].classList.remove('is-active');
    index = (index + 1) % cards.length;
    cards[index].classList.add('is-active');
  }, 4800);
}

function initWhatsForm() {
  const form = document.getElementById('whatsForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nombre = data.get('nombre') || '';
    const evento = data.get('evento') || '';
    const fecha = data.get('fecha') || '';
    const mensaje = data.get('mensaje') || '';

    const text = `Hola Alquiladora Reyes, soy ${nombre}. Quiero cotizar mobiliario para ${evento}. Fecha aproximada: ${fecha || 'por definir'}. Detalles: ${mensaje || 'Me gustaría recibir más información.'}`;
    const url = `https://wa.me/525559475717?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

initGallerySlider();
initTestimonials();
initWhatsForm();
