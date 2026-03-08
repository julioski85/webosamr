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

function buildGallery() {
  const stage = document.querySelector('[data-gallery-stage]');
  if (!stage) return;

  const assetImages = [
    '45456365.jpg',
    'asd.jpg',
    'asdasd.jpg',
    'bvbv.jpg',
    'cvbvbcv.jpg',
    'cvxvcvx.jpg',
    'ertergr.jpg',
    'erwere.jpg',
    'fgdfg.jpg',
    'gfgdf.jpg',
    'gfgdffgfg.jpg',
    'ghdfh.jpg',
    'ghfghfg.jpg',
    'hjghjghj.jpg',
    'iuiouoi.jpg',
    'lñklñkl.jpg',
    'mnmbnm.jpg',
    'oiouio.jpg',
    'popopk.jpg',
    'qwewe.jpg',
    'sadasd.jpg',
    'tytyyt.jpg',
    'uiyui.jpg',
    'uyiyuiuy.jpg',
    'ytutyuyt.jpg',
    'logo.jpg'
  ];

  const galleryImages = assetImages.filter((image) => image.toLowerCase() !== 'logo.jpg');

  stage.innerHTML = galleryImages.map((image, index) => {
    const activeClass = index === 0 ? ' is-active' : '';
    return `<figure class="slide${activeClass}"><img src="assets/images/${image}" alt="Galería de mobiliario para eventos ${index + 1}" loading="lazy" /></figure>`;
  }).join('');
}

function initSlider() {
  const slider = document.querySelector('[data-slider]');
  if (!slider) return;

  const slides = [...slider.querySelectorAll('.slide')];
  const dotsWrap = slider.querySelector('[data-dots]');
  const prev = slider.querySelector('[data-prev]');
  const next = slider.querySelector('[data-next]');
  if (!slides.length) return;

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

function initBenefitsCarousel() {
  const carousel = document.querySelector('[data-benefits-carousel]');
  const track = carousel?.querySelector('.benefits-track');
  if (!carousel || !track) return;

  const originals = [...track.children];
  if (originals.length < 2) return;

  originals.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  let position = 0;
  let cardWidth = 0;
  let rafId;
  const speed = 0.45;

  function measure() {
    const firstCard = track.querySelector('article');
    if (!firstCard) return;
    const firstRect = firstCard.getBoundingClientRect();
    const secondCard = firstCard.nextElementSibling;
    const secondRect = secondCard?.getBoundingClientRect();
    const gap = secondRect ? secondRect.left - firstRect.right : 16;
    cardWidth = firstRect.width + gap;
  }

  function animate() {
    position += speed;
    if (position >= cardWidth * originals.length) {
      position = 0;
    }
    track.style.transform = `translateX(${-position}px)`;
    rafId = window.requestAnimationFrame(animate);
  }

  function start() {
    if (rafId) return;
    rafId = window.requestAnimationFrame(animate);
  }

  function stop() {
    if (!rafId) return;
    window.cancelAnimationFrame(rafId);
    rafId = null;
  }

  window.addEventListener('resize', measure);
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);

  measure();
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

buildGallery();
initSlider();
initBenefitsCarousel();
initTestimonials();
initForm();
