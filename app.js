const products = [
  {
    type: '기본 영양',
    title: '데일리 멀티',
    description: '하루에 필요한 비타민과 미네랄을 한 번의 루틴으로 정리했습니다.',
    composition: '비타민 B군 · 비타민 C · 아연',
    price: '28,000원',
    use: '1일 1회, 2정을 물과 함께 섭취',
    pack: '60정 / 30일분',
    surface: '#f8f4ec'
  },
  {
    type: '미네랄',
    title: '마그네슘',
    description: '바쁜 하루의 끝에도 간편하게 챙길 수 있는 미네랄 루틴입니다.',
    composition: '마그네슘 315 mg · 비타민 B6',
    price: '24,000원',
    use: '1일 1회, 2정을 물과 함께 섭취',
    pack: '60정 / 30일분',
    surface: '#e7ecf4'
  },
  {
    type: '비타민',
    title: '비타민 D',
    description: '실내에서 보내는 시간이 긴 날을 위한 작은 영양 습관입니다.',
    composition: '비타민 D3 2,000 IU',
    price: '19,000원',
    use: '1일 1회, 1캡슐을 물과 함께 섭취',
    pack: '30캡슐 / 30일분',
    surface: '#f9efe3'
  }
];

const optionButtons = [...document.querySelectorAll('.product-option')];
const feature = document.querySelector('#product-feature');
const dialog = document.querySelector('#product-dialog');
let activeProduct = 0;

function showProduct(index) {
  const item = products[index];
  if (!item) return;
  activeProduct = index;
  optionButtons.forEach((button, buttonIndex) => {
    const selected = buttonIndex === index;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  feature.classList.add('changed');
  feature.style.background = item.surface;
  document.querySelector('#product-type').textContent = item.type;
  document.querySelector('#product-title').textContent = item.title;
  document.querySelector('#product-description').textContent = item.description;
  document.querySelector('#product-composition').textContent = item.composition;
  document.querySelector('#product-price').textContent = item.price;
  window.setTimeout(() => feature.classList.remove('changed'), 420);
}

optionButtons.forEach((button) => {
  button.addEventListener('click', () => showProduct(Number(button.dataset.product)));
});

document.querySelector('#detail-open').addEventListener('click', () => {
  const item = products[activeProduct];
  document.querySelector('#dialog-title').textContent = item.title;
  document.querySelector('#dialog-copy').textContent = item.description;
  document.querySelector('#dialog-composition').textContent = item.composition;
  document.querySelector('#dialog-use').textContent = item.use;
  document.querySelector('#dialog-pack').textContent = item.pack;
  document.querySelector('#dialog-price').textContent = item.price;
  dialog.showModal();
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-select').addEventListener('click', () => {
  dialog.close();
  document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
  optionButtons[activeProduct].focus({ preventScroll: true });
});
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
function closeMenu() {
  mobileMenu.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '메뉴 열기');
}
menuToggle.addEventListener('click', () => {
  const shouldOpen = mobileMenu.hidden;
  mobileMenu.hidden = !shouldOpen;
  menuToggle.setAttribute('aria-expanded', String(shouldOpen));
  menuToggle.setAttribute('aria-label', shouldOpen ? '메뉴 닫기' : '메뉴 열기');
});
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileMenu.hidden) closeMenu();
});

const header = document.querySelector('.site-header');
function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 40); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
