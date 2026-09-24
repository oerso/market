// ==================== CONFIG ====================
const ADMIN_PASSWORD = '837472';
const ADMIN_IDS = [7803765347, 912559442];
const SUPPORT_LINK = 'https://t.me/desired_support';
const BOT_LINK = 'https://t.me/desired_bot';
const LOW_STOCK = 5;

// ==================== STORAGE ====================
const Storage = {
  get(k, d = null) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem(k); } catch {} }
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
  chatChannel: 'general',
  reviewRating: 5,
  reviewFilter: 'all',
  loyaltyLevel: 'bronze'
};

// ==================== DATA ====================
const PRODUCTS = [
  { id: 1, flag: '🇺🇸', name: 'США', sub: '2078 покупок · автовыдача', price: 89, oldPrice: 99, rating: 5, badge: 'ХИТ', stock: 42, tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 2, flag: '🇬🇧', name: 'Великобритания', sub: '107 покупок · автовыдача', price: 159, rating: 4.8, stock: 18, tags: ['⚡ автовыдача'] },
  { id: 3, flag: '🇯🇵', name: 'Япония', sub: '52 покупки · автовыдача', price: 349, rating: 4.9, stock: 7, tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 4, flag: '🇨🇴', name: 'Колумбия', sub: '34 покупки · автовыдача', price: 129, rating: 4.7, stock: 12, tags: ['⚡ автовыдача'] },
  { id: 5, flag: '🇰🇿', name: 'Казахстан', sub: '88 покупок · автовыдача', price: 99, rating: 4.8, stock: 25, tags: ['⚡ автовыдача'] },
  { id: 6, flag: '⭐', name: 'Telegram Stars 100', sub: 'Мгновенная выдача', price: 145, rating: 5, badge: 'NEW', stock: 89, tags: ['⚡ автовыдача'] },
  { id: 7, flag: '⭐', name: 'Telegram Stars 500', sub: 'Мгновенная выдача', price: 690, rating: 5, stock: 45, tags: ['⚡ автовыдача'] },
  { id: 8, flag: '💎', name: 'Telegram Premium 3 мес', sub: 'Активация на аккаунт', price: 590, rating: 4.9, badge: 'ХИТ', stock: 30, tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 9, flag: '💎', name: 'Telegram Premium 12 мес', sub: 'Активация на аккаунт', price: 1890, rating: 4.9, stock: 15, tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 10, flag: '🎁', name: 'NFT подарок Basic', sub: 'Аренда 30 дней', price: 249, rating: 4.6, stock: 22, tags: ['🎁 аренда'] },
  { id: 11, flag: '🎁', name: 'NFT подарок Rare', sub: 'Аренда 30 дней', price: 890, rating: 4.8, badge: 'NEW', stock: 8, tags: ['🎁 аренда'] }
];

const PACKAGES = [
  { id: 'p1', title: 'Стартовый пакет', sub: '3 USA + 2 UK + Premium 3 мес', price: 990, oldPrice: 1287 },
  { id: 'p2', title: 'Набор для накрутки', sub: 'Stars 500 + Premium 3 мес', price: 1190, oldPrice: 1280 },
  { id: 'p3', title: 'Оптовый VIP', sub: '10 USA + 5 UK + 5 KZ', price: 2490, oldPrice: 3350 }
];

const FAQ = [
  { q: 'Как получить товар?', a: 'После оплаты товар выдаётся автоматически в разделе «Инвентарь».' },
  { q: 'Способы оплаты?', a: 'СБП, карты РФ, Telegram Stars, CryptoBot. Появятся после переезда на сервер.' },
  { q: 'Товар не работает?', a: 'Напишите в поддержку с номером заказа. Решим в течение 24 часов.' },
  { q: 'Реферальная программа?', a: '10% с покупок рефералов 1 уровня и 3% со 2 уровня. Вывод от 500₽.' },
  { q: 'Восстановление пароля?', a: 'Только через поддержку. Сохраняйте данные в надёжном месте!' },
  { q: 'Безопасно ли?', a: 'Да, все товары проверяются, оплата через защищённые шлюзы.' },
  { q: 'Сколько идёт выдача?', a: 'Автовыдача мгновенно. Если не пришло — напишите в поддержку.' },
  { q: 'Возврат денег?', a: 'Да, если товар не работает — в течение 24 часов.' },
  { q: 'Какие аккаунты?', a: 'Отлежавшиеся, с полным доступом. Логин, пароль, почта.' },
  { q: 'Оптовые скидки?', a: 'От 10 штук — 15%, от 50 — 25%. Пишите в поддержку.' },
  { q: 'Как пополнить?', a: 'Профиль → «Пополнить». СБП, карты, Stars, CryptoBot.' },
  { q: 'Оплата не прошла?', a: 'Проверь баланс. Если списалось — в поддержку.' },
  { q: 'Гарантия?', a: 'От 24ч до 7 дней в зависимости от типа товара.' },
  { q: 'Перепродажа?', a: 'Да, без раскрытия источника и без демпинга.' },
  { q: 'Срок жизни аккаунта?', a: 'От 6 месяцев при правильном использовании.' },
  { q: 'Что такое аренда NFT?', a: 'Подарок в профиль на 30 дней. Потом — продление или возврат.' },
  { q: 'Что такое Stars?', a: 'Внутренняя валюта Telegram для подарков и подписок.' },
  { q: 'Куда приходят звёзды?', a: 'На твой Telegram-аккаунт по указанному @username.' },
  { q: 'Без Premium?', a: 'Да, Stars продаются отдельно.' },
  { q: 'Скидки постоянным?', a: 'Bronze 3%, Silver 5%, Gold 8%, Platinum 12% кэшбэка баллами.' },
  { q: 'Вывод рефки?', a: 'От 500₽ на карту или CryptoBot. Заявка через поддержку.' },
  { q: 'Рассрочка?', a: 'Для крупных покупок — да. Пишите в поддержку.' },
  { q: 'Что за кейс дня?', a: 'Раз в 24 часа можно выбить промокод на скидку.' },
  { q: 'Что за колесо?', a: 'Как кейс, но с другими призами. Раз в 24 часа.' },
  { q: 'Что за баллы?', a: 'Копятся с покупок, входов, отзывов. Обмен на скидку.' },
  { q: 'Как стать Verified?', a: '5+ отзывов и покупок на 5000₽+.' },
  { q: 'Обманул продавец?', a: 'У нас нет продавцов. Пишите в поддержку.' },
  { q: 'Оплата с чужой карты?', a: 'Только с разрешения. За чарджбэки — бан.' },
  { q: 'Есть приложение?', a: 'Работает в Telegram как Mini App.' },
  { q: 'Новые товары?', a: 'Следи за ченджлогом и каналом.' },
  { q: 'Что за чат?', a: 'Общение юзеров. Три канала: Общий, Купля-продажа, Оффтоп.' },
  { q: 'Стать модератором?', a: 'Активным юзерам по приглашению.' }
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
  { date: 'Сегодня', text: 'Обновили дизайн, добавили 9 тем, 8 акцентов, кастомизацию под каждого юзера. Настройки применяются мгновенно.' },
  { date: 'Вчера', text: 'Тест с кентом. Чат между юзерами пока не работает — ждём бэкенд.' },
  { date: '2 дня назад', text: 'Собрали новую дизайн-систему на Manrope.' },
  { date: '3 дня назад', text: 'Старт разработки маркета.' }
];

const CHANGELOG = [
  { ver: 'v0.5.0', date: 'Сегодня', changes: ['9 тем оформления', '8 акцентных цветов', 'Радиус, шрифт, компактный режим', 'Glow-эффект и анимации', 'Сезонные темы', 'Мгновенное применение настроек', 'Сброс одним тапом', 'Описание к каждой настройке'] },
  { ver: 'v0.4.0', date: '2 дня назад', changes: ['Кейс дня и колесо фортуны', 'Ежедневный бонус', 'Баллы и лояльность', 'Избранное, недавние', 'Пакеты и апселл', 'Достижения и лидерборд'] },
  { ver: 'v0.3.0', date: '4 дня назад', changes: ['Полный редизайн', 'Авторизация', 'Админ-панель на 2 юзера', 'Корзина и профиль'] },
  { ver: 'v0.2.0', date: '6 дней назад', changes: ['Отзывы и FAQ', 'Рефералка', 'Каталог'] },
  { ver: 'v0.1.0', date: 'Неделю назад', changes: ['Первый каркас Mini App'] }
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
        document.getElementById('authScreen').classList.remove('hidden');
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
  bindSettingsListeners();
  bindNavListeners();
  bindCartListeners();
  bindMiscListeners();
});

function initTelegram() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;
  tg.ready();
  tg.expand();
  tg.setHeaderColor?.('#08080a');
  tg.setBackgroundColor?.('#08080a');
  state.tgUser = tg.initDataUnsafe?.user || null;
}

// ==================== SETTINGS ====================
function applyAllSettings() {
  // Тема
  const theme = Storage.get('theme', 'dark');
  document.body.setAttribute('data-theme', theme);

  // Акцент
  const accent = Storage.get('accent', 'red');
  document.body.setAttribute('data-accent', accent);

  // Сезон
  const season = Storage.get('season', 'default');
  if (season === 'default') document.body.removeAttribute('data-season');
  else document.body.setAttribute('data-season', season);

  // Радиус
  const r = Storage.get('radius', 'default');
  const rmap = { sharp: '6px', default: '16px', round: '24px', pill: '32px' };
  const rval = rmap[r] || rmap.default;
  document.body.style.setProperty('--radius', rval);
  document.body.style.setProperty('--radius-sm', `calc(${rval} - 4px)`);
  document.body.style.setProperty('--radius-lg', `calc(${rval} + 6px)`);

  // Шрифт
  const s = Storage.get('fontScale', 'default');
  const smap = { small: '0.9', default: '1', large: '1.1', xlarge: '1.2' };
  document.body.style.setProperty('--font-scale', smap[s] || '1');

  // Компакт / анимации / glow
  document.body.classList.toggle('compact', Storage.get('compact', false));
  document.body.classList.toggle('no-anim', !Storage.get('animEnabled', true));
  document.body.classList.toggle('glow', Storage.get('glow', true));

  // Синхронизация UI
  syncSettingsUI();
}

function syncSettingsUI() {
  const t = Storage.get('theme', 'dark');
  document.querySelectorAll('.theme-swatch').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === t);
  });

  const a = Storage.get('accent', 'red');
  document.querySelectorAll('.accent-dot').forEach(el => {
    el.classList.toggle('active', el.dataset.accent === a);
  });

  setVal('radiusSelect', Storage.get('radius', 'default'));
  setVal('fontScaleSelect', Storage.get('fontScale', 'default'));
  setVal('seasonSelect', Storage.get('season', 'default'));
  setCheck('compactToggle', Storage.get('compact', false));
  setCheck('animToggle', Storage.get('animEnabled', true));
  setCheck('glowToggle', Storage.get('glow', true));
  setCheck('soundToggle', Storage.get('soundEnabled', true));
  setCheck('notifyToggle', Storage.get('notifyEnabled', true));
  setCheck('hapticToggle', Storage.get('hapticEnabled', true));
}

function setVal(id, val) { const el = document.getElementById(id); if (el) el.value = val; }
function setCheck(id, val) { const el = document.getElementById(id); if (el) el.checked = val; }

function bindSettingsListeners() {
  document.addEventListener('click', (e) => {
    const swatch = e.target.closest('.theme-swatch');
    if (swatch) {
      Storage.set('theme', swatch.dataset.theme);
      applyAllSettings();
      toast('Тема изменена', 'success');
      haptic('light');
      return;
    }
    const dot = e.target.closest('.accent-dot');
    if (dot) {
      Storage.set('accent', dot.dataset.accent);
      applyAllSettings();
      haptic('light');
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

  document.addEventListener('change', (e) => {
    const id = e.target.id;
    const v = e.target.value;
    const c = e.target.checked;

    if (id === 'radiusSelect') Storage.set('radius', v);
    else if (id === 'fontScaleSelect') Storage.set('fontScale', v);
    else if (id === 'seasonSelect') Storage.set('season', v);
    else if (id === 'compactToggle') Storage.set('compact', c);
    else if (id === 'animToggle') Storage.set('animEnabled', c);
    else if (id === 'glowToggle') Storage.set('glow', c);
    else if (id === 'soundToggle') Storage.set('soundEnabled', c);
    else if (id === 'notifyToggle') Storage.set('notifyEnabled', c);
    else if (id === 'hapticToggle') Storage.set('hapticEnabled', c);
    else return;

    applyAllSettings();
    if (id === 'seasonSelect') toast('Сезон применён', 'success');
  });
}

function resetSettings() {
  ['theme','accent','radius','fontScale','compact','animEnabled','glow','season'].forEach(k => Storage.del(k));
  applyAllSettings();
  toast('Настройки сброшены', 'success');
  haptic('medium');
}

// ==================== AUTH ====================
function showAuthForm(which) {
  ['authChoice', 'loginForm', 'registerForm'].forEach(id => {
    document.getElementById(id)?.classList.add('hidden');
  });
  if (which === 'choice') document.getElementById('authChoice')?.classList.remove('hidden');
  if (which === 'login') document.getElementById('loginForm')?.classList.remove('hidden');
  if (which === 'register') document.getElementById('registerForm')?.classList.remove('hidden');
  haptic('light');
}

document.addEventListener('input', (e) => {
  if (e.target.id === 'regConfirm') {
    const btn = document.getElementById('regBtn');
    if (btn) btn.disabled = !e.target.checked;
  }
});

function doRegister() {
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value.trim();
  if (!username || !password) return toast('Заполни все поля', 'error');
  if (username.length < 3) return toast('Имя минимум 3 символа', 'error');
  if (password.length < 4) return toast('Пароль минимум 4 символа', 'error');
  if (state.users[username]) return toast('Имя занято', 'error');
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
  document.getElementById('page-' + page)?.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === page));
  location.hash = page;
  window.scrollTo(0, 0);
  haptic('light');
  closeDropdown();
}

function bindNavListeners() {
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.addEventListener('click', () => go(b.dataset.page));
  });
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      go(el.dataset.page);
    });
  });

  const dotsBtn = document.getElementById('dotsBtn');
  const dropdown = document.getElementById('dropdownMenu');
  dotsBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
    haptic('light');
  });
  document.addEventListener('click', () => dropdown?.classList.remove('show'));
  dropdown?.addEventListener('click', (e) => e.stopPropagation());

  window.addEventListener('scroll', () => {
    document.getElementById('topbar')?.classList.toggle('scrolled', window.scrollY > 10);
  });

  window.addEventListener('hashchange', routeFromHash);

  // Admin
  let taps = 0, tapTimer = null;
  document.getElementById('brandLogo')?.addEventListener('click', () => {
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

  // Admin tabs
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderAdminTab(tab.dataset.tab);
    });
  });

  // Leaderboard tabs
  document.querySelectorAll('.lb-tab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.lb-tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      renderLeaderboard(t.dataset.lb);
    });
  });

  // Chat channels
  document.querySelectorAll('.chat-ch').forEach(ch => {
    ch.addEventListener('click', () => {
      document.querySelectorAll('.chat-ch').forEach(x => x.classList.remove('active'));
      ch.classList.add('active');
      state.chatChannel = ch.dataset.ch;
      renderChat();
    });
  });

  // Review filters
  document.querySelectorAll('.quick-chip[data-rfilter]').forEach(c => {
    c.addEventListener('click', () => {
      document.querySelectorAll('.quick-chip[data-rfilter]').forEach(x => x.classList.remove('active'));
      c.classList.add('active');
      state.reviewFilter = c.dataset.rfilter;
      renderReviews();
    });
  });

  // Stars input
  document.querySelectorAll('#starsInput span').forEach(s => {
    s.addEventListener('click', () => {
      state.reviewRating = +s.dataset.star;
      document.querySelectorAll('#starsInput span').forEach(x => {
        x.classList.toggle('active', +x.dataset.star <= state.reviewRating);
      });
      haptic('light');
    });
  });

  // Product filters
  document.querySelectorAll('.filter').forEach(f => {
    f.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      currentFilter = f.dataset.filter;
      visibleProducts = 6;
      renderProducts();
    });
  });

  document.querySelectorAll('.quick-chip[data-quick]').forEach(c => {
    c.addEventListener('click', () => {
      document.querySelectorAll('.quick-chip[data-quick]').forEach(x => x.classList.remove('active'));
      c.classList.add('active');
      currentQuick = c.dataset.quick;
      visibleProducts = 6;
      renderProducts();
    });
  });

  document.getElementById('searchInput')?.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    visibleProducts = 6;
    renderProducts();
    saveSearchHistory(searchQuery);
  });
  document.getElementById('searchInput')?.addEventListener('focus', renderSearchHistory);

  document.getElementById('faqSearch')?.addEventListener('input', renderFAQ);

  document.getElementById('onbTrack');
}

function routeFromHash() {
  const h = location.hash.replace('#', '');
  if (h && document.getElementById('page-' + h)) go(h);
}

function closeDropdown() { document.getElementById('dropdownMenu')?.classList.remove('show'); }

// ==================== ADMIN ====================
function checkAdminPass() {
  const val = document.getElementById('adminPassInput').value;
  if (val === ADMIN_PASSWORD) {
    document.getElementById('adminPassInput').value = '';
    closeModal('modalAdminPass');
    logAction('admin_login');
    go('admin');
    renderAdminTab('stats');
    toast('Добро пожаловать', 'success');
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
      `<div class="admin-row"><span>${p.flag} ${p.name}</span><span>${p.price}₽ · ${p.stock} шт</span></div>`
    ).join('');
  } else if (tab === 'promo') {
    c.innerHTML = `
      <h4>🎟 Промокоды</h4>
      <input type="text" id="promoCodeInput" placeholder="Код">
      <input type="number" id="promoDiscInput" placeholder="Скидка %">
      <input type="number" id="promoLimitInput" placeholder="Лимит (0 = без)">
      <button onclick="addPromo()">Добавить</button>
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
      `<div class="admin-row"><span>@${r.author} · ${r.rating}★</span><button class="ghost" onclick="delReview(${i})">Удалить</button></div>`
    ).join('') || '<div style="color:var(--muted);font-size:12px;">Нет отзывов</div>';
    c.innerHTML = `<h4>⭐ Отзывы</h4>${list}`;
  } else if (tab === 'chat') {
    const g = state.chat.general || [];
    c.innerHTML = `<h4>🗨️ Чат (${g.length})</h4>` + (g.slice(-10).map((m, i) =>
      `<div class="admin-row"><span>@${m.author}: ${escapeHtml(m.text).slice(0, 30)}</span><button class="ghost" onclick="delChatMsg('general', ${i})">×</button></div>`
    ).join('') || '<div style="color:var(--muted);font-size:12px;">Пусто</div>');
  } else if (tab === 'logs') {
    const logs = Storage.get('logs', []);
    c.innerHTML = `<h4>📜 Логи (${logs.length})</h4>` + (logs.slice(-20).reverse().map(l =>
      `<div class="admin-row"><span>${l.action}</span><span>${new Date(l.date).toLocaleTimeString()}</span></div>`
    ).join('') || '<div style="color:var(--muted);font-size:12px;">Нет логов</div>');
  }
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

// ==================== PRODUCTS ====================
let currentFilter = 'popular';
let currentQuick = 'all';
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
  if (!hist.length) { el?.classList.add('hidden'); return; }
  el.innerHTML = hist.map(h => `<span class="hist-chip" onclick="setSearch('${h}')">${h}</span>`).join('');
  el.classList.remove('hidden');
}

function setSearch(q) {
  document.getElementById('searchInput').value = q;
  searchQuery = q;
  renderProducts();
  document.getElementById('searchHistory')?.classList.add('hidden');
}

function renderProducts() {
  const list = document.getElementById('productsList');
  if (!list) return;
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
      const stockHint = p.stock <= LOW_STOCK ? `<div class="product-stock">⚠ Осталось ${p.stock} шт</div>` : '';
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

    const end = document.getElementById('productsEnd');
    if (items.length > visibleProducts) {
      end.textContent = `— Показать ещё ${items.length - visibleProducts} —`;
      end.classList.remove('hidden');
      end.onclick = () => { visibleProducts += 6; renderProducts(); };
    } else {
      end.classList.add('hidden');
    }
  }, 200);
}

function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  addToRecent(id);
  const isFav = state.favorites.includes(id);
  document.getElementById('productModalContent').innerHTML = `
    <div style="font-size:52px;text-align:center;margin-bottom:10px;">${p.flag}</div>
    <h3 style="font-size:20px;font-weight:800;text-align:center;margin-bottom:6px;">${p.name}</h3>
    <div style="text-align:center;color:var(--muted);font-size:12px;margin-bottom:12px;">${p.sub}</div>
    <div class="product-rating" style="justify-content:center;margin-bottom:12px;">
      ${'<span class="star" style="color:var(--yellow);font-size:16px;">★</span>'.repeat(Math.round(p.rating))}
      <span style="margin-left:6px;font-weight:700;">${p.rating}</span>
    </div>
    <div style="display:flex;gap:10px;justify-content:center;margin-bottom:16px;flex-wrap:wrap;">
      <div class="product-tag">⚡ Автовыдача</div>
      <div class="product-tag">🛡 Гарантия 24ч</div>
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
  `;
  openModal('modalProduct');
}

function shareProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const link = `${BOT_LINK}?startapp=product_${id}`;
  if (navigator.share) {
    navigator.share({ title: p.name, text: `${p.name} за ${p.price}₽`, url: link }).catch(()=>{});
  } else {
    navigator.clipboard?.writeText(link);
    toast('Ссылка скопирована', 'success');
  }
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
function bindCartListeners() {}

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

function buyNow(id) { addToCart(id); go('cart'); }

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

function applyPromoInCart() { openModal('modalPromo'); }

function applyPromo() {
  const code = document.getElementById('promoInput').value.trim().toUpperCase();
  const resultEl = document.getElementById('promoResult');
  if (!code) return;
  const promo = state.promos.find(p => p.code === code);
  const builtIn = {
    'CASE5': 5, 'CASE10': 10, 'CASE15': 15, 'CASE3': 3, 'CASE20': 20,
    'WHEEL5': 5, 'WHEEL10': 10, 'WHEEL15': 15, 'WHEEL20': 20, 'WHEEL50': 50,
    'WELCOME10': 10, 'DESIRED5': 5
  };
  let discount = promo ? promo.disc : (builtIn[code] || null);
  if (!discount) {
    resultEl.textContent = '❌ Промокод не найден';
    resultEl.style.color = 'var(--accent)';
    return;
  }
  if (state.usedPromos[code]) {
    resultEl.textContent = '❌ Уже использован';
    resultEl.style.color = 'var(--accent)';
    return;
  }
  state.appliedPromo = { code, disc: discount };
  state.usedPromos[code] = 1;
  Storage.set('usedPromos', state.usedPromos);
  resultEl.textContent = `✅ Применён: -${discount}%`;
  resultEl.style.color = 'var(--green)';
  toast(`Промокод -${discount}%`, 'success');
  setTimeout(() => {
    closeModal('modalPromo');
    renderCart();
    document.getElementById('promoInput').value = '';
    resultEl.textContent = '';
  }, 1200);
}

function openPromoModal() { openModal('modalPromo'); }

// ==================== TOPUP / CHECKOUT ====================
function openTopUp() { openModal('modalTopUp'); }

function submitTopUp() {
  const amount = +document.getElementById('topUpAmount').value;
  if (!amount || amount < 25) return toast('Минимум 25₽', 'error');
  const balance = Storage.get('balance', 0) + amount;
  Storage.set('balance', balance);
  state.stats.topUp += amount;
  Storage.set('stats', state.stats);
  state.transactions.unshift({ type: 'in', title: 'Пополнение', amount, date: Date.now() });
  Storage.set('transactions', state.transactions);
  updateProfileUI();
  renderTransactions();
  closeModal('modalTopUp');
  document.getElementById('topUpAmount').value = '';
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

  state.orders.push({ id: 'ORD' + Date.now(), items: state.cart, total, status: 'Выдан', date: Date.now() });
  Storage.set('orders', state.orders);
  state.transactions.unshift({ type: 'out', title: `Заказ ${total}₽`, amount: total, date: Date.now() });
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
  toast('Заказ оформлен!', 'success');
  haptic('heavy');
  playSound();
}

function renderTransactions() {
  const list = document.getElementById('txList');
  const empty = document.getElementById('txEmpty');
  if (!list) return;
  if (!state.transactions.length) { list.innerHTML = ''; empty.classList.remove('hidden'); return; }
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
  if (!state.orders.length) { list.innerHTML = ''; empty.classList.remove('hidden'); return; }
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
  if (avg) avg.textContent = items.length ? (items.reduce((s, r) => s + (r.rating || 5), 0) / items.length).toFixed(1) : '5.0';
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
    </div>
  `).join('');
}

function reviewHelpful() { toast('Спасибо!', 'success'); }

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
    text, rating: state.reviewRating, date: Date.now()
  });
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

// ==================== FAQ ====================
function renderFAQ() {
  const el = document.getElementById('faqList');
  if (!el) return;
  const q = document.getElementById('faqSearch')?.value?.toLowerCase().trim() || '';
  const filtered = q ? FAQ.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)) : FAQ;
  el.innerHTML = filtered.map(f => `
    <div class="faq-item" onclick="toggleFaq(this)">
      <div class="faq-q">${f.q}<span>▾</span></div>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('') || '<div style="text-align:center;color:var(--muted);padding:20px;">Ничего не найдено</div>';
}
function toggleFaq(el) { el.classList.toggle('open'); }

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
  const day = 86400000;
  const el = document.getElementById('caseStatus');
  if (!el) return;
  if (diff >= day) el.textContent = 'Доступен!';
  else {
    const h = Math.floor((day - diff) / 3600000);
    const m = Math.floor(((day - diff) % 3600000) / 60000);
    el.textContent = `Через ${h}ч ${m}м`;
  }
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
  const day = 86400000;
  const el = document.getElementById('wheelStatus');
  if (!el) return;
  if (diff >= day) el.textContent = 'Доступно!';
  else el.textContent = `Через ${Math.floor((day - diff) / 3600000)}ч`;
}

function spinWheel() {
  if (Date.now() - (state.lastWheel || 0) < 86400000) return toast('Колесо уже крутилось', 'error');
  const prizes = [
    { emoji: '🎉', title: 'Скидка 5%', text: 'Промокод: WHEEL5' },
    { emoji: '🎁', title: 'Скидка 10%', text: 'Промокод: WHEEL10' },
    { emoji: '🔥', title: 'Скидка 15%', text: 'Промокод: WHEEL15' },
    { emoji: '💎', title: 'Скидка 20%', text: 'Промокод: WHEEL20' },
    { emoji: '👑', title: 'JACKPOT - 50%!', text: 'Промокод: WHEEL50' }
  ];
  const weights = [30, 25, 20, 15, 10];
  let r = Math.random() * weights.reduce((a,b) => a+b, 0);
  let idx = 0;
  for (let i = 0; i < weights.length; i++) {
    if (r < weights[i]) { idx = i; break; }
    r -= weights[i];
  }
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
  const day = 86400000;
  const el = document.getElementById('dailyStatus');
  if (!el) return;
  if (diff >= day) el.textContent = 'Забери 5 баллов';
  else el.textContent = `Через ${Math.floor((day - diff) / 3600000)}ч`;
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
  const thresholds = [0, 5000, 20000, 50000];
  const next = thresholds.find(t => t > state.stats.spent) || 50000;
  const prev = thresholds.filter(t => t <= state.stats.spent).pop() || 0;
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
    { name: '@active_user', val: 67 }, { name: '@desired', val: state.stats.orders || 0 },
    { name: '@newbie', val: 3 }
  ].sort((a,b) => b.val - a.val).slice(0, 10);
  const refs = [
    { name: '@referrer_pro', val: 145 }, { name: '@invite_king', val: 98 },
    { name: '@network', val: 76 }, { name: '@ambassador', val: 42 },
    { name: '@desired', val: state.achievements.length }
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
    const a = document.getElementById('liveOnline');
    if (a) a.textContent = state.onlineCount.toLocaleString();
    const b = document.getElementById('infoOnline');
    if (b) b.textContent = state.onlineCount.toLocaleString();
  }, 5000);
}

// ==================== MODALS ====================
function openModal(id) { document.getElementById(id)?.classList.add('show'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('show'); }
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

function bindMiscListeners() {}

// ==================== TIMER ====================
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

// ==================== WINDOW EXPORTS ====================
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
window.resetSettings = resetSettings;
