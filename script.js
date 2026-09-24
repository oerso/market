// ==================== CONFIG ====================
let ADMIN_PASSWORD = Storage.get('adminPassword', '837472');
const ADMIN_IDS = [7803765347, 912559442];
const SUPPORT_LINK = 'https://t.me/desired_support';
const BOT_LINK = 'https://t.me/desired_bot';
const LOW_STOCK = 5;

// ==================== STORAGE ====================
function Storage_get(k, d = null) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } }
function Storage_set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
function Storage_del(k) { try { localStorage.removeItem(k); } catch {} }
const Storage = { get: Storage_get, set: Storage_set, del: Storage_del };

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
  inventory: Storage.get('inventory', []),
  points: Storage.get('points', 0),
  stats: Storage.get('stats', { topUp: 0, spent: 0, orders: 0 }),
  achievements: Storage.get('achievements', []),
  lastCase: Storage.get('lastCase', 0),
  lastWheel: Storage.get('lastWheel', 0),
  lastDaily: Storage.get('lastDaily', 0),
  streak: Storage.get('streak', 0),
  onlineCount: 1247,
  soldToday: 32,
  tgUser: null,
  appliedPromo: null,
  chatChannel: 'general',
  reviewRating: 5,
  reviewFilter: 'all',
  inventoryFilter: 'all',
  catalogTab: 'accounts',
  quickFilter: 'all',
  loyaltyLevel: 'bronze',
  filters: { priceMin: 0, priceMax: 0, sort: 'popular', hit: false, isNew: false, sale: false, rating45: false }
};

// ==================== PRODUCTS ====================
let PRODUCTS = Storage.get('products', null) || [
  { id: 1, flag: '🇺🇸', name: 'США', sub: '2078 покупок · автовыдача', price: 89, oldPrice: 99, rating: 5, badge: 'ХИТ', stock: 42, category: 'accounts', tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 2, flag: '🇬🇧', name: 'Великобритания', sub: '107 покупок · автовыдача', price: 159, rating: 4.8, stock: 18, category: 'accounts', tags: ['⚡ автовыдача'] },
  { id: 3, flag: '🇯🇵', name: 'Япония', sub: '52 покупки · автовыдача', price: 349, rating: 4.9, stock: 7, category: 'accounts', tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 4, flag: '🇨🇴', name: 'Колумбия', sub: '34 покупки · автовыдача', price: 129, rating: 4.7, stock: 12, category: 'accounts', tags: ['⚡ автовыдача'] },
  { id: 5, flag: '🇰🇿', name: 'Казахстан', sub: '88 покупок · автовыдача', price: 99, rating: 4.8, stock: 25, category: 'accounts', tags: ['⚡ автовыдача'] },
  { id: 6, flag: '⭐', name: 'Telegram Stars 100', sub: 'Мгновенная выдача', price: 145, rating: 5, badge: 'NEW', stock: 89, category: 'stars', tags: ['⚡ автовыдача'] },
  { id: 7, flag: '⭐', name: 'Telegram Stars 500', sub: 'Мгновенная выдача', price: 690, rating: 5, stock: 45, category: 'stars', tags: ['⚡ автовыдача'] },
  { id: 8, flag: '💎', name: 'Telegram Premium 3 мес', sub: 'Активация на аккаунт', price: 590, rating: 4.9, badge: 'ХИТ', stock: 30, category: 'stars', tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 9, flag: '💎', name: 'Telegram Premium 12 мес', sub: 'Активация на аккаунт', price: 1890, rating: 4.9, stock: 15, category: 'stars', tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 10, flag: '🎁', name: 'NFT подарок Basic', sub: 'Аренда 30 дней', price: 249, rating: 4.6, stock: 22, category: 'stars', tags: ['🎁 аренда'] },
  { id: 11, flag: '🎁', name: 'NFT подарок Rare', sub: 'Аренда 30 дней', price: 890, rating: 4.8, badge: 'NEW', stock: 8, category: 'stars', tags: ['🎁 аренда'] }
];
function saveProducts() { Storage.set('products', PRODUCTS); }

const FAQ = [
  { q: 'Как получить товар?', a: 'После оплаты товар выдаётся автоматически в разделе «Инвентарь».' },
  { q: 'Способы оплаты?', a: 'СБП, карты РФ, Telegram Stars, CryptoBot.' },
  { q: 'Товар не работает?', a: 'Напишите в поддержку с номером заказа. Решим в течение 24 часов.' },
  { q: 'Реферальная программа?', a: '10% с покупок рефералов 1 уровня и 3% со 2 уровня.' },
  { q: 'Восстановление пароля?', a: 'Только через поддержку. Сохраняйте данные в надёжном месте!' },
  { q: 'Безопасно ли?', a: 'Да, все товары проверяются, оплата через защищённые шлюзы.' },
  { q: 'Сколько идёт выдача?', a: 'Автовыдача мгновенно.' },
  { q: 'Возврат денег?', a: 'Да, если товар не работает — в течение 24 часов.' },
  { q: 'Какие аккаунты?', a: 'Отлежавшиеся, с полным доступом.' },
  { q: 'Оптовые скидки?', a: 'От 10 штук — 15%, от 50 — 25%.' },
  { q: 'Как пополнить?', a: 'Нажми на баланс сверху → Пополнение.' },
  { q: 'Оплата не прошла?', a: 'Проверь баланс. Если списалось — в поддержку.' },
  { q: 'Гарантия?', a: 'От 24ч до 7 дней в зависимости от типа товара.' },
  { q: 'Перепродажа?', a: 'Да, без раскрытия источника и без демпинга.' },
  { q: 'Срок жизни аккаунта?', a: 'От 6 месяцев при правильном использовании.' },
  { q: 'Что такое аренда NFT?', a: 'Подарок в профиль на 30 дней. Потом — продление.' },
  { q: 'Что такое Stars?', a: 'Внутренняя валюта Telegram для подарков.' },
  { q: 'Куда приходят звёзды?', a: 'На твой Telegram-аккаунт.' },
  { q: 'Без Premium?', a: 'Да, Stars продаются отдельно.' },
  { q: 'Скидки постоянным?', a: 'Bronze 3%, Silver 5%, Gold 8%, Platinum 12% кэшбэка.' },
  { q: 'Вывод рефки?', a: 'От 500₽ на карту или CryptoBot.' },
  { q: 'Рассрочка?', a: 'Для крупных покупок — да.' },
  { q: 'Что за кейс дня?', a: 'Раз в 24 часа можно выбить промокод на скидку.' },
  { q: 'Что за колесо?', a: 'Как кейс, но с другими призами.' },
  { q: 'Что за баллы?', a: 'Копятся с покупок, входов, отзывов.' },
  { q: 'Как стать Verified?', a: '5+ отзывов и покупок на 5000₽+.' },
  { q: 'Обманул продавец?', a: 'У нас нет продавцов. Пишите в поддержку.' },
  { q: 'Оплата с чужой карты?', a: 'Только с разрешения.' },
  { q: 'Есть приложение?', a: 'Работает в Telegram как Mini App.' },
  { q: 'Новые товары?', a: 'Следи за обновлениями.' },
  { q: 'Что за чат?', a: 'Общение юзеров. Три канала.' },
  { q: 'Стать модератором?', a: 'Активным юзерам по приглашению.' }
];

const INFO_ITEMS = [
  { q: 'О маркете', a: 'desired — маркет цифровых товаров: Telegram-аккаунты, звёзды, премиум, аренда NFT. Автовыдача 24/7.' },
  { q: 'Гарантии', a: '100% возврат, если товар не работает. Заявку подаёшь в течение 24 часов после покупки.' },
  { q: 'Правила', a: 'Возврат возможен только в случае нерабочего товара.' },
  { q: 'Публичная статистика', a: 'Продано заказов: 12 458. Оценка: 4.9.' },
  { q: 'Пользовательское соглашение', a: 'Открывается после переезда на сервер.' },
  { q: 'Политика конфиденциальности', a: 'Открывается после переезда на сервер.' },
  { q: 'Правила возврата', a: 'Заявка в течение 24 часов после покупки.' }
];

const ACHIEVEMENTS = [
  { id: 'first_order', icon: '🎯', name: 'Первый заказ', desc: 'Соверши первую покупку' },
  { id: 'ten_orders', icon: '🔟', name: '10 покупок', desc: 'Купи 10 товаров' },
  { id: 'big_spender', icon: '💎', name: 'Big Spender', desc: 'Потрать 5000₽' },
  { id: 'referrer', icon: '📣', name: 'Реферер', desc: 'Пригласи 3 друзей' },
  { id: 'reviewer', icon: '✍️', name: 'Критик', desc: 'Оставь 5 отзывов' },
  { id: 'daily_master', icon: '🔥', name: 'Стрик 7 дней', desc: 'Заходи 7 дней подряд' },
  { id: 'case_hunter', icon: '🎰', name: 'Кейс-хантер', desc: 'Крути кейс 5 раз' },
  { id: 'loyal', icon: '👑', name: 'Loyal', desc: 'Достигни Gold' }
];

const DIARY = [
  { date: 'Сегодня', text: 'Фикс багов: кнопки, скролл, модалки, фильтры. Убрали кейсы с главной, поставили скидку дня.' },
  { date: 'Вчера', text: 'Кастомизация тем и акцентов работает.' },
  { date: '2 дня назад', text: 'Собрали дизайн-систему на Manrope.' }
];

const CHANGELOG = [
  { ver: 'v0.6.1', date: 'Сегодня', changes: ['Фикс кнопки 3 точек', 'Фикс кнопки баланса → пополнение', 'Фикс модалок (админ, топ-ап, промо)', 'Фикс скролла страниц', 'Убраны кейсы с главной', 'Кнопка фильтров работает', 'Убран жёлтый из общего дизайна'] },
  { ver: 'v0.6.0', date: 'Вчера', changes: ['9 тем и 8 акцентов', 'Кастомизация настроек', 'Сезонные ивенты'] },
  { ver: 'v0.5.0', date: '3 дня назад', changes: ['Кейс дня и колесо', 'Ежедневный бонус', 'Лояльность и баллы'] },
  { ver: 'v0.4.0', date: '5 дней назад', changes: ['Полный редизайн', 'Авторизация', 'Корзина и профиль'] }
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
  applyAllSettings();
  initTelegram();

  setTimeout(() => {
    document.getElementById('splash')?.classList.add('hide');
    setTimeout(() => {
      if (state.currentUser) {
        if (!Storage.get('onboarded', false)) showOnboarding();
        else enterApp();
      } else {
        document.getElementById('authScreen')?.classList.remove('hidden');
      }
    }, 400);
  }, 1200);

  startPromoTimer();
  startOnlineTicker();
  initCase();
  initWheel();
  initDaily();
  renderLiveFeed();
  renderReviewsMini();
  bindAllListeners();
});

function initTelegram() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;
  try {
    tg.ready();
    tg.expand();
    tg.setHeaderColor?.('#08080a');
    tg.setBackgroundColor?.('#08080a');
    state.tgUser = tg.initDataUnsafe?.user || null;
  } catch {}
}

// ==================== SETTINGS ====================
function applyAllSettings() {
  const theme = Storage.get('theme', 'dark');
  document.body.setAttribute('data-theme', theme);

  const accent = Storage.get('accent', 'red');
  document.body.setAttribute('data-accent', accent);

  const season = Storage.get('season', 'default');
  if (season === 'default') document.body.removeAttribute('data-season');
  else document.body.setAttribute('data-season', season);

  const r = Storage.get('radius', 'round');
  const rmap = { sharp: '6px', default: '16px', round: '20px', pill: '32px' };
  const rval = rmap[r] || rmap.round;
  document.body.style.setProperty('--radius', rval);
  document.body.style.setProperty('--radius-sm', `calc(${rval} - 4px)`);
  document.body.style.setProperty('--radius-lg', `calc(${rval} + 6px)`);

  const s = Storage.get('fontScale', 'default');
  const smap = { small: '0.9', default: '1', large: '1.1', xlarge: '1.2' };
  document.body.style.setProperty('--font-scale', smap[s] || '1');

  document.body.classList.toggle('compact', Storage.get('compact', false));
  document.body.classList.toggle('no-anim', !Storage.get('animEnabled', true));
  document.body.classList.toggle('glow', Storage.get('glow', true));

  syncSettingsUI();
}

function syncSettingsUI() {
  const t = Storage.get('theme', 'dark');
  document.querySelectorAll('.theme-swatch').forEach(el => el.classList.toggle('active', el.dataset.theme === t));
  const a = Storage.get('accent', 'red');
  document.querySelectorAll('.accent-dot').forEach(el => el.classList.toggle('active', el.dataset.accent === a));

  const setV = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  const setC = (id, v) => { const el = document.getElementById(id); if (el) el.checked = v; };

  setV('radiusSelect', Storage.get('radius', 'round'));
  setV('fontScaleSelect', Storage.get('fontScale', 'default'));
  setV('seasonSelect', Storage.get('season', 'default'));
  setC('compactToggle', Storage.get('compact', false));
  setC('animToggle', Storage.get('animEnabled', true));
  setC('glowToggle', Storage.get('glow', true));
  setC('soundToggle', Storage.get('soundEnabled', true));
  setC('notifyToggle', Storage.get('notifyEnabled', true));
  setC('hapticToggle', Storage.get('hapticEnabled', true));
}

function resetSettings() {
  ['theme','accent','radius','fontScale','compact','animEnabled','glow','season'].forEach(k => Storage.del(k));
  applyAllSettings();
  toast('Настройки сброшены', 'success');
  haptic('medium');
}

// ==================== AUTH ====================
function showAuthForm(which) {
  ['authChoice', 'loginForm', 'registerForm'].forEach(id => document.getElementById(id)?.classList.add('hidden'));
  if (which === 'choice') document.getElementById('authChoice')?.classList.remove('hidden');
  if (which === 'login') document.getElementById('loginForm')?.classList.remove('hidden');
  if (which === 'register') document.getElementById('registerForm')?.classList.remove('hidden');
  haptic('light');
}

function doRegister() {
  const u = document.getElementById('regUsername').value.trim();
  const p = document.getElementById('regPassword').value.trim();
  if (!u || !p) return toast('Заполни все поля', 'error');
  if (u.length < 3) return toast('Имя минимум 3', 'error');
  if (p.length < 4) return toast('Пароль минимум 4', 'error');
  if (state.users[u]) return toast('Имя занято', 'error');
  state._pendingReg = { username: u, password: p };
  openModal('modalConfirmReg');
}

function confirmRegister() {
  closeModal('modalConfirmReg');
  const { username, password } = state._pendingReg || {};
  if (!username) return;
  state.users[username] = { password, createdAt: Date.now(), balance: 0, banned: false, points: 0 };
  Storage.set('users', state.users);
  state.currentUser = { username, tgId: state.tgUser?.id || null, createdAt: Date.now() };
  Storage.set('currentUser', state.currentUser);
  toast('Аккаунт создан!', 'success');
  if (!Storage.get('onboarded', false)) showOnboarding();
  else enterApp();
}

function doLogin() {
  const u = document.getElementById('loginUsername').value.trim();
  const p = document.getElementById('loginPassword').value.trim();
  if (!u || !p) return toast('Заполни все поля', 'error');
  const user = state.users[u];
  if (!user || user.password !== p) return toast('Неверные данные', 'error');
  if (user.banned) return toast('Аккаунт заблокирован', 'error');
  state.currentUser = { username: u, tgId: state.tgUser?.id || null, createdAt: user.createdAt };
  Storage.set('currentUser', state.currentUser);
  toast('Добро пожаловать!', 'success');
  if (!Storage.get('onboarded', false)) showOnboarding();
  else enterApp();
}

function logout() {
  state.currentUser = null;
  Storage.del('currentUser');
  document.getElementById('app')?.classList.add('hidden');
  document.getElementById('authScreen')?.classList.remove('hidden');
  document.getElementById('onboarding')?.classList.add('hidden');
  closeMegaMenu();
  showAuthForm('choice');
  toast('Вы вышли', 'success');
}

function enterApp() {
  document.getElementById('authScreen')?.classList.add('hidden');
  document.getElementById('onboarding')?.classList.add('hidden');
  document.getElementById('app')?.classList.remove('hidden');
  updateProfileUI();
  renderProducts();
  renderFavorites();
  renderRecent();
  renderReviewsMini();
  renderReviews();
  renderFAQ();
  renderInfo();
  renderChat();
  renderTransactions();
  renderOrders();
  renderInventory();
  renderRefLink();
  renderCart();
  renderCartBadge();
  renderAchievements();
  renderLeaderboard('buyers');
  renderDiary();
  renderChangelog();
  renderLiveFeed();
  renderSaleCard();
  updateCatalogCounts();
  updateHello();
  checkLoyalty();
  checkAchievements();
  routeFromHash();
}

function updateHello() {
  const el = document.getElementById('helloText');
  const mega = document.getElementById('megaUser');
  const name = state.currentUser?.username || 'user';
  if (el) el.textContent = `Привет, ${name} 👋`;
  if (mega) mega.textContent = '@' + name;
}

function updateProfileUI() {
  const name = state.currentUser?.username || 'user';
  const tgId = state.tgUser?.id || state.currentUser?.tgId || '—';
  const setT = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setT('userName', '@' + name);
  setT('userId', '@id' + tgId);
  setT('userAvatar', name[0].toUpperCase());
  setT('topBalance', Storage.get('balance', 0) + '₽');
  setT('profileBalance', Storage.get('balance', 0) + '₽');
  setT('statTopUp', state.stats.topUp + '₽');
  setT('statSpent', state.stats.spent + '₽');
  setT('statPoints', state.points);
  setT('statOrders', state.stats.orders);
  if (state.stats.orders >= 3 || state.stats.spent >= 5000) {
    document.getElementById('verifiedBadge')?.classList.remove('hidden');
  }
  updateHello();
}

// ==================== ONBOARDING ====================
let onbIndex = 0;
function showOnboarding() {
  document.getElementById('authScreen')?.classList.add('hidden');
  document.getElementById('onboarding')?.classList.remove('hidden');
  const track = document.getElementById('onbTrack');
  const dots = document.querySelectorAll('.onb-dot');
  const nextBtn = document.getElementById('onbNext');
  const update = () => {
    if (track) track.style.transform = `translateX(-${onbIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === onbIndex));
    if (nextBtn) nextBtn.textContent = onbIndex === 2 ? 'Начать' : 'Далее';
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
  document.getElementById('page-' + page)?.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === page));
  location.hash = page;
  window.scrollTo(0, 0);
  haptic('light');
  closeMegaMenu();
}

function routeFromHash() {
  const h = location.hash.replace('#', '');
  if (h && document.getElementById('page-' + h)) go(h);
}

// ==================== MEGA MENU ====================
function openMegaMenu() {
  const m = document.getElementById('megaMenu');
  if (!m) return;
  m.classList.add('show');
  document.body.style.overflow = 'hidden';
  haptic('light');
}
function closeMegaMenu() {
  const m = document.getElementById('megaMenu');
  if (!m) return;
  m.classList.remove('show');
  document.body.style.overflow = '';
}

// ==================== HANDLE ACTIONS ====================
function handleAction(action, target) {
  const actions = {
    'show-login': () => showAuthForm('login'),
    'show-register': () => showAuthForm('register'),
    'show-choice': () => showAuthForm('choice'),
    'do-login': doLogin,
    'do-register': doRegister,
    'confirm-register': confirmRegister,
    'logout': logout,
    'open-topup': openTopUp,
    'submit-topup': submitTopUp,
    'open-promo': openPromoModal,
    'apply-promo': applyPromo,
    'spin-case': spinCase,
    'spin-wheel': spinWheel,
    'claim-daily': claimDaily,
    'open-filters': openFilters,
    'apply-filters': applyFilters,
    'reset-filters': resetFilters,
    'add-review': addReview,
    'checkout': checkout,
    'copy-ref': copyRef,
    'create-ticket': createTicket,
    'contact-support': contactSupport,
    'check-admin-pass': checkAdminPass,
    'reset-settings': resetSettings,
    'send-chat': sendChat,
    'close-modal': () => { if (target) closeModal(target.dataset.modal); }
  };
  if (actions[action]) actions[action]();
}

document.addEventListener('click', (e) => {
  // MEGA MENU overlay click
  if (e.target.id === 'megaMenu') { closeMegaMenu(); return; }

  // MEGA MENU items
  const megaItem = e.target.closest('.mega-item');
  if (megaItem) {
    const page = megaItem.dataset.page;
    closeMegaMenu();
    setTimeout(() => { if (page) go(page); }, 150);
    return;
  }

  // data-action
  const actionEl = e.target.closest('[data-action]');
  if (actionEl) {
    e.preventDefault();
    handleAction(actionEl.dataset.action, actionEl);
    return;
  }

  // data-page (не в mega-menu)
  const pageEl = e.target.closest('[data-page]');
  if (pageEl && !pageEl.classList.contains('mega-item')) {
    e.preventDefault();
    go(pageEl.dataset.page);
    return;
  }

  // FAV
  const fav = e.target.closest('[data-fav]');
  if (fav) { e.stopPropagation(); toggleFav(+fav.dataset.fav); return; }

  // ADD CART
  const add = e.target.closest('[data-add]');
  if (add) { e.stopPropagation(); addToCart(+add.dataset.add); return; }

  // BUY NOW
  const buy = e.target.closest('[data-buy]');
  if (buy) { e.stopPropagation(); buyNow(+buy.dataset.buy); return; }

  // OPEN PRODUCT
  const open = e.target.closest('[data-product-open]');
  if (open) { openProduct(+open.dataset.productOpen); return; }

  // REMOVE CART
  const rmCart = e.target.closest('[data-rm-cart]');
  if (rmCart) { removeCart(+rmCart.dataset.rmCart); return; }

  // UPSELL ADD
  const upAdd = e.target.closest('[data-upsell]');
  if (upAdd) { addToCart(+upAdd.dataset.upsell); return; }

  // FAV REMOVE
  const favRm = e.target.closest('[data-fav-rm]');
  if (favRm) { toggleFav(+favRm.dataset.favRm); return; }

  // INV COPY
  const invCopy = e.target.closest('[data-inv-copy]');
  if (invCopy) { copyInvData(invCopy.dataset.invCopy); return; }

  // INV REVIEW
  const invReview = e.target.closest('[data-inv-review]');
  if (invReview) { reviewProduct(decodeURIComponent(invReview.dataset.invReview)); return; }

  // INV AGAIN
  const invAgain = e.target.closest('[data-inv-again]');
  if (invAgain) { buyAgain(decodeURIComponent(invAgain.dataset.invAgain)); return; }

  // INV DISPUTE
  const invDispute = e.target.closest('[data-inv-dispute]');
  if (invDispute) { openDispute(invDispute.dataset.invDispute); return; }

  // TOP-UP quick
  const topupBtn = e.target.closest('[data-topup]');
  if (topupBtn) {
    const input = document.getElementById('topUpAmount');
    if (input) input.value = topupBtn.dataset.topup;
    return;
  }

  // SALE card
  const sale = e.target.closest('[data-sale]');
  if (sale) { const s = getSaleProduct(); if (s) openProduct(s.id); return; }

  // Product modal actions
  const fm = e.target.closest('[data-fav-modal]');
  if (fm) { toggleFav(+fm.dataset.favModal); closeModal('modalProduct'); return; }
  const share = e.target.closest('[data-share]');
  if (share) { shareProduct(+share.dataset.share); return; }
  const am = e.target.closest('[data-add-from-modal]');
  if (am) { addToCart(+am.dataset.addFromModal); closeModal('modalProduct'); return; }
  const bm = e.target.closest('[data-buy-from-modal]');
  if (bm) { buyNow(+bm.dataset.buyFromModal); closeModal('modalProduct'); return; }

  // Theme swatch
  const swatch = e.target.closest('.theme-swatch');
  if (swatch) {
    Storage.set('theme', swatch.dataset.theme);
    applyAllSettings();
    toast('Тема изменена', 'success');
    haptic('light');
    return;
  }

  // Accent dot
  const dot = e.target.closest('.accent-dot');
  if (dot) {
    Storage.set('accent', dot.dataset.accent);
    applyAllSettings();
    haptic('light');
    return;
  }

  // Chat channel
  const chatCh = e.target.closest('.chat-ch');
  if (chatCh) {
    document.querySelectorAll('.chat-ch').forEach(x => x.classList.remove('active'));
    chatCh.classList.add('active');
    state.chatChannel = chatCh.dataset.ch;
    renderChat();
    return;
  }

  // Admin tab
  const adminTab = e.target.closest('.admin-tab');
  if (adminTab) {
    document.querySelectorAll('.admin-tab').forEach(x => x.classList.remove('active'));
    adminTab.classList.add('active');
    renderAdminTab(adminTab.dataset.tab);
    return;
  }

  // LB tab
  const lbTab = e.target.closest('.lb-tab');
  if (lbTab) {
    document.querySelectorAll('.lb-tab').forEach(x => x.classList.remove('active'));
    lbTab.classList.add('active');
    renderLeaderboard(lbTab.dataset.lb);
    return;
  }

  // Quick chip
  const quick = e.target.closest('.quick-chip[data-quick]');
  if (quick) {
    document.querySelectorAll('.quick-chip[data-quick]').forEach(x => x.classList.remove('active'));
    quick.classList.add('active');
    state.quickFilter = quick.dataset.quick;
    renderProducts();
    return;
  }

  // Review filter
  const rfilter = e.target.closest('.quick-chip[data-rfilter]');
  if (rfilter) {
    document.querySelectorAll('.quick-chip[data-rfilter]').forEach(x => x.classList.remove('active'));
    rfilter.classList.add('active');
    state.reviewFilter = rfilter.dataset.rfilter;
    renderReviews();
    return;
  }

  // Inv filter
  const invFilter = e.target.closest('.inv-filter[data-inv]');
  if (invFilter) {
    document.querySelectorAll('.inv-filter[data-inv]').forEach(x => x.classList.remove('active'));
    invFilter.classList.add('active');
    state.inventoryFilter = invFilter.dataset.inv;
    renderInventory();
    return;
  }

  // Catalog tab
  const catTab = e.target.closest('.catalog-tab');
  if (catTab) {
    document.querySelectorAll('.catalog-tab').forEach(x => x.classList.remove('active'));
    catTab.classList.add('active');
    state.catalogTab = catTab.dataset.cat;
    renderProducts();
    haptic('light');
    return;
  }

  // Stars
  const star = e.target.closest('#starsInput span');
  if (star) {
    state.reviewRating = +star.dataset.star;
    document.querySelectorAll('#starsInput span').forEach(x => x.classList.toggle('active', +x.dataset.star <= state.reviewRating));
    haptic('light');
    return;
  }

  // FAQ accordion
  const faq = e.target.closest('.faq-item');
  if (faq && !e.target.closest('a')) {
    faq.classList.toggle('open');
    return;
  }

  // Ripple
  const btn = e.target.closest('.btn');
  if (btn && Storage.get('animEnabled', true)) {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX || rect.left + rect.width / 2) - rect.left;
    const y = (e.clientY || rect.top + rect.height / 2) - rect.top;
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (x - size / 2) + 'px';
    ripple.style.top = (y - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }
});

// ==================== DOTS BTN + BALANCE PILL ====================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('dotsBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    openMegaMenu();
  });
  document.getElementById('balancePill')?.addEventListener('click', (e) => {
    e.stopPropagation();
    openTopUp();
  });
  document.getElementById('brandLogo')?.addEventListener('click', () => {
    // 5 taps admin
    const key = 'tapCount';
    const now = Date.now();
    const last = state._lastTap || 0;
    state._tapCount = (now - last < 900) ? (state._tapCount || 0) + 1 : 1;
    state._lastTap = now;
    if (state._tapCount >= 5) {
      state._tapCount = 0;
      haptic('medium');
      const tgId = state.tgUser?.id;
      if (tgId && !ADMIN_IDS.includes(tgId)) { openModal('modalDenied'); return; }
      openModal('modalAdminPass');
    }
  });
});

// ==================== FILTERS ====================
function openFilters() {
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  const setC = (id, v) => { const el = document.getElementById(id); if (el) el.checked = v; };
  set('filterPriceMin', state.filters.priceMin || '');
  set('filterPriceMax', state.filters.priceMax || '');
  set('filterSort', state.filters.sort || 'popular');
  setC('filterHit', state.filters.hit || false);
  setC('filterNew', state.filters.isNew || false);
  setC('filterSale', state.filters.sale || false);
  setC('filterRating45', state.filters.rating45 || false);
  openModal('modalFilters');
}

function applyFilters() {
  state.filters.priceMin = +document.getElementById('filterPriceMin').value || 0;
  state.filters.priceMax = +document.getElementById('filterPriceMax').value || 0;
  state.filters.sort = document.getElementById('filterSort').value;
  state.filters.hit = document.getElementById('filterHit').checked;
  state.filters.isNew = document.getElementById('filterNew').checked;
  state.filters.sale = document.getElementById('filterSale').checked;
  state.filters.rating45 = document.getElementById('filterRating45').checked;
  closeModal('modalFilters');
  renderProducts();
  updateFilterBadge();
  toast('Фильтры применены', 'success');
}

function resetFilters() {
  state.filters = { priceMin: 0, priceMax: 0, sort: 'popular', hit: false, isNew: false, sale: false, rating45: false };
  ['filterPriceMin','filterPriceMax'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  ['filterHit','filterNew','filterSale','filterRating45'].forEach(id => { const el = document.getElementById(id); if (el) el.checked = false; });
  const fs = document.getElementById('filterSort'); if (fs) fs.value = 'popular';
  updateFilterBadge();
  toast('Фильтры сброшены', 'success');
}

function updateFilterBadge() {
  let count = 0;
  if (state.filters.priceMin) count++;
  if (state.filters.priceMax) count++;
  if (state.filters.sort !== 'popular') count++;
  if (state.filters.hit) count++;
  if (state.filters.isNew) count++;
  if (state.filters.sale) count++;
  if (state.filters.rating45) count++;
  const badge = document.getElementById('filterBadge');
  if (!badge) return;
  if (count > 0) { badge.textContent = count; badge.classList.remove('hidden'); }
  else badge.classList.add('hidden');
}

// ==================== PRODUCTS ====================
let searchQuery = '';
let visibleProducts = 6;

function saveSearchHistory(q) {
  if (!q) return;
  const hist = Storage.get('searchHistory', []);
  if (!hist.includes(q)) hist.unshift(q);
  Storage.set('searchHistory', hist.slice(0, 5));
}

function renderSearchHistory() {
  const el = document.getElementById('searchHistory');
  const hist = Storage.get('searchHistory', []);
  if (!el) return;
  if (!hist.length) { el.classList.add('hidden'); return; }
  el.innerHTML = hist.map(h => `<span class="hist-chip" data-search="${escapeHtml(h)}">${escapeHtml(h)}</span>`).join('');
  el.classList.remove('hidden');
}

document.addEventListener('click', (e) => {
  const chip = e.target.closest('.hist-chip');
  if (chip) {
    const q = chip.dataset.search;
    const input = document.getElementById('searchInput');
    if (input) input.value = q;
    searchQuery = q.toLowerCase();
    renderProducts();
    document.getElementById('searchHistory')?.classList.add('hidden');
  }
});

function renderProducts() {
  const list = document.getElementById('productsList');
  if (!list) return;
  list.innerHTML = Array(4).fill('<div class="skeleton"></div>').join('');

  setTimeout(() => {
    let items = PRODUCTS.filter(p => p.category === state.catalogTab);

    if (searchQuery) items = items.filter(p => p.name.toLowerCase().includes(searchQuery));
    if (state.quickFilter === 'cheap') items = items.filter(p => p.price < 100);
    if (state.quickFilter === 'hit') items = items.filter(p => p.badge === 'ХИТ');
    if (state.quickFilter === 'new') items = items.filter(p => p.badge === 'NEW');
    if (state.quickFilter === 'sale') items = items.filter(p => p.oldPrice);

    if (state.filters.priceMin) items = items.filter(p => p.price >= state.filters.priceMin);
    if (state.filters.priceMax) items = items.filter(p => p.price <= state.filters.priceMax);
    if (state.filters.hit) items = items.filter(p => p.badge === 'ХИТ');
    if (state.filters.isNew) items = items.filter(p => p.badge === 'NEW');
    if (state.filters.sale) items = items.filter(p => p.oldPrice);
    if (state.filters.rating45) items = items.filter(p => p.rating >= 4.5);

    const s = state.filters.sort;
    if (s === 'cheap') items.sort((a,b) => a.price - b.price);
    else if (s === 'expensive') items.sort((a,b) => b.price - a.price);
    else if (s === 'rating') items.sort((a,b) => b.rating - a.rating);

    if (!items.length) {
      list.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--muted);padding:30px;">Ничего не найдено</div>';
      return;
    }

    const visible = items.slice(0, visibleProducts);
    list.innerHTML = visible.map((p, idx) => {
      const isFav = state.favorites.includes(p.id);
      const discountPercent = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
      const stockHint = p.stock <= LOW_STOCK ? `<div class="product-stock">⚠ Осталось ${p.stock} шт</div>` : '';
      const badgeClass = p.badge === 'ХИТ' ? 'hit' : p.badge === 'NEW' ? 'new' : '';
      return `
      <div class="product" style="animation-delay:${idx*40}ms">
        <button class="product-fav ${isFav ? 'active' : ''}" data-fav="${p.id}">${isFav ? '❤️' : '🤍'}</button>
        <div class="product-top" data-product-open="${p.id}">
          <div class="product-flag">${p.flag}</div>
          ${p.badge ? `<div class="product-badge ${badgeClass}">${p.badge}</div>` : ''}
        </div>
        <div data-product-open="${p.id}">
          <div class="product-name">${escapeHtml(p.name)}</div>
          <div class="product-sub">${escapeHtml(p.sub)}</div>
          <div class="product-rating">${'<span class="star">★</span>'.repeat(Math.round(p.rating))} <span class="muted" style="margin-left:4px;">${p.rating}</span></div>
          ${p.tags ? `<div class="product-tags">${p.tags.slice(0,2).map(t => `<span class="product-tag">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
          ${stockHint}
        </div>
        <div class="product-price-row">
          <div class="product-price">${p.price}₽</div>
          ${p.oldPrice ? `<div class="product-old">${p.oldPrice}₽</div>` : ''}
          ${discountPercent ? `<span style="color:var(--green);font-size:11px;font-weight:800;">-${discountPercent}%</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="btn-add" data-add="${p.id}">В корзину</button>
          <button class="btn-buy" data-buy="${p.id}">Купить</button>
        </div>
      </div>
      `;
    }).join('');

    const end = document.getElementById('productsEnd');
    if (end) {
      if (items.length > visibleProducts) {
        end.textContent = `— Показать ещё ${items.length - visibleProducts} —`;
        end.classList.remove('hidden');
        end.onclick = () => { visibleProducts += 6; renderProducts(); };
      } else {
        end.classList.add('hidden');
      }
    }
  }, 200);
}

function updateCatalogCounts() {
  const acc = PRODUCTS.filter(p => p.category === 'accounts').length;
  const stars = PRODUCTS.filter(p => p.category === 'stars').length;
  const a = document.getElementById('countAccounts');
  const s = document.getElementById('countStars');
  if (a) a.textContent = acc;
  if (s) s.textContent = stars;
}

function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  addToRecent(id);
  const isFav = state.favorites.includes(id);
  const modal = document.getElementById('productModalContent');
  if (!modal) return;
  modal.innerHTML = `
    <div style="font-size:52px;text-align:center;margin-bottom:10px;">${p.flag}</div>
    <h3 style="font-size:20px;font-weight:800;text-align:center;margin-bottom:6px;">${escapeHtml(p.name)}</h3>
    <div style="text-align:center;color:var(--muted);font-size:12px;margin-bottom:12px;">${escapeHtml(p.sub)}</div>
    <div class="product-rating" style="justify-content:center;margin-bottom:12px;">
      ${'<span class="star" style="color:var(--yellow);font-size:16px;">★</span>'.repeat(Math.round(p.rating))}
      <span style="margin-left:6px;font-weight:700;">${p.rating}</span>
    </div>
    <div style="text-align:center;font-size:28px;font-weight:800;margin-bottom:16px;">
      ${p.price}₽ ${p.oldPrice ? `<span style="font-size:16px;color:var(--muted);text-decoration:line-through;margin-left:8px;">${p.oldPrice}₽</span>` : ''}
    </div>
    <div style="display:flex;gap:8px;margin-bottom:14px;">
      <button class="btn btn-secondary" style="flex:1;" data-fav-modal="${id}">${isFav ? '❤️ В избранном' : '🤍 В избранное'}</button>
      <button class="btn btn-secondary" style="flex:1;" data-share="${id}">📤 Поделиться</button>
    </div>
    <button class="btn btn-primary btn-full" data-add-from-modal="${id}">В корзину</button>
    <button class="btn btn-secondary btn-full" style="margin-top:8px;" data-buy-from-modal="${id}">Купить сразу</button>
  `;
  openModal('modalProduct');
}

function shareProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const link = `${BOT_LINK}?startapp=product_${id}`;
  if (navigator.share) navigator.share({ title: p.name, text: `${p.name} за ${p.price}₽`, url: link }).catch(()=>{});
  else { navigator.clipboard?.writeText(link); toast('Ссылка скопирована', 'success'); }
}

// ==================== SALE OF DAY ====================
function getSaleProduct() {
  return PRODUCTS.find(p => p.oldPrice) || PRODUCTS[0];
}

function renderSaleCard() {
  const p = getSaleProduct();
  if (!p) return;
  const title = document.getElementById('saleTitle');
  const sub = document.getElementById('saleSub');
  const price = document.getElementById('salePrice');
  const btn = document.getElementById('saleBtn');
  if (title) title.textContent = `${p.flag} ${p.name}`;
  if (sub) sub.textContent = `${p.price}₽ вместо ${p.oldPrice || p.price}₽`;
  if (price) price.textContent = `${p.price}₽`;
  if (btn) btn.onclick = (e) => { e.stopPropagation(); openProduct(p.id); };
}

// ==================== FAVORITES / RECENT ====================
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
  if (!state.favorites.length) { list.innerHTML = ''; empty?.classList.remove('hidden'); return; }
  empty?.classList.add('hidden');
  const items = state.favorites.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  list.innerHTML = items.map(p => `
    <div class="cart-item">
      <div class="cart-item-info">
        <span style="font-size:24px;">${p.flag}</span>
        <div><div class="cart-item-name">${escapeHtml(p.name)}</div><div class="cart-item-price">${p.price}₽</div></div>
      </div>
      <button class="cart-remove" data-fav-rm="${p.id}">✕</button>
    </div>
  `).join('');
}

function addToRecent(id) {
  state.recent = [id, ...state.recent.filter(x => x !== id)].slice(0, 8);
  Storage.set('recent', state.recent);
  renderRecent();
}

function renderRecent() {
  const el = document.getElementById('recentList');
  const title = document.getElementById('recentTitle');
  if (!el) return;
  if (!state.recent.length) { el.innerHTML = ''; title?.classList.add('hidden'); return; }
  title?.classList.remove('hidden');
  el.innerHTML = state.recent.map(id => {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return '';
    return `<div class="hscroll-item" data-product-open="${p.id}">
      <div class="hscroll-flag">${p.flag}</div>
      <div class="hscroll-name">${escapeHtml(p.name)}</div>
      <div class="hscroll-price">${p.price}₽</div>
    </div>`;
  }).join('');
}

// ==================== CART ====================
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  state.cart.push({ id: p.id, name: p.name, flag: p.flag, price: p.price });
  Storage.set('cart', state.cart);
  renderCartBadge();
  renderCart();
  updateStepper();
  toast(`${p.name} в корзине`, 'success');
  haptic('light');
  playSound();
}

function buyNow(id) { addToCart(id); go('cart'); }

function renderCartBadge() {
  const badge = document.getElementById('cartBadge');
  const count = state.cart.length;
  if (!badge) return;
  if (count > 0) { badge.textContent = count; badge.classList.remove('hidden'); }
  else badge.classList.add('hidden');
}

function updateStepper() {
  const s1 = document.getElementById('step1');
  const s2 = document.getElementById('step2');
  const s3 = document.getElementById('step3');
  if (!s1) return;
  s1.classList.add('active');
  if (state.cart.length > 0) s2.classList.add('active');
  else s2.classList.remove('active');
  s3.classList.remove('active');
}

function renderCart() {
  const list = document.getElementById('cartList');
  const empty = document.getElementById('cartEmpty');
  const summary = document.getElementById('cartSummary');
  const upsell = document.getElementById('upsell');
  if (!list) return;

  if (!state.cart.length) {
    list.innerHTML = '';
    empty?.classList.remove('hidden');
    summary?.classList.add('hidden');
    upsell?.classList.add('hidden');
    return;
  }
  empty?.classList.add('hidden');
  summary?.classList.remove('hidden');

  list.innerHTML = state.cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <span style="font-size:24px;">${item.flag}</span>
        <div>
          <div class="cart-item-name">${escapeHtml(item.name)}</div>
          <div class="cart-item-price">${item.price}₽</div>
        </div>
      </div>
      <button class="cart-remove" data-rm-cart="${i}">✕</button>
    </div>
  `).join('');

  const cartIds = state.cart.map(i => i.id);
  const suggestions = PRODUCTS.filter(p => !cartIds.includes(p.id) && p.price < 400).slice(0, 2);
  if (suggestions.length && upsell) {
    upsell.classList.remove('hidden');
    document.getElementById('upsellList').innerHTML = suggestions.map(p => `
      <div class="upsell-item">
        <span><span style="font-size:18px;">${p.flag}</span> <span class="upsell-name">${escapeHtml(p.name)}</span></span>
        <div style="display:flex;gap:8px;align-items:center;">
          <span class="upsell-price">${p.price}₽</span>
          <button class="upsell-add" data-upsell="${p.id}">+</button>
        </div>
      </div>
    `).join('');
  } else upsell?.classList.add('hidden');

  const subtotal = state.cart.reduce((s, i) => s + i.price, 0);
  const loyaltyDiscount = Math.round(subtotal * getCashbackPercent() / 100);
  const promoDiscount = state.appliedPromo ? Math.round(subtotal * state.appliedPromo.disc / 100) : 0;
  const total = subtotal - loyaltyDiscount - promoDiscount;

  const setT = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setT('cartCount', state.cart.length);
  setT('cartLoyalty', `-${loyaltyDiscount}₽`);
  setT('cartPromo', state.appliedPromo ? `${state.appliedPromo.code} (-${state.appliedPromo.disc}%)` : '—');
  setT('cartTotal', Math.max(0, total) + '₽');

  const balance = Storage.get('balance', 0);
  const check = document.getElementById('balanceCheck');
  const text = document.getElementById('balanceCheckText');
  const topUpBtn = document.getElementById('topUpQuick');
  if (!check) return;
  if (balance >= total) {
    check.classList.remove('insufficient');
    text.textContent = `✅ Баланс: ${balance}₽ — хватает`;
    topUpBtn?.classList.add('hidden');
  } else {
    check.classList.add('insufficient');
    text.textContent = `❌ Баланс: ${balance}₽ — не хватает ${total - balance}₽`;
    topUpBtn?.classList.remove('hidden');
    if (topUpBtn) topUpBtn.textContent = `+${total - balance}₽`;
  }
}

function removeCart(i) {
  state.cart.splice(i, 1);
  Storage.set('cart', state.cart);
  renderCart();
  renderCartBadge();
  updateStepper();
  haptic('light');
}

function openPromoModal() { openModal('modalPromo'); }

function applyPromo() {
  const code = document.getElementById('promoInput').value.trim().toUpperCase();
  const resultEl = document.getElementById('promoResult');
  if (!code || !resultEl) return;
  const promo = state.promos.find(p => p.code === code);
  const builtIn = {
    'CASE5': 5, 'CASE10': 10, 'CASE15': 15, 'CASE3': 3, 'CASE20': 20,
    'WHEEL5': 5, 'WHEEL10': 10, 'WHEEL15': 15, 'WHEEL20': 20, 'WHEEL50': 50,
    'WELCOME10': 10, 'DESIRED5': 5
  };
  let discount = promo ? promo.disc : (builtIn[code] || null);
  if (!discount) { resultEl.textContent = '❌ Не найден'; resultEl.style.color = 'var(--accent)'; return; }
  if (state.usedPromos[code]) { resultEl.textContent = '❌ Уже использован'; resultEl.style.color = 'var(--accent)'; return; }
  state.appliedPromo = { code, disc: discount };
  state.usedPromos[code] = 1;
  Storage.set('usedPromos', state.usedPromos);
  resultEl.textContent = `✅ -${discount}%`;
  resultEl.style.color = 'var(--green)';
  toast(`Промокод -${discount}%`, 'success');
  setTimeout(() => {
    closeModal('modalPromo');
    renderCart();
    document.getElementById('promoInput').value = '';
    resultEl.textContent = '';
  }, 1200);
}

// ==================== TOPUP / CHECKOUT ====================
function openTopUp() { openModal('modalTopUp'); }

function submitTopUp() {
  const input = document.getElementById('topUpAmount');
  const amount = +input.value;
  if (!amount || amount < 25) return toast('Минимум 25₽', 'error');
  Storage.set('balance', Storage.get('balance', 0) + amount);
  state.stats.topUp += amount;
  Storage.set('stats', state.stats);
  state.transactions.unshift({ type: 'in', title: 'Пополнение', amount, date: Date.now() });
  Storage.set('transactions', state.transactions);
  updateProfileUI();
  renderTransactions();
  renderCart();
  closeModal('modalTopUp');
  input.value = '';
  toast(`+${amount}₽`, 'success');
  haptic('medium');
}

function checkout() {
  if (!state.cart.length) return;
  const subtotal = state.cart.reduce((s, i) => s + i.price, 0);
  const loyaltyDiscount = Math.round(subtotal * getCashbackPercent() / 100);
  const promoDiscount = state.appliedPromo ? Math.round(subtotal * state.appliedPromo.disc / 100) : 0;
  const total = Math.max(0, subtotal - loyaltyDiscount - promoDiscount);
  const balance = Storage.get('balance', 0);
  if (balance < total) return toast('Недостаточно средств', 'error');
  Storage.set('balance', balance - total);

  const orderId = 'ORD' + Date.now();
  state.orders.push({ id: orderId, items: [...state.cart], total, status: 'Выдан', date: Date.now() });
  Storage.set('orders', state.orders);

  state.cart.forEach(item => {
    state.inventory.push({
      id: 'INV' + Date.now() + Math.random().toString(36).slice(2,6),
      orderId, name: item.name, flag: item.flag, price: item.price,
      status: 'active', guarantee: '24ч', date: Date.now(),
      data: 'Логин: example@user\nПароль: ' + Math.random().toString(36).slice(2, 12)
    });
  });
  Storage.set('inventory', state.inventory);

  state.transactions.unshift({ type: 'out', title: `Заказ ${total}₽`, amount: total, date: Date.now() });
  Storage.set('transactions', state.transactions);

  state.stats.spent += total;
  state.stats.orders += 1;
  state.points += Math.round(total * 0.05);
  Storage.set('stats', state.stats);
  Storage.set('points', state.points);

  state.cart.forEach(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (p && p.stock > 0) p.stock -= 1;
  });
  saveProducts();

  state.cart = [];
  state.appliedPromo = null;
  Storage.set('cart', state.cart);

  updateProfileUI();
  renderCart();
  renderCartBadge();
  renderTransactions();
  renderOrders();
  renderInventory();
  updateStepper();
  document.getElementById('step3')?.classList.add('active');
  checkLoyalty();
  checkAchievements();
  toast('Заказ оформлен!', 'success');
  haptic('heavy');
  playSound();
  setTimeout(() => go('inventory'), 800);
}

// ==================== TRANSACTIONS / ORDERS / INVENTORY ====================
function renderTransactions() {
  const list = document.getElementById('txList');
  const empty = document.getElementById('txEmpty');
  if (!list) return;
  if (!state.transactions.length) { list.innerHTML = ''; empty?.classList.remove('hidden'); return; }
  empty?.classList.add('hidden');
  list.innerHTML = state.transactions.map(t => `
    <div class="cart-item">
      <div class="cart-item-info">
        <span style="font-size:20px;">${t.type === 'in' ? '↗' : '↘'}</span>
        <div>
          <div class="cart-item-name">${escapeHtml(t.title)}</div>
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
  if (!state.orders.length) { list.innerHTML = ''; empty?.classList.remove('hidden'); return; }
  empty?.classList.add('hidden');
  list.innerHTML = state.orders.map(o => `
    <div class="cart-item">
      <div class="cart-item-info">
        <span style="font-size:20px;">📦</span>
        <div><div class="cart-item-name">${o.id}</div><div class="cart-item-price">${o.total}₽ · ${o.status}</div></div>
      </div>
      <div class="muted" style="font-size:11px;">${new Date(o.date).toLocaleDateString()}</div>
    </div>
  `).join('');
}

function renderInventory() {
  const list = document.getElementById('inventoryList');
  const empty = document.getElementById('inventoryEmpty');
  if (!list) return;
  let items = [...state.inventory];
  if (state.inventoryFilter === 'active') items = items.filter(i => i.status === 'active');
  if (state.inventoryFilter === 'history') items = items.filter(i => i.status !== 'active');
  if (!items.length) { list.innerHTML = ''; empty?.classList.remove('hidden'); return; }
  empty?.classList.add('hidden');
  list.innerHTML = items.map(item => `
    <div class="inv-card" style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:700;">${item.flag} ${escapeHtml(item.name)}</div>
        <div style="font-size:11px;font-weight:700;padding:3px 8px;border-radius:8px;background:rgba(34,197,94,0.12);color:var(--green);">✓ Активен</div>
      </div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:10px;">
        Заказ: ${item.orderId}<br>
        Куплено: ${new Date(item.date).toLocaleString()}<br>
        Гарантия: ${item.guarantee}
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        <button class="inv-action-btn" style="background:var(--card-2);border:1px solid var(--border);color:var(--text);padding:6px 12px;border-radius:10px;font-size:11px;font-weight:700;cursor:pointer;" data-inv-copy="${item.id}">📋 Данные</button>
        <button class="inv-action-btn" style="background:var(--card-2);border:1px solid var(--border);color:var(--text);padding:6px 12px;border-radius:10px;font-size:11px;font-weight:700;cursor:pointer;" data-inv-review="${encodeURIComponent(item.name)}">⭐ Оценить</button>
        <button class="inv-action-btn" style="background:var(--card-2);border:1px solid var(--border);color:var(--text);padding:6px 12px;border-radius:10px;font-size:11px;font-weight:700;cursor:pointer;" data-inv-again="${encodeURIComponent(item.name)}">🔄 Снова</button>
      </div>
    </div>
  `).join('');
}

function copyInvData(id) {
  const item = state.inventory.find(x => x.id === id);
  if (!item) return;
  navigator.clipboard?.writeText(item.data);
  toast('Данные скопированы', 'success');
  haptic('light');
}

function reviewProduct(name) { go('reviews'); toast(`Оцени товар: ${name}`, 'info'); }
function buyAgain(name) { const p = PRODUCTS.find(x => x.name === name); if (p) { addToCart(p.id); go('cart'); } }
function openDispute(id) { toast('Спор открыт. Поддержка свяжется.', 'success'); }

// ==================== REF ====================
function renderRefLink() {
  const el = document.getElementById('refLink');
  if (el) el.value = `${BOT_LINK}?start=ref_${state.currentUser?.username || 'user'}`;
}
function copyRef() {
  const el = document.getElementById('refLink');
  if (!el) return;
  el.select();
  document.execCommand('copy');
  toast('Ссылка скопирована', 'success');
  haptic('light');
}

// ==================== REVIEWS / FAQ / INFO ====================
function renderReviews() {
  const list = document.getElementById('reviewsList');
  const avg = document.getElementById('reviewAvg');
  const count = document.getElementById('reviewCount');
  if (!list) return;
  let items = [...state.reviews];
  if (state.reviewFilter === '5') items = items.filter(r => r.rating === 5);
  if (state.reviewFilter === '4') items = items.filter(r => r.rating === 4);
  if (avg) avg.textContent = items.length ? (items.reduce((s, r) => s + (r.rating || 5), 0) / items.length).toFixed(1) : '5.0';
  if (count) count.textContent = items.length;
  if (!items.length) { list.innerHTML = '<div style="text-align:center;color:var(--muted);padding:20px;font-size:13px;">Пока нет отзывов</div>'; return; }
  list.innerHTML = items.map(r => `
    <div class="review-item">
      <div class="review-head">
        <div class="review-author">@${escapeHtml(r.author)}</div>
        <div class="review-date">${new Date(r.date).toLocaleDateString()}</div>
      </div>
      <div class="review-stars">${'★'.repeat(r.rating || 5)}</div>
      <div class="review-text">${escapeHtml(r.text)}</div>
    </div>
  `).join('');
}

function renderReviewsMini() {
  const el = document.getElementById('reviewsMini');
  if (!el) return;
  const items = state.reviews.slice(0, 3);
  if (!items.length) { el.innerHTML = '<div style="text-align:center;color:var(--muted);padding:16px;font-size:13px;">Пока нет отзывов</div>'; return; }
  el.innerHTML = items.map(r => `
    <div class="review-mini">
      <div class="review-mini-head">
        <span class="review-mini-author">@${escapeHtml(r.author)}</span>
        <span class="review-mini-stars">${'★'.repeat(r.rating || 5)}</span>
      </div>
      <div class="review-mini-text">${escapeHtml(r.text).slice(0, 120)}</div>
    </div>
  `).join('');
}

function addReview() {
  const text = document.getElementById('reviewText').value.trim();
  if (!text) return toast('Напиши отзыв', 'error');
  state.reviews.unshift({ author: state.currentUser?.username || 'user', text, rating: state.reviewRating, date: Date.now() });
  Storage.set('reviews', state.reviews);
  document.getElementById('reviewText').value = '';
  state.reviewRating = 5;
  document.querySelectorAll('#starsInput span').forEach(x => x.classList.add('active'));
  state.points += 10;
  Storage.set('points', state.points);
  updateProfileUI();
  renderReviews();
  renderReviewsMini();
  toast('Отзыв опубликован! +10 баллов', 'success');
  checkAchievements();
}

function renderFAQ() {
  const el = document.getElementById('faqList');
  if (!el) return;
  const q = document.getElementById('faqSearch')?.value?.toLowerCase().trim() || '';
  const filtered = q ? FAQ.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)) : FAQ;
  el.innerHTML = filtered.map(f => `
    <div class="faq-item">
      <div class="faq-q">${escapeHtml(f.q)}<span>▾</span></div>
      <div class="faq-a">${escapeHtml(f.a)}</div>
    </div>
  `).join('') || '<div style="text-align:center;color:var(--muted);padding:20px;">Ничего не найдено</div>';
}

function renderInfo() {
  const el = document.getElementById('infoList');
  if (!el) return;
  el.innerHTML = INFO_ITEMS.map(f => `
    <div class="faq-item">
      <div class="faq-q">${escapeHtml(f.q)}<span>▾</span></div>
      <div class="faq-a">${escapeHtml(f.a)}</div>
    </div>
  `).join('');
}

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
      <div class="chat-author">@${escapeHtml(m.author)}</div>
      <div class="chat-text">${escapeHtml(m.text)}</div>
    </div>
  `).join('');
  box.scrollTop = box.scrollHeight;
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  const ch = state.chatChannel || 'general';
  if (!state.chat[ch]) state.chat[ch] = [];
  state.chat[ch].push({ author: state.currentUser?.username || 'user', text, date: Date.now() });
  Storage.set('chat', state.chat);
  input.value = '';
  renderChat();
  haptic('light');
}

// ==================== CASE / WHEEL / DAILY ====================
function initCase() {
  const diff = Date.now() - (state.lastCase || 0);
  const el = document.getElementById('caseStatus');
  if (!el) return;
  if (diff >= 86400000) el.textContent = 'Доступен!';
  else { const h = Math.floor((86400000 - diff) / 3600000); el.textContent = `Через ${h}ч`; }
}

function spinCase() {
  if (Date.now() - (state.lastCase || 0) < 86400000) return toast('Кейс уже крутился', 'error');
  const prizes = [
    { emoji: '🎉', title: 'Скидка 5%', text: 'Промокод: CASE5' },
    { emoji: '🎁', title: 'Скидка 10%', text: 'Промокод: CASE10' },
    { emoji: '🔥', title: 'Скидка 15%', text: 'Промокод: CASE15' },
    { emoji: '⭐', title: 'Скидка 3%', text: 'Промокод: CASE3' },
    { emoji: '💎', title: 'Скидка 20%', text: 'Промокод: CASE20' }
  ];
  const p = prizes[Math.floor(Math.random() * prizes.length)];
  document.getElementById('caseResultEmoji').textContent = p.emoji;
  document.getElementById('caseResultTitle').textContent = p.title;
  document.getElementById('caseResultText').textContent = p.text;
  state.lastCase = Date.now();
  Storage.set('lastCase', state.lastCase);
  initCase();
  openModal('modalCaseResult');
  haptic('medium');
}

function initWheel() {
  const diff = Date.now() - (state.lastWheel || 0);
  const el = document.getElementById('wheelStatus');
  if (!el) return;
  if (diff >= 86400000) el.textContent = 'Доступно!';
  else el.textContent = `Через ${Math.floor((86400000 - diff) / 3600000)}ч`;
}

function spinWheel() {
  if (Date.now() - (state.lastWheel || 0) < 86400000) return toast('Колесо уже крутилось', 'error');
  const prizes = [
    { emoji: '🎉', title: 'Скидка 5%', text: 'Промокод: WHEEL5' },
    { emoji: '🎁', title: 'Скидка 10%', text: 'Промокод: WHEEL10' },
    { emoji: '🔥', title: 'Скидка 15%', text: 'Промокод: WHEEL15' },
    { emoji: '💎', title: 'Скидка 20%', text: 'Промокод: WHEEL20' },
    { emoji: '👑', title: 'JACKPOT — 50%!', text: 'Промокод: WHEEL50' }
  ];
  const w = [30, 25, 20, 15, 10];
  let r = Math.random() * w.reduce((a,b) => a+b, 0);
  let idx = 0;
  for (let i = 0; i < w.length; i++) { if (r < w[i]) { idx = i; break; } r -= w[i]; }
  const p = prizes[idx];
  document.getElementById('wheelResultEmoji').textContent = p.emoji;
  document.getElementById('wheelResultTitle').textContent = p.title;
  document.getElementById('wheelResultText').textContent = p.text;
  state.lastWheel = Date.now();
  Storage.set('lastWheel', state.lastWheel);
  initWheel();
  openModal('modalWheelResult');
  haptic('heavy');
}

function initDaily() {
  const diff = Date.now() - (state.lastDaily || 0);
  const el = document.getElementById('dailyStatus');
  if (!el) return;
  if (diff >= 86400000) el.textContent = 'Забери 5 баллов';
  else el.textContent = `Через ${Math.floor((86400000 - diff) / 3600000)}ч`;
}

function claimDaily() {
  if (Date.now() - (state.lastDaily || 0) < 86400000) return toast('Уже получено', 'error');
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
  const s = state.stats.spent;
  if (s >= 50000) return 12;
  if (s >= 20000) return 8;
  if (s >= 5000) return 5;
  return 3;
}

function getLoyaltyLevel() {
  const s = state.stats.spent;
  if (s >= 50000) return { name: 'Platinum', emoji: '💎' };
  if (s >= 20000) return { name: 'Gold', emoji: '🥇' };
  if (s >= 5000) return { name: 'Silver', emoji: '🥈' };
  return { name: 'Bronze', emoji: '🥉' };
}

function checkLoyalty() {
  const level = getLoyaltyLevel();
  const badge = document.getElementById('loyaltyBadge');
  const fill = document.getElementById('loyaltyFill');
  const text = document.getElementById('loyaltyProgressText');
  const cashback = document.getElementById('cashbackPercent');
  const spent = document.getElementById('loyaltySpent');
  if (!badge) return;
  badge.textContent = `${level.emoji} ${level.name}`;
  const th = [0, 5000, 20000, 50000];
  const next = th.find(t => t > state.stats.spent) || 50000;
  const prev = th.filter(t => t <= state.stats.spent).pop() || 0;
  const progress = Math.min(100, ((state.stats.spent - prev) / (next - prev)) * 100);
  if (fill) fill.style.width = progress + '%';
  if (text) text.textContent = `${state.stats.spent} / ${next}₽`;
  if (cashback) cashback.textContent = getCashbackPercent() + '%';
  if (spent) spent.textContent = state.stats.spent + '₽';
  state.loyaltyLevel = level.name.toLowerCase();
}

function checkAchievements() {
  const u = state.achievements;
  const check = (id, cond) => {
    if (cond && !u.includes(id)) {
      u.push(id);
      const a = ACHIEVEMENTS.find(x => x.id === id);
      toast(`${a.icon} ${a.name}`, 'success');
      haptic('medium');
    }
  };
  check('first_order', state.orders.length >= 1);
  check('ten_orders', state.orders.length >= 10);
  check('big_spender', state.stats.spent >= 5000);
  check('reviewer', state.reviews.filter(r => r.author === state.currentUser?.username).length >= 5);
  check('daily_master', state.streak >= 7);
  check('loyal', ['gold', 'platinum'].includes(state.loyaltyLevel));
  Storage.set('achievements', u);
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
  const buyers = [
    { name: '@whale_king', val: 287 }, { name: '@bulk_buyer', val: 194 },
    { name: '@trader_pro', val: 156 }, { name: '@reseller', val: 98 },
    { name: '@active_user', val: 67 }, { name: '@' + (state.currentUser?.username || 'you'), val: state.stats.orders || 0 },
    { name: '@newbie', val: 3 }
  ].sort((a,b) => b.val - a.val).slice(0, 10);
  const refs = [
    { name: '@referrer_pro', val: 145 }, { name: '@invite_king', val: 98 },
    { name: '@network', val: 76 }, { name: '@ambassador', val: 42 },
    { name: '@' + (state.currentUser?.username || 'you'), val: state.achievements.length }
  ].sort((a,b) => b.val - a.val).slice(0, 10);
  const data = type === 'buyers' ? buyers : refs;
  el.innerHTML = data.map((d, i) => `
    <div class="lb-item ${i < 3 ? 'top' + (i+1) : ''}">
      <div class="lb-rank">${i + 1}</div>
      <div class="lb-name">${d.name}</div>
      <div class="lb-value">${d.val}</div>
    </div>
  `).join('');
}

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
      <ul class="changelog-list-ul">${c.changes.map(ch => `<li>${ch}</li>`).join('')}</ul>
    </div>
  `).join('');
}

// ==================== LIVE ====================
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
    state.soldToday += Math.random() > 0.7 ? 1 : 0;
    const a = document.getElementById('statOnline');
    if (a) a.textContent = state.onlineCount.toLocaleString();
    const b = document.getElementById('statSoldToday');
    if (b) b.textContent = state.soldToday;
  }, 5000);
}

// ==================== ADMIN ====================
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

function logAction(action) {
  const logs = Storage.get('logs', []);
  logs.push({ action, user: state.currentUser?.username || 'anon', date: Date.now() });
  if (logs.length > 100) logs.shift();
  Storage.set('logs', logs);
}

function renderAdminTab(tab) {
  const c = document.getElementById('adminContent');
  if (!c) return;
  if (tab === 'stats') {
    c.innerHTML = `
      <h4>📊 Статистика</h4>
      <div class="admin-row"><span>Юзеров</span><span>${Object.keys(state.users).length}</span></div>
      <div class="admin-row"><span>Заказов</span><span>${state.orders.length}</span></div>
      <div class="admin-row"><span>Выручка</span><span>${state.stats.spent}₽</span></div>
      <div class="admin-row"><span>Промокодов</span><span>${state.promos.length}</span></div>
      <div class="admin-row"><span>Отзывов</span><span>${state.reviews.length}</span></div>
      <div class="admin-row"><span>Баллов</span><span>${state.points}</span></div>
    `;
  } else if (tab === 'orders') {
    c.innerHTML = `<h4>📦 Заказы</h4>` + (state.orders.length
      ? state.orders.map(o => `<div class="admin-row"><span>${o.id}</span><span>${o.total}₽</span></div>`).join('')
      : '<div style="color:var(--muted);font-size:12px;padding:10px 0;">Нет заказов</div>');
  } else if (tab === 'products') {
    c.innerHTML = `<h4>🏷 Товары</h4>` + PRODUCTS.map(p =>
      `<div class="admin-row"><span>${p.flag} ${escapeHtml(p.name)}</span><span>${p.price}₽ · ${p.stock} шт</span></div>`
    ).join('');
  } else if (tab === 'promo') {
    c.innerHTML = `
      <h4>🎟 Промокоды</h4>
      <input type="text" id="promoCodeInput" placeholder="Код">
      <input type="number" id="promoDiscInput" placeholder="Скидка %">
      <button data-action="add-promo">Добавить</button>
      <div id="promoList" style="margin-top:12px;"></div>
    `;
    renderPromoListAdmin();
  } else if (tab === 'users') {
    const list = Object.entries(state.users).map(([n, u]) =>
      `<div class="admin-row"><span>@${n}</span><span>${new Date(u.createdAt).toLocaleDateString()}</span></div>`
    ).join('') || '<div style="color:var(--muted);font-size:12px;">Нет юзеров</div>';
    c.innerHTML = `<h4>👤 Юзеры</h4>${list}`;
  } else if (tab === 'reviews') {
    const list = state.reviews.map((r, i) =>
      `<div class="admin-row"><span>@${escapeHtml(r.author)} · ${r.rating}★</span><button class="ghost" data-action="del-review" data-idx="${i}">Удалить</button></div>`
    ).join('') || '<div style="color:var(--muted);font-size:12px;">Нет отзывов</div>';
    c.innerHTML = `<h4>⭐ Отзывы</h4>${list}`;
  } else if (tab === 'chat') {
    const g = state.chat.general || [];
    c.innerHTML = `<h4>🗨️ Чат (${g.length})</h4>` + (g.slice(-10).map((m, i) =>
      `<div class="admin-row"><span>@${escapeHtml(m.author)}: ${escapeHtml(m.text).slice(0, 30)}</span><button class="ghost" data-action="del-chat-msg" data-idx="${i}">×</button></div>`
    ).join('') || '<div style="color:var(--muted);font-size:12px;">Пусто</div>');
  } else if (tab === 'logs') {
    const logs = Storage.get('logs', []);
    c.innerHTML = `<h4>📜 Логи (${logs.length})</h4>` + (logs.slice(-20).reverse().map(l =>
      `<div class="admin-row"><span>${escapeHtml(l.action)}</span><span>${new Date(l.date).toLocaleTimeString()}</span></div>`
    ).join('') || '<div style="color:var(--muted);font-size:12px;">Нет логов</div>');
  }
}

function addPromo() {
  const code = document.getElementById('promoCodeInput')?.value.trim().toUpperCase();
  const disc = +document.getElementById('promoDiscInput')?.value;
  if (!code || !disc) return toast('Заполни поля', 'error');
  state.promos.push({ code, disc, limit: 0, used: 0 });
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
    : '<div style="color:var(--muted);font-size:12px;">Нет промокодов</div>';
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

// ==================== MODALS ====================
function openModal(id) { const m = document.getElementById(id); if (m) m.classList.add('show'); }
function closeModal(id) { const m = document.getElementById(id); if (m) m.classList.remove('show'); }
function contactSupport() { window.open(SUPPORT_LINK, '_blank'); }

function createTicket() {
  const theme = document.getElementById('ticketTheme').value.trim();
  const text = document.getElementById('ticketText').value.trim();
  if (!theme || !text) return toast('Заполни поля', 'error');
  document.getElementById('ticketTheme').value = '';
  document.getElementById('ticketText').value = '';
  toast('Тикет создан', 'success');
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
  if (!Storage.get('hapticEnabled', true)) return;
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

// ==================== BIND ====================
function bindAllListeners() {
  // Settings changes
  document.addEventListener('change', (e) => {
    const id = e.target.id;
    if (id === 'radiusSelect') Storage.set('radius', e.target.value);
    else if (id === 'fontScaleSelect') Storage.set('fontScale', e.target.value);
    else if (id === 'seasonSelect') Storage.set('season', e.target.value);
    else if (id === 'compactToggle') Storage.set('compact', e.target.checked);
    else if (id === 'animToggle') Storage.set('animEnabled', e.target.checked);
    else if (id === 'glowToggle') Storage.set('glow', e.target.checked);
    else if (id === 'soundToggle') Storage.set('soundEnabled', e.target.checked);
    else if (id === 'notifyToggle') Storage.set('notifyEnabled', e.target.checked);
    else if (id === 'hapticToggle') Storage.set('hapticEnabled', e.target.checked);
    else return;
    applyAllSettings();
  });

  // Reg checkbox
  document.addEventListener('input', (e) => {
    if (e.target.id === 'regConfirm') {
      const btn = document.getElementById('regBtn');
      if (btn) btn.disabled = !e.target.checked;
    }
    if (e.target.id === 'searchInput') {
      searchQuery = e.target.value.toLowerCase().trim();
      visibleProducts = 6;
      renderProducts();
      saveSearchHistory(searchQuery);
    }
    if (e.target.id === 'faqSearch') renderFAQ();
  });

  // Search focus
  document.getElementById('searchInput')?.addEventListener('focus', renderSearchHistory);

  // Scroll
  window.addEventListener('scroll', () => {
    document.getElementById('topbar')?.classList.toggle('scrolled', window.scrollY > 10);
  });
  window.addEventListener('hashchange', routeFromHash);

  // Admin action handlers (del-review, del-chat-msg, add-promo)
  document.addEventListener('click', (e) => {
    const delRev = e.target.closest('[data-action="del-review"]');
    if (delRev) { delReview(+delRev.dataset.idx); return; }
    const delChat = e.target.closest('[data-action="del-chat-msg"]');
    if (delChat) { delChatMsg('general', +delChat.dataset.idx); return; }
    const addPromoBtn = e.target.closest('[data-action="add-promo"]');
    if (addPromoBtn) { addPromo(); return; }
  });
}
