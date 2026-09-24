// ==================== CONFIG ====================
const ADMIN_PASSWORD = '837472';
const ADMIN_IDS = [7803765347, 912559442];
const REF_PERCENT_L1 = 10;
const REF_PERCENT_L2 = 3;
const SUPPORT_LINK = 'https://t.me/desired_support';
const BOT_LINK = 'https://t.me/desired_bot';
const LOW_STOCK_THRESHOLD = 5;

// ==================== STORAGE WRAPPER ====================
const Storage = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
  del(key) { try { localStorage.removeItem(key); } catch {} }
};

// ==================== STATE ====================
const state = {
  currentUser: Storage.get('currentUser'),
  users: Storage.get('users', {}),
  cart: Storage.get('cart', []),
  favorites: Storage.get('favorites', []),
  recent: Storage.get('recent', []),
  reviews: Storage.get('reviews', []),
  chat: Storage.get('chat', { general: [], trade: [], offtop: [] }),
  promos: Storage.get('promos', []),
  usedPromos: Storage.get('usedPromos', {}),
  transactions: Storage.get('transactions', []),
  orders: Storage.get('orders', []),
  points: Storage.get('points', 0),
  stats: Storage.get('stats', { topUp: 0, spent: 0, orders: 0 }),
  achievements: Storage.get('achievements', []),
  lastCase: Storage.get('lastCase', 0),
  lastWheel: Storage.get('lastWheel', 0),
  lastDaily: Storage.get('lastDaily', 0),
  streak: Storage.get('streak', 0),
  onlineCount: 1247,
  tgUser: null,
  appliedPromo: null,
  cartChannel: 'general',
  reviewRating: 5,
  reviewFilter: 'all',
  loyaltyLevel: 'bronze'
};

// ==================== PRODUCTS ====================
const PRODUCTS = [
  { id: 1, flag: '🇺🇸', name: 'США', sub: '2078 покупок · автовыдача', price: 89, oldPrice: 99, cat: 'names', rating: 5, badge: 'ХИТ', stock: 42, tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 2, flag: '🇬🇧', name: 'Великобритания', sub: '107 покупок · автовыдача', price: 159, cat: 'names', rating: 4.8, stock: 18, tags: ['⚡ автовыдача'] },
  { id: 3, flag: '🇯🇵', name: 'Япония', sub: '52 покупки · автовыдача', price: 349, cat: 'names', rating: 4.9, stock: 7, tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 4, flag: '🇨🇴', name: 'Колумбия', sub: '34 покупки · автовыдача', price: 129, cat: 'names', rating: 4.7, stock: 12, tags: ['⚡ автовыдача'] },
  { id: 5, flag: '🇰🇿', name: 'Казахстан', sub: '88 покупок · автовыдача', price: 99, cat: 'names', rating: 4.8, stock: 25, tags: ['⚡ автовыдача'] },
  { id: 6, flag: '⭐', name: 'Telegram Stars 100', sub: 'Мгновенная выдача', price: 145, cat: 'subs', rating: 5, badge: 'NEW', stock: 89, tags: ['⚡ автовыдача'] },
  { id: 7, flag: '⭐', name: 'Telegram Stars 500', sub: 'Мгновенная выдача', price: 690, cat: 'subs', rating: 5, stock: 45, tags: ['⚡ автовыдача'] },
  { id: 8, flag: '💎', name: 'Telegram Premium 3 мес', sub: 'Активация на аккаунт', price: 590, cat: 'subs', rating: 4.9, badge: 'ХИТ', stock: 30, tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 9, flag: '💎', name: 'Telegram Premium 12 мес', sub: 'Активация на аккаунт', price: 1890, cat: 'subs', rating: 4.9, stock: 15, tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 10, flag: '🎁', name: 'NFT подарок Basic', sub: 'Аренда 30 дней', price: 249, cat: 'nft', rating: 4.6, stock: 22, tags: ['🎁 аренда'] },
  { id: 11, flag: '🎁', name: 'NFT подарок Rare', sub: 'Аренда 30 дней', price: 890, cat: 'nft', rating: 4.8, badge: 'NEW', stock: 8, tags: ['🎁 аренда', '💎 редкость'] }
];

const PACKAGES = [
  { id: 'p1', title: 'Стартовый пакет', sub: '3 USA + 2 UK + Premium 3 мес', price: 990, oldPrice: 1287 },
  { id: 'p2', title: 'Набор для накрутки', sub: 'Stars 500 + Premium 3 мес', price: 1190, oldPrice: 1280 },
  { id: 'p3', title: 'Оптовый VIP', sub: '10 USA + 5 UK + 5 KZ', price: 2490, oldPrice: 3350 }
];

const FAQ = [
  { q: 'Как получить купленный товар?', a: 'После оплаты товар выдаётся автоматически в течение нескольких секунд в разделе «Инвентарь».' },
  { q: 'Какие способы оплаты?', a: 'СБП, карты РФ, Telegram Stars, CryptoBot. Способы будут доступны после переезда на сервер.' },
  { q: 'Что делать, если товар не работает?', a: 'Напишите в поддержку с номером заказа. Мы решим вопрос в течение 24 часов.' },
  { q: 'Как работает реферальная программа?', a: 'Вы получаете 10% с покупок рефералов 1 уровня и 3% со 2 уровня. Вывод от 500₽.' },
  { q: 'Восстановление пароля?', a: 'Только через поддержку. Сохраняйте имя пользователя и пароль в надёжном месте!' },
  { q: 'Безопасно ли покупать?', a: 'Да, все товары проверяются, оплата через защищённые шлюзы.' },
  { q: 'Сколько идёт выдача?', a: 'Автовыдача мгновенно. Если товар не пришёл — напишите в поддержку.' },
  { q: 'Можно ли вернуть деньги?', a: 'Да, если товар не работает — возврат в течение 24 часов после покупки.' },
  { q: 'Какие аккаунты вы продаёте?', a: 'Зарегистрированные, отлежавшиеся, с полным доступом. Логин, пароль, почта.' },
  { q: 'Есть ли оптовые скидки?', a: 'Да, от 10 штук — 15%, от 50 — 25%. Пишите в поддержку.' },
  { q: 'Как пополнить баланс?', a: 'В профиле → «Пополнить». Доступны СБП, карты РФ, Stars, CryptoBot.' },
  { q: 'Что делать, если оплата не прошла?', a: 'Проверьте баланс, повторите платёж. Если деньги списались — пишите в поддержку.' },
  { q: 'Есть ли гарантия?', a: 'Да, гарантия от 24ч до 7 дней в зависимости от типа товара.' },
  { q: 'Можно ли перепродавать ваш товар?', a: 'Да, только без раскрытия источника и без демпинга.' },
  { q: 'Как долго аккаунт остаётся рабочим?', a: 'У нас аккаунты живут от 6 месяцев. Дольше — при правильном использовании.' },
  { q: 'Что такое аренда NFT?', a: 'Ты получаешь подарок в профиль на 30 дней. По истечении — либо продлеваешь, либо возвращается.' },
  { q: 'Что такое Telegram Stars?', a: 'Внутренняя валюта Telegram. Можно отправлять подарки, покупать подписки, оплачивать сервисы.' },
  { q: 'Куда приходят купленные звёзды?', a: 'Прямо на твой Telegram-аккаунт, если указал его при оформлении. Иначе — на указанный @username.' },
  { q: 'Можно ли купить звёзды без Premium?', a: 'Да, Stars продаются отдельно от Premium.' },
  { q: 'Есть ли скидки постоянным клиентам?', a: 'Да, программа лояльности: Bronze 3%, Silver 5%, Gold 8%, Platinum 12% кэшбэка баллами.' },
  { q: 'Как вывести реферальные деньги?', a: 'От 500₽ на карту РФ или CryptoBot. Заявка через поддержку.' },
  { q: 'Можно ли купить в рассрочку?', a: 'Для крупных покупок — да, через партнёров. Пишите в поддержку.' },
  { q: 'Что за кейс дня?', a: 'Ежедневная рулетка. Раз в 24 часа можно выбить промокод на скидку.' },
  { q: 'Что за колесо фортуны?', a: 'Как кейс, но с другими призами. Тоже раз в 24 часа.' },
  { q: 'Что за баллы?', a: 'Внутренняя валюта маркета. Копятся с покупок, за входы, за отзывы. Можно обменять на скидку.' },
  { q: 'Как стать Verified?', a: '5+ отзывов и покупок на сумму 5000₽+. Значок появится автоматически.' },
  { q: 'Что делать, если меня обманул продавец?', a: 'У нас нет продавцов — только мы. Пишите в поддержку, решим.' },
  { q: 'Можно ли оплатить с чужой карты?', a: 'Только с разрешения владельца. За чарджбэки — бан.' },
  { q: 'Есть ли приложение?', a: 'Маркет работает прямо в Telegram как Mini App. Можно добавить на рабочий стол.' },
  { q: 'Когда появятся новые товары?', a: 'Следи за ченджлогом и каналом. Анонсы — там.' },
  { q: 'Что за общий чат?', a: 'Общение юзеров маркета. Три канала: Общий, Купля-продажа, Оффтоп.' },
  { q: 'Как стать модератором чата?', a: 'Активным юзерам — по приглашению. Пишите в поддержку.' }
];

const ACHIEVEMENTS = [
  { id: 'first_order', icon: '🎯', name: 'Первый заказ', desc: 'Соверши первую покупку' },
  { id: 'ten_orders', icon: '🔟', name: '10 покупок', desc: 'Купи 10 товаров' },
  { id: 'big_spender', icon: '💎', name: 'Big Spender', desc: 'Потрать 5000₽' },
  { id: 'referrer', icon: '📣', name: 'Реферер', desc: 'Пригласи 3 друзей' },
  { id: 'reviewer', icon: '✍️', name: 'Критик', desc: 'Оставь 5 отзывов' },
  { id: 'daily_master', icon: '🔥', name: 'Стрик 7 дней', desc: 'Заходи 7 дней подряд' },
  { id: 'case_hunter', icon: '🎰', name: 'Кейс-хантер', desc: 'Крути кейс 5 раз' },
  { id: 'loyal', icon: '👑', name: 'Loyal', desc: 'Достигни уровня Gold' }
];

const DIARY = [
  { date: 'Сегодня', text: 'Запустили обновление Mini App. Добавили: кейс, колесо, баллы, избранное, кэшбэк, достижения, live-ленту, пакеты.' },
  { date: 'Вчера', text: 'Первый тест с кентом. Чат пока не работает между юзерами — ждём бэкенд.' },
  { date: '2 дня назад', text: 'Собрали дизайн-систему. Manrope, градиенты, анимации, splash-экран.' },
  { date: '3 дня назад', text: 'Стартовали разработку маркета. Цель: 50-300к ₽/мес.' }
];

const CHANGELOG = [
  { ver: 'v0.3.0', date: 'Сегодня', changes: ['Кейс дня и колесо фортуны', 'Ежедневный бонус и стрик', 'Баллы, кэшбэк, уровни лояльности', 'Избранное и недавно просмотренные', 'Live-лента покупок', 'Пакеты товаров и апселл', 'Достижения и лидерборд', 'Тёмная/светлая тема', 'Сезонные ивенты', 'Промокоды в профиле'] },
  { ver: 'v0.2.0', date: '3 дня назад', changes: ['Полный редизайн', 'Авторизация', 'Админ-панель на 2 юзера', 'Корзина и профиль', 'Отзывы и FAQ', 'Рефералка'] },
  { ver: 'v0.1.0', date: 'Неделю назад', changes: ['Первый каркас Mini App', 'Каталог товаров', 'Базовый дизайн'] }
];

const LIVE_BUYERS = [
  { name: '@vasya_p', flag: '🇺🇸', product: 'США' },
  { name: '@nagibator', flag: '💎', product: 'Premium 3 мес' },
  { name: '@krutoy', flag: '⭐', product: 'Stars 500' },
  { name: '@tramp', flag: '🇬🇧', product: 'Великобритания' },
  { name: '@marsik', flag: '🎁', product: 'NFT Basic' },
  { name: '@lucky', flag: '🇯🇵', product: 'Япония' },
  { name: '@topchek', flag: '⭐', product: 'Stars 100' },
  { name: '@arbitrage', flag: '🇰🇿', product: 'Казахстан' }
];

// ==================== INIT ====================
window.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  applySeason();
  initTelegram();

  setTimeout(() => {
    const splash = document.getElementById('splash');
    if (splash) splash.classList.add('hide');
    setTimeout(() => {
      if (state.currentUser) {
        // проверка онбординга
        if (!Storage.get('onboarded', false)) {
          showOnboarding();
        } else {
          enterApp();
        }
      } else {
        document.getElementById('authScreen').classList.remove('hidden');
      }
    }, 400);
  }, 1200);

  renderAuthForm();
  bindEvents();
  startPromoTimer();
  startOnlineTicker();
  initCase();
  initWheel();
  initDaily();
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

// ==================== THEME / SEASON ====================
function applyTheme() {
  const theme = Storage.get('theme', 'dark');
  document.body.setAttribute('data-theme', theme);
  document.querySelectorAll('.theme-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.themeSet === theme);
  });
}

function applySeason() {
  const season = Storage.get('season', 'default');
  if (season === 'default') document.body.removeAttribute('data-season');
  else document.body.setAttribute('data-season', season);
  const sel = document.getElementById('seasonSelect');
  if (sel) sel.value = season;
}

document.addEventListener('change', (e) => {
  if (e.target.id === 'seasonSelect') {
    Storage.set('season', e.target.value);
    applySeason();
    toast('Сезонная тема применена', 'success');
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('theme-btn')) {
    const t = e.target.dataset.themeSet;
    Storage.set('theme', t);
    applyTheme();
  }
});

// ==================== AUTH ====================
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
  if (!Storage.get('onboarded', false)) showOnboarding();
  else enterApp();
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
  if (!Storage.get('onboarded', false)) showOnboarding();
  else enterApp();
}

function logout() {
  state.currentUser = null;
  Storage.del('currentUser');
  document.getElementById('app').classList.add('hidden');
  document.getElementById('authScreen').classList.remove('hidden');
  document.getElementById('onboarding').classList.add('hidden');
  showAuthForm('choice');
  toast('Вы вышли', 'success');
}

function enterApp() {
  document.getElementById('authScreen').classList.add('hidden');
  document.getElementById('onboarding').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  updateProfileUI();
  renderProducts();
  renderFavorites();
  renderRecent();
  renderPackages();
  renderReviewsMini();
  renderReviews();
  renderFAQ();
  renderChat();
  renderTransactions();
  renderOrders();
  renderRefLink();
  renderCart();
  renderCartBadge();
  renderAchievements();
  renderLeaderboard('buyers');
  renderDiary();
  renderChangelog();
  renderLiveFeed();
  checkLoyalty();
  checkAchievements();
  routeFromHash();
}

function updateProfileUI() {
  const name = state.currentUser?.username || 'user';
  const tgId = state.tgUser?.id || state.currentUser?.tgId || '—';
  document.getElementById('userName').textContent = '@' + name;
  document.getElementById('userId').textContent = '@id' + tgId;
  document.getElementById('userAvatar').textContent = name[0].toUpperCase();
  document.getElementById('topBalance').textContent = Storage.get('balance', 0) + '₽';
  document.getElementById('profileBalance').textContent = Storage.get('balance', 0) + '₽';
  document.getElementById('statTopUp').textContent = state.stats.topUp + '₽';
  document.getElementById('statSpent').textContent = state.stats.spent + '₽';
  document.getElementById('statPoints').textContent = state.points;
  document.getElementById('statOrders').textContent = state.stats.orders;
  if (state.stats.orders >= 3 || state.stats.spent >= 5000) {
    document.getElementById('verifiedBadge')?.classList.remove('hidden');
  }
}

// ==================== ONBOARDING ====================
let onbIndex = 0;
function showOnboarding() {
  document.getElementById('authScreen').classList.add('hidden');
  document.getElementById('onboarding').classList.remove('hidden');
  const track = document.getElementById('onbTrack');
  const dots = document.querySelectorAll('.onb-dot');
  const nextBtn = document.getElementById('onbNext');

  const update = () => {
    track.style.transform = `translateX(-${onbIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === onbIndex));
    nextBtn.textContent = onbIndex === 2 ? 'Начать' : 'Далее';
  };
  update();

  nextBtn.onclick = () => {
    if (onbIndex < 2) { onbIndex++; update(); haptic('light'); }
    else { Storage.set('onboarded', true); enterApp(); haptic('medium'); }
  };
  document.getElementById('onbSkip').onclick = () => {
    Storage.set('onboarded', true);
    enterApp();
  };
}

// ==================== NAV ====================
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

// ==================== DROPDOWN / SCROLL ====================
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

window.addEventListener('scroll', () => {
  const tb = document.getElementById('topbar');
  if (tb) tb.classList.toggle('scrolled', window.scrollY > 10);
});

// ==================== ADMIN ====================
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
    logAction('admin_login');
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
  if (!c) return;
  if (tab === 'stats') {
    c.innerHTML = `
      <h4>📊 Статистика</h4>
      <div class="admin-row"><span>Всего юзеров</span><span>${Object.keys(state.users).length}</span></div>
      <div class="admin-row"><span>Заказов</span><span>${state.orders.length}</span></div>
      <div class="admin-row"><span>Выручка (мок)</span><span>${state.stats.spent}₽</span></div>
      <div class="admin-row"><span>Промокодов</span><span>${state.promos.length}</span></div>
      <div class="admin-row"><span>Отзывов</span><span>${state.reviews.length}</span></div>
      <div class="admin-row"><span>Баллов выдано</span><span>${state.points}</span></div>
    `;
  } else if (tab === 'orders') {
    c.innerHTML = `<h4>📦 Заказы</h4>` +
      (state.orders.length
        ? state.orders.map(o => `<div class="admin-row"><span>${o.product}</span><span>${o.price}₽</span></div>`).join('')
        : '<div style="color:var(--muted);font-size:12px;padding:10px 0;">Пока нет заказов</div>');
  } else if (tab === 'products') {
    c.innerHTML = `<h4>🏷 Товары</h4>` +
      PRODUCTS.map(p => `<div class="admin-row"><span>${p.flag} ${p.name}</span><span>${p.price}₽ · ${p.stock} шт</span></div>`).join('');
  } else if (tab === 'promo') {
    c.innerHTML = `
      <h4>🎟 Промокоды</h4>
      <input type="text" id="promoCodeInput" placeholder="Код (напр. SALE10)">
      <input type="number" id="promoDiscInput" placeholder="Скидка %">
      <input type="number" id="promoLimitInput" placeholder="Лимит использований (0 = без)">
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
      `<div class="admin-row"><span>@${r.author} · ${r.rating}★</span><button class="ghost" onclick="delReview(${i})">Удалить</button></div>`
    ).join('') || '<div style="color:var(--muted);font-size:12px;">Нет отзывов</div>';
    c.innerHTML = `<h4>⭐ Отзывы</h4>${list}`;
  } else if (tab === 'chat') {
    const general = state.chat.general || [];
    c.innerHTML = `<h4>🗨️ Чат (${general.length})</h4>` +
      (general.slice(-10).map((m, i) =>
        `<div class="admin-row"><span>@${m.author}: ${escapeHtml(m.text).slice(0, 30)}...</span><button class="ghost" onclick="delChatMsg('general', ${i})">×</button></div>`
      ).join('') || '<div style="color:var(--muted);font-size:12px;">Пусто</div>');
  } else if (tab === 'logs') {
    const logs = Storage.get('logs', []);
    c.innerHTML = `<h4>📜 Логи (${logs.length})</h4>` +
      (logs.slice(-20).reverse().map(l =>
        `<div class="admin-row"><span>${l.action}</span><span>${new Date(l.date).toLocaleTimeString()}</span></div>`
      ).join('') || '<div style="color:var(--muted);font-size:12px;">Нет логов</div>');
  }
}

function logAction(action) {
  const logs = Storage.get('logs', []);
  logs.push({ action, user: state.currentUser?.username || 'anon', date: Date.now() });
  if (logs.length > 100) logs.shift();
  Storage.set('logs', logs);
}

function addPromo() {
  const code = document.getElementById('promoCodeInput').value.trim().toUpperCase();
  const disc = +document.getElementById('promoDiscInput').value;
  const limit = +document.getElementById('promoLimitInput').value || 0;
  if (!code || !disc) return toast('Заполни поля', 'error');
  state.promos.push({ code, disc, limit, used: 0 });
  Storage.set('promos', state.promos);
  document.getElementById('promoCodeInput').value = '';
  document.getElementById('promoDiscInput').value = '';
  document.getElementById('promoLimitInput').value = '';
  renderPromoListAdmin();
  toast('Промокод добавлен', 'success');
}

function renderPromoListAdmin() {
  const el = document.getElementById('promoList');
  if (!el) return;
  el.innerHTML = state.promos.length
    ? state.promos.map(p => `<div class="admin-row"><span>${p.code}</span><span>-${p.disc}% · ${p.used}/${p.limit || '∞'}</span></div>`).join('')
    : '<div style="color:var(--muted);font-size:12px;">Пока нет промокодов</div>';
}

function delReview(i) {
  state.reviews.splice(i, 1);
  Storage.set('reviews', state.reviews);
  renderAdminTab('reviews');
  renderReviews();
  renderReviewsMini();
  toast('Отзыв удалён', 'success');
}

function delChatMsg(channel, i) {
  state.chat[channel].splice(i, 1);
  Storage.set('chat', state.chat);
  renderChat();
  renderAdminTab('chat');
}

// ==================== PRODUCTS ====================
let currentFilter = 'popular';
let currentQuick = 'all';
let searchQuery = '';
let visibleProducts = 6;
const productsPerPage = 6;

document.querySelectorAll('.filter').forEach(f => {
  f.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
    f.classList.add('active');
    currentFilter = f.dataset.filter;
    visibleProducts = productsPerPage;
    renderProducts();
  });
});

document.querySelectorAll('.quick-chip[data-quick]').forEach(c => {
  c.addEventListener('click', () => {
    document.querySelectorAll('.quick-chip[data-quick]').forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    currentQuick = c.dataset.quick;
    visibleProducts = productsPerPage;
    renderProducts();
  });
});

document.getElementById('searchInput').addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  visibleProducts = productsPerPage;
  renderProducts();
  saveSearchHistory(searchQuery);
});
document.getElementById('searchInput').addEventListener('focus', renderSearchHistory);

function saveSearchHistory(q) {
  if (!q) return;
  const hist = Storage.get('searchHistory', []);
  if (!hist.includes(q)) hist.unshift(q);
  Storage.set('searchHistory', hist.slice(0, 5));
}

function renderSearchHistory() {
  const el = document.getElementById('searchHistory');
  const hist = Storage.get('searchHistory', []);
  if (!hist.length) { el.classList.add('hidden'); return; }
  el.innerHTML = hist.map(h => `<span class="hist-chip" onclick="setSearch('${h}')">${h}</span>`).join('');
  el.classList.remove('hidden');
}
function setSearch(q) {
  document.getElementById('searchInput').value = q;
  searchQuery = q;
  renderProducts();
  document.getElementById('searchHistory').classList.add('hidden');
}

function renderProducts() {
  const list = document.getElementById('productsList');
  list.innerHTML = Array(4).fill('<div class="skeleton"></div>').join('');

  setTimeout(() => {
    let items = [...PRODUCTS];
    if (searchQuery) items = items.filter(p => p.name.toLowerCase().includes(searchQuery));
    if (currentQuick === 'cheap') items = items.filter(p => p.price < 100);
    if (currentQuick === 'hit') items = items.filter(p => p.badge === 'ХИТ');
    if (currentQuick === 'new') items = items.filter(p => p.badge === 'NEW');
    if (currentQuick === 'sale') items = items.filter(p => p.oldPrice);
    if (currentFilter === 'cheap') items.sort((a,b) => a.price - b.price);
    else if (currentFilter === 'expensive') items.sort((a,b) => b.price - a.price);

    if (!items.length) {
      list.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--muted);padding:30px;">Ничего не найдено</div>';
      return;
    }

    const visible = items.slice(0, visibleProducts);
    list.innerHTML = visible.map((p, idx) => {
      const isFav = state.favorites.includes(p.id);
      const discountPercent = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
      const stockHint = p.stock <= LOW_STOCK_THRESHOLD ? `<div class="product-stock">⚠ Осталось ${p.stock} шт</div>` : '';
      const badgeClass = p.badge === 'ХИТ' ? 'hit' : p.badge === 'NEW' ? 'new' : '';
      return `
      <div class="product" style="animation-delay:${idx*40}ms">
        <button class="product-fav ${isFav ? 'active' : ''}" onclick="event.stopPropagation();toggleFav(${p.id})">${isFav ? '❤️' : '🤍'}</button>
        <div class="product-top" onclick="openProduct(${p.id})">
          <div class="product-flag">${p.flag}</div>
          ${p.badge ? `<div class="product-badge ${badgeClass}">${p.badge}</div>` : ''}
        </div>
        <div onclick="openProduct(${p.id})">
          <div class="product-name">${p.name}</div>
          <div class="product-sub">${p.sub}</div>
          <div class="product-rating">${'<span class="star">★</span>'.repeat(Math.round(p.rating))} <span class="muted" style="margin-left:4px;">${p.rating}</span></div>
          ${p.tags ? `<div class="product-tags">${p.tags.slice(0,2).map(t => `<span class="product-tag">${t}</span>`).join('')}</div>` : ''}
          ${stockHint}
        </div>
        <div class="product-price-row">
          <div class="product-price">${p.price}₽</div>
          ${p.oldPrice ? `<div class="product-old">${p.oldPrice}₽</div>` : ''}
          ${discountPercent ? `<span style="color:var(--green);font-size:11px;font-weight:800;">-${discountPercent}%</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="btn-add" onclick="event.stopPropagation();addToCart(${p.id})">В корзину</button>
          <button class="btn-buy" onclick="event.stopPropagation();buyNow(${p.id})">Купить</button>
        </div>
      </div>
      `;
    }).join('');

    if (items.length > visibleProducts) {
      const end = document.getElementById('productsEnd');
      end.textContent = `— Показать ещё ${items.length - visibleProducts} —`;
      end.classList.remove('hidden');
      end.onclick = () => {
        visibleProducts += productsPerPage;
        renderProducts();
      };
    } else {
      document.getElementById('productsEnd').classList.add('hidden');
    }
  }, 200);
}

function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  addToRecent(id);
  const isFav = state.favorites.includes(id);
  const reviewsForProduct = state.reviews.slice(0, 3);
  document.getElementById('productModalContent').innerHTML = `
    <div style="font-size:52px;text-align:center;margin-bottom:10px;">${p.flag}</div>
    <h3 style="font-size:20px;font-weight:800;text-align:center;margin-bottom:6px;">${p.name}</h3>
    <div style="text-align:center;color:var(--muted);font-size:12px;margin-bottom:12px;">${p.sub}</div>
    <div class="product-rating" style="justify-content:center;margin-bottom:12px;">
      ${'<span class="star" style="color:var(--yellow);font-size:16px;">★</span>'.repeat(Math.round(p.rating))}
      <span style="margin-left:6px;font-weight:700;">${p.rating}</span>
    </div>
    <div style="display:flex;gap:10px;justify-content:center;margin-bottom:16px;">
      <div class="product-tag">⚡ Автовыдача</div>
      <div class="product-tag">🛡 Гарантия 24ч</div>
      ${p.stock <= LOW_STOCK_THRESHOLD ? `<div class="product-tag" style="color:var(--yellow)">⚠ ${p.stock} шт</div>` : ''}
    </div>
    <div style="text-align:center;font-size:28px;font-weight:800;margin-bottom:16px;">
      ${p.price}₽ ${p.oldPrice ? `<span style="font-size:16px;color:var(--muted);text-decoration:line-through;margin-left:8px;">${p.oldPrice}₽</span>` : ''}
    </div>
    <div style="display:flex;gap:8px;margin-bottom:14px;">
      <button class="btn btn-secondary" style="flex:1;" onclick="toggleFav(${id});closeModal('modalProduct');">${isFav ? '❤️ В избранном' : '🤍 В избранное'}</button>
      <button class="btn btn-secondary" style="flex:1;" onclick="shareProduct(${id})">📤 Поделиться</button>
    </div>
    <button class="btn btn-primary btn-full" onclick="addToCart(${id});closeModal('modalProduct');">В корзину</button>
    <button class="btn btn-secondary btn-full" style="margin-top:8px;" onclick="buyNow(${id});closeModal('modalProduct');">Купить сразу</button>
    ${reviewsForProduct.length ? `
      <div style="margin-top:20px;text-align:left;">
        <div style="font-size:13px;font-weight:800;margin-bottom:8px;">⭐ Отзывы (${reviewsForProduct.length})</div>
        ${reviewsForProduct.map(r => `<div class="review-mini"><div class="review-mini-head"><span class="review-mini-author">@${r.author}</span><span class="review-mini-stars">${'★'.repeat(r.rating||5)}</span></div><div class="review-mini-text">${escapeHtml(r.text)}</div></div>`).join('')}
      </div>
    ` : ''}
  `;
  openModal('modalProduct');
}

function shareProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const link = `${BOT_LINK}?startapp=product_${id}`;
  if (navigator.share) {
    navigator.share({ title: p.name, text: `Смотри: ${p.name} за ${p.price}₽`, url: link }).catch(()=>{});
  } else {
    navigator.clipboard?.writeText(link);
    toast('Ссылка скопирована', 'success');
  }
}

// ==================== FAVORITES ====================
function toggleFav(id) {
  const i = state.favorites.indexOf(id);
  if (i >= 0) state.favorites.splice(i, 1);
  else state.favorites.push(id);
  Storage.set('favorites', state.favorites);
  renderProducts();
  renderFavorites();
  haptic('light');
}

function renderFavorites() {
  const list = document.getElementById('favList');
  const empty = document.getElementById('favEmpty');
  if (!list) return;
  if (!state.favorites.length) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  const items = state.favorites.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  list.innerHTML = items.map(p => `
    <div class="cart-item">
      <div class="cart-item-info">
        <span style="font-size:24px;">${p.flag}</span>
        <div>
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${p.price}₽</div>
        </div>
      </div>
      <button class="cart-remove" onclick="toggleFav(${p.id})">✕</button>
    </div>
  `).join('');
}

// ==================== RECENT ====================
function addToRecent(id) {
  state.recent = [id, ...state.recent.filter(x => x !== id)].slice(0, 8);
  Storage.set('recent', state.recent);
  renderRecent();
}

function renderRecent() {
  const el = document.getElementById('recentList');
  const title = document.getElementById('recentTitle');
  if (!el) return;
  if (!state.recent.length) {
    el.innerHTML = '';
    title.classList.add('hidden');
    return;
  }
  title.classList.remove('hidden');
  el.innerHTML = state.recent.map(id => {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return '';
    return `<div class="hscroll-item" onclick="openProduct(${p.id})">
      <div class="hscroll-flag">${p.flag}</div>
      <div class="hscroll-name">${p.name}</div>
      <div class="hscroll-price">${p.price}₽</div>
    </div>`;
  }).join('');
}

// ==================== PACKAGES ====================
function renderPackages() {
  const el = document.getElementById('packagesList');
  if (!el) return;
  el.innerHTML = PACKAGES.map(pkg => `
    <div class="package">
      <div class="package-info">
        <div class="package-title">${pkg.title}</div>
        <div class="package-sub">${pkg.sub}</div>
        <div class="package-price-row">
          <div class="package-price">${pkg.price}₽</div>
          <div class="package-old">${pkg.oldPrice}₽</div>
        </div>
      </div>
      <button class="btn btn-primary" onclick="addPackageToCart('${pkg.id}')">Взять</button>
    </div>
  `).join('');
}

function addPackageToCart(id) {
  const pkg = PACKAGES.find(p => p.id === id);
  if (!pkg) return;
  state.cart.push({ id: pkg.id, name: pkg.title, flag: '🎁', price: pkg.price });
  Storage.set('cart', state.cart);
  renderCartBadge();
  renderCart();
  toast(`${pkg.title} в корзине`, 'success');
  haptic('light');
}

// ==================== CART ====================
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  state.cart.push({ id: p.id, name: p.name, flag: p.flag, price: p.price });
  Storage.set('cart', state.cart);
  renderCartBadge();
  renderCart();
  toast(`${p.name} в корзине`, 'success');
  haptic('light');
  playSound();
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
  const upsell = document.getElementById('upsell');
  if (!list) return;

  if (!state.cart.length) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    summary.classList.add('hidden');
    upsell.classList.add('hidden');
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

  // Апселл
  const cartIds = state.cart.map(i => i.id);
  const suggestions = PRODUCTS.filter(p => !cartIds.includes(p.id) && p.price < 400).slice(0, 2);
  if (suggestions.length) {
    upsell.classList.remove('hidden');
    document.getElementById('upsellList').innerHTML = suggestions.map(p => `
      <div class="upsell-item">
        <span><span style="font-size:18px;">${p.flag}</span> <span class="upsell-name">${p.name}</span></span>
        <div style="display:flex;gap:8px;align-items:center;">
          <span class="upsell-price">${p.price}₽</span>
          <button class="upsell-add" onclick="addToCart(${p.id})">+</button>
        </div>
      </div>
    `).join('');
  } else upsell.classList.add('hidden');

  const subtotal = state.cart.reduce((s, i) => s + i.price, 0);
  const loyaltyDiscount = Math.round(subtotal * getCashbackPercent() / 100);
  const promoDiscount = state.appliedPromo ? Math.round(subtotal * state.appliedPromo.disc / 100) : 0;
  const total = subtotal - loyaltyDiscount - promoDiscount;

  document.getElementById('cartCount').textContent = state.cart.length;
  document.getElementById('cartLoyalty').textContent = `-${loyaltyDiscount}₽`;
  document.getElementById('cartPromo').textContent = state.appliedPromo ? `${state.appliedPromo.code} (-${state.appliedPromo.disc}%)` : '—';
  document.getElementById('cartTotal').textContent = Math.max(0, total) + '₽';
}

function removeCart(i) {
  state.cart.splice(i, 1);
  Storage.set('cart', state.cart);
  renderCart();
  renderCartBadge();
  haptic('light');
}

function applyPromoInCart() {
  openModal('modalPromo');
}

function applyPromo() {
  const code = document.getElementById('promoInput').value.trim().toUpperCase();
  const resultEl = document.getElementById('promoResult');
  if (!code) return;
  // Проверка из админских
  const promo = state.promos.find(p => p.code === code);
  // Плюс встроенные
  const builtIn = {
    'CASE5': 5, 'CASE10': 10, 'CASE15': 15, 'CASE3': 3, 'CASE20': 20,
    'WHEEL5': 5, 'WHEEL10': 10, 'WHEEL15': 15, 'WHEEL20': 20, 'WHEEL50': 50,
    'WELCOME10': 10, 'DESIRED5': 5
  };

  let discount = null;
  let displayCode = code;
  if (promo) discount = promo.disc;
  else if (builtIn[code]) discount = builtIn[code];

  if (!discount) {
    resultEl.textContent = '❌ Промокод не найден';
    resultEl.style.color = 'var(--accent)';
    return;
  }

  // Проверка использований
  const used = state.usedPromos[code] || 0;
  if (used > 0) {
    resultEl.textContent = '❌ Промокод уже использован';
    resultEl.style.color = 'var(--accent)';
    return;
  }

  state.appliedPromo = { code: displayCode, disc: discount };
  state.usedPromos[code] = 1;
  Storage.set('usedPromos', state.usedPromos);
  resultEl.textContent = `✅ Промокод применён: -${discount}%`;
  resultEl.style.color = 'var(--green)';
  toast(`Промокод -${discount}% активирован`, 'success');
  setTimeout(() => {
    closeModal('modalPromo');
    renderCart();
    document.getElementById('promoInput').value = '';
    resultEl.textContent = '';
  }, 1200);
}

function openPromoModal() { openModal('modalPromo'); }

// ==================== TOP UP ====================
function openTopUp() { openModal('modalTopUp'); }

function submitTopUp() {
  const amount = +document.getElementById('topUpAmount').value;
  if (!amount || amount < 25) return toast('Минимум 25₽', 'error');
  const balance = Storage.get('balance', 0) + amount;
  Storage.set('balance', balance);
  state.stats.topUp += amount;
  Storage.set('stats', state.stats);
  state.transactions.unshift({ type: 'in', title: 'Пополнение баланса', amount, date: Date.now() });
  Storage.set('transactions', state.transactions);
  updateProfileUI();
  renderTransactions();
  closeModal('modalTopUp');
  document.getElementById('topUpAmount').value = '';
  toast(`+${amount}₽ на баланс`, 'success');
  haptic('medium');
}

function checkout() {
  if (!state.cart.length) return;
  const subtotal = state.cart.reduce((s, i) => s + i.price, 0);
  const loyaltyDiscount = Math.round(subtotal * getCashbackPercent() / 100);
  const promoDiscount = state.appliedPromo ? Math.round(subtotal * state.appliedPromo.disc / 100) : 0;
  const total = Math.max(0, subtotal - loyaltyDiscount - promoDiscount);
  const balance = Storage.get('balance', 0);
  if (balance < total) {
    toast('Недостаточно средств. Пополни баланс.', 'error');
    return;
  }
  const newBalance = balance - total;
  Storage.set('balance', newBalance);

  state.orders.push({
    id: 'ORD' + Date.now(),
    items: state.cart,
    total,
    status: 'Выдан',
    date: Date.now()
  });
  Storage.set('orders', state.orders);
  state.transactions.unshift({ type: 'out', title: `Заказ на ${total}₽`, amount: total, date: Date.now() });
  Storage.set('transactions', state.transactions);

  state.stats.spent += total;
  state.stats.orders += 1;
  state.points += Math.round(total * 0.05);
  Storage.set('stats', state.stats);
  Storage.set('points', state.points);

  state.cart = [];
  state.appliedPromo = null;
  Storage.set('cart', state.cart);

  updateProfileUI();
  renderCart();
  renderCartBadge();
  renderTransactions();
  renderOrders();
  checkLoyalty();
  checkAchievements();
  toast('Заказ оформлен! Товары в инвентаре.', 'success');
  haptic('heavy');
  playSound();
}

// ==================== TRANSACTIONS / ORDERS ====================
function renderTransactions() {
  const list = document.getElementById('txList');
  const empty = document.getElementById('txEmpty');
  if (!list) return;
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

function renderOrders() {
  const list = document.getElementById('ordersList');
  const empty = document.getElementById('ordersEmpty');
  if (!list) return;
  if (!state.orders.length) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  list.innerHTML = state.orders.map(o => `
    <div class="cart-item">
      <div class="cart-item-info">
        <span style="font-size:20px;">📦</span>
        <div>
          <div class="cart-item-name">${o.id}</div>
          <div class="cart-item-price">${o.total}₽ · ${o.status}</div>
        </div>
      </div>
      <div class="muted" style="font-size:11px;">${new Date(o.date).toLocaleDateString()}</div>
    </div>
  `).join('');
}

// ==================== REF ====================
function renderRefLink() {
  const link = `${BOT_LINK}?start=ref_${state.currentUser?.username || 'user'}`;
  const el = document.getElementById('refLink');
  if (el) el.value = link;
}
function copyRef() {
  const el = document.getElementById('refLink');
  if (!el) return;
  el.select();
  document.execCommand('copy');
  toast('Ссылка скопирована', 'success');
  haptic('light');
}

// ==================== REVIEWS ====================
function renderReviews() {
  const list = document.getElementById('reviewsList');
  const avg = document.getElementById('reviewAvg');
  const count = document.getElementById('reviewCount');
  if (!list) return;

  let items = [...state.reviews];
  if (state.reviewFilter === '5') items = items.filter(r => r.rating === 5);
  if (state.reviewFilter === '4') items = items.filter(r => r.rating === 4);

  if (avg) {
    const avgVal = items.length
      ? (items.reduce((s, r) => s + (r.rating || 5), 0) / items.length).toFixed(1)
      : '5.0';
    avg.textContent = avgVal;
  }
  if (count) count.textContent = items.length;

  if (!items.length) {
    list.innerHTML = '<div style="text-align:center;color:var(--muted);padding:20px;font-size:13px;">Пока нет отзывов. Будь первым!</div>';
    return;
  }
  list.innerHTML = items.map((r, i) => `
    <div class="review-item">
      <div class="review-head">
        <div class="review-author">@${r.author}</div>
        <div class="review-date">${new Date(r.date).toLocaleDateString()}</div>
      </div>
      <div class="review-stars">${'★'.repeat(r.rating || 5)}</div>
      <div class="review-text">${escapeHtml(r.text)}</div>
      <div class="review-helpful">
        <button onclick="reviewHelpful(${i}, 'up')">👍 Полезно</button>
        <button onclick="reviewHelpful(${i}, 'down')">👎</button>
      </div>
    </div>
  `).join('');
}

document.querySelectorAll('.quick-chip[data-rfilter]').forEach(c => {
  c.addEventListener('click', () => {
    document.querySelectorAll('.quick-chip[data-rfilter]').forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    state.reviewFilter = c.dataset.rfilter;
    renderReviews();
  });
});

function reviewHelpful(i, type) {
  toast('Спасибо за оценку!', 'success');
}

document.querySelectorAll('#starsInput span').forEach(s => {
  s.addEventListener('click', () => {
    state.reviewRating = +s.dataset.star;
    document.querySelectorAll('#starsInput span').forEach(x => {
      x.classList.toggle('active', +x.dataset.star <= state.reviewRating);
    });
    haptic('light');
  });
});

function renderReviewsMini() {
  const el = document.getElementById('reviewsMini');
  if (!el) return;
  const items = state.reviews.slice(0, 3);
  if (!items.length) {
    el.innerHTML = '<div style="text-align:center;color:var(--muted);padding:16px;font-size:13px;">Пока нет отзывов</div>';
    return;
  }
  el.innerHTML = items.map(r => `
    <div class="review-mini">
      <div class="review-mini-head">
        <span class="review-mini-author">@${r.author}</span>
        <span class="review-mini-stars">${'★'.repeat(r.rating || 5)}</span>
      </div>
      <div class="review-mini-text">${escapeHtml(r.text).slice(0, 120)}</div>
    </div>
  `).join('');
}

function addReview() {
  const text = document.getElementById('reviewText').value.trim();
  if (!text) return toast('Напиши отзыв', 'error');
  state.reviews.unshift({
    author: state.currentUser?.username || 'user',
    text,
    rating: state.reviewRating,
    date: Date.now()
  });
  Storage.set('reviews', state.reviews);
  document.getElementById('reviewText').value = '';
  state.reviewRating = 5;
  document.querySelectorAll('#starsInput span').forEach((x, i) => x.classList.toggle('active', i < 5));
  state.points += 10;
  Storage.set('points', state.points);
  updateProfileUI();
  renderReviews();
  renderReviewsMini();
  toast('Отзыв опубликован! +10 баллов', 'success');
  checkAchievements();
}

// ==================== FAQ ====================
function renderFAQ() {
  const el = document.getElementById('faqList');
  if (!el) return;
  const q = document.getElementById('faqSearch')?.value?.toLowerCase().trim() || '';
  const filtered = q ? FAQ.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)) : FAQ;
  el.innerHTML = filtered.map((f, i) => `
    <div class="faq-item" onclick="toggleFaq(this)">
      <div class="faq-q">${f.q}<span>▾</span></div>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('') || '<div style="text-align:center;color:var(--muted);padding:20px;">Ничего не найдено</div>';
}
function toggleFaq(el) { el.classList.toggle('open'); }

document.addEventListener('input', (e) => {
  if (e.target.id === 'faqSearch') renderFAQ();
});

// ==================== CHAT ====================
function renderChat() {
  const box = document.getElementById('chatMessages');
  if (!box) return;
  const ch = state.chatChannel || 'general';
  const msgs = state.chat[ch] || [];
  if (!msgs.length) {
    box.innerHTML = '<div style="text-align:center;color:var(--muted);padding:20px;font-size:13px;">Пока тихо. Начни первым!</div>';
    return;
  }
  box.innerHTML = msgs.slice(-50).map(m => `
    <div class="chat-msg ${m.author === state.currentUser?.username ? 'me' : ''}">
      <div class="chat-author">@${m.author}</div>
      <div class="chat-text">${escapeHtml(m.text)}</div>
    </div>
  `).join('');
  box.scrollTop = box.scrollHeight;
}

document.querySelectorAll('.chat-ch').forEach(ch => {
  ch.addEventListener('click', () => {
    document.querySelectorAll('.chat-ch').forEach(x => x.classList.remove('active'));
    ch.classList.add('active');
    state.chatChannel = ch.dataset.ch;
    renderChat();
  });
});

function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  const ch = state.chatChannel || 'general';
  if (!state.chat[ch]) state.chat[ch] = [];
  state.chat[ch].push({
    author: state.currentUser?.username || 'user',
    text,
    date: Date.now()
  });
  Storage.set('chat', state.chat);
  input.value = '';
  renderChat();
  haptic('light');
}

// ==================== CASE / WHEEL / DAILY ====================
function initCase() {
  const last = state.lastCase || 0;
  const diff = Date.now() - last;
  const dayMs = 24*60*60*1000;
  const status = document.getElementById('caseStatus');
  if (!status) return;
  if (diff >= dayMs) status.textContent = 'Доступен!';
  else {
    const h = Math.floor((dayMs - diff) / (60*60*1000));
    const m = Math.floor(((dayMs - diff) % (60*60*1000)) / (60*1000));
    status.textContent = `Доступен через ${h}ч ${m}м`;
  }
}

function spinCase() {
  if (Date.now() - (state.lastCase || 0) < 24*60*60*1000) return toast('Кейс уже крутился', 'error');
  const prizes = [
    { emoji: '🎉', title: 'Скидка 5%', text: 'Промокод: CASE5' },
    { emoji: '🎁', title: 'Скидка 10%', text: 'Промокод: CASE10' },
    { emoji: '🔥', title: 'Скидка 15%', text: 'Промокод: CASE15' },
    { emoji: '⭐', title: 'Скидка 3%', text: 'Промокод: CASE3' },
    { emoji: '💎', title: 'Скидка 20%', text: 'Промокод: CASE20' }
  ];
  const prize = prizes[Math.floor(Math.random() * prizes.length)];
  document.getElementById('caseResultEmoji').textContent = prize.emoji;
  document.getElementById('caseResultTitle').textContent = prize.title;
  document.getElementById('caseResultText').textContent = prize.text;
  state.lastCase = Date.now();
  Storage.set('lastCase', state.lastCase);
  initCase();
  openModal('modalCaseResult');
  haptic('medium');
  checkAchievements();
}

function initWheel() {
  const last = state.lastWheel || 0;
  const diff = Date.now() - last;
  const dayMs = 24*60*60*1000;
  const status = document.getElementById('wheelStatus');
  if (!status) return;
  if (diff >= dayMs) status.textContent = 'Доступно!';
  else {
    const h = Math.floor((dayMs - diff) / (60*60*1000));
    status.textContent = `Доступно через ${h}ч`;
  }
}

function spinWheel() {
  if (Date.now() - (state.lastWheel || 0) < 24*60*60*1000) return toast('Колесо уже крутилось', 'error');
  const prizes = [
    { emoji: '🎉', title: 'Скидка 5%', text: 'Промокод: WHEEL5' },
    { emoji: '🎁', title: 'Скидка 10%', text: 'Промокод: WHEEL10' },
    { emoji: '🔥', title: 'Скидка 15%', text: 'Промокод: WHEEL15' },
    { emoji: '💎', title: 'Скидка 20%', text: 'Промокод: WHEEL20' },
    { emoji: '👑', title: 'JACKPOT - Скидка 50%!', text: 'Промокод: WHEEL50' }
  ];
  const weights = [30, 25, 20, 15, 10];
  const total = weights.reduce((a,b) => a+b, 0);
  let r = Math.random() * total;
  let idx = 0;
  for (let i = 0; i < weights.length; i++) {
    if (r < weights[i]) { idx = i; break; }
    r -= weights[i];
  }
  const prize = prizes[idx];
  document.getElementById('wheelResultEmoji').textContent = prize.emoji;
  document.getElementById('wheelResultTitle').textContent = prize.title;
  document.getElementById('wheelResultText').textContent = prize.text;
  state.lastWheel = Date.now();
  Storage.set('lastWheel', state.lastWheel);
  initWheel();
  openModal('modalWheelResult');
  haptic('heavy');
}

function initDaily() {
  const last = state.lastDaily || 0;
  const diff = Date.now() - last;
  const dayMs = 24*60*60*1000;
  const status = document.getElementById('dailyStatus');
  if (!status) return;
  if (diff >= dayMs) status.textContent = 'Забери 5 баллов';
  else {
    const h = Math.floor((dayMs - diff) / (60*60*1000));
    status.textContent = `Через ${h}ч`;
  }
}

function claimDaily() {
  if (Date.now() - (state.lastDaily || 0) < 24*60*60*1000) return toast('Уже получено', 'error');
  state.lastDaily = Date.now();
  state.streak = (state.streak || 0) + 1;
  state.points += 5;
  Storage.set('lastDaily', state.lastDaily);
  Storage.set('streak', state.streak);
  Storage.set('points', state.points);
  initDaily();
  updateProfileUI();
  toast(`+5 баллов! Стрик: ${state.streak}`, 'success');
  haptic('medium');
  checkAchievements();
}

// ==================== LOYALTY / ACHIEVEMENTS ====================
function getCashbackPercent() {
  const spent = state.stats.spent;
  if (spent >= 50000) return 12;
  if (spent >= 20000) return 8;
  if (spent >= 5000) return 5;
  return 3;
}

function getLoyaltyLevel() {
  const spent = state.stats.spent;
  if (spent >= 50000) return { name: 'Platinum', emoji: '💎', color: '#7c3aed' };
  if (spent >= 20000) return { name: 'Gold', emoji: '🥇', color: '#fbbf24' };
  if (spent >= 5000) return { name: 'Silver', emoji: '🥈', color: '#c0c0c0' };
  return { name: 'Bronze', emoji: '🥉', color: '#cd7f32' };
}

function checkLoyalty() {
  const level = getLoyaltyLevel();
  const badge = document.getElementById('loyaltyBadge');
  const fill = document.getElementById('loyaltyFill');
  const text = document.getElementById('loyaltyProgressText');
  const cashback = document.getElementById('cashbackPercent');
  const spentEl = document.getElementById('loyaltySpent');
  if (!badge) return;
  badge.textContent = `${level.emoji} ${level.name}`;
  const thresholds = [0, 5000, 20000, 50000];
  const next = thresholds.find(t => t > state.stats.spent) || 50000;
  const prev = thresholds.filter(t => t <= state.stats.spent).pop() || 0;
  const progress = Math.min(100, ((state.stats.spent - prev) / (next - prev)) * 100);
  if (fill) fill.style.width = progress + '%';
  if (text) text.textContent = `${state.stats.spent} / ${next}₽`;
  if (cashback) cashback.textContent = getCashbackPercent() + '%';
  if (spentEl) spentEl.textContent = state.stats.spent + '₽';
  state.loyaltyLevel = level.name.toLowerCase();
}

function checkAchievements() {
  const unlocked = state.achievements;
  const check = (id, cond) => {
    if (cond && !unlocked.includes(id)) {
      unlocked.push(id);
      const a = ACHIEVEMENTS.find(x => x.id === id);
      toast(`${a.icon} Достижение: ${a.name}`, 'success');
      haptic('medium');
    }
  };
  check('first_order', state.orders.length >= 1);
  check('ten_orders', state.orders.length >= 10);
  check('big_spender', state.stats.spent >= 5000);
  check('reviewer', state.reviews.filter(r => r.author === state.currentUser?.username).length >= 5);
  check('daily_master', state.streak >= 7);
  check('loyal', ['gold', 'platinum'].includes(state.loyaltyLevel));
  Storage.set('achievements', unlocked);
  renderAchievements();
}

function renderAchievements() {
  const el = document.getElementById('achList');
  if (!el) return;
  el.innerHTML = ACHIEVEMENTS.map(a => `
    <div class="ach-item ${state.achievements.includes(a.id) ? 'unlocked' : ''}">
      <div class="ach-icon">${a.icon}</div>
      <div class="ach-name">${a.name}</div>
      <div class="ach-desc">${a.desc}</div>
    </div>
  `).join('');
}

function renderLeaderboard(type) {
  const el = document.getElementById('lbList');
  if (!el) return;
  const mockBuyers = [
    { name: '@whale_king', val: 287 },
    { name: '@bulk_buyer', val: 194 },
    { name: '@trader_pro', val: 156 },
    { name: '@reseller', val: 98 },
    { name: '@active_user', val: 67 },
    { name: '@desired', val: state.stats.orders || 0 },
    { name: '@newbie', val: 3 }
  ].sort((a,b) => b.val - a.val).slice(0, 10);

  const mockRefs = [
    { name: '@referrer_pro', val: 145 },
    { name: '@invite_king', val: 98 },
    { name: '@network', val: 76 },
    { name: '@ambassador', val: 42 },
    { name: '@desired', val: state.achievements.length }
  ].sort((a,b) => b.val - a.val).slice(0, 10);

  const data = type === 'buyers' ? mockBuyers : mockRefs;
  el.innerHTML = data.map((d, i) => `
    <div class="lb-item ${i < 3 ? 'top' + (i+1) : ''}">
      <div class="lb-rank">${i + 1}</div>
      <div class="lb-name">${d.name}</div>
      <div class="lb-value">${d.val}${type === 'buyers' ? ' зак.' : ' реф.'}</div>
    </div>
  `).join('');
}

document.querySelectorAll('.lb-tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.lb-tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    renderLeaderboard(t.dataset.lb);
  });
});

function renderDiary() {
  const el = document.getElementById('diaryList');
  if (!el) return;
  el.innerHTML = DIARY.map(d => `
    <div class="diary-item">
      <div class="diary-date">${d.date}</div>
      <div class="diary-text">${d.text}</div>
    </div>
  `).join('');
}

function renderChangelog() {
  const el = document.getElementById('changelogList');
  if (!el) return;
  el.innerHTML = CHANGELOG.map(c => `
    <div class="changelog-item">
      <div class="changelog-head">
        <div class="changelog-ver">${c.ver}</div>
        <div class="changelog-date">${c.date}</div>
      </div>
      <ul class="changelog-list-ul">
        ${c.changes.map(ch => `<li>${ch}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// ==================== LIVE FEED ====================
function renderLiveFeed() {
  const el = document.getElementById('liveFeed');
  if (!el) return;
  const items = [...LIVE_BUYERS].sort(() => Math.random() - 0.5).slice(0, 6);
  el.innerHTML = items.map(b => `
    <div class="live-item">
      <span class="flag">${b.flag}</span>
      <span class="who">${b.name}</span>
      <span class="what">купил ${b.product}</span>
      <span class="when">${Math.floor(Math.random() * 30) + 1} мин</span>
    </div>
  `).join('');
}

function startOnlineTicker() {
  setInterval(() => {
    state.onlineCount += Math.floor(Math.random() * 5) - 2;
    if (state.onlineCount < 1000) state.onlineCount = 1000;
    const el = document.getElementById('liveOnline');
    if (el) el.textContent = state.onlineCount.toLocaleString();
    const el2 = document.getElementById('infoOnline');
    if (el2) el2.textContent = state.onlineCount.toLocaleString();
  }, 5000);
}

// ==================== MODALS ====================
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('show');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('show');
}
function contactSupport() { window.open(SUPPORT_LINK, '_blank'); }

function createTicket() {
  const theme = document.getElementById('ticketTheme').value.trim();
  const text = document.getElementById('ticketText').value.trim();
  if (!theme || !text) return toast('Заполни все поля', 'error');
  document.getElementById('ticketTheme').value = '';
  document.getElementById('ticketText').value = '';
  toast('Тикет создан. Мы ответим в течение 24ч.', 'success');
}

// ==================== TOASTS ====================
function toast(text, type = 'info') {
  const wrap = document.getElementById('toastWrap');
  if (!wrap) return;
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = text;
  wrap.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity .3s';
    setTimeout(() => el.remove(), 300);
  }, 2200);
}

// ==================== HAPTIC / SOUND ====================
function haptic(type = 'light') {
  const h = window.Telegram?.WebApp?.HapticFeedback;
  if (!h) return;
  try {
    if (type === 'light') h.impactOccurred('light');
    if (type === 'medium') h.impactOccurred('medium');
    if (type === 'heavy') h.impactOccurred('heavy');
  } catch {}
}

function playSound() {
  if (!Storage.get('soundEnabled', true)) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(); osc.stop(ctx.currentTime + 0.15);
  } catch {}
}

document.addEventListener('change', (e) => {
  if (e.target.id === 'soundToggle') Storage.set('soundEnabled', e.target.checked);
  if (e.target.id === 'notifyToggle') Storage.set('notifyEnabled', e.target.checked);
});

// ==================== HELPERS ====================
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ==================== PROMO TIMER ====================
let promoSeconds = 41*3600 + 27*60 + 35;
function startPromoTimer() {
  const el = document.getElementById('promoTimer');
  if (!el) return;
  setInterval(() => {
    if (promoSeconds <= 0) return;
    promoSeconds--;
    const h = String(Math.floor(promoSeconds/3600)).padStart(2,'0');
    const m = String(Math.floor((promoSeconds%3600)/60)).padStart(2,'0');
    const s = String(promoSeconds%60).padStart(2,'0');
    el.textContent = `ещё ${h}:${m}:${s}`;
  }, 1000);
}

// ==================== BIND EVENTS ====================
function bindEvents() {
  // все data-page кнопки
  document.querySelectorAll('[data-page]').forEach(el => {
    if (!el.dataset.bound) {
      el.dataset.bound = '1';
    }
  });
}

// Экспорт в window для inline onclick
window.go = go;
window.showAuthForm = showAuthForm;
window.doLogin = doLogin;
window.doRegister = doRegister;
window.confirmRegister = confirmRegister;
window.logout = logout;
window.checkAdminPass = checkAdminPass;
window.addPromo = addPromo;
window.delReview = delReview;
window.delChatMsg = delChatMsg;
window.toggleFav = toggleFav;
window.addToCart = addToCart;
window.buyNow = buyNow;
window.removeCart = removeCart;
window.addPackageToCart = addPackageToCart;
window.openProduct = openProduct;
window.shareProduct = shareProduct;
window.spinCase = spinCase;
window.spinWheel = spinWheel;
window.claimDaily = claimDaily;
window.openTopUp = openTopUp;
window.submitTopUp = submitTopUp;
window.openPromoModal = openPromoModal;
window.applyPromo = applyPromo;
window.applyPromoInCart = applyPromoInCart;
window.openModal = openModal;
window.closeModal = closeModal;
window.contactSupport = contactSupport;
window.createTicket = createTicket;
window.copyRef = copyRef;
window.addReview = addReview;
window.reviewHelpful = reviewHelpful;
window.sendChat = sendChat;
window.toggleFaq = toggleFaq;
window.setSearch = setSearch;
window.toast = toast;
