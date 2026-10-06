const products = [
  { type: '기본 영양', title: '데일리 멀티', description: '하루에 필요한 비타민과 미네랄을 한 번의 루틴으로 정리했습니다.', composition: '비타민 B군 · 비타민 C · 아연', price: '28,000원', use: '1일 1회, 2정을 물과 함께 섭취', pack: '60정 / 30일분', background: '#d7deed', position: '69%', scale: '1.04' },
  { type: '미네랄', title: '마그네슘', description: '바쁜 하루의 끝에도 간편하게 챙길 수 있는 미네랄 루틴입니다.', composition: '마그네슘 315 mg · 비타민 B6', price: '24,000원', use: '1일 1회, 2정을 물과 함께 섭취', pack: '60정 / 30일분', background: '#eee4d4', position: '91%', scale: '1.17' },
  { type: '비타민', title: '비타민 D', description: '실내에서 보내는 시간이 긴 날을 위한 작은 영양 습관입니다.', composition: '비타민 D3 2,000 IU', price: '19,000원', use: '1일 1회, 1캡슐을 물과 함께 섭취', pack: '30캡슐 / 30일분', background: '#f2d8c5', position: '100%', scale: '1.3' }
];

const root = document.documentElement;
const intro = document.querySelector('#intro-screen');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let introTimer;
function endIntro() {
  if (!root.classList.contains('show-intro')) return;
  window.clearTimeout(introTimer);
  intro.classList.add('out');
  try { sessionStorage.setItem('ongyeol-intro-seen', '1'); } catch (error) { /* storage can be unavailable */ }
  window.setTimeout(() => {
    root.classList.remove('show-intro');
    document.body.classList.remove('intro-running');
    intro.hidden = true;
  }, reduceMotion ? 0 : 780);
}
if (root.classList.contains('show-intro') && !reduceMotion) {
  document.body.classList.add('intro-running');
  introTimer = window.setTimeout(endIntro, 2450);
  document.querySelector('#skip-intro').addEventListener('click', endIntro);
} else {
  root.classList.remove('show-intro');
  intro.hidden = true;
}

const header = document.querySelector('#site-header');
const menu = document.querySelector('#mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
function closeMenu() {
  menu.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '메뉴 열기');
  header.classList.remove('menu-open');
}
menuToggle.addEventListener('click', () => {
  const opening = menu.hidden;
  menu.hidden = !opening;
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? '메뉴 닫기' : '메뉴 열기');
  header.classList.toggle('menu-open', opening);
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !menu.hidden) closeMenu();
});

const options = [...document.querySelectorAll('.product-option')];
const stage = document.querySelector('#collection-stage');
const dialog = document.querySelector('#product-dialog');
let activeProduct = 0;
let switchTimer;
function selectProduct(index) {
  const product = products[index];
  if (!product) return;
  activeProduct = index;
  window.clearTimeout(switchTimer);
  stage.classList.add('switching');
  options.forEach((button, i) => {
    button.classList.toggle('is-active', i === index);
    button.setAttribute('aria-pressed', String(i === index));
  });
  switchTimer = window.setTimeout(() => {
    stage.style.background = product.background;
    stage.style.setProperty('--img-pos', product.position);
    stage.style.setProperty('--img-scale', product.scale);
    document.querySelector('#collection-giant').textContent = String(index + 1).padStart(2, '0');
    document.querySelector('#product-type').textContent = product.type;
    document.querySelector('#product-title').textContent = product.title;
    document.querySelector('#product-description').textContent = product.description;
    document.querySelector('#product-composition').textContent = product.composition;
    document.querySelector('#product-price').textContent = product.price;
    stage.classList.remove('switching');
  }, reduceMotion ? 0 : 190);
}
options.forEach((button) => button.addEventListener('click', () => selectProduct(Number(button.dataset.product))));

document.querySelector('#detail-open').addEventListener('click', () => {
  const product = products[activeProduct];
  document.querySelector('#dialog-title').textContent = product.title;
  document.querySelector('#dialog-copy').textContent = product.description;
  document.querySelector('#dialog-composition').textContent = product.composition;
  document.querySelector('#dialog-use').textContent = product.use;
  document.querySelector('#dialog-pack').textContent = product.pack;
  document.querySelector('#dialog-price').textContent = product.price;
  dialog.showModal();
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-select').addEventListener('click', () => {
  dialog.close();
  document.querySelector('#products').scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
  options[activeProduct].focus({ preventScroll: true });
});
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

const statementLines = document.querySelectorAll('.statement-line');
if ('IntersectionObserver' in window) {
  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        lineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statementLines.forEach((line) => lineObserver.observe(line));
} else statementLines.forEach((line) => line.classList.add('active'));

const hero = document.querySelector('.hero');
const heroVideo = document.querySelector('.hero-video');
const heroProduct = document.querySelector('#hero-product');
const aperture = document.querySelector('.aperture');
const apertureMedia = document.querySelector('#aperture-media');
const standard = document.querySelector('.standard');
const steps = [...document.querySelectorAll('.standard-step')];
const progressBar = document.querySelector('.scroll-progress span');
const largeScreen = window.matchMedia('(min-width: 641px)');
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
let ticking = false;
function paintScroll() {
  ticking = false;
  const pageRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  progressBar.style.transform = `scaleX(${window.scrollY / pageRange})`;
  header.classList.toggle('scrolled', window.scrollY > 55);
  if (!reduceMotion) {
    const heroProgress = clamp(window.scrollY / Math.max(hero.offsetHeight, 1), 0, 1);
    heroVideo.style.transform = `scale(${1.06 + heroProgress * .16})`;
    if (largeScreen.matches) {
      const rect = aperture.getBoundingClientRect();
      const range = Math.max(1, aperture.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / range, 0, 1);
      apertureMedia.style.setProperty('--radius', `${20 + progress * 98}%`);
    }
  }
  const sr = standard.getBoundingClientRect();
  const standardProgress = clamp((window.innerHeight - sr.top) / Math.max(sr.height, 1), 0, 1);
  standard.style.setProperty('--standard-progress', standardProgress.toFixed(3));
  steps.forEach((step, index) => step.classList.toggle('current', standardProgress > (index + .5) / (steps.length + 1)));
}
function schedulePaint() { if (!ticking) { ticking = true; requestAnimationFrame(paintScroll); } }
window.addEventListener('scroll', schedulePaint, { passive: true });
window.addEventListener('resize', schedulePaint);
paintScroll();

if (!reduceMotion && largeScreen.matches && window.matchMedia('(pointer:fine)').matches) {
  hero.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - .5) * 20;
    const y = (event.clientY / window.innerHeight - .5) * 15;
    heroProduct.style.setProperty('--tx', `${x}px`);
    heroProduct.style.setProperty('--ty', `${y}px`);
  }, { passive: true });
  hero.addEventListener('pointerleave', () => {
    heroProduct.style.setProperty('--tx', '0px');
    heroProduct.style.setProperty('--ty', '0px');
  });
}
if (reduceMotion) heroVideo.pause();
document.addEventListener('visibilitychange', () => {
  if (document.hidden) heroVideo.pause();
  else if (!reduceMotion) heroVideo.play().catch(() => {});
});
