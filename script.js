// ================= CONFIG =================
const ADMIN_PASSWORD = '837472';
const ADMIN_IDS = [7803765347, 912559442];
const REF_PERCENT = 10;
const SUPPORT_LINK = 'https://t.me/desired_support';

// ================= STORAGE WRAPPER =================
// Позже легко заменить на fetch('/api/...')
const Storage = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
  del(key) { try { localStorage.removeItem(key); } catch {} }
};

// ================= STATE =================
const state = {
  currentUser: Storage.get('currentUser'),
  users: Storage.get('users', {}), // { username: { password, createdAt } }
  cart: Storage.get('cart', []),
  reviews: Storage.get('reviews', []),
  chat: Storage.get('chat', []),
  promos: Storage.get('promos', []),
  transactions: Storage.get('transactions', []),
  tgUser: null
};

// ================= PRODUCTS =================
const PRODUCTS = [
  { id: 1, flag: '🇺🇸', name: 'США', sub: '2078 покупок · автовыдача', price: 89, oldPrice: 99, cat: 'names', rating: 5, badge: 'ХИТ' },
  { id: 2, flag: '🇬🇧', name: 'Великобритания', sub: '107 покупок · автовыдача', price: 159, cat: 'names', rating: 4.8 },
  { id: 3, flag: '🇯🇵', name: 'Япония', sub: '52 покупки · автовыдача', price: 349, cat: 'names', rating: 4.9 },
  { id: 4, flag: '🇨🇴', name: 'Колумбия', sub: '34 покупки · автовыдача', price: 129, cat: 'names', rating: 4.7 },
  { id: 5, flag: '🇰🇿', name: 'Казахстан', sub: '88 покупок · автовыдача', price: 99, cat: 'names', rating: 4.8 },
  { id: 6, flag: '⭐', name: 'Telegram Stars 100', sub: 'Мгновенная выдача', price: 145, cat: 'subs', rating: 5, badge: 'NEW' },
  { id: 7, flag: '⭐', name: 'Telegram Stars 500', sub: 'Мгновенная выдача', price: 690, cat: 'subs', rating: 5 },
  { id: 8, flag: '💎', name: 'Telegram Premium 3 мес', sub: 'Активация на аккаунт', price: 590, cat: 'subs', rating: 4.9, badge: 'ХИТ' },
  { id: 9, flag: '💎', name: 'Telegram Premium 12 мес', sub: 'Активация на аккаунт', price: 1890, cat: 'subs', rating: 4.9 },
  { id: 10, flag: '🎁', name: 'NFT подарок Basic', sub: 'Аренда 30 дней', price: 249, cat: 'nft', rating: 4.6 },
  { id: 11, flag: '🎁', name: 'NFT подарок Rare', sub: 'Аренда 30 дней', price: 890, cat: 'nft', rating: 4.8, badge: 'NEW' }
];

// ================= INIT =================
window.addEventListener('DOMContentLoaded', () => {
  initTelegram();
  if (state.currentUser) {
    enterApp();
  }
  renderAuthForm();
});

function initTelegram() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;
  tg.ready();
  tg.expand();
  tg.setHeaderColor?.('#08080a');
  tg.setBackgroundColor?.('#08080a');
  const u = tg.initDataUnsafe?.user;
  if (u) state.tgUser = u;
}

// ================= AUTH =================
function renderAuthForm() {
  const authScreen = document.getElementById('authScreen');
  if (state.currentUser) { authScreen.classList.add('hidden'); return; }
  authScreen.classList.remove('hidden');
}

function showAuthForm(which) {
  ['authChoice', 'loginForm', 'registerForm'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
  if (which === 'choice') document.getElementById('authChoice').classList.remove('hidden');
  if (which === 'login') document.getElementById('loginForm').classList.remove('hidden');
  if (which === 'register') document.getElementById('registerForm').classList.remove('hidden');
  haptic('light');
}

document.addEventListener('input', (e) => {
  if (e.target.id === 'regConfirm') {
    document.getElementById('regBtn').disabled = !e.target.checked;
  }
});

function doRegister() {
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value.trim();
  if (!username || !password) return toast('Заполни все поля', 'error');
  if (username.length < 3) return toast('Имя минимум 3 символа', 'error');
  if (password.length < 4) return toast('Пароль минимум 4 символа', 'error');
  if (state.users[username]) return toast('Такое имя уже занято', 'error');

  // Модалка подтверждения
  state._pendingReg = { username, password };
  openModal('modalConfirmReg');
}

function confirmRegister() {
  closeModal('modalConfirmReg');
  const { username, password } = state._pendingReg || {};
  if (!username) return;
  state.users[username] = { password, createdAt: Date.now() };
  Storage.set('users', state.users);
  state.currentUser = { username, tgId: state.tgUser?.id || null, createdAt: Date.now() };
  Storage.set('currentUser', state.currentUser);
  toast('Аккаунт создан!', 'success');
  enterApp();
}

function doLogin() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  if (!username || !password) return toast('Заполни все поля', 'error');
  const u = state.users[username];
  if (!u || u.password !== password) return toast('Неверные данные', 'error');
  state.currentUser = { username, tgId: state.tgUser?.id || null, createdAt: u.createdAt };
  Storage.set('currentUser', state.currentUser);
  toast('Добро пожаловать!', 'success');
  enterApp();
}

function logout() {
  state.currentUser = null;
  Storage.del('currentUser');
  document.getElementById('app').classList.add('hidden');
  document.getElementById('authScreen').classList.remove('hidden');
  showAuthForm('choice');
  toast('Вы вышли', 'success');
}

function enterApp() {
  document.getElementById('authScreen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  updateProfileUI();
  renderProducts();
  renderCartBadge();
  renderTransactions();
  renderRefLink();
  renderReviews();
  renderFAQ();
  renderChat();
  startPromoTimer();
  initCase();
  routeFromHash();
}

function updateProfileUI() {
  const name = state.currentUser?.username || 'user';
  const tgId = state.tgUser?.id || state.currentUser?.tgId || '—';
  document.getElementById('userName').textContent = '@' + name;
  document.getElementById('userId').textContent = '@id' + tgId;
  document.getElementById('userAvatar').textContent = name[0].toUpperCase();
}

// ================= NAV =================
function go(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (el) el.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === page));
  location.hash = page;
  window.scrollTo(0, 0);
  haptic('light');
  closeDropdown();
}

document.querySelectorAll('.nav-btn').forEach(b => {
  b.addEventListener('click', () => go(b.dataset.page));
});
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    go(el.dataset.page);
  });
});

function routeFromHash() {
  const h = location.hash.replace('#', '');
  if (h && document.getElementById('page-' + h)) go(h);
}
window.addEventListener('hashchange', routeFromHash);

// ================= DROPDOWN =================
const dotsBtn = document.getElementById('dotsBtn');
const dropdown = document.getElementById('dropdownMenu');
dotsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdown.classList.toggle('show');
  haptic('light');
});
document.addEventListener('click', () => dropdown.classList.remove('show'));
dropdown.addEventListener('click', (e) => e.stopPropagation());
function closeDropdown() { dropdown.classList.remove('show'); }

// ================= ADMIN (5 taps + password + id check) =================
let taps = 0, tapTimer = null;
const brandLogo = document.getElementById('brandLogo');
brandLogo.addEventListener('click', () => {
  taps++;
  clearTimeout(tapTimer);
  tapTimer = setTimeout(() => taps = 0, 900);
  if (taps >= 5) {
    taps = 0;
    haptic('medium');
    const tgId = state.tgUser?.id;
    if (tgId && !ADMIN_IDS.includes(tgId)) {
      openModal('modalDenied');
      return;
    }
    openModal('modalAdminPass');
  }
});

function checkAdminPass() {
  const val = document.getElementById('adminPassInput').value;
  if (val === ADMIN_PASSWORD) {
    document.getElementById('adminPassInput').value = '';
    closeModal('modalAdminPass');
    go('admin');
    renderAdminTab('stats');
    toast('Добро пожаловать, админ', 'success');
  } else {
    document.getElementById('adminPassInput').value = '';
    toast('Неверный пароль', 'error');
    haptic('heavy');
  }
}

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
      <h4>📊 Статистика</h4>
      <div class="admin-row"><span>Всего юзеров</span><span>${Object.keys(state.users).length}</span></div>
      <div class="admin-row"><span>Рефералов</span><span>0</span></div>
      <div class="admin-row"><span>Заказов сегодня</span><span>0</span></div>
      <div class="admin-row"><span>Выручка сегодня</span><span>0 ₽</span></div>
      <div class="admin-row"><span>Промокодов</span><span>${state.promos.length}</span></div>
      <div class="admin-row"><span>Отзывов</span><span>${state.reviews.length}</span></div>
    `;
  } else if (tab === 'orders') {
    c.innerHTML = `
      <h4>📦 Заказы</h4>
      <div style="color:var(--muted);font-size:12px;padding:10px 0;">Пока нет заказов. Появятся после подключения оплаты.</div>
    `;
  } else if (tab === 'products') {
    c.innerHTML = `<h4>🏷 Товары</h4>` +
      PRODUCTS.map(p => `<div class="admin-row"><span>${p.flag} ${p.name}</span><span>${p.price}₽</span></div>`).join('');
  } else if (tab === 'promo') {
    c.innerHTML = `
      <h4>🎟 Промокоды</h4>
      <input type="text" id="promoCodeInput" placeholder="Код (напр. SALE10)">
      <input type="number" id="promoDiscInput" placeholder="Скидка %">
      <button onclick="addPromo()">Добавить</button>
      <div id="promoList" style="margin-top:12px;"></div>
    `;
    renderPromoListAdmin();
  } else if (tab === 'users') {
    const list = Object.entries(state.users).map(([name, u]) =>
      `<div class="admin-row"><span>@${name}</span><span>${new Date(u.createdAt).toLocaleDateString()}</span></div>`
    ).join('') || '<div style="color:var(--muted);font-size:12px;">Пока нет юзеров</div>';
    c.innerHTML = `<h4>👤 Юзеры</h4>${list}`;
  } else if (tab === 'reviews') {
    const list = state.reviews.map((r, i) =>
      `<div class="admin-row"><span>@${r.author}</span><button onclick="delReview(${i})" style="background:#333;padding:4px 10px;font-size:11px;">Удалить</button></div>`
    ).join('') || '<div style="color:var(--muted);font-size:12px;">Нет отзывов</div>';
    c.innerHTML = `<h4>⭐ Отзывы</h4>${list}`;
  }
}

function addPromo() {
  const code = document.getElementById('promoCodeInput').value.trim().toUpperCase();
  const disc = +document.getElementById('promoDiscInput').value;
  if (!code || !disc) return toast('Заполни оба поля', 'error');
  state.promos.push({ code, disc });
  Storage.set('promos', state.promos);
  document.getElementById('promoCodeInput').value = '';
  document.getElementById('promoDiscInput').value = '';
  renderPromoListAdmin();
  toast('Промокод добавлен', 'success');
}

function renderPromoListAdmin() {
  const el = document.getElementById('promoList');
  if (!el) return;
  el.innerHTML = state.promos.length
    ? state.promos.map(p => `<div class="admin-row"><span>${p.code}</span><span>-${p.disc}%</span></div>`).join('')
    : '<div style="color:var(--muted);font-size:12px;">Пока нет промокодов</div>';
}

function delReview(i) {
  state.reviews.splice(i, 1);
  Storage.set('reviews', state.reviews);
  renderAdminTab('reviews');
  renderReviews();
  toast('Отзыв удалён', 'success');
}

// ================= PRODUCTS =================
let currentFilter = 'popular';
let searchQuery = '';

document.querySelectorAll('.filter').forEach(f => {
  f.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
    f.classList.add('active');
    currentFilter = f.dataset.filter;
    renderProducts();
  });
});

document.getElementById('searchInput').addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase();
  renderProducts();
});

function renderProducts() {
  const list = document.getElementById('productsList');
  // skeleton
  list.innerHTML = Array(4).fill('<div class="skeleton"></div>').join('');

  setTimeout(() => {
    let items = [...PRODUCTS];
    if (searchQuery) items = items.filter(p => p.name.toLowerCase().includes(searchQuery));
    if (currentFilter === 'cheap') items.sort((a,b) => a.price - b.price);
    else if (currentFilter === 'expensive') items.sort((a,b) => b.price - a.price);

    if (!items.length) {
      list.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--muted);padding:30px;">Ничего не найдено</div>';
      return;
    }

    list.innerHTML = items.map(p => `
      <div class="product">
        <div class="product-top">
          <div class="product-flag">${p.flag}</div>
          ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
        </div>
        <div>
          <div class="product-name">${p.name}</div>
          <div class="product-sub">${p.sub}</div>
          <div class="product-rating">${'★'.repeat(Math.round(p.rating))} <span class="muted" style="margin-left:4px;">${p.rating}</span></div>
        </div>
        <div class="product-price-row">
          <div class="product-price">${p.price}₽</div>
          ${p.oldPrice ? `<div class="product-old">${p.oldPrice}₽</div>` : ''}
        </div>
        <div class="product-actions">
          <button class="btn-add" onclick="addToCart(${p.id})">В корзину</button>
          <button class="btn-buy" onclick="buyNow(${p.id})">Купить</button>
        </div>
      </div>
    `).join('');
  }, 250);
}

// ================= CART =================
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  state.cart.push({ id: p.id, name: p.name, flag: p.flag, price: p.price });
  Storage.set('cart', state.cart);
  renderCartBadge();
  renderCart();
  toast(`${p.name} в корзине`, 'success');
  haptic('light');
}

function buyNow(id) {
  addToCart(id);
  go('cart');
}

function renderCartBadge() {
  const badge = document.getElementById('cartBadge');
  const count = state.cart.length;
  if (count > 0) { badge.textContent = count; badge.classList.remove('hidden'); }
  else badge.classList.add('hidden');
}

function renderCart() {
  const list = document.getElementById('cartList');
  const empty = document.getElementById('cartEmpty');
  const summary = document.getElementById('cartSummary');
  if (!state.cart.length) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    summary.classList.add('hidden');
    return;
  }
  empty.classList.add('hidden');
  summary.classList.remove('hidden');
  list.innerHTML = state.cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <span style="font-size:24px;">${item.flag}</span>
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${item.price}₽</div>
        </div>
      </div>
      <button class="cart-remove" onclick="removeCart(${i})">✕</button>
    </div>
  `).join('');
  const total = state.cart.reduce((s, i) => s + i.price, 0);
  document.getElementById('cartCount').textContent = state.cart.length;
  document.getElementById('cartTotal').textContent = total + '₽';
}

function removeCart(i) {
  state.cart.splice(i, 1);
  Storage.set('cart', state.cart);
  renderCart();
  renderCartBadge();
  haptic('light');
}

function checkout() {
  toast('Оплата будет доступна после переезда на сервер', 'error');
}

// ================= TRANSACTIONS =================
function renderTransactions() {
  const list = document.getElementById('txList');
  const empty = document.getElementById('txEmpty');
  if (!state.transactions.length) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  list.innerHTML = state.transactions.map(t => `
    <div class="cart-item">
      <div class="cart-item-info">
        <span style="font-size:20px;">${t.type === 'in' ? '↗' : '↘'}</span>
        <div>
          <div class="cart-item-name">${t.title}</div>
          <div class="cart-item-price" style="color:${t.type === 'in' ? 'var(--green)' : 'var(--accent)'};">${t.type === 'in' ? '+' : '-'}${t.amount}₽</div>
        </div>
      </div>
      <div class="muted" style="font-size:11px;">${new Date(t.date).toLocaleDateString()}</div>
    </div>
  `).join('');
}

// ================= REF =================
function renderRefLink() {
  const link = `https://t.me/desired_bot?start=ref_${state.currentUser?.username || 'user'}`;
  document.getElementById('refLink').value = link;
}
function copyRef() {
  const el = document.getElementById('refLink');
  el.select();
  document.execCommand('copy');
  toast('Ссылка скопирована', 'success');
  haptic('light');
}

// ================= REVIEWS =================
function renderReviews() {
  const list = document.getElementById('reviewsList');
  if (!state.reviews.length) {
    list.innerHTML = '<div style="text-align:center;color:var(--muted);padding:20px;font-size:13px;">Пока нет отзывов. Будь первым!</div>';
    return;
  }
  list.innerHTML = state.reviews.map(r => `
    <div class="review-item">
      <div class="review-head">
        <div class="review-author">@${r.author}</div>
        <div class="review-date">${new Date(r.date).toLocaleDateString()}</div>
      </div>
      <div class="review-text">${escapeHtml(r.text)}</div>
    </div>
  `).join('');
}

function addReview() {
  const text = document.getElementById('reviewText').value.trim();
  if (!text) return toast('Напиши отзыв', 'error');
  state.reviews.unshift({ author: state.currentUser?.username || 'user', text, date: Date.now() });
  Storage.set('reviews', state.reviews);
  document.getElementById('reviewText').value = '';
  renderReviews();
  toast('Отзыв опубликован', 'success');
}

// ================= FAQ =================
const FAQ = [
  { q: 'Как получить купленный товар?', a: 'После оплаты товар выдаётся автоматически в течение нескольких секунд в разделе «Инвентарь».' },
  { q: 'Какие способы оплаты?', a: 'СБП, карты РФ, Telegram Stars, CryptoBot. Способы будут доступны после переезда на сервер.' },
  { q: 'Что делать, если товар не работает?', a: 'Напишите в поддержку с номером заказа. Мы решим вопрос в течение 24 часов.' },
  { q: 'Как работает реферальная программа?', a: 'Вы получаете 10% от каждой покупки вашего реферала. Вывод от 500₽.' },
  { q: 'Восстановление пароля?', a: 'Только через поддержку. Сохраняйте имя пользователя и пароль в надёжном месте!' },
  { q: 'Безопасно ли покупать?', a: 'Да, все товары проверяются, а оплата проходит через защищённые шлюзы.' }
];

function renderFAQ() {
  document.getElementById('faqList').innerHTML = FAQ.map((f, i) => `
    <div class="faq-item" onclick="toggleFaq(${i})">
      <div class="faq-q">${f.q}<span>▾</span></div>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('');
}
function toggleFaq(i) {
  document.querySelectorAll('.faq-item')[i].classList.toggle('open');
}

// ================= CHAT =================
function renderChat() {
  const box = document.getElementById('chatMessages');
  if (!box) return;
  if (!state.chat.length) {
    box.innerHTML = '<div style="text-align:center;color:var(--muted);padding:20px;font-size:13px;">Пока тихо. Начни первым!</div>';
    return;
  }
  box.innerHTML = state.chat.map(m => `
    <div class="chat-msg ${m.author === state.currentUser?.username ? 'me' : ''}">
      <div class="chat-author">@${m.author}</div>
      <div class="chat-text">${escapeHtml(m.text)}</div>
    </div>
  `).join('');
  box.scrollTop = box.scrollHeight;
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  state.chat.push({ author: state.currentUser?.username || 'user', text, date: Date.now() });
  Storage.set('chat', state.chat);
  input.value = '';
  renderChat();
  haptic('light');
}

// ================= CASE =================
function initCase() {
  const last = Storage.get('lastCase', 0);
  const diff = Date.now() - last;
  const dayMs = 24*60*60*1000;
  const status = document.getElementById('caseStatus');
  if (diff >= dayMs) {
    status.textContent = 'Доступен!';
  } else {
    const h = Math.floor((dayMs - diff) / (60*60*1000));
    status.textContent = `Доступен через ${h} ч`;
  }
}

function spinCase() {
  const last = Storage.get('lastCase', 0);
  if (Date.now() - last < 24*60*60*1000) return toast('Кейс уже крутился', 'error');
  const prizes = [
    { emoji: '🎉', title: 'Скидка 5%', text: 'Промокод: CASE5' },
    { emoji: '🎁', title: 'Скидка 10%', text: 'Промокод: CASE10' },
    { emoji: '🔥', title: 'Скидка 15%', text: 'Промокод: CASE15' },
    { emoji: '⭐', title: 'Скидка 3%', text: 'Промокод: CASE3' }
  ];
  const prize = prizes[Math.floor(Math.random() * prizes.length)];
  document.getElementById('caseResultEmoji').textContent = prize.emoji;
  document.getElementById('caseResultTitle').textContent = prize.title;
  document.getElementById('caseResultText').textContent = prize.text;
  Storage.set('lastCase', Date.now());
  initCase();
  openModal('modalCaseResult');
  haptic('medium');
}

// ================= MODALS =================
function openModal(id) { document.getElementById(id).classList.add('show'); }
function closeModal(id) { document.getElementById(id).classList.remove('show'); }
function openTopUp() { openModal('modalTopUp'); }
function contactSupport() { window.open(SUPPORT_LINK, '_blank'); }

// ================= TOASTS =================
function toast(text, type = 'info') {
  const wrap = document.getElementById('toastWrap');
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = text;
  wrap.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); }, 2200);
}

// ================= HAPTIC =================
function haptic(type = 'light') {
  const h = window.Telegram?.WebApp?.HapticFeedback;
  if (!h) return;
  try {
    if (type === 'light') h.impactOccurred('light');
    if (type === 'medium') h.impactOccurred('medium');
    if (type === 'heavy') h.impactOccurred('heavy');
  } catch {}
}

// ================= HELPERS =================
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ================= PROMO TIMER =================
let promoSeconds = 41*3600 + 27*60 + 35;
function startPromoTimer() {
  const el = document.getElementById('promoTimer');
  setInterval(() => {
    if (promoSeconds <= 0) return;
    promoSeconds--;
    const h = String(Math.floor(promoSeconds/3600)).padStart(2,'0');
    const m = String(Math.floor((promoSeconds%3600)/60)).padStart(2,'0');
    const s = String(promoSeconds%60).padStart(2,'0');
    el.textContent = `ещё ${h}:${m}:${s}`;
  }, 1000);
}
