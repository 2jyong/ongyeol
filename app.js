const products = [
  {
    category: '기본 영양',
    name: '데일리 멀티',
    description: '하루에 필요한 비타민과 미네랄을 한 번의 루틴으로 정리했습니다.',
    ingredients: '비타민 B군 · 비타민 C · 아연',
    pack: '60정 / 30일분',
    use: '1일 1회, 2정을 물과 함께 섭취',
    price: '28,000원',
    color: '#e8e8db',
    image: 'assets/hero-editorial.webp',
    position: '76%',
    scale: '1.18'
  },
  {
    category: '미네랄',
    name: '마그네슘',
    description: '바쁜 하루의 끝에도 간편하게 챙길 수 있는 미네랄 루틴입니다.',
    ingredients: '마그네슘 315 mg · 비타민 B6',
    pack: '60정 / 30일분',
    use: '1일 1회, 2정을 물과 함께 섭취',
    price: '24,000원',
    color: '#dce6d8',
    image: 'assets/product-magnesium.webp',
    position: '50%',
    scale: '1.05'
  },
  {
    category: '비타민',
    name: '비타민 D',
    description: '실내에서 보내는 시간이 긴 날을 위한 작은 영양 습관입니다.',
    ingredients: '비타민 D3 2,000 IU',
    pack: '30캡슐 / 30일분',
    use: '1일 1회, 1캡슐을 물과 함께 섭취',
    price: '19,000원',
    color: '#ead7c9',
    image: 'assets/product-vitamin-d.webp',
    position: '50%',
    scale: '1.05'
  }
];

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const opening = document.querySelector('#opening');
const openingVideo = document.querySelector('.opening-video');
const closingVideo = document.querySelector('.closing-video');
let openingTimer;

function finishOpening() {
  if (!root.classList.contains('has-opening') || opening.classList.contains('out')) return;
  window.clearTimeout(openingTimer);
  opening.classList.add('out');
  try { sessionStorage.setItem('ongyeol-opening-v2', '1'); } catch (error) { /* Storage may be unavailable. */ }
  window.setTimeout(() => {
    root.classList.remove('has-opening');
    document.body.classList.remove('opening-lock');
    opening.hidden = true;
    openingVideo.pause();
  }, reduceMotion ? 0 : 950);
}

if (root.classList.contains('has-opening') && !reduceMotion) {
  document.body.classList.add('opening-lock');
  openingTimer = window.setTimeout(finishOpening, 3000);
  document.querySelector('#opening-skip').addEventListener('click', finishOpening);
} else {
  root.classList.remove('has-opening');
  opening.hidden = true;
  openingVideo.pause();
}

const header = document.querySelector('#site-header');
const mobileMenu = document.querySelector('#mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
function closeMenu() {
  mobileMenu.hidden = true;
  header.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '메뉴 열기');
}
menuToggle.addEventListener('click', () => {
  const open = mobileMenu.hidden;
  mobileMenu.hidden = !open;
  header.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileMenu.hidden) closeMenu();
});

const productTabs = [...document.querySelectorAll('.product-tab')];
const stage = document.querySelector('#product-stage');
const productImage = document.querySelector('#product-img');
const dialog = document.querySelector('#product-dialog');
let activeProduct = 0;
let switchTimer;
products.slice(1).forEach((product) => { const image = new Image(); image.src = product.image; });
function selectProduct(index) {
  const product = products[index];
  if (!product) return;
  activeProduct = index;
  window.clearTimeout(switchTimer);
  stage.classList.add('switching');
  productTabs.forEach((tab, i) => {
    tab.classList.toggle('is-active', i === index);
    tab.setAttribute('aria-pressed', String(i === index));
  });
  switchTimer = window.setTimeout(() => {
    stage.style.backgroundColor = product.color;
    productImage.src = product.image;
    productImage.alt = product.name + ' 제품 연출 이미지';
    stage.style.setProperty('--product-position', product.position);
    stage.style.setProperty('--product-scale', product.scale);
    document.querySelector('#product-number').textContent = String(index + 1).padStart(2, '0');
    document.querySelector('#product-category').textContent = product.category;
    document.querySelector('#product-name').textContent = product.name;
    document.querySelector('#product-description').textContent = product.description;
    document.querySelector('#product-ingredients').textContent = product.ingredients;
    document.querySelector('#product-pack').textContent = product.pack;
    document.querySelector('#product-price').textContent = product.price;
    stage.classList.remove('switching');
  }, reduceMotion ? 0 : 170);
}
productTabs.forEach((tab) => tab.addEventListener('click', () => selectProduct(Number(tab.dataset.product))));
document.querySelectorAll('[data-product-link]').forEach((link) => link.addEventListener('click', () => selectProduct(Number(link.dataset.productLink))));
document.querySelectorAll('[data-recommend]').forEach((button) => button.addEventListener('click', () => {
  selectProduct(Number(button.dataset.recommend));
  document.querySelector('#products').scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
  history.replaceState(null, '', '#products');
}));

document.querySelector('#product-detail').addEventListener('click', () => {
  const product = products[activeProduct];
  document.querySelector('#dialog-title').textContent = product.name;
  document.querySelector('#dialog-copy').textContent = product.description;
  document.querySelector('#dialog-ingredients').textContent = product.ingredients;
  document.querySelector('#dialog-use').textContent = product.use;
  document.querySelector('#dialog-pack').textContent = product.pack;
  document.querySelector('#dialog-price').textContent = product.price;
  if (!dialog.open) dialog.showModal();
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-back').addEventListener('click', () => {
  dialog.close();
  productTabs[activeProduct].focus({ preventScroll: true });
});
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const ingredientViewport = document.querySelector('#ingredient-viewport');
const ingredientCards = [...document.querySelectorAll('.ingredient-card')];
const ingredientCurrent = document.querySelector('#ingredient-current');
function moveIngredient(direction) {
  const width = ingredientCards[0].getBoundingClientRect().width + 18;
  ingredientViewport.scrollBy({ left: direction * width, behavior: reduceMotion ? 'instant' : 'smooth' });
}
document.querySelector('#ingredient-prev').addEventListener('click', () => moveIngredient(-1));
document.querySelector('#ingredient-next').addEventListener('click', () => moveIngredient(1));
ingredientViewport.addEventListener('scroll', () => {
  const cardWidth = ingredientCards[0].getBoundingClientRect().width + 18;
  const index = Math.min(3, Math.max(1, Math.round(ingredientViewport.scrollLeft / cardWidth) + 1));
  ingredientCurrent.textContent = String(index).padStart(2, '0');
}, { passive: true });

const reveals = document.querySelectorAll('.reveal-copy');
if ('IntersectionObserver' in window && !reduceMotion) {
  root.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  reveals.forEach((element) => revealObserver.observe(element));
}

const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-image img');
const origin = document.querySelector('.origin');
const originImage = document.querySelector('#origin-image');
const method = document.querySelector('.method');
const methodOrbit = document.querySelector('.method-orbit');
const methodSteps = [...document.querySelectorAll('.method-step')];
const mobileQuick = document.querySelector('.mobile-quick');
const productSection = document.querySelector('.products');
const closing = document.querySelector('.closing');
const pageProgress = document.querySelector('.page-progress span');
const clamp = (number, min, max) => Math.min(max, Math.max(min, number));
let ticking = false;
function paintScroll() {
  ticking = false;
  const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  pageProgress.style.transform = 'scaleX(' + clamp(window.scrollY / scrollRange, 0, 1) + ')';
  header.classList.toggle('scrolled', window.scrollY > 40);
  const closingTop = closing.getBoundingClientRect().top;
  const productRect = productSection.getBoundingClientRect();
  const methodRect = method.getBoundingClientRect();
  const productVisible = productRect.top < window.innerHeight * .7 && productRect.bottom > window.innerHeight * .2;
  const methodVisible = methodRect.top < window.innerHeight * .7 && methodRect.bottom > window.innerHeight * .2;
  mobileQuick.classList.toggle('show', window.scrollY > hero.offsetHeight * .7 && closingTop > window.innerHeight * .7 && !productVisible && !methodVisible);

  if (!reduceMotion) {
    const heroProgress = clamp(window.scrollY / Math.max(hero.offsetHeight, 1), 0, 1);
    heroImage.style.transform = 'scale(' + (1.05 + heroProgress * .12) + ')';
    if (window.innerWidth > 700) {
      const originRect = origin.getBoundingClientRect();
      const originRange = Math.max(1, origin.offsetHeight - window.innerHeight);
      const originProgress = clamp(-originRect.top / originRange, 0, 1);
      originImage.style.setProperty('--origin-inset', (11 * (1 - originProgress)).toFixed(2) + '%');
      originImage.style.setProperty('--origin-radius', (25 * (1 - originProgress)).toFixed(1) + 'px');
    }
  }

  const firstStepTop = methodSteps[0].getBoundingClientRect().top;
  const lastStepTop = methodSteps[methodSteps.length - 1].getBoundingClientRect().top;
  const methodTrigger = window.innerHeight * .78;
  const methodStarted = firstStepTop <= methodTrigger;
  const methodProgress = methodStarted
    ? clamp((methodTrigger - firstStepTop) / Math.max(lastStepTop - firstStepTop, 1), 0, 1)
    : 0;
  methodOrbit.style.setProperty('--method-rotate', Math.round(methodProgress * 300) + 'deg');
  let activeStep = -1;
  if (methodStarted) {
    methodSteps.forEach((step, index) => {
      if (step.getBoundingClientRect().top <= methodTrigger) activeStep = index;
    });
  }
  methodSteps.forEach((step, index) => step.classList.toggle('active', index === activeStep));
}
function schedulePaint() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(paintScroll);
  }
}
window.addEventListener('scroll', schedulePaint, { passive: true });
window.addEventListener('resize', schedulePaint);
paintScroll();
window.addEventListener('load', () => {
  if (!location.hash) return;
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
});

if (reduceMotion) {
  openingVideo.pause();
  closingVideo.pause();
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    openingVideo.pause();
    closingVideo.pause();
  } else if (!reduceMotion) {
    if (!opening.hidden) openingVideo.play().catch(() => {});
    closingVideo.play().catch(() => {});
  }
});
