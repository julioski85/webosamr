const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
  window.setTimeout(() => preloader?.classList.add('hidden'), 850);
});

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 0.04, 0.22)}s`;
  observer.observe(item);
});

function initSlider() {
  const slider = document.querySelector('[data-slider]');
  if (!slider) return;

  const slides = [...slider.querySelectorAll('.slide')];
  const dotsWrap = slider.querySelector('[data-dots]');
  const prev = slider.querySelector('[data-prev]');
  const next = slider.querySelector('[data-next]');
  let current = 0;
  let timer;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir a la imagen ${index + 1}`);
    dot.addEventListener('click', () => goTo(index));
    dotsWrap?.appendChild(dot);
  });

  const dots = [...(dotsWrap?.querySelectorAll('button') ?? [])];

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  }

  function start() {
    stop();
    timer = window.setInterval(() => goTo(current + 1), 4200);
  }

  function stop() {
    if (timer) window.clearInterval(timer);
  }

  prev?.addEventListener('click', () => {
    goTo(current - 1);
    start();
  });

  next?.addEventListener('click', () => {
    goTo(current + 1);
    start();
  });

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);

  goTo(0);
  start();
}

function initTestimonials() {
  const cards = [...document.querySelectorAll('[data-testimonials] .testimonial-card')];
  if (!cards.length) return;

  let current = 0;
  window.setInterval(() => {
    cards[current].classList.remove('is-active');
    current = (current + 1) % cards.length;
    cards[current].classList.add('is-active');
  }, 4500);
}

function initForm() {
  const form = document.getElementById('whatsForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nombre = data.get('nombre') || 'Cliente';
    const evento = data.get('evento') || 'evento';
    const fecha = data.get('fecha') || 'por definir';
    const mensaje = data.get('mensaje') || 'Quiero más información.';
    const text = `Hola, soy ${nombre}. Quiero cotizar mobiliario para ${evento}. Fecha aproximada: ${fecha}. Mensaje: ${mensaje}`;
    window.open(`https://wa.me/525559475717?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });
}

initSlider();
initTestimonials();
initForm();
