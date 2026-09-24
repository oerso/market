// ========== ДАННЫЕ ==========
const PRODUCTS = [
  { id: 1, flag: '🇺🇸', name: 'США', sub: '2078 покупок · автовыдача', price: 89, oldPrice: 99 },
  { id: 2, flag: '🇬🇧', name: 'Великобритания', sub: '107 покупок · автовыдача', price: 159 },
  { id: 3, flag: '🇯🇵', name: 'Япония', sub: '52 покупки · автовыдача', price: 349 },
  { id: 4, flag: '🇨🇴', name: 'Колумбия', sub: '34 покупки · автовыдача', price: 129 },
  { id: 5, flag: '🇰🇿', name: 'Казахстан', sub: '88 покупок · автовыдача', price: 99 },
];

// ========== TELEGRAM ==========
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  const u = tg.initDataUnsafe?.user;
  if (u) {
    document.getElementById('userName').textContent = '@' + (u.username || u.first_name || 'user');
    document.getElementById('userId').textContent = '@id' + u.id;
    document.getElementById('userAvatar').textContent = (u.first_name || 'U')[0].toUpperCase();
  }
}

// ========== НАВИГАЦИЯ ==========
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');
  // активная кнопка в нижней навигации
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.page === pageId);
  });
  window.scrollTo(0, 0);
}

document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const page = el.dataset.page;
    if (['main','profile','inventory'].includes(page)) showPage(page);
    else alert('Страница "' + page + '" в разработке');
    closeDropdown();
  });
});

// ========== ВЫПАДАЮЩЕЕ МЕНЮ (3 точки) ==========
const dotsBtn = document.getElementById('dotsBtn');
const dropdown = document.getElementById('dropdownMenu');

dotsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdown.classList.toggle('show');
});

document.addEventListener('click', () => dropdown.classList.remove('show'));
dropdown.addEventListener('click', (e) => e.stopPropagation());

function closeDropdown() { dropdown.classList.remove('show'); }

// ========== СКРЫТАЯ АДМИНКА (3 тапа по "Market") ==========
let tapCount = 0;
let tapTimer = null;
const brandLogo = document.getElementById('brandLogo');

brandLogo.addEventListener('click', () => {
  tapCount++;
  clearTimeout(tapTimer);
  tapTimer = setTimeout(() => { tapCount = 0; }, 800);

  if (tapCount >= 3) {
    tapCount = 0;
    document.getElementById('passModal').classList.add('show');
  }
});

document.getElementById('passCancel').addEventListener('click', () => {
  document.getElementById('passModal').classList.remove('show');
  document.getElementById('adminPass').value = '';
});

document.getElementById('passOk').addEventListener('click', () => {
  const pass = document.getElementById('adminPass').value;
  if (pass === '123123') {
    document.getElementById('passModal').classList.remove('show');
    document.getElementById('adminPass').value = '';
    showPage('admin');
    renderAdminTab('stats');
  } else {
    alert('Неверный пароль');
    document.getElementById('adminPass').value = '';
  }
});

// ========== АДМИНКА ==========
document.querySelectorAll('.admin-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderAdminTab(tab.dataset.tab);
  });
});

function renderAdminTab(tab) {
  const c = document.getElementById('adminContent');
  if (tab === 'stats') {
    c.innerHTML = `
      <h4>📊 Статистика (тест)</h4>
      <div class="row"><span>Пользователей</span><span>1 247</span></div>
      <div class="row"><span>Заказов сегодня</span><span>32</span></div>
      <div class="row"><span>Выручка сегодня</span><span>4 890 ₽</span></div>
      <div class="row"><span>Выручка за месяц</span><span>87 300 ₽</span></div>
      <div class="row"><span>Активных промокодов</span><span>3</span></div>
    `;
  } else if (tab === 'promo') {
    c.innerHTML = `
      <h4>🎟 Промокоды (тест)</h4>
      <input type="text" placeholder="Код (напр. SALE10)" id="promoCode">
      <input type="number" placeholder="Скидка %" id="promoDisc">
      <button onclick="addPromo()">Добавить промокод</button>
      <div id="promoList" style="margin-top:12px;"></div>
    `;
    renderPromoList();
  } else if (tab === 'products') {
    c.innerHTML = `
      <h4>📦 Товары (тест)</h4>
      <div class="row"><span>США 🇺🇸</span><span>89 ₽</span></div>
      <div class="row"><span>Англия 🇬🇧</span><span>159 ₽</span></div>
      <div class="row"><span>Япония 🇯🇵</span><span>349 ₽</span></div>
      <div class="row"><span>Колумбия 🇨🇴</span><span>129 ₽</span></div>
      <div class="row"><span>Казахстан 🇰🇿</span><span>99 ₽</span></div>
      <button onclick="alert('Тут будет форма добавления товара')">+ Добавить товар</button>
    `;
  } else if (tab === 'users') {
    c.innerHTML = `
      <h4>👤 Юзеры (тест)</h4>
      <div class="row"><span>@desired</span><span>0 ₽</span></div>
      <div class="row"><span>@test_user</span><span>150 ₽</span></div>
      <div class="row"><span>@buyer01</span><span>500 ₽</span></div>
    `;
  }
}

function addPromo() {
  const code = document.getElementById('promoCode').value.trim().toUpperCase();
  const disc = document.getElementById('promoDisc').value;
  if (!code || !disc) return alert('Заполни оба поля');
  const promos = JSON.parse(localStorage.getItem('promos') || '[]');
  promos.push({ code, disc });
  localStorage.setItem('promos', JSON.stringify(promos));
  document.getElementById('promoCode').value = '';
  document.getElementById('promoDisc').value = '';
  renderPromoList();
}

function renderPromoList() {
  const promos = JSON.parse(localStorage.getItem('promos') || '[]');
  const el = document.getElementById('promoList');
  if (!el) return;
  el.innerHTML = promos.length
    ? promos.map(p => `<div class="row"><span>${p.code}</span><span>-${p.disc}%</span></div>`).join('')
    : '<div style="color:#666;font-size:12px;">Пока нет промокодов</div>';
}

// ========== РЕНДЕР ТОВАРОВ ==========
function renderProducts() {
  const list = document.getElementById('productsList');
  list.innerHTML = PRODUCTS.map(p => `
    <div class="product">
      <div class="product-info">
        <span class="product-flag">${p.flag}</span>
        <div>
          <div class="product-name">${p.name}</div>
          <div class="product-sub">${p.sub}</div>
        </div>
      </div>
      <div class="product-price">${p.price}₽</div>
    </div>
  `).join('');
}
renderProducts();

// ========== ТАЙМЕР АКЦИИ ==========
let promoSeconds = 41 * 3600 + 27 * 60 + 35;
setInterval(() => {
  if (promoSeconds <= 0) return;
  promoSeconds--;
  const h = String(Math.floor(promoSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((promoSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(promoSeconds % 60).padStart(2, '0');
  document.getElementById('promoTimer').textContent = `ещё ${h}:${m}:${s}`;
}, 1000);
