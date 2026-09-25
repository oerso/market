// ==================== CONFIG ====================
const ADMIN_PASSWORD = '837472';
const ADMIN_IDS = [7803765347, 912559442];
const SUPPORT_LINK = 'https://t.me/desired_support';
const DIRECT_CONTACT = 'https://t.me/id912559442';
const BOT_LINK = 'https://t.me/desired_bot';
const LOW_STOCK = 5;
const CASE_PRICE = 50;
const BONUS_AMOUNTS = [5, 5, 15, 15, 15, 25, 50];

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
  promos: Storage.get('promos', []),
  usedPromos: Storage.get('usedPromos', {}),
  transactions: Storage.get('transactions', []),
  orders: Storage.get('orders', []),
  inventory: Storage.get('inventory', []),
  points: Storage.get('points', 0),
  stats: Storage.get('stats', { topUp: 0, spent: 0, orders: 0 }),
  achievements: Storage.get('achievements', []),
  tickets: Storage.get('tickets', []),
  aiChat: Storage.get('aiChat', []),
  dailyBonus: Storage.get('dailyBonus', { lastClaim: 0, streak: 0 }),
  caseSpins: Storage.get('caseSpins', 0),
  hideBalance: Storage.get('hideBalance', false),
  onboarded: Storage.get('onboarded', false),
  onlineCount: 1247,
  soldToday: 32,
  tgUser: null,
  appliedPromo: null,
  reviewRating: 5,
  reviewFilter: 'all',
  inventoryFilter: 'all',
  txFilter: 'all',
  catalogTab: 'accounts',
  quickFilter: 'all',
  faqCat: 'all',
  loyaltyLevel: 'bronze',
  pendingAdminBalance: null,
  currentTicketId: null,
  msbMode: 'stars',
  msbPremiumMonths: 12,
  navStack: [],
  filters: { priceMin: 0, priceMax: 0, sort: 'popular', hit: false, isNew: false, sale: false }
};

// ==================== PRODUCTS ====================
let PRODUCTS = Storage.get('products', null) || [
  { id: 1, flag: '🇺🇸', name: 'США', sub: '2078 покупок · автовыдача', price: 89, oldPrice: 99, rating: 5, badge: 'ХИТ', stock: 42, category: 'accounts', tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 2, flag: '🇬🇧', name: 'Великобритания', sub: '107 покупок · автовыдача', price: 159, rating: 4.8, stock: 18, category: 'accounts', tags: ['⚡ автовыдача'] },
  { id: 3, flag: '🇯🇵', name: 'Япония', sub: '52 покупки · автовыдача', price: 349, rating: 4.9, stock: 7, category: 'accounts', tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 4, flag: '🇨🇴', name: 'Колумбия', sub: '34 покупки · автовыдача', price: 129, rating: 4.7, stock: 12, category: 'accounts', tags: ['⚡ автовыдача'] },
  { id: 5, flag: '🇰🇿', name: 'Казахстан', sub: '88 покупок · автовыдача', price: 99, rating: 4.8, stock: 25, category: 'accounts', tags: ['⚡ автовыдача'] },
  { id: 6, flag: '🇩🇪', name: 'Германия', sub: '64 покупки · автовыдача', price: 179, rating: 4.7, stock: 15, category: 'accounts', tags: ['⚡ автовыдача'] },
  { id: 7, flag: '⭐', name: 'Telegram Stars 100', sub: 'Мгновенная выдача', price: 145, rating: 5, badge: 'NEW', stock: 89, category: 'stars', tags: ['⚡ автовыдача'] },
  { id: 8, flag: '⭐', name: 'Telegram Stars 500', sub: 'Мгновенная выдача', price: 690, rating: 5, stock: 45, category: 'stars', tags: ['⚡ автовыдача'] },
  { id: 9, flag: '💎', name: 'Telegram Premium 3 мес', sub: 'Активация на аккаунт', price: 590, rating: 4.9, badge: 'ХИТ', stock: 30, category: 'stars', tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 10, flag: '💎', name: 'Telegram Premium 12 мес', sub: 'Активация на аккаунт', price: 1890, rating: 4.9, stock: 15, category: 'stars', tags: ['⚡ автовыдача', '🛡 гарантия'] },
  { id: 11, flag: '🎁', name: 'NFT подарок Basic', sub: 'Аренда 30 дней', price: 249, rating: 4.6, stock: 22, category: 'stars', tags: ['🎁 аренда'] },
  { id: 12, flag: '🎁', name: 'NFT подарок Rare', sub: 'Аренда 30 дней', price: 890, rating: 4.8, badge: 'NEW', stock: 8, category: 'stars', tags: ['🎁 аренда'] }
];
function saveProducts() { Storage.set('products', PRODUCTS); }

const PACKAGES = [
  { id: 'p1', title: 'Стартовый пакет', sub: '3 USA + 2 UK + Premium 3 мес', price: 990, oldPrice: 1287 },
  { id: 'p2', title: 'Набор для накрутки', sub: 'Stars 500 + Premium 3 мес', price: 1190, oldPrice: 1280 },
  { id: 'p3', title: 'Оптовый VIP', sub: '10 USA + 5 UK + 5 KZ', price: 2490, oldPrice: 3350 }
];

const PREMIUM_PRICES = { 3: 1239, 6: 1649, 12: 2979 };
const STARS_PRICE_PER_STAR = 1.45;

const FAQ = [
  { q: 'Как получить товар после оплаты?', a: 'После успешной оплаты товар моментально выдаётся в разделе «Инвентарь». Там будут логин, пароль и все данные.', cat: 'products' },
  { q: 'Какие способы оплаты?', a: 'СБП, карты РФ, Telegram Stars, CryptoBot. Подключим сразу после переезда на сервер.', cat: 'payment' },
  { q: 'Что делать, если товар не работает?', a: 'Напиши в поддержку с номером заказа. Заменим или вернём деньги в течение 24 часов.', cat: 'warranty' },
  { q: 'Как работает реферальная программа?', a: '10% с покупок рефералов 1 уровня и 3% со 2 уровня. Вывод от 500₽ на карту или CryptoBot.', cat: 'other' },
  { q: 'Как восстановить пароль от аккаунта?', a: 'Только через поддержку. Сохраняй данные в надёжном месте сразу после покупки!', cat: 'account' },
  { q: 'Безопасно ли покупать у вас?', a: 'Да. Все товары проверяются перед выдачей, оплата через защищённые шлюзы, гарантия возврата.', cat: 'other' },
  { q: 'Сколько идёт выдача товара?', a: 'Автовыдача мгновенная 24/7. Если товар не пришёл за 5 минут — пиши в поддержку.', cat: 'products' },
  { q: 'Можно ли вернуть деньги?', a: 'Да, если товар не работает и заявка подана в течение 24 часов после покупки.', cat: 'warranty' },
  { q: 'Что за аккаунты вы продаёте?', a: 'Отлежавшиеся, с полным доступом: логин, пароль, почта, иногда привязанный номер.', cat: 'products' },
  { q: 'Есть ли оптовые скидки?', a: 'Да: от 10 штук — 15%, от 50 — 25%, от 100 — 30%. Пиши в поддержку для индивидуального расчёта.', cat: 'payment' },
  { q: 'Как пополнить баланс?', a: 'Нажми на кнопку с балансом сверху → выбери сумму → оплати удобным способом.', cat: 'payment' },
  { q: 'Что делать, если оплата не прошла?', a: 'Проверь баланс. Если списалось, но не зачислилось — пиши в поддержку с чеком.', cat: 'payment' },
  { q: 'Какая гарантия на товары?', a: 'От 24 часов до 7 дней в зависимости от типа товара. Указано в карточке и в инвентаре.', cat: 'warranty' },
  { q: 'Можно ли перепродавать товары?', a: 'Да, без раскрытия источника и без демпинга. Мы не против реселла.', cat: 'other' },
  { q: 'Как долго живут аккаунты?', a: 'От 6 месяцев при правильном использовании: без резких смен IP, без спама.', cat: 'products' },
  { q: 'Что такое аренда NFT-подарка?', a: 'Подарок на твой профиль Telegram на 30 дней. По окончании — продление по той же цене.', cat: 'products' },
  { q: 'Что такое Telegram Stars?', a: 'Внутренняя валюта Telegram для подарков, реакций и покупок внутри приложений.', cat: 'products' },
  { q: 'Куда приходят звёзды?', a: 'На твой Telegram-аккаунт после оплаты. Нужен только юзернейм или ID.', cat: 'products' },
  { q: 'Можно купить Stars без Premium?', a: 'Да, Stars продаются отдельно. Premium не обязателен.', cat: 'products' },
  { q: 'Есть ли скидки постоянным клиентам?', a: 'Да, кэшбэк по уровню: Bronze 3%, Silver 5%, Gold 8%, Platinum 12%.', cat: 'account' },
  { q: 'Как вывести реферальные?', a: 'От 500₽ на карту РФ, СБП или CryptoBot. Обработка до 24 часов.', cat: 'other' },
  { q: 'Можно ли купить в рассрочку?', a: 'Для крупных заказов от 5000₽ — да. Пиши в поддержку, обсудим условия.', cat: 'payment' },
  { q: 'Что такое баллы и зачем они?', a: 'Копятся с покупок, входов в приложение, отзывов. Можно тратить на скидки.', cat: 'account' },
  { q: 'Как получить статус Verified?', a: 'Нужно 5+ отзывов и сумма покупок от 5000₽. Значок появится автоматически.', cat: 'account' },
  { q: 'Что делать, если меня обманули?', a: 'У нас нет продавцов — только маркет. Пиши в поддержку, разберёмся.', cat: 'warranty' },
  { q: 'Можно оплатить с чужой карты?', a: 'Только с письменного разрешения владельца. Мы не поддерживаем мошенничество.', cat: 'payment' },
  { q: 'Есть ли мобильное приложение?', a: 'Мы работаем прямо в Telegram как Mini App. Устанавливать ничего не нужно.', cat: 'other' },
  { q: 'Как узнать о новых товарах?', a: 'Подпишись на наш Telegram-канал. Анонсы и скидки публикуем там первыми.', cat: 'other' },
  { q: 'Как стать модератором?', a: 'Активных юзеров приглашаем вручную. Пиши в поддержку с рассказом о себе.', cat: 'other' },
  { q: 'Что если аккаунт забанят?', a: 'В течение гарантийного срока заменим на новый или вернём деньги. Всё честно.', cat: 'warranty' },
  { q: 'Нужен ли VPN для использования?', a: 'Нет. Аккаунты и товары работают без VPN, если у тебя стабильный интернет.', cat: 'other' },
  { q: 'Сколько заказов в день вы обрабатываете?', a: 'Тысячи. Автовыдача работает 24/7, сбоев почти не бывает.', cat: 'other' },
  { q: 'Что делать, если я ошибся с покупкой?', a: 'До выдачи товара можно отменить заказ через поддержку. После — только возврат по гарантии.', cat: 'warranty' },
  { q: 'Как связаться с вами?', a: 'Через раздел «Поддержка» в приложении или напрямую в Telegram.', cat: 'other' },
  { q: 'Ваши контакты?', a: 'Официальный канал и бот — в разделе «Инфо». Остерегайся фейков, у нас только один аккаунт.', cat: 'other' },
  { q: 'Как часто обновляется каталог?', a: 'Ежедневно. Новые аккаунты и товары появляются каждый день.', cat: 'products' },
  { q: 'Можно ли забронировать товар?', a: 'Да, для крупных оптовых заказов. Пиши в поддержку заранее.', cat: 'payment' },
  { q: 'Что если закончился товар?', a: 'Кнопка покажет «Нет в наличии», а ты можешь подписаться на уведомление о появлении.', cat: 'products' },
  { q: 'У вас есть партнёрская программа?', a: 'Да, рефералка 10% + 3%. Отдельные условия для блогеров и крупных партнёров.', cat: 'other' },
  { q: 'Как стать партнёром?', a: 'Пиши в поддержку с описанием аудитории. Обсудим индивидуальный процент.', cat: 'other' }
];

const INFO_ITEMS = [
  { q: 'О маркете', a: 'desired — маркет цифровых товаров: Telegram-аккаунты, звёзды, премиум, аренда NFT. Автовыдача 24/7, поддержка, гарантия на все товары.' },
  { q: 'Наша миссия', a: 'Сделать покупку цифровых товаров такой же простой, как покупка кофе. Без скамов, без сложностей, без ожидания.' },
  { q: 'Гарантии', a: '100% возврат, если товар не работает. Заявку подаёшь в течение 24 часов после покупки. Замена или деньги на выбор.' },
  { q: 'Правила маркета', a: 'Возврат возможен только в случае нерабочего товара. Спорные ситуации решаются через поддержку в течение 24 часов.' },
  { q: 'Публичная статистика', a: 'Продано заказов: 12 458. Средняя оценка: 4.9/5. Онлайн: постоянно растёт. Мы открыты и не скрываем цифры.' },
  { q: 'Пользовательское соглашение', a: 'Полная версия откроется после переезда на сервер. Сейчас действует базовая: покупатель получает товар в течение гарантии.' },
  { q: 'Политика конфиденциальности', a: 'Мы не передаём данные третьим лицам. Всё хранится локально в твоём Telegram. Полная версия — после переезда на сервер.' },
  { q: 'Правила возврата', a: 'Заявка в течение 24 часов после покупки. Возврат на баланс или на карту. По решению поддержки — замена товара.' },
  { q: 'Как мы работаем', a: 'Автоматизированная система: заказ → оплата → моментальная выдача данных. Поддержка подключается только при проблемах.' },
  { q: 'Поддержка', a: 'Отвечаем в течение 15 минут в рабочее время и до 2 часов ночью. Пиши в раздел «Поддержка».' },
  { q: 'Оптовым клиентам', a: 'Индивидуальные условия от 50 заказов в месяц. Отдельный менеджер, спеццены, приоритетная выдача.' },
  { q: 'Партнёрам и блогерам', a: 'Повышенный процент по рефералке, промокоды, персональные скидки для аудитории. Пиши в поддержку.' },
  { q: 'Безопасность', a: 'Все данные передаются по HTTPS, оплата через защищённые шлюзы, у нас нет доступа к твоим картам.' },
  { q: 'Будущее маркета', a: 'Скоро: полноценная админка, личный кабинет партнёра, подписки, автопополнение, розыгрыши и кейсы.' },
  { q: 'Обратная связь', a: 'Нашли баг или есть идея? Пиши в поддержку. Лучшие идеи получают бонусы на баланс.' }
];

const ACHIEVEMENTS = [
  { id: 'first_order', icon: '🎯', name: 'Первый заказ', desc: 'Соверши первую покупку' },
  { id: 'ten_orders', icon: '🔟', name: '10 покупок', desc: 'Купи 10 товаров' },
  { id: 'big_spender', icon: '💎', name: 'Big Spender', desc: 'Потрать 5000₽' },
  { id: 'referrer', icon: '📣', name: 'Реферер', desc: 'Пригласи 3 друзей' },
  { id: 'reviewer', icon: '✍️', name: 'Критик', desc: 'Оставь 5 отзывов' },
  { id: 'daily_master', icon: '🔥', name: 'Стрик 7 дней', desc: 'Заходи 7 дней подряд' },
  { id: 'case_hunter', icon: '🎰', name: 'Кейс-хантер', desc: 'Крути кейс 5 раз' },
  { id: 'loyal', icon: '👑', name: 'Loyal', desc: 'Достигни Gold' },
  { id: 'favorite', icon: '❤️', name: 'Коллекционер', desc: 'Добавь 5 товаров в избранное' },
  { id: 'explorer', icon: '🧭', name: 'Исследователь', desc: 'Открой 10 товаров' }
];

const CHANGELOG = [
  { ver: 'v1.0.0', date: 'Сегодня', changes: [
    'Полная переработка профиля (v2)',
    'Уровни лояльности с 4 рангами и объяснением',
    'Поддержка: тикеты с историей, ИИ-чат, кнопка админа',
    'Раздел отзывов полностью переделан',
    'Покупка Stars/Premium с выбором получателя',
    'Ежедневный бонус + кейс-рулетка',
    'Кнопка "Спасибо за покупку" после оплаты',
    'Онбординг из 3 экранов для новых юзеров',
    'Избранное переехало в корзину (2 таба)',
    'Фикс контраста тем в настройках',
    'Везде имена (не юзернеймы), все эмодзи — SVG',
    'Уведомление "В разработке" вместо 404'
  ] },
  { ver: 'v0.9.1', date: 'Ранее', changes: ['Новый премиум-сплэш', 'SVG-иконки', 'Фикс faq-поиска'] },
  { ver: 'v0.9.0', date: '2 дня назад', changes: ['Вырезана авторизация', 'Авто-создание профиля'] },
  { ver: 'v0.8.0', date: '4 дня назад', changes: ['Каталог 2.0', 'Админка'] },
  { ver: 'v0.7.0', date: '6 дней назад', changes: ['9 тем, 8 акцентов'] }
];

const LIVE_BUYERS = [
  { name: '@vasya_p', flag: '🇺🇸', product: 'США' },
  { name: '@nagibator', flag: '💎', product: 'Premium 3 мес' },
  { name: '@krutoy', flag: '⭐', product: 'Stars 500' },
  { name: '@tramp', flag: '🇬🇧', product: 'Великобритания' },
  { name: '@marsik', flag: '🎁', product: 'NFT Basic' },
  { name: '@lucky', flag: '🇯🇵', product: 'Япония' },
  { name: '@topchek', flag: '⭐', product: 'Stars 100' },
  { name: '@arbitrage', flag: '🇰🇿', product: 'Казахстан' },
  { name: '@germany_pro', flag: '🇩🇪', product: 'Германия' },
  { name: '@colombia_x', flag: '🇨🇴', product: 'Колумбия' }
];

const SPLASH_TAGLINES = [
  'Маркет звёзд, премиума и аккаунтов',
  'Автовыдача 24/7 без выходных',
  'Тысячи довольных покупателей',
  'Твой маркет цифровых товаров'
];
const SPLASH_STAGES = [
  { at: 0, status: 'Инициализация...' },
  { at: 20, status: 'Загрузка каталога...' },
  { at: 45, status: 'Проверка товаров...' },
  { at: 70, status: 'Синхронизация...' },
  { at: 90, status: 'Почти готово...' },
  { at: 100, status: 'Добро пожаловать!' }
];

// ==================== AI MOCK ANSWERS ====================
const AI_ANSWERS = [
  { keys: ['заказ', 'где', 'пришл', 'статус'], answer: 'Все купленные товары моментально появляются в разделе «Инвентарь» — там логин, пароль и данные. Если товар не пришёл за 5 минут, напиши номер заказа, позову админа.' },
  { keys: ['оплат', 'пополн', 'платёж', 'платеж', 'сбп', 'карт', 'crypto', 'крипт'], answer: 'Оплата сейчас в разработке — скоро подключим СБП, карты РФ, Stars и CryptoBot. Следи за обновлениями, в канале сообщим первым.' },
  { keys: ['возврат', 'верн', 'деньг', 'refund'], answer: 'Возврат возможен, если товар не работает и заявка подана в течение 24 часов. Дай номер заказа, позову админа — решит вопрос.' },
  { keys: ['не работ', 'сломан', 'не подход', 'проблем', 'баг'], answer: 'Жаль, что так вышло! Опиши подробно, что не работает, и приложи номер заказа. Заменим или вернём деньги.' },
  { keys: ['гаранти', 'warranty'], answer: 'Гарантия от 24 часов до 7 дней — точный срок в карточке товара. Все товары проверяются перед выдачей.' },
  { keys: ['реферал', 'приглаш', 'друз'], answer: 'Зовёшь друга — получаешь 10% с его покупок + 3% со второго уровня. Ссылка в разделе «Реферальная программа» в профиле.' },
  { keys: ['баланс', 'деньг', 'пополнить', 'кошел'], answer: 'Баланс пополняется кнопкой «+» сверху. Оплата в разработке — скоро подключим все способы.' },
  { keys: ['аккаунт', 'логин', 'парол'], answer: 'Данные аккаунта приходят в инвентарь: логин, пароль, почта. Сохрани их в надёжном месте сразу после покупки!' },
  { keys: ['stars', 'звезд', 'звёзд'], answer: 'Telegram Stars продаются отдельно или вместе с Premium. Покупка звёзд — в каталоге, раздел «Звёзды и Премиум».' },
  { keys: ['premium', 'премиум'], answer: 'Premium активируется на твой аккаунт или на аккаунт получателя. Срок от 3 мес до 1 года. Купить можно в разделе «Звёзды и Премиум».' },
  { keys: ['nft', 'подарок', 'аренд'], answer: 'NFT-подарки арендуются на 30 дней и появляются в твоём профиле Telegram. По окончании можно продлить.' },
  { keys: ['поддержк', 'помощ', 'админ'], answer: 'Ты можешь создать тикет, написать в ИИ-чат или позвать админа напрямую. Раздел «Поддержка» в меню.' },
  { keys: ['отзыв', 'оценк'], answer: 'Оставить отзыв можно в разделе «Отзывы». За каждый отзыв +10 баллов на баланс.' },
  { keys: ['бонус', 'подарок', 'ежеднев'], answer: 'Заходи каждый день — получай бонус от 5 до 50₽. Стрик 7 дней = +50₽ и ачивка.' },
  { keys: ['скидк', 'промокод'], answer: 'Промокод вводится в профиле или корзине. Актуальные промокоды публикуем в Telegram-канале.' },
  { keys: ['привет', 'здравствуй', 'хай', 'hi', 'hello'], answer: 'Привет! Чем могу помочь? Могу ответить про заказы, оплату, возврат, товары, рефералку.' },
  { keys: ['спасибо', 'благодар'], answer: 'Всегда рад! Если ещё что-то понадобится — пиши, я на связи 24/7.' }
];

function getAIResponse(text) {
  const lower = text.toLowerCase().trim();
  for (const item of AI_ANSWERS) {
    for (const key of item.keys) {
      if (lower.includes(key)) return item.answer;
    }
  }
  return 'Хм, я не совсем понял вопрос. Могу помочь с заказами, оплатой, возвратом, товарами, рефералкой. Если нужен живой админ — нажми кнопку «Админ» сверху.';
}

// ==================== SPLASH v3 ====================
function spawnSplashParticles() {
  const wrap = document.getElementById('splashParticles');
  if (!wrap) return;
  const count = 24;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'splash3-particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    p.style.animationDelay = (Math.random() * 6) + 's';
    p.style.opacity = (0.4 + Math.random() * 0.6);
    if (Math.random() > 0.7) {
      p.style.background = '#ffffff';
      p.style.boxShadow = '0 0 6px #fff, 0 0 12px rgba(255,255,255,0.5)';
    }
    wrap.appendChild(p);
  }
}

function startSplashAnim(done) {
  spawnSplashParticles();
  const tagEl = document.getElementById('splashTagline');
  const fillEl = document.getElementById('splashProgressFill');
  const statusEl = document.getElementById('splashStatus');
  const percentEl = document.getElementById('splashPercent');

  let tagIdx = 0;
  const tagInterval = setInterval(() => {
    if (!tagEl) return;
    tagEl.classList.add('fade');
    setTimeout(() => {
      tagIdx = (tagIdx + 1) % SPLASH_TAGLINES.length;
      tagEl.textContent = SPLASH_TAGLINES[tagIdx];
      tagEl.classList.remove('fade');
    }, 350);
  }, 1600);

  const totalDuration = 1900;
  const startTime = Date.now();
  let lastStage = -1;

  const tick = () => {
    const elapsed = Date.now() - startTime;
    const raw = Math.min(100, (elapsed / totalDuration) * 100);
    const eased = 100 * (1 - Math.pow(1 - raw / 100, 3));
    if (fillEl) fillEl.style.width = eased + '%';
    if (percentEl) percentEl.textContent = Math.floor(eased) + '%';

    for (let i = SPLASH_STAGES.length - 1; i >= 0; i--) {
      if (eased >= SPLASH_STAGES[i].at && lastStage < i) {
        lastStage = i;
        if (statusEl) statusEl.textContent = SPLASH_STAGES[i].status;
        break;
      }
    }

    if (raw < 100) requestAnimationFrame(tick);
    else { clearInterval(tagInterval); setTimeout(done, 320); }
  };
  requestAnimationFrame(tick);
}

// ==================== INIT ====================
window.addEventListener('DOMContentLoaded', () => {
  applyAllSettings();
  initTelegram();
  bindAllOnclicks();
  autoCreateUser();

  startSplashAnim(() => {
    const splash = document.getElementById('splash');
    if (splash) splash.classList.add('hide');
    setTimeout(() => {
      splash?.remove();
      enterApp();
      // Показ онбординга после сплэша
      setTimeout(() => {
        if (!Storage.get('onboarded', false)) showOnboarding();
      }, 400);
    }, 600);
  });

  startPromoTimer();
  startOnlineTicker();
  startLogoJump();
  renderLiveFeed();
  renderReviewsMini();
  renderSaleCard();
  bindAllListeners();
  setupBackButton();
  setupEyeButton();
  checkDailyBonusBadge();
  updateDaysOnMarket();
});

function autoCreateUser() {
  if (state.currentUser && state.currentUser.firstName) return;
  const tg = state.tgUser;
  const username = tg?.username || tg?.first_name || 'desired';
  const firstName = tg?.first_name || username;
  state.currentUser = {
    username: username,
    firstName: firstName,
    tgId: tg?.id || null,
    createdAt: state.currentUser?.createdAt || Date.now()
  };
  Storage.set('currentUser', state.currentUser);
}

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

function bindAllOnclicks() {
  document.querySelectorAll('[onclick]').forEach(el => {
    const code = el.getAttribute('onclick');
    el.removeAttribute('onclick');
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      try { new Function(code).call(el, e); } catch (err) { console.error('onclick error:', err, 'code:', code); }
    });
  });
}

// ==================== ONBOARDING ====================
let onbSlide = 0;
function showOnboarding() {
  const el = document.getElementById('onboarding');
  if (!el) return;
  el.classList.remove('hidden');
  onbSlide = 0;
  updateOnbSlide();
}
function updateOnbSlide() {
  document.querySelectorAll('.onb2-slide').forEach(s => s.classList.toggle('active', +s.dataset.slide === onbSlide));
  document.querySelectorAll('.onb2-dot').forEach(d => d.classList.toggle('active', +d.dataset.dot === onbSlide));
  const nextBtn = document.getElementById('onbNext');
  if (nextBtn) nextBtn.textContent = onbSlide === 2 ? 'Поехали!' : 'Дальше';
}
function onbNext() {
  if (onbSlide < 2) {
    onbSlide++;
    updateOnbSlide();
    haptic('light');
  } else {
    closeOnboarding();
  }
}
function onbSkip() { closeOnboarding(); }
function closeOnboarding() {
  const el = document.getElementById('onboarding');
  if (el) el.classList.add('hidden');
  Storage.set('onboarded', true);
  state.onboarded = true;
  haptic('medium');
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

  const r = Storage.get('radius', 'pill');
  const rmap = { sharp: '8px', default: '20px', round: '28px', pill: '40px' };
  const rval = rmap[r] || rmap.pill;
  document.body.style.setProperty('--radius', rval);
  document.body.style.setProperty('--radius-sm', `calc(${rval} - 8px)`);
  document.body.style.setProperty('--radius-lg', `calc(${rval} + 8px)`);

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
  setV('radiusSelect', Storage.get('radius', 'pill'));
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

// ==================== ENTER APP ====================
function enterApp() {
  document.getElementById('app')?.classList.remove('hidden');
  updateProfileUI();
  renderProducts();
  renderRecent();
  renderPackages();
  renderReviewsMini();
  renderReviews();
  renderFAQ();
  renderInfo();
  renderTransactions();
  renderOrders();
  renderInventory();
  renderFavoritesFull();
  renderRefLink();
  renderCart();
  renderCartBadge();
  renderAchievements();
  renderLeaderboard('buyers');
  renderChangelog();
  renderLiveFeed();
  renderSaleCard();
  renderTickets();
  renderAIChat();
  updateHello();
  checkLoyalty();
  checkAchievements();
  moveCatalogSlider();
  routeFromHash();
  updateBackButton();
  updateDaysOnMarket();
}

function updateHello() {
  const el = document.getElementById('helloText');
  const sub = document.getElementById('helloSub');
  if (!el) return;
  const name = state.tgUser?.first_name || state.currentUser?.firstName || state.currentUser?.username || 'друг';
  el.innerHTML = `Приветствую, ${escapeHtml(name)} <svg class="hello-wave" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11.5V14a5 5 0 0 0 5 5h0a5 5 0 0 0 5-5V5.5a1.5 1.5 0 0 0-3 0V11"/><path d="M11 5.5V11"/><path d="M14.5 5.5V11"/><path d="M4 11.5V14a8 8 0 0 0 8 8h0a8 8 0 0 0 8-8V5.5a1.5 1.5 0 0 0-3 0"/></svg>`;
  if (sub) sub.textContent = 'Удачных покупок!';
}

function updateProfileUI() {
  const username = state.currentUser?.username || 'user';
  const firstName = state.tgUser?.first_name || state.currentUser?.firstName || username;
  const tgId = state.tgUser?.id || state.currentUser?.tgId || '—';
  const setT = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setT('userName', firstName);
  setT('userId', '@id' + tgId);
  const avatarEl = document.getElementById('userAvatar');
  if (avatarEl) avatarEl.textContent = firstName[0]?.toUpperCase() || 'd';
  updateBalanceDisplay();
  setT('profileBalance', formatBalance(Storage.get('balance', 0)));
  setT('statTopUp', state.stats.topUp + '₽');
  setT('statSpent', state.stats.spent + '₽');
  setT('statPoints', state.points);
  setT('statOrders', state.stats.orders);
  updateHello();
}

function updateBalanceDisplay() {
  const el = document.getElementById('topBalance');
  if (!el) return;
  if (state.hideBalance) el.textContent = '••••₽';
  else el.textContent = Storage.get('balance', 0) + '₽';
}

function formatBalance(n) {
  if (state.hideBalance) return '••••₽';
  return n + '₽';
}

function setupEyeButton() {
  const btn = document.getElementById('eyeBtn');
  if (!btn) return;
  const open = btn.querySelector('.eye-open');
  const closed = btn.querySelector('.eye-closed');
  const update = () => {
    if (state.hideBalance) {
      open?.classList.add('hidden');
      closed?.classList.remove('hidden');
    } else {
      open?.classList.remove('hidden');
      closed?.classList.add('hidden');
    }
    updateBalanceDisplay();
    const pb = document.getElementById('profileBalance');
    if (pb) pb.textContent = formatBalance(Storage.get('balance', 0));
  };
  update();
  btn.addEventListener('click', () => {
    state.hideBalance = !state.hideBalance;
    Storage.set('hideBalance', state.hideBalance);
    update();
    haptic('light');
  });
}

function updateDaysOnMarket() {
  const el = document.getElementById('daysOnMarket');
  if (!el) return;
  const created = state.currentUser?.createdAt || Date.now();
  const days = Math.max(0, Math.floor((Date.now() - created) / 86400000));
  el.textContent = days;
}

// ==================== NAV ====================
function go(page) {
  const current = document.querySelector('.page.active');
  const currentId = current?.id?.replace('page-', '');
  if (currentId && currentId !== page) {
    state.navStack.push(currentId);
    if (state.navStack.length > 30) state.navStack.shift();
  }
  if (!document.getElementById('page-' + page)) {
    page = '404';
  }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page)?.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === page));
  location.hash = page;
  window.scrollTo(0, 0);
  haptic('light');
  closeDropdown();
  updateBackButton();
}

function goBack() {
  const prev = state.navStack.pop();
  if (prev && document.getElementById('page-' + prev)) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + prev).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === prev));
    location.hash = prev;
    window.scrollTo(0, 0);
    haptic('light');
    updateBackButton();
  } else {
    go('main');
  }
}

function updateBackButton() {
  const btn = document.getElementById('backBtn');
  const activePage = document.querySelector('.page.active');
  const id = activePage?.id?.replace('page-', '');
  if (!btn) return;
  if (id && id !== 'main') btn.classList.remove('hidden');
  else btn.classList.add('hidden');
}

function setupBackButton() {
  const btn = document.getElementById('backBtn');
  btn?.addEventListener('click', () => { haptic('light'); goBack(); });
}

function routeFromHash() {
  const h = location.hash.replace('#', '');
  if (h && document.getElementById('page-' + h)) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + h).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === h));
    updateBackButton();
  }
}

function closeDropdown() { document.getElementById('dropdownMenu')?.classList.remove('show'); }

// ==================== LOGO JUMP ====================
function startLogoJump() {
  const brand = document.getElementById('brandLogo');
  if (!brand) return;
  setInterval(() => {
    if (document.hidden) return;
    brand.classList.add('jump');
    setTimeout(() => brand.classList.remove('jump'), 600);
  }, 2000);
}

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
  openModal('modalFilters');
}

function applyFilters() {
  state.filters.priceMin = +document.getElementById('filterPriceMin').value || 0;
  state.filters.priceMax = +document.getElementById('filterPriceMax').value || 0;
  state.filters.sort = document.getElementById('filterSort').value;
  state.filters.hit = document.getElementById('filterHit').checked;
  state.filters.isNew = document.getElementById('filterNew').checked;
  state.filters.sale = document.getElementById('filterSale').checked;
  closeModal('modalFilters');
  renderProducts();
  updateFilterBadge();
  toast('Фильтры применены', 'success');
}

function resetFilters() {
  state.filters = { priceMin: 0, priceMax: 0, sort: 'popular', hit: false, isNew: false, sale: false };
  ['filterPriceMin','filterPriceMax'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  ['filterHit','filterNew','filterSale'].forEach(id => { const el = document.getElementById(id); if (el) el.checked = false; });
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
  const badge = document.getElementById('filterBadge');
  if (!badge) return;
  if (count > 0) { badge.textContent = count; badge.classList.remove('hidden'); }
  else badge.classList.add('hidden');
}

// ==================== CATALOG TABS ====================
function moveCatalogSlider() {
  const slider = document.getElementById('catalogTabSlider');
  if (!slider) return;
  if (state.catalogTab === 'stars') slider.classList.add('right');
  else slider.classList.remove('right');
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
  if (title) title.textContent = `${p.flag} ${p.name}`;
  if (sub) sub.textContent = p.sub;
  if (price) price.textContent = `${p.price}₽`;
}

function openSaleProduct() {
  const p = getSaleProduct();
  if (p) openProduct(p.id);
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

function setSearch(q) {
  const input = document.getElementById('searchInput');
  if (input) input.value = q;
  searchQuery = q;
  renderProducts();
  document.getElementById('searchHistory')?.classList.add('hidden');
}

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
    if (state.quickFilter === 'top') items = items.filter(p => p.rating >= 4.8);

    if (state.filters.priceMin) items = items.filter(p => p.price >= state.filters.priceMin);
    if (state.filters.priceMax) items = items.filter(p => p.price <= state.filters.priceMax);
    if (state.filters.hit) items = items.filter(p => p.badge === 'ХИТ');
    if (state.filters.isNew) items = items.filter(p => p.badge === 'NEW');
    if (state.filters.sale) items = items.filter(p => p.oldPrice);

    const s = state.filters.sort;
    if (s === 'cheap') items.sort((a,b) => a.price - b.price);
    else if (s === 'expensive') items.sort((a,b) => b.price - a.price);
    else if (s === 'rating') items.sort((a,b) => b.rating - a.rating);
    else if (s === 'new') items.sort((a,b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0));

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
        <button class="product-fav ${isFav ? 'active' : ''}" data-fav="${p.id}" aria-label="В избранное">
          <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
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
    <div style="display:flex;gap:10px;justify-content:center;margin-bottom:16px;flex-wrap:wrap;">
      <div class="product-tag">⚡ Автовыдача</div>
      <div class="product-tag">🛡 Гарантия 24ч</div>
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

// ==================== FAVORITES ====================
function toggleFav(id) {
  const i = state.favorites.indexOf(id);
  if (i >= 0) state.favorites.splice(i, 1);
  else state.favorites.push(id);
  Storage.set('favorites', state.favorites);
  // Плавная анимация — не рендерим весь список, а обновляем кнопки на месте
  document.querySelectorAll(`[data-fav="${id}"]`).forEach(btn => {
    const active = state.favorites.includes(id);
    btn.classList.toggle('active', active);
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', active ? 'currentColor' : 'none');
  });
  renderFavoritesFull();
  haptic('light');
  checkAchievements();
}

function renderFavoritesFull() {
  const list = document.getElementById('favListFull');
  const empty = document.getElementById('favEmptyFull');
  if (!list) return;
  if (!state.favorites.length) { list.innerHTML = ''; empty?.classList.remove('hidden'); return; }
  empty?.classList.add('hidden');
  const items = state.favorites.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  list.innerHTML = items.map(p => `
    <div class="fav-full-item">
      <div class="ffi-info">
        <span class="ffi-flag">${p.flag}</span>
        <div class="ffi-text">
          <div class="ffi-name">${escapeHtml(p.name)}</div>
          <div class="ffi-price">${p.price}₽</div>
        </div>
      </div>
      <div class="ffi-actions">
        <button class="ffi-btn" data-fav-rm="${p.id}" aria-label="Удалить">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <button class="ffi-btn primary" data-fav-to-cart="${p.id}" aria-label="В корзину">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function addToRecent(id) {
  state.recent = [id, ...state.recent.filter(x => x !== id)].slice(0, 10);
  Storage.set('recent', state.recent);
  renderRecent();
  checkAchievements();
}

function clearRecent() {
  state.recent = [];
  Storage.set('recent', []);
  renderRecent();
  toast('Очищено', 'success');
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

// ==================== PACKAGES ====================
function renderPackages() {
  const el = document.getElementById('packagesList');
  if (!el) return;
  el.innerHTML = PACKAGES.map(pkg => `
    <div class="package">
      <div class="package-info">
        <div class="package-title">${escapeHtml(pkg.title)}</div>
        <div class="package-sub">${escapeHtml(pkg.sub)}</div>
        <div class="package-price-row">
          <div class="package-price">${pkg.price}₽</div>
          <div class="package-old">${pkg.oldPrice}₽</div>
        </div>
      </div>
      <button class="btn btn-primary" data-pkg="${pkg.id}">Взять</button>
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
  updateStepper();
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

function switchCartTab(tab) {
  document.querySelectorAll('.cart-top-tab').forEach(t => t.classList.toggle('active', t.dataset.ctab === tab));
  const cartContent = document.getElementById('cartTabContent');
  const favContent = document.getElementById('favTabContent');
  if (tab === 'fav') {
    cartContent?.classList.add('hidden');
    favContent?.classList.remove('hidden');
    renderFavoritesFull();
  } else {
    favContent?.classList.add('hidden');
    cartContent?.classList.remove('hidden');
  }
}

function applyPromoInCart() { openModal('modalPromo'); }

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

function openPromoModal() { openModal('modalPromo'); }

// ==================== TOPUP ====================
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
  animateBalanceChange();
  toast(`+${amount}₽`, 'success');
  haptic('medium');
}

function animateBalanceChange() {
  const balance = Storage.get('balance', 0);
  const topEl = document.getElementById('topBalance');
  const profEl = document.getElementById('profileBalance');
  if (topEl && !state.hideBalance) animateCounter(topEl, Math.max(0, balance - 100), balance, 500, '₽');
  if (profEl && !state.hideBalance) animateCounter(profEl, Math.max(0, balance - 100), balance, 500, '₽');
}

// ==================== CHECKOUT ====================
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
  const items = [...state.cart];
  state.orders.push({ id: orderId, items, total, status: 'Выдан', date: Date.now() });
  Storage.set('orders', state.orders);

  items.forEach(item => {
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

  items.forEach(item => {
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
  haptic('heavy');
  playSound();

  // Показ экрана "Спасибо за покупку"
  showThanksScreen(orderId, items, total);
}

// ==================== THANKS SCREEN (п.14) ====================
function showThanksScreen(orderId, items, total) {
  const modal = document.getElementById('modalThanks');
  if (!modal) return;

  const idEl = document.getElementById('thanksOrderId');
  const itemsEl = document.getElementById('thanksItems');
  const totalEl = document.getElementById('thanksTotal');
  if (idEl) idEl.textContent = orderId;
  if (totalEl) totalEl.textContent = total + '₽';
  if (itemsEl) {
    itemsEl.innerHTML = items.map(it => `
      <div class="thanks-item">
        <span class="thanks-item-flag">${it.flag}</span>
        <span class="thanks-item-name">${escapeHtml(it.name)}</span>
        <span class="thanks-item-price">${it.price}₽</span>
      </div>
    `).join('');
  }

  // Конфетти
  const confettiEl = document.getElementById('thanksConfetti');
  if (confettiEl) {
    confettiEl.innerHTML = '';
    const colors = ['#ff2d55', '#22c55e', '#fbbf24', '#3b82f6', '#a855f7', '#ff8fa3'];
    for (let i = 0; i < 30; i++) {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      c.style.left = Math.random() * 100 + '%';
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
      c.style.animationDelay = (Math.random() * 0.6) + 's';
      c.style.transform = `rotate(${Math.random() * 360}deg)`;
      confettiEl.appendChild(c);
    }
  }

  openModal('modalThanks');
  haptic('heavy');
}

function thanksGoInventory() {
  closeModal('modalThanks');
  setTimeout(() => go('inventory'), 200);
}

function thanksShare() {
  const text = 'Купил в desired — топовый маркет цифровых товаров! Автовыдача, гарантия, низкие цены 🔥';
  const link = `${BOT_LINK}?start=ref_${state.currentUser?.username || 'user'}`;
  if (navigator.share) navigator.share({ title: 'desired', text, url: link }).catch(()=>{});
  else { navigator.clipboard?.writeText(`${text}\n${link}`); toast('Скопировано', 'success'); }
}

// ==================== STARS / PREMIUM BUY (п.11) ====================
function openStarsBuy(mode) {
  state.msbMode = mode || 'stars';
  state.msbPremiumMonths = 12;
  const modal = document.getElementById('modalStarsBuy');
  if (!modal) return;
  const selfUsername = state.currentUser?.username || '';
  const recInput = document.getElementById('msbRecipient');
  if (recInput) recInput.value = '@' + selfUsername;
  document.querySelectorAll('.msb-toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === state.msbMode));
  updateMSBModeUI();
  openModal('modalStarsBuy');
}

function updateMSBModeUI() {
  const starsBlock = document.getElementById('msbStarsBlock');
  const premBlock = document.getElementById('msbPremiumBlock');
  const modeName = document.getElementById('msbModeName');
  const modeSub = document.getElementById('msbModeSub');
  const buyBtn = document.getElementById('msbBuyBtn');
  if (state.msbMode === 'stars') {
    starsBlock?.classList.remove('hidden');
    premBlock?.classList.add('hidden');
    if (modeName) modeName.textContent = 'Stars';
    if (modeSub) modeSub.textContent = 'Купите себе или друзьям';
    if (buyBtn) buyBtn.textContent = 'Купить Stars';
  } else {
    starsBlock?.classList.add('hidden');
    premBlock?.classList.remove('hidden');
    if (modeName) modeName.textContent = 'Premium';
    if (modeSub) modeSub.textContent = 'Самые низкие цены на рынке';
    if (buyBtn) buyBtn.textContent = `Купить Premium на ${state.msbPremiumMonths} мес · ~${PREMIUM_PRICES[state.msbPremiumMonths]}₽`;
  }
  // Иконка
  const hero = document.getElementById('msbHeroStars');
  if (hero) {
    const big = hero.querySelector('.msb-star-big');
    if (big) big.style.color = state.msbMode === 'stars' ? 'var(--yellow)' : 'var(--accent)';
  }
}

function msbSetSelf() {
  const u = state.currentUser?.username || '';
  const inp = document.getElementById('msbRecipient');
  if (inp) inp.value = '@' + u;
  haptic('light');
}

function msbSetStars(n) {
  const inp = document.getElementById('msbStarsAmount');
  if (inp) inp.value = n;
  haptic('light');
}

function msbSelectPremium(months) {
  state.msbPremiumMonths = months;
  document.querySelectorAll('.msb-prem-opt').forEach(o => o.classList.toggle('active', +o.dataset.months === months));
  updateMSBModeUI();
  haptic('light');
}

function msbBuy() {
  const terms = document.getElementById('msbTerms')?.checked;
  if (!terms) return toast('Прими условия', 'error');
  const recipient = document.getElementById('msbRecipient')?.value.trim();
  if (!recipient) return toast('Укажи получателя', 'error');

  let name = '', price = 0, flag = '⭐';
  if (state.msbMode === 'stars') {
    const amount = +document.getElementById('msbStarsAmount')?.value || 0;
    if (amount < 50) return toast('Минимум 50 звёзд', 'error');
    price = Math.round(amount * STARS_PRICE_PER_STAR);
    name = `Stars ${amount} → ${recipient}`;
  } else {
    const months = state.msbPremiumMonths;
    price = PREMIUM_PRICES[months];
    flag = '💎';
    name = `Premium ${months} мес → ${recipient}`;
  }

  const balance = Storage.get('balance', 0);
  if (balance < price) return toast('Недостаточно средств', 'error');

  Storage.set('balance', balance - price);
  state.stats.spent += price;
  state.stats.orders += 1;
  state.points += Math.round(price * 0.05);
  Storage.set('stats', state.stats);
  Storage.set('points', state.points);

  const orderId = 'ORD' + Date.now();
  state.orders.push({
    id: orderId,
    items: [{ name, flag, price }],
    total: price,
    status: 'Выдан',
    date: Date.now()
  });
  Storage.set('orders', state.orders);

  state.inventory.push({
    id: 'INV' + Date.now() + Math.random().toString(36).slice(2,6),
    orderId,
    name, flag, price,
    status: 'active', guarantee: '24ч', date: Date.now(),
    data: `Получатель: ${recipient}\nТовар: ${name}\nДата: ${new Date().toLocaleString('ru-RU')}`
  });
  Storage.set('inventory', state.inventory);

  state.transactions.unshift({ type: 'out', title: `Заказ ${price}₽`, amount: price, date: Date.now() });
  Storage.set('transactions', state.transactions);

  closeModal('modalStarsBuy');
  updateProfileUI();
  renderOrders();
  renderInventory();
  renderTransactions();
  renderCart();
  checkLoyalty();
  checkAchievements();
  haptic('heavy');
  playSound();

  showThanksScreen(orderId, [{ name, flag, price }], price);
}

// ==================== TRANSACTIONS ====================
function renderTransactions() {
  const list = document.getElementById('txList');
  const empty = document.getElementById('txEmpty');
  if (!list) return;
  let items = [...state.transactions];
  if (state.txFilter === 'in') items = items.filter(t => t.type === 'in');
  if (state.txFilter === 'out') items = items.filter(t => t.type === 'out');
  if (!items.length) { list.innerHTML = ''; empty?.classList.remove('hidden'); return; }
  empty?.classList.add('hidden');
  list.innerHTML = items.map(t => `
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

// ==================== ORDERS ====================
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

// ==================== INVENTORY ====================
function renderInventory() {
  const list = document.getElementById('inventoryList');
  const empty = document.getElementById('inventoryEmpty');
  if (!list) return;
  let items = [...state.inventory];
  if (state.inventoryFilter === 'active') items = items.filter(i => i.status === 'active');
  if (!items.length) { list.innerHTML = ''; empty?.classList.remove('hidden'); return; }
  empty?.classList.add('hidden');
  list.innerHTML = items.map(item => `
    <div class="inv-card">
      <div class="inv-card-head">
        <div class="inv-card-title">${item.flag} ${escapeHtml(item.name)}</div>
        <div class="inv-card-status ${item.status === 'active' ? 'active' : 'history'}">${item.status === 'active' ? '✓ Активен' : 'История'}</div>
      </div>
      <div class="inv-card-body">
        Заказ: ${item.orderId}<br>
        Куплено: ${new Date(item.date).toLocaleString()}<br>
        Гарантия: ${item.guarantee}
      </div>
      <div class="inv-card-actions">
        <button class="inv-action-btn" data-inv-copy="${item.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Данные
        </button>
        <button class="inv-action-btn" data-inv-review="${encodeURIComponent(item.name)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Оценить
        </button>
        <button class="inv-action-btn" data-inv-again="${encodeURIComponent(item.name)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Снова
        </button>
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

// ==================== REVIEWS ====================
function renderReviews() {
  const list = document.getElementById('reviewsList');
  const avg = document.getElementById('reviewAvg');
  const count = document.getElementById('reviewCount');
  if (!list) return;
  let items = [...state.reviews];
  if (state.reviewFilter === '5') items = items.filter(r => r.rating === 5);
  if (state.reviewFilter === '4') items = items.filter(r => r.rating === 4);
  if (state.reviewFilter === '3') items = items.filter(r => r.rating === 3);
  if (avg) avg.textContent = items.length ? (items.reduce((s, r) => s + (r.rating || 5), 0) / items.length).toFixed(1) : '5.0';
  if (count) count.textContent = state.reviews.length;

  // Обновляем распределение
  updateReviewDistribution();

  if (!items.length) { list.innerHTML = '<div style="text-align:center;color:var(--muted);padding:20px;font-size:13px;">Пока нет отзывов</div>'; return; }
  list.innerHTML = items.map(r => {
    const authorName = r.authorName || r.author || 'user';
    const initial = authorName[0].toUpperCase();
    return `
      <div class="review-item">
        <div class="review-head">
          <div class="review-author-wrap">
            <div class="review-avatar">${escapeHtml(initial)}</div>
            <div>
              <div class="review-author-name">${escapeHtml(authorName)}</div>
              <div class="review-author-sub">Покупатель</div>
            </div>
          </div>
          <div class="review-date">${new Date(r.date).toLocaleDateString()}</div>
        </div>
        <div class="review-stars-row">
          ${'<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'.repeat(r.rating || 5)}
        </div>
        <div class="review-text">${escapeHtml(r.text)}</div>
      </div>
    `;
  }).join('');
}

function updateReviewDistribution() {
  const total = state.reviews.length || 1;
  const counts = [0,0,0,0,0];
  state.reviews.forEach(r => { if (r.rating >= 1 && r.rating <= 5) counts[r.rating-1]++; });
  [1,2,3,4,5].forEach(star => {
    const bar = document.querySelector(`.rev-stat-fill[data-bar="${star}"]`);
    const percentEl = bar?.parentElement?.parentElement?.querySelector('.rev-stat-percent');
    const pct = Math.round((counts[star-1] / total) * 100);
    if (bar) bar.style.width = pct + '%';
    if (percentEl) percentEl.textContent = pct + '%';
  });
}

function renderReviewsMini() {
  const el = document.getElementById('reviewsMini');
  if (!el) return;
  const items = state.reviews.slice(0, 3);
  if (!items.length) { el.innerHTML = '<div style="text-align:center;color:var(--muted);padding:16px;font-size:13px;">Пока нет отзывов</div>'; return; }
  el.innerHTML = items.map(r => {
    const authorName = r.authorName || r.author || 'user';
    return `
    <div class="review-mini">
      <div class="review-mini-head">
        <span class="review-mini-author">${escapeHtml(authorName)}</span>
        <span class="review-mini-stars">${'★'.repeat(r.rating || 5)}</span>
      </div>
      <div class="review-mini-text">${escapeHtml(r.text).slice(0, 120)}</div>
    </div>`;
  }).join('');
}

function addReview() {
  const text = document.getElementById('reviewText').value.trim();
  if (!text) return toast('Напиши отзыв', 'error');
  const authorName = state.tgUser?.first_name || state.currentUser?.firstName || 'user';
  state.reviews.unshift({
    author: state.currentUser?.username || 'user',
    authorName: authorName,
    text,
    rating: state.reviewRating,
    date: Date.now()
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

function scrollToReviewForm() {
  const el = document.getElementById('reviewFormAnchor');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ==================== FAQ (п.7) ====================
function renderFAQ() {
  const el = document.getElementById('faqList');
  if (!el) return;
  const q = document.getElementById('faqSearch')?.value?.toLowerCase().trim() || '';
  let filtered = FAQ;
  if (state.faqCat !== 'all') filtered = filtered.filter(f => f.cat === state.faqCat);
  if (q) filtered = filtered.filter(f =>
    f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
  );

  if (!filtered.length) {
    el.innerHTML = '<div style="text-align:center;color:var(--muted);padding:20px;">Ничего не найдено</div>';
    return;
  }

  el.innerHTML = filtered.map(f => {
    let qHtml = escapeHtml(f.q);
    let aHtml = escapeHtml(f.a);
    if (q) {
      const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      qHtml = qHtml.replace(re, '<mark>$1</mark>');
      aHtml = aHtml.replace(re, '<mark>$1</mark>');
    }
    return `
      <div class="faq-item" data-faq>
        <div class="faq-q">${qHtml}<span>▾</span></div>
        <div class="faq-a">${aHtml}</div>
      </div>
    `;
  }).join('');
}

// ==================== INFO ====================
function renderInfo() {
  const el = document.getElementById('infoList');
  if (!el) return;
  el.innerHTML = INFO_ITEMS.map(f => `
    <div class="faq-item" data-faq>
      <div class="faq-q">${escapeHtml(f.q)}<span>▾</span></div>
      <div class="faq-a">${escapeHtml(f.a)}</div>
    </div>
  `).join('');
}

// ==================== SUPPORT: TICKETS (п.2) ====================
function renderTickets() {
  const list = document.getElementById('ticketsList');
  const empty = document.getElementById('ticketsEmpty');
  const countEl = document.getElementById('ticketsCount');
  if (countEl) countEl.textContent = state.tickets.length;
  if (!list) return;
  if (!state.tickets.length) { list.innerHTML = ''; empty?.classList.remove('hidden'); return; }
  empty?.classList.add('hidden');
  list.innerHTML = state.tickets.slice().reverse().map(t => {
    const lastMsg = t.messages[t.messages.length - 1];
    const statusClass = {
      open: 'ticket-status-open',
      progress: 'ticket-status-progress',
      answered: 'ticket-status-answered',
      closed: 'ticket-status-closed'
    }[t.status] || 'ticket-status-open';
    const statusLabel = {
      open: 'Открыт',
      progress: 'В работе',
      answered: 'Ответ админа',
      closed: 'Закрыт'
    }[t.status] || 'Открыт';
    return `
      <div class="ticket-item" data-ticket-open="${t.id}">
        <div class="ticket-item-head">
          <div class="ticket-item-subject">${escapeHtml(t.subject)}</div>
          <div class="ticket-item-status ${statusClass}">${statusLabel}</div>
        </div>
        <div class="ticket-item-meta">
          <span>${escapeHtml(t.categoryLabel)}</span>
          <span>${new Date(t.date).toLocaleDateString()}</span>
        </div>
        ${lastMsg ? `<div class="ticket-item-preview">${escapeHtml(lastMsg.text).slice(0, 60)}</div>` : ''}
      </div>
    `;
  }).join('');
}

const TICKET_CATEGORIES = {
  order: 'Проблема с заказом',
  payment: 'Проблема с оплатой',
  product: 'Товар не работает',
  refund: 'Возврат средств',
  other: 'Другое'
};

function openNewTicket() {
  document.getElementById('ticketCategory').value = 'order';
  document.getElementById('ticketSubject').value = '';
  document.getElementById('ticketMessage').value = '';
  openModal('modalNewTicket');
}

function submitNewTicket() {
  const category = document.getElementById('ticketCategory').value;
  const subject = document.getElementById('ticketSubject').value.trim();
  const message = document.getElementById('ticketMessage').value.trim();
  if (!subject) return toast('Укажи тему', 'error');
  if (!message) return toast('Опиши проблему', 'error');

  const ticket = {
    id: 'TCK' + Date.now(),
    category,
    categoryLabel: TICKET_CATEGORIES[category] || 'Другое',
    subject,
    status: 'open',
    date: Date.now(),
    messages: [
      { role: 'user', text: message, date: Date.now() }
    ]
  };
  state.tickets.push(ticket);
  Storage.set('tickets', state.tickets);
  closeModal('modalNewTicket');
  renderTickets();
  toast('Тикет создан', 'success');
  haptic('medium');

  // Авто-ответ от админа через 2 сек (мок)
  setTimeout(() => {
    ticket.messages.push({
      role: 'admin',
      text: 'Привет! Тикет принят в работу. Ответим в течение 15 минут. А пока можешь описать подробнее, если что-то забыл.',
      date: Date.now()
    });
    ticket.status = 'answered';
    Storage.set('tickets', state.tickets);
    renderTickets();
    if (state.currentTicketId === ticket.id) renderTicketView(ticket.id);
  }, 2000);
}

function openTicketView(id) {
  state.currentTicketId = id;
  renderTicketView(id);
  openModal('modalTicketView');
}

function renderTicketView(id) {
  const t = state.tickets.find(x => x.id === id);
  if (!t) return;
  const subjectEl = document.getElementById('tvSubject');
  const statusEl = document.getElementById('tvStatus');
  const dateEl = document.getElementById('tvDate');
  const msgsEl = document.getElementById('ticketMessages');
  if (subjectEl) subjectEl.textContent = t.subject;
  if (statusEl) {
    statusEl.className = 'tvh-status ' + ({
      open: 'ticket-status-open',
      progress: 'ticket-status-progress',
      answered: 'ticket-status-answered',
      closed: 'ticket-status-closed'
    }[t.status] || 'ticket-status-open');
    statusEl.textContent = {
      open: 'Открыт',
      progress: 'В работе',
      answered: 'Ответ админа',
      closed: 'Закрыт'
    }[t.status] || 'Открыт';
  }
  if (dateEl) dateEl.textContent = new Date(t.date).toLocaleString('ru-RU');
  if (msgsEl) {
    msgsEl.innerHTML = t.messages.map(m => `
      <div class="tmsg ${m.role}">
        ${escapeHtml(m.text)}
        <span class="tmsg-meta">${new Date(m.date).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})}</span>
      </div>
    `).join('');
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }
}

function sendTicketReply() {
  const inp = document.getElementById('ticketReplyText');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text) return;
  const t = state.tickets.find(x => x.id === state.currentTicketId);
  if (!t) return;
  t.messages.push({ role: 'user', text, date: Date.now() });
  t.status = 'progress';
  Storage.set('tickets', state.tickets);
  inp.value = '';
  renderTicketView(t.id);
  renderTickets();
  haptic('light');

  // Авто-ответ (мок)
  setTimeout(() => {
    t.messages.push({
      role: 'admin',
      text: 'Принял, сейчас разберусь. Дай пару минут 👌',
      date: Date.now()
    });
    t.status = 'answered';
    Storage.set('tickets', state.tickets);
    renderTicketView(t.id);
    renderTickets();
  }, 2500);
}

function contactSupportDirect() {
  window.open(DIRECT_CONTACT, '_blank');
}

function scrollToPopularQuestions() {
  document.getElementById('supportPopular')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ==================== SUPPORT: AI CHAT (п.13) ====================
function openAIChat(prefillText) {
  openModal('modalAIChat');
  renderAIChat();
  if (prefillText) {
    setTimeout(() => aicSendText(prefillText), 300);
  } else {
    setTimeout(() => {
      const inp = document.getElementById('aicInput');
      inp?.focus();
    }, 300);
  }
}

function renderAIChat() {
  const el = document.getElementById('aicMessages');
  if (!el) return;
  if (!state.aiChat.length) {
    state.aiChat.push({
      role: 'ai',
      text: 'Привет! Я ИИ-консультант desired. Помогу с заказами, оплатой, возвратом, товарами. Что интересует?',
      date: Date.now()
    });
    Storage.set('aiChat', state.aiChat);
  }
  el.innerHTML = state.aiChat.map(m => `
    <div class="aic-msg ${m.role}">${escapeHtml(m.text)}</div>
  `).join('');
  el.scrollTop = el.scrollHeight;
}

function aicQuickSend(text) {
  aicSendText(text);
}

function aicSend() {
  const inp = document.getElementById('aicInput');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  aicSendText(text);
}

function aicSendText(text) {
  if (!text) return;
  state.aiChat.push({ role: 'user', text, date: Date.now() });
  Storage.set('aiChat', state.aiChat);
  renderAIChat();
  haptic('light');

  // Показ "печатает"
  const el = document.getElementById('aicMessages');
  if (el) {
    const typing = document.createElement('div');
    typing.className = 'aic-typing';
    typing.id = 'aicTyping';
    typing.innerHTML = '<span></span><span></span><span></span>';
    el.appendChild(typing);
    el.scrollTop = el.scrollHeight;
  }

  // Ответ через 900-1500мс
  setTimeout(() => {
    document.getElementById('aicTyping')?.remove();
    const answer = getAIResponse(text);
    state.aiChat.push({ role: 'ai', text: answer, date: Date.now() });
    Storage.set('aiChat', state.aiChat);
    renderAIChat();
    haptic('light');
  }, 900 + Math.random() * 600);
}

function requestHumanAdmin() {
  // Уведомление юзеру
  state.aiChat.push({
    role: 'system',
    text: '📣 Запрос отправлен администратору. Ожидай ответа в разделе «Поддержка» или напиши напрямую.',
    date: Date.now()
  });
  Storage.set('aiChat', state.aiChat);
  renderAIChat();
  toast('Админ уведомлён', 'success');
  haptic('medium');

  // Через 1.5 сек предлагаем написать напрямую
  setTimeout(() => {
    state.aiChat.push({
      role: 'ai',
      text: `Если срочно — напиши админу напрямую: t.me/id912559442. Или создай тикет в разделе «Поддержка».`,
      date: Date.now()
    });
    Storage.set('aiChat', state.aiChat);
    renderAIChat();
  }, 1500);
}

// ==================== LOYALTY v2 (п.8) ====================
function getCashbackPercent() {
  const s = state.stats.spent;
  if (s >= 50000) return 12;
  if (s >= 20000) return 8;
  if (s >= 5000) return 5;
  return 3;
}

function getLoyaltyLevel() {
  const s = state.stats.spent;
  const o = state.stats.orders;
  if (s >= 50000 || o >= 100) return { name: 'Platinum', icon: '💎', key: 'platinum' };
  if (s >= 20000 || o >= 25) return { name: 'Gold', icon: '🥇', key: 'gold' };
  if (s >= 5000 || o >= 5) return { name: 'Silver', icon: '🥈', key: 'silver' };
  return { name: 'Bronze', icon: '🥉', key: 'bronze' };
}

function checkLoyalty() {
  const level = getLoyaltyLevel();
  const badge = document.getElementById('loyaltyBadge');
  const fill = document.getElementById('loyaltyFill');
  const text = document.getElementById('loyaltyProgressText');
  if (!badge) return;
  badge.textContent = `${level.icon} ${level.name}`;

  const th = [0, 5000, 20000, 50000];
  const next = th.find(t => t > state.stats.spent) || 50000;
  const prev = th.filter(t => t <= state.stats.spent).pop() || 0;
  const progress = next === prev ? 100 : Math.min(100, ((state.stats.spent - prev) / (next - prev)) * 100);
  if (fill) fill.style.width = progress + '%';

  const remaining = Math.max(0, next - state.stats.spent);
  const nextName = next === 50000 ? 'Platinum' : next === 20000 ? 'Gold' : next === 5000 ? 'Silver' : 'Silver';
  if (text) {
    if (state.stats.spent >= 50000) text.textContent = 'Максимальный уровень достигнут 👑';
    else text.textContent = `До ${nextName}: ${remaining}₽ или ${Math.max(0, (next === 5000 ? 5 : next === 20000 ? 25 : 100) - state.stats.orders)} покупок`;
  }

  // Подсветка рангов на дорожке
  const rankKeys = ['bronze', 'silver', 'gold', 'platinum'];
  const currentIdx = rankKeys.indexOf(level.key);
  document.querySelectorAll('.lv2-rank').forEach((r, i) => {
    r.classList.toggle('achieved', i <= currentIdx);
    r.classList.toggle('current', i === currentIdx);
  });

  state.loyaltyLevel = level.key;
}

function openLoyaltyInfo() { openModal('modalLoyaltyInfo'); }

// ==================== ACHIEVEMENTS ====================
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
  check('loyal', ['gold', 'platinum'].includes(state.loyaltyLevel));
  check('favorite', state.favorites.length >= 5);
  check('explorer', state.recent.length >= 10);
  check('case_hunter', state.caseSpins >= 5);
  check('daily_master', state.dailyBonus.streak >= 7);
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
  const unlocked = document.getElementById('achUnlocked');
  const total = document.getElementById('achTotal');
  const fill = document.getElementById('achProgressFill');
  if (unlocked) unlocked.textContent = state.achievements.length;
  if (total) total.textContent = ACHIEVEMENTS.length;
  if (fill) fill.style.width = (state.achievements.length / ACHIEVEMENTS.length * 100) + '%';
}

// ==================== LEADERBOARD (п.10) ====================
function renderLeaderboard(type) {
  const el = document.getElementById('lbList');
  if (!el) return;
  const userFirstName = state.tgUser?.first_name || state.currentUser?.firstName || 'you';
  const buyers = [
    { name: 'whale_king', val: 287 },
    { name: 'bulk_buyer', val: 194 },
    { name: 'trader_pro', val: 156 },
    { name: 'reseller', val: 98 },
    { name: 'active_user', val: 67 },
    { name: userFirstName, val: state.stats.orders || 0 },
    { name: 'newbie', val: 3 }
  ].sort((a,b) => b.val - a.val).slice(0, 10);
  const refs = [
    { name: 'referrer_pro', val: 145 },
    { name: 'invite_king', val: 98 },
    { name: 'network', val: 76 },
    { name: 'ambassador', val: 42 },
    { name: userFirstName, val: state.achievements.length }
  ].sort((a,b) => b.val - a.val).slice(0, 10);
  const data = type === 'buyers' ? buyers : refs;
  el.innerHTML = data.map((d, i) => `
    <div class="lb-item ${i < 3 ? 'top' + (i+1) : ''}">
      <div class="lb-rank">${i + 1}</div>
      <div class="lb-name">${escapeHtml(d.name)}</div>
      <div class="lb-value">${d.val}</div>
    </div>
  `).join('');
}

// ==================== CHANGELOG ====================
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

function animateCounter(el, from, to, duration, suffix) {
  if (!el) return;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = Math.round(from + (to - from) * eased);
    el.textContent = val.toLocaleString('ru-RU') + (suffix || '');
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function startOnlineTicker() {
  setInterval(() => {
    const prev = state.onlineCount;
    state.onlineCount += Math.floor(Math.random() * 7) - 3;
    if (state.onlineCount < 1000) state.onlineCount = 1000;
    state.soldToday += Math.random() > 0.7 ? 1 : 0;
    const a = document.getElementById('statOnline');
    if (a) animateCounter(a, prev, state.onlineCount, 600, '');
    const b = document.getElementById('statSoldToday');
    if (b) b.textContent = state.soldToday;
  }, 5000);
}

// ==================== TIMER (реальный до конца суток) ====================
function startPromoTimer() {
  const el = document.getElementById('promoTimer');
  if (!el) return;
  const tick = () => {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    let diff = Math.max(0, end - now);
    const h = String(Math.floor(diff / 3600000)).padStart(2,'0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
    el.textContent = `${h}:${m}:${s}`;
  };
  tick();
  setInterval(tick, 1000);
}

// ==================== DAILY BONUS ====================
function checkDailyBonusBadge() {
  const badge = document.getElementById('qaBonusBadge');
  if (!badge) return;
  const today = new Date().setHours(0,0,0,0);
  const last = state.dailyBonus.lastClaim || 0;
  if (last < today) badge.classList.remove('hidden');
  else badge.classList.add('hidden');
}

function openDailyBonus() {
  updateBonusUI();
  openModal('modalDailyBonus');
}

function updateBonusUI() {
  const today = new Date().setHours(0,0,0,0);
  const last = state.dailyBonus.lastClaim || 0;
  const alreadyClaimedToday = last >= today;
  const streak = state.dailyBonus.streak || 0;
  const btn = document.getElementById('bonusClaimBtn');
  const sub = document.getElementById('bonusSub');

  document.querySelectorAll('.bonus-day').forEach(d => {
    const day = +d.dataset.day;
    d.classList.remove('claimed', 'today');
    if (day <= streak) d.classList.add('claimed');
    else if (day === streak + 1 && !alreadyClaimedToday) d.classList.add('today');
  });

  if (btn) {
    if (alreadyClaimedToday) {
      btn.disabled = true;
      btn.textContent = 'Уже забрано сегодня';
    } else {
      btn.disabled = false;
      const nextDay = Math.min(7, (streak % 7) + 1);
      const amount = BONUS_AMOUNTS[nextDay - 1];
      btn.textContent = `Забрать +${amount}₽`;
    }
  }
  if (sub) {
    sub.textContent = `Стрик: ${streak} дн. · Следующий бонус на 7-й день: +50₽`;
  }
}

function claimBonus() {
  const today = new Date().setHours(0,0,0,0);
  const last = state.dailyBonus.lastClaim || 0;
  if (last >= today) return toast('Уже забрано сегодня', 'error');

  const yesterday = today - 86400000;
  let streak = state.dailyBonus.streak || 0;
  if (last >= yesterday && last < today) streak = Math.min(7, streak + 1);
  else streak = 1;

  const dayIdx = Math.min(6, streak - 1);
  const amount = BONUS_AMOUNTS[dayIdx];

  Storage.set('balance', Storage.get('balance', 0) + amount);
  state.dailyBonus = { lastClaim: Date.now(), streak };
  Storage.set('dailyBonus', state.dailyBonus);
  state.transactions.unshift({ type: 'in', title: `Бонус (день ${streak})`, amount, date: Date.now() });
  Storage.set('transactions', state.transactions);

  updateProfileUI();
  renderTransactions();
  updateBonusUI();
  checkDailyBonusBadge();
  checkAchievements();
  animateBalanceChange();
  toast(`+${amount}₽ бонус!`, 'success');
  haptic('heavy');
  playSound();
}

// ==================== CASE (рулетка) ====================
const CASE_PRIZES = [
  { label: '+10₽', value: 10, type: 'balance', weight: 40 },
  { label: '+50₽', value: 50, type: 'balance', weight: 25 },
  { label: '+100₽', value: 100, type: 'balance', weight: 15 },
  { label: '+10₽', value: 10, type: 'balance', weight: 8 },
  { label: '🇺🇸 США', value: 0, type: 'product', productId: 1, weight: 6 },
  { label: '+50₽', value: 50, type: 'balance', weight: 3 },
  { label: '+250₽', value: 250, type: 'balance', weight: 2 },
  { label: '💎 Premium 12м', value: 0, type: 'premium', months: 12, weight: 1 }
];

function openCase() {
  const resEl = document.getElementById('caseResult');
  if (resEl) resEl.textContent = '';
  const btn = document.getElementById('caseBtn');
  if (btn) {
    const balance = Storage.get('balance', 0);
    btn.disabled = balance < CASE_PRICE;
    btn.textContent = balance < CASE_PRICE ? 'Недостаточно средств' : `Крутить за ${CASE_PRICE}₽`;
  }
  openModal('modalCase');
}

function spinCase() {
  const balance = Storage.get('balance', 0);
  if (balance < CASE_PRICE) return toast('Недостаточно средств', 'error');

  Storage.set('balance', balance - CASE_PRICE);
  state.stats.spent += CASE_PRICE;
  Storage.set('stats', state.stats);
  state.caseSpins = (state.caseSpins || 0) + 1;
  Storage.set('caseSpins', state.caseSpins);

  state.transactions.unshift({ type: 'out', title: 'Крутка кейса', amount: CASE_PRICE, date: Date.now() });
  Storage.set('transactions', state.transactions);

  // Взвешенный рандом
  const totalWeight = CASE_PRIZES.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * totalWeight;
  let prize = CASE_PRIZES[0];
  for (const p of CASE_PRIZES) {
    if (r < p.weight) { prize = p; break; }
    r -= p.weight;
  }

  // Индекс приза в визуальном массиве (8 элементов)
  const visualIdx = CASE_PRIZES.findIndex(p => p === prize);
  const sliceAngle = 360 / 8;
  const targetAngle = 360 * 5 + (360 - visualIdx * sliceAngle - sliceAngle / 2);
  const wheel = document.getElementById('caseWheel');
  if (wheel) {
    wheel.style.transform = `rotate(${targetAngle}deg)`;
  }

  const btn = document.getElementById('caseBtn');
  if (btn) btn.disabled = true;
  const resEl = document.getElementById('caseResult');
  if (resEl) resEl.textContent = 'Крутим...';

  haptic('heavy');

  setTimeout(() => {
    // Начисление приза
    let resultText = '';
    if (prize.type === 'balance') {
      Storage.set('balance', Storage.get('balance', 0) + prize.value);
      state.transactions.unshift({ type: 'in', title: `Кейс: +${prize.value}₽`, amount: prize.value, date: Date.now() });
      Storage.set('transactions', state.transactions);
      resultText = `🎉 Выигрыш: +${prize.value}₽`;
    } else if (prize.type === 'product') {
      const p = PRODUCTS.find(x => x.id === prize.productId);
      const orderId = 'ORD' + Date.now();
      state.orders.push({ id: orderId, items: [{ name: p.name, flag: p.flag, price: 0 }], total: 0, status: 'Выдан (кейс)', date: Date.now() });
      state.inventory.push({
        id: 'INV' + Date.now() + Math.random().toString(36).slice(2,6),
        orderId, name: p.name, flag: p.flag, price: 0,
        status: 'active', guarantee: '24ч', date: Date.now(),
        data: 'Логин: example@user\nПароль: ' + Math.random().toString(36).slice(2, 12)
      });
      Storage.set('orders', state.orders);
      Storage.set('inventory', state.inventory);
      resultText = `🎉 Выигрыш: ${p.flag} ${p.name}! Смотри в инвентаре`;
    } else if (prize.type === 'premium') {
      const orderId = 'ORD' + Date.now();
      state.orders.push({ id: orderId, items: [{ name: 'Premium 12 мес (кейс)', flag: '💎', price: 0 }], total: 0, status: 'Выдан (кейс)', date: Date.now() });
      state.inventory.push({
        id: 'INV' + Date.now() + Math.random().toString(36).slice(2,6),
        orderId, name: 'Premium 12 мес (кейс)', flag: '💎', price: 0,
        status: 'active', guarantee: '24ч', date: Date.now(),
        data: 'Активация: напишите @desired_support'
      });
      Storage.set('orders', state.orders);
      Storage.set('inventory', state.inventory);
      resultText = `🎉 Джекпот! Premium 12 мес — в инвентаре`;
    }

    if (resEl) resEl.textContent = resultText;
    updateProfileUI();
    renderTransactions();
    renderOrders();
    renderInventory();
    animateBalanceChange();
    checkAchievements();
    haptic('heavy');
    playSound();

    setTimeout(() => {
      if (btn) {
        const b = Storage.get('balance', 0);
        btn.disabled = b < CASE_PRICE;
        btn.textContent = b < CASE_PRICE ? 'Недостаточно средств' : `Крутить за ${CASE_PRICE}₽`;
      }
    }, 1500);
  }, 3600);
}

// ==================== ADMIN ====================
function checkAdminPass() {
  const val = document.getElementById('adminPassInput').value;
  if (val === ADMIN_PASSWORD) {
    document.getElementById('adminPassInput').value = '';
    logAction('admin_login');
    go('admin');
    renderAdminTab('dashboard');
    setTimeout(() => closeModal('modalAdminPass'), 100);
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
  if (logs.length > 200) logs.shift();
  Storage.set('logs', logs);
}

function renderAdminTab(tab) {
  const c = document.getElementById('adminContent');
  if (!c) return;

  if (tab === 'dashboard') {
    const days = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
    const revenue = [1200,2400,1800,3200,2800,4100,3600];
    const maxRev = Math.max(...revenue);
    c.innerHTML = `
      <h4>📊 Дашборд</h4>
      <div class="admin-stat-grid">
        <div class="admin-stat"><div class="admin-stat-label">Юзеров</div><div class="admin-stat-value">${Object.keys(state.users).length}</div></div>
        <div class="admin-stat"><div class="admin-stat-label">Заказов</div><div class="admin-stat-value">${state.orders.length}</div></div>
        <div class="admin-stat"><div class="admin-stat-label">Выручка</div><div class="admin-stat-value">${state.stats.spent}₽</div></div>
        <div class="admin-stat"><div class="admin-stat-label">Товаров</div><div class="admin-stat-value">${PRODUCTS.length}</div></div>
      </div>
      <h4 style="margin-top:16px;">📈 Выручка за 7 дней</h4>
      <div class="admin-chart">
        ${revenue.map((v,i) => `<div class="admin-chart-bar" style="height:${(v/maxRev)*100}%;" data-label="${days[i]}"></div>`).join('')}
      </div>
      <h4 style="margin-top:20px;">⚡ Быстрые действия</h4>
      <button data-ap-add="1">➕ Добавить товар</button>
      <button class="ghost" data-open-promo-modal="1">🎟 Новый промокод</button>
      <button class="ghost" data-admin-export="1">💾 Скачать бэкап</button>
    `;
  } else if (tab === 'products') {
    c.innerHTML = `
      <h4>🏷 Товары (${PRODUCTS.length})</h4>
      <button data-ap-add="1">➕ Добавить товар</button>
      <div style="margin-top:12px;">
        ${PRODUCTS.map(p => `
          <div class="admin-row">
            <span>${p.flag} ${escapeHtml(p.name)} <span style="color:var(--muted);font-size:11px;">· ${p.category} · ${p.stock} шт</span></span>
            <span style="display:flex;gap:6px;align-items:center;">
              <span style="font-weight:800;">${p.price}₽</span>
              <button class="ghost" data-ap-edit="${p.id}">✏️</button>
              <button class="ghost" data-ap-del="${p.id}">🗑</button>
            </span>
          </div>
        `).join('')}
      </div>
    `;
  } else if (tab === 'users') {
    const list = Object.entries(state.users).map(([n, u]) =>
      `<div class="admin-row">
        <span>@${escapeHtml(n)} ${u.banned ? '<span style="color:var(--accent);font-size:11px;">BANNED</span>' : ''}</span>
        <span style="display:flex;gap:6px;align-items:center;">
          <span>${u.balance || 0}₽</span>
          <button class="ghost" data-admin-bal="${escapeHtml(n)}">💰</button>
          <button class="ghost" data-admin-ban="${escapeHtml(n)}">${u.banned ? '✅' : '⛔'}</button>
        </span>
      </div>`
    ).join('') || '<div style="color:var(--muted);font-size:12px;">Нет юзеров</div>';
    c.innerHTML = `<h4>👤 Юзеры (${Object.keys(state.users).length})</h4>${list}`;
  } else if (tab === 'orders') {
    c.innerHTML = `<h4>📦 Заказы (${state.orders.length})</h4>` + (state.orders.length
      ? state.orders.map((o, i) => `
        <div class="admin-row">
          <span>${o.id} · ${new Date(o.date).toLocaleDateString()}</span>
          <span style="display:flex;gap:6px;align-items:center;">
            <span>${o.total}₽</span>
            <button class="ghost" data-admin-refund="${i}">↩️ Возврат</button>
          </span>
        </div>`).join('')
      : '<div style="color:var(--muted);font-size:12px;">Нет заказов</div>');
  } else if (tab === 'tickets') {
    const list = state.tickets.slice().reverse().map((t, i) =>
      `<div class="admin-row">
        <span>${escapeHtml(t.subject)} <span style="color:var(--muted);font-size:11px;">· ${t.categoryLabel} · ${t.messages.length} сообщ.</span></span>
        <span style="display:flex;gap:6px;align-items:center;">
          <span style="font-size:11px;color:var(--muted);">${new Date(t.date).toLocaleDateString()}</span>
          <button class="ghost" data-admin-ticket="${t.id}">💬</button>
        </span>
      </div>`
    ).join('') || '<div style="color:var(--muted);font-size:12px;">Нет тикетов</div>';
    c.innerHTML = `<h4>💬 Тикеты (${state.tickets.length})</h4>${list}`;
  } else if (tab === 'promo') {
    c.innerHTML = `
      <h4>🎟 Промокоды (${state.promos.length})</h4>
      <button data-open-promo-modal="1">➕ Создать промокод</button>
      <div style="margin-top:12px;">
        ${state.promos.length ? state.promos.map(p => `
          <div class="admin-row">
            <span><b>${escapeHtml(p.code)}</b> <span style="color:var(--muted);font-size:11px;">${p.description || ''}</span></span>
            <span style="display:flex;gap:6px;align-items:center;">
              <span>-${p.disc}%</span>
              <button class="ghost" data-admin-delpromo="${escapeHtml(p.code)}">🗑</button>
            </span>
          </div>
        `).join('') : '<div style="color:var(--muted);font-size:12px;">Нет промокодов</div>'}
      </div>
    `;
  } else if (tab === 'reviews') {
    const list = state.reviews.map((r, i) =>
      `<div class="admin-row"><span>${escapeHtml(r.authorName || r.author)} · ${r.rating}★ · ${escapeHtml(r.text).slice(0, 40)}</span><button class="ghost" data-admin-delrev="${i}">🗑</button></div>`
    ).join('') || '<div style="color:var(--muted);font-size:12px;">Нет отзывов</div>';
    c.innerHTML = `<h4>⭐ Отзывы (${state.reviews.length})</h4>${list}`;
  } else if (tab === 'backup') {
    c.innerHTML = `
      <h4>💾 Резервное копирование</h4>
      <p style="color:var(--muted);font-size:12px;margin-bottom:12px;">Сохрани всю БД в файл или загрузи из бэкапа.</p>
      <button data-admin-export="1">📥 Скачать бэкап</button>
      <input type="file" id="backupFile" accept=".json" style="margin-top:12px;display:block;width:100%;padding:10px;background:var(--input-bg);border:1px solid var(--border);border-radius:10px;color:var(--text);font-size:13px;">
      <button class="ghost" data-admin-import="1" style="margin-top:8px;">📤 Загрузить из файла</button>
      <div style="margin-top:16px;padding:12px;background:var(--card-2);border-radius:12px;font-size:12px;color:var(--muted);">
        Юзеров: <b>${Object.keys(state.users).length}</b><br>
        Товаров: <b>${PRODUCTS.length}</b><br>
        Заказов: <b>${state.orders.length}</b><br>
        Промокодов: <b>${state.promos.length}</b><br>
        Отзывов: <b>${state.reviews.length}</b><br>
        Инвентарь: <b>${state.inventory.length}</b><br>
        Тикетов: <b>${state.tickets.length}</b>
      </div>
    `;
  } else if (tab === 'logs') {
    const logs = Storage.get('logs', []);
    c.innerHTML = `<h4>📜 Логи (${logs.length})</h4>` + (logs.slice(-30).reverse().map(l =>
      `<div class="admin-row"><span>${escapeHtml(l.action)} · @${escapeHtml(l.user)}</span><span>${new Date(l.date).toLocaleTimeString()}</span></div>`
    ).join('') || '<div style="color:var(--muted);font-size:12px;">Нет логов</div>');
  } else if (tab === 'settings') {
    c.innerHTML = `
      <h4>⚙️ Настройки админа</h4>
      <p style="color:var(--muted);font-size:12px;margin-bottom:12px;">Текущий пароль: <b>${ADMIN_PASSWORD}</b></p>
      <input type="password" id="newAdminPass" placeholder="Новый пароль (мин. 6)">
      <button data-change-pass="1">Сменить пароль</button>
      <div style="margin-top:20px;">
        <p style="color:var(--muted);font-size:12px;margin-bottom:8px;">ID админов (только им разрешён вход):</p>
        ${ADMIN_IDS.map(id => `<div class="admin-row"><span>ID ${id}</span></div>`).join('')}
      </div>
    `;
  }
}

function addProductFromAdmin() {
  document.getElementById('adminProductTitle').textContent = 'Добавить товар';
  document.getElementById('apId').value = '';
  document.getElementById('apFlag').value = '';
  document.getElementById('apName').value = '';
  document.getElementById('apSub').value = '';
  document.getElementById('apPrice').value = '';
  document.getElementById('apOldPrice').value = '';
  document.getElementById('apStock').value = '';
  document.getElementById('apCategory').value = state.catalogTab === 'stars' ? 'stars' : 'accounts';
  document.getElementById('apTags').value = '';
  document.getElementById('apBadge').value = '';
  openModal('modalAdminProduct');
}

function editProductFromAdmin(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  document.getElementById('adminProductTitle').textContent = 'Редактировать';
  document.getElementById('apId').value = p.id;
  document.getElementById('apFlag').value = p.flag;
  document.getElementById('apName').value = p.name;
  document.getElementById('apSub').value = p.sub;
  document.getElementById('apPrice').value = p.price;
  document.getElementById('apOldPrice').value = p.oldPrice || '';
  document.getElementById('apStock').value = p.stock;
  document.getElementById('apCategory').value = p.category || 'accounts';
  document.getElementById('apTags').value = (p.tags || []).join(', ');
  document.getElementById('apBadge').value = p.badge || '';
  openModal('modalAdminProduct');
}

function saveAdminProduct() {
  const id = document.getElementById('apId').value;
  const data = {
    flag: document.getElementById('apFlag').value || '🌍',
    name: document.getElementById('apName').value.trim(),
    sub: document.getElementById('apSub').value.trim() || 'Автовыдача',
    price: +document.getElementById('apPrice').value,
    oldPrice: +document.getElementById('apOldPrice').value || null,
    stock: +document.getElementById('apStock').value || 0,
    category: document.getElementById('apCategory').value,
    tags: document.getElementById('apTags').value.split(',').map(s => s.trim()).filter(Boolean),
    badge: document.getElementById('apBadge').value || null,
    rating: 5
  };
  if (!data.name || !data.price) return toast('Заполни имя и цену', 'error');

  if (id) {
    const idx = PRODUCTS.findIndex(x => x.id === +id);
    if (idx >= 0) PRODUCTS[idx] = { ...PRODUCTS[idx], ...data };
  } else {
    data.id = Date.now();
    PRODUCTS.push(data);
  }
  saveProducts();
  closeModal('modalAdminProduct');
  renderAdminTab('products');
  renderProducts();
  logAction(`product_save: ${data.name}`);
  toast('Товар сохранён', 'success');
}

function deleteProductFromAdmin(id) {
  if (!confirm('Удалить товар?')) return;
  const p = PRODUCTS.find(x => x.id === id);
  PRODUCTS = PRODUCTS.filter(p => p.id !== id);
  saveProducts();
  renderAdminTab('products');
  renderProducts();
  logAction(`product_delete: ${p?.name || id}`);
  toast('Товар удалён', 'success');
}

function adminAddBalance(username) {
  state.pendingAdminBalance = username;
  const el = document.getElementById('adminBalanceUser');
  if (el) el.textContent = `Юзер: @${username} · Баланс: ${state.users[username]?.balance || 0}₽`;
  document.getElementById('adminBalanceAmount').value = '';
  document.getElementById('adminBalanceReason').value = '';
  openModal('modalAdminBalance');
}

function confirmAdminBalance() {
  const username = state.pendingAdminBalance;
  if (!username || !state.users[username]) return;
  const amount = +document.getElementById('adminBalanceAmount').value;
  const reason = document.getElementById('adminBalanceReason').value || 'Правка админом';
  if (!amount) return toast('Введи сумму', 'error');
  state.users[username].balance = (state.users[username].balance || 0) + amount;
  Storage.set('users', state.users);
  if (state.currentUser?.username === username) {
    Storage.set('balance', (Storage.get('balance', 0) + amount));
    updateProfileUI();
  }
  state.transactions.unshift({ type: amount > 0 ? 'in' : 'out', title: reason, amount: Math.abs(amount), date: Date.now() });
  Storage.set('transactions', state.transactions);
  logAction(`balance_${amount > 0 ? 'add' : 'sub'}: @${username} ${amount}`);
  closeModal('modalAdminBalance');
  renderAdminTab('users');
  toast(`${amount > 0 ? '+' : ''}${amount}₽ @${username}`, 'success');
}

function adminToggleBan(username) {
  if (!state.users[username]) return;
  state.users[username].banned = !state.users[username].banned;
  Storage.set('users', state.users);
  logAction(`ban_toggle: @${username} → ${state.users[username].banned ? 'banned' : 'active'}`);
  renderAdminTab('users');
  toast(state.users[username].banned ? 'Забанен' : 'Разбанен', 'success');
}

function refundOrder(i) {
  const o = state.orders[i];
  if (!o) return;
  if (!confirm(`Вернуть ${o.total}₽?`)) return;
  Storage.set('balance', Storage.get('balance', 0) + o.total);
  state.stats.spent -= o.total;
  Storage.set('stats', state.stats);
  state.orders.splice(i, 1);
  Storage.set('orders', state.orders);
  state.transactions.unshift({ type: 'in', title: `Возврат заказа ${o.id}`, amount: o.total, date: Date.now() });
  Storage.set('transactions', state.transactions);
  logAction(`refund: ${o.id} ${o.total}₽`);
  renderAdminTab('orders');
  updateProfileUI();
  toast(`Возврат ${o.total}₽`, 'success');
}

function adminOpenTicket(id) {
  closeModal('modalAdminTicket');
  go('support');
  setTimeout(() => openTicketView(id), 300);
}

function openAdminPromoModal() {
  document.getElementById('promoCodeInput').value = '';
  document.getElementById('promoDiscInput').value = '';
  document.getElementById('promoLimitInput').value = '';
  document.getElementById('promoDescInput').value = '';
  openModal('modalAdminPromo');
}

function addPromo() {
  const code = document.getElementById('promoCodeInput').value.trim().toUpperCase();
  const disc = +document.getElementById('promoDiscInput').value;
  const limit = +document.getElementById('promoLimitInput').value || 0;
  const description = document.getElementById('promoDescInput').value.trim();
  if (!code || !disc) return toast('Заполни код и скидку', 'error');
  if (state.promos.find(p => p.code === code)) return toast('Такой код уже есть', 'error');
  state.promos.push({ code, disc, limit, used: 0, description, createdAt: Date.now() });
  Storage.set('promos', state.promos);
  logAction(`promo_add: ${code} -${disc}%`);
  closeModal('modalAdminPromo');
  renderAdminTab('promo');
  toast('Промокод добавлен', 'success');
}

function deletePromo(code) {
  if (!confirm(`Удалить промокод ${code}?`)) return;
  state.promos = state.promos.filter(p => p.code !== code);
  Storage.set('promos', state.promos);
  logAction(`promo_delete: ${code}`);
  renderAdminTab('promo');
  toast('Промокод удалён', 'success');
}

function delReview(i) {
  state.reviews.splice(i, 1);
  Storage.set('reviews', state.reviews);
  logAction('review_delete');
  renderAdminTab('reviews');
  renderReviews();
  renderReviewsMini();
  toast('Отзыв удалён', 'success');
}

function exportBackup() {
  const data = {
    users: state.users, products: PRODUCTS, orders: state.orders,
    promos: state.promos, reviews: state.reviews, inventory: state.inventory,
    transactions: state.transactions, points: state.points, stats: state.stats,
    tickets: state.tickets, aiChat: state.aiChat, dailyBonus: state.dailyBonus,
    balance: Storage.get('balance', 0), version: 'v1.0.0', exported: Date.now()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `desired_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  logAction('backup_export');
  toast('Бэкап скачан', 'success');
}

function importBackup() {
  const file = document.getElementById('backupFile')?.files[0];
  if (!file) return toast('Выбери файл', 'error');
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.users) Storage.set('users', data.users);
      if (data.products) { PRODUCTS = data.products; saveProducts(); }
      if (data.orders) Storage.set('orders', data.orders);
      if (data.promos) Storage.set('promos', data.promos);
      if (data.reviews) Storage.set('reviews', data.reviews);
      if (data.inventory) Storage.set('inventory', data.inventory);
      if (data.transactions) Storage.set('transactions', data.transactions);
      if (data.points !== undefined) Storage.set('points', data.points);
      if (data.stats) Storage.set('stats', data.stats);
      if (data.tickets) Storage.set('tickets', data.tickets);
      if (data.aiChat) Storage.set('aiChat', data.aiChat);
      if (data.dailyBonus) Storage.set('dailyBonus', data.dailyBonus);
      if (data.balance !== undefined) Storage.set('balance', data.balance);
      logAction('backup_import');
      toast('Бэкап загружен! Перезагрузка...', 'success');
      setTimeout(() => location.reload(), 1200);
    } catch { toast('Ошибка файла', 'error'); }
  };
  reader.readAsText(file);
}

function changeAdminPassword() {
  const newPass = document.getElementById('newAdminPass').value;
  if (newPass.length < 6) return toast('Минимум 6 символов', 'error');
  Storage.set('adminPassword', newPass);
  logAction('password_change');
  toast('Пароль изменён (после перезагрузки)', 'success');
}

// ==================== MODALS ====================
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('show');
  // Закрытие по тапу на фон
  el.onclick = (e) => { if (e.target === el) closeModal(id); };
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('show'); el.onclick = null; }
}

function contactSupport() { window.open(SUPPORT_LINK, '_blank'); }

function createTicket() {
  // Legacy — теперь через openNewTicket
  openNewTicket();
}

// ==================== TOASTS / HAPTIC / SOUND ====================
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

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ==================== BIND ALL ====================
function bindAllListeners() {
  // NAV
  document.querySelectorAll('.nav-btn').forEach(b => b.addEventListener('click', () => go(b.dataset.page)));
  document.querySelectorAll('[data-page]').forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); go(el.dataset.page); }));

  // Dropdown
  const dotsBtn = document.getElementById('dotsBtn');
  const dropdown = document.getElementById('dropdownMenu');
  dotsBtn?.addEventListener('click', (e) => { e.stopPropagation(); dropdown?.classList.toggle('show'); haptic('light'); });
  document.addEventListener('click', () => dropdown?.classList.remove('show'));
  dropdown?.addEventListener('click', (e) => e.stopPropagation());

  // Scroll topbar + scroll-to-top button
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    document.getElementById('topbar')?.classList.toggle('scrolled', window.scrollY > 10);
    if (scrollBtn) {
      if (window.scrollY > 500) scrollBtn.classList.remove('hidden');
      else scrollBtn.classList.add('hidden');
    }
  });
  scrollBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('hashchange', () => {
    const h = location.hash.replace('#', '');
    if (h && document.getElementById('page-' + h)) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.getElementById('page-' + h).classList.add('active');
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === h));
      updateBackButton();
    }
  });

  // Brand logo — 5 taps → admin
  let taps = 0, tapTimer = null;
  document.getElementById('brandLogo')?.addEventListener('click', () => {
    taps++;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => taps = 0, 900);
    if (taps >= 5) {
      taps = 0;
      haptic('medium');
      const tgId = state.tgUser?.id;
      if (tgId && !ADMIN_IDS.includes(tgId)) { openModal('modalDenied'); return; }
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

  // Onboarding
  document.getElementById('onbNext')?.addEventListener('click', onbNext);
  document.getElementById('onbSkip')?.addEventListener('click', onbSkip);
  document.querySelectorAll('.onb2-dot').forEach(d => d.addEventListener('click', () => { onbSlide = +d.dataset.dot; updateOnbSlide(); }));

  // LB tabs
  document.querySelectorAll('.lb-tab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.lb-tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      renderLeaderboard(t.dataset.lb);
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

  // Inventory filters
  document.querySelectorAll('.inv-filter[data-inv]').forEach(f => {
    f.addEventListener('click', () => {
      document.querySelectorAll('.inv-filter[data-inv]').forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      state.inventoryFilter = f.dataset.inv;
      renderInventory();
    });
  });

  // Tx filters
  document.querySelectorAll('.inv-filter[data-tx]').forEach(f => {
    f.addEventListener('click', () => {
      document.querySelectorAll('.inv-filter[data-tx]').forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      state.txFilter = f.dataset.tx;
      renderTransactions();
    });
  });

  // Cart top tabs
  document.querySelectorAll('.cart-top-tab').forEach(t => {
    t.addEventListener('click', () => switchCartTab(t.dataset.ctab));
  });

  // Stars/Premium toggle
  document.querySelectorAll('.msb-toggle-btn').forEach(b => {
    b.addEventListener('click', () => {
      state.msbMode = b.dataset.mode;
      document.querySelectorAll('.msb-toggle-btn').forEach(x => x.classList.toggle('active', x.dataset.mode === state.msbMode));
      updateMSBModeUI();
      haptic('light');
    });
  });

  // FAQ categories
  document.querySelectorAll('.faq-cat-chip').forEach(c => {
    c.addEventListener('click', () => {
      document.querySelectorAll('.faq-cat-chip').forEach(x => x.classList.remove('active'));
      c.classList.add('active');
      state.faqCat = c.dataset.fcat;
      renderFAQ();
      haptic('light');
    });
  });

  // Stars input (reviews)
  document.querySelectorAll('#starsInput span').forEach(s => {
    s.addEventListener('click', () => {
      state.reviewRating = +s.dataset.star;
      document.querySelectorAll('#starsInput span').forEach(x => x.classList.toggle('active', +x.dataset.star <= state.reviewRating));
      haptic('light');
    });
  });

  // Quick filters
  document.querySelectorAll('.quick-chip[data-quick]').forEach(c => {
    c.addEventListener('click', () => {
      document.querySelectorAll('.quick-chip[data-quick]').forEach(x => x.classList.remove('active'));
      c.classList.add('active');
      state.quickFilter = c.dataset.quick;
      visibleProducts = 6;
      renderProducts();
    });
  });

  // Catalog tabs
  document.querySelectorAll('.catalog-tab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.catalog-tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      state.catalogTab = t.dataset.cat;
      visibleProducts = 6;
      renderProducts();
      moveCatalogSlider();
      haptic('light');
    });
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  let searchTimer = null;
  searchInput?.addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    const val = e.target.value.toLowerCase().trim();
    searchTimer = setTimeout(() => {
      searchQuery = val;
      visibleProducts = 6;
      renderProducts();
      if (val) saveSearchHistory(val);
    }, 250);
  });
  searchInput?.addEventListener('focus', renderSearchHistory);

  // FAQ search (п.7) — фикс
  const faqSearch = document.getElementById('faqSearch');
  faqSearch?.addEventListener('input', () => {
    renderFAQ();
  });
  // Предотвращаем закрытие клавиатуры/потерю фокуса
  faqSearch?.addEventListener('click', (e) => e.stopPropagation());

  // Settings
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

  // Global click delegation
  document.addEventListener('click', (e) => {
    // Theme swatch
    const swatch = e.target.closest('.theme-swatch');
    if (swatch) { Storage.set('theme', swatch.dataset.theme); applyAllSettings(); toast('Тема изменена', 'success'); haptic('light'); return; }

    // Accent dot
    const dot = e.target.closest('.accent-dot');
    if (dot) { Storage.set('accent', dot.dataset.accent); applyAllSettings(); haptic('light'); return; }

    // Sale card
    if (e.target.closest('#saleCard')) { openSaleProduct(); return; }

    // Favorite (глобально)
    const fav = e.target.closest('[data-fav]');
    if (fav) { e.stopPropagation(); toggleFav(+fav.dataset.fav); return; }

    // В избранное из модалки
    const fm = e.target.closest('[data-fav-modal]');
    if (fm) { toggleFav(+fm.dataset.favModal); closeModal('modalProduct'); return; }

    // Избранное → в корзину
    const favToCart = e.target.closest('[data-fav-to-cart]');
    if (favToCart) { addToCart(+favToCart.dataset.favToCart); toggleFav(+favToCart.dataset.favToCart); return; }

    // Избранное → удалить
    const favRm = e.target.closest('[data-fav-rm]');
    if (favRm) { toggleFav(+favRm.dataset.favRm); return; }

    // Add to cart
    const add = e.target.closest('[data-add]');
    if (add) { e.stopPropagation(); addToCart(+add.dataset.add); return; }

    // Buy now
    const buy = e.target.closest('[data-buy]');
    if (buy) { e.stopPropagation(); buyNow(+buy.dataset.buy); return; }

    // Add from modal
    const am = e.target.closest('[data-add-from-modal]');
    if (am) { addToCart(+am.dataset.addFromModal); closeModal('modalProduct'); return; }
    const bm = e.target.closest('[data-buy-from-modal]');
    if (bm) { buyNow(+bm.dataset.buyFromModal); closeModal('modalProduct'); return; }

    // Open product
    const open = e.target.closest('[data-product-open]');
    if (open) { openProduct(+open.dataset.productOpen); return; }

    // Share product
    const share = e.target.closest('[data-share]');
    if (share) { shareProduct(+share.dataset.share); return; }

    // Remove from cart
    const rmCart = e.target.closest('[data-rm-cart]');
    if (rmCart) { removeCart(+rmCart.dataset.rmCart); return; }

    // Upsell
    const upAdd = e.target.closest('[data-upsell]');
    if (upAdd) { addToCart(+upAdd.dataset.upsell); return; }

    // Package
    const pkg = e.target.closest('[data-pkg]');
    if (pkg) { addPackageToCart(pkg.dataset.pkg); return; }

    // Inventory actions
    const invCopy = e.target.closest('[data-inv-copy]');
    if (invCopy) { copyInvData(invCopy.dataset.invCopy); return; }
    const invReview = e.target.closest('[data-inv-review]');
    if (invReview) { reviewProduct(decodeURIComponent(invReview.dataset.invReview)); return; }
    const invAgain = e.target.closest('[data-inv-again]');
    if (invAgain) { buyAgain(decodeURIComponent(invAgain.dataset.invAgain)); return; }

    // FAQ toggle
    const faq = e.target.closest('[data-faq]');
    if (faq) { faq.classList.toggle('open'); return; }

    // Tickets
    const ticketOpen = e.target.closest('[data-ticket-open]');
    if (ticketOpen) { openTicketView(ticketOpen.dataset.ticketOpen); return; }

    // Admin actions
    if (e.target.closest('[data-ap-add]')) { addProductFromAdmin(); return; }
    const apEdit = e.target.closest('[data-ap-edit]');
    if (apEdit) { editProductFromAdmin(+apEdit.dataset.apEdit); return; }
    const apDel = e.target.closest('[data-ap-del]');
    if (apDel) { deleteProductFromAdmin(+apDel.dataset.apDel); return; }
    const adminBal = e.target.closest('[data-admin-bal]');
    if (adminBal) { adminAddBalance(adminBal.dataset.adminBal); return; }
    const adminBan = e.target.closest('[data-admin-ban]');
    if (adminBan) { adminToggleBan(adminBan.dataset.adminBan); return; }
    const adminRefund = e.target.closest('[data-admin-refund]');
    if (adminRefund) { refundOrder(+adminRefund.dataset.adminRefund); return; }
    const adminDelRev = e.target.closest('[data-admin-delrev]');
    if (adminDelRev) { delReview(+adminDelRev.dataset.adminDelrev); return; }
    const adminDelPromo = e.target.closest('[data-admin-delpromo]');
    if (adminDelPromo) { deletePromo(adminDelPromo.dataset.adminDelpromo); return; }
    const adminTicket = e.target.closest('[data-admin-ticket]');
    if (adminTicket) { adminOpenTicket(adminTicket.dataset.adminTicket); return; }
    if (e.target.closest('[data-open-promo-modal]')) { openAdminPromoModal(); return; }
    if (e.target.closest('[data-admin-export]')) { exportBackup(); return; }
    if (e.target.closest('[data-admin-import]')) { importBackup(); return; }
    if (e.target.closest('[data-change-pass]')) { changeAdminPassword(); return; }

    // History chip
    const chip = e.target.closest('.hist-chip');
    if (chip) { setSearch(chip.dataset.search); return; }

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

  // aicInput — авто-рост + Enter-отправка (Shift+Enter = перенос)
  const aicInput = document.getElementById('aicInput');
  aicInput?.addEventListener('input', () => {
    aicInput.style.height = 'auto';
    aicInput.style.height = Math.min(aicInput.scrollHeight, 100) + 'px';
  });
  aicInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      aicSend();
    }
  });

  // ticketReplyText
  const trt = document.getElementById('ticketReplyText');
  trt?.addEventListener('input', () => {
    trt.style.height = 'auto';
    trt.style.height = Math.min(trt.scrollHeight, 100) + 'px';
  });
  trt?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTicketReply();
    }
  });
}

// ==================== WINDOW EXPORTS ====================
window.go = go;
window.goBack = goBack;
window.checkAdminPass = checkAdminPass;
window.addPromo = addPromo;
window.delReview = delReview;
window.toggleFav = toggleFav;
window.addToCart = addToCart;
window.buyNow = buyNow;
window.removeCart = removeCart;
window.addPackageToCart = addPackageToCart;
window.openProduct = openProduct;
window.shareProduct = shareProduct;
window.openTopUp = openTopUp;
window.submitTopUp = submitTopUp;
window.openPromoModal = openPromoModal;
window.applyPromo = applyPromo;
window.applyPromoInCart = applyPromoInCart;
window.openModal = openModal;
window.closeModal = closeModal;
window.contactSupport = contactSupport;
window.contactSupportDirect = contactSupportDirect;
window.createTicket = createTicket;
window.copyRef = copyRef;
window.addReview = addReview;
window.setSearch = setSearch;
window.toast = toast;
window.resetSettings = resetSettings;
window.openFilters = openFilters;
window.applyFilters = applyFilters;
window.resetFilters = resetFilters;
window.openSaleProduct = openSaleProduct;
window.clearRecent = clearRecent;
window.addProductFromAdmin = addProductFromAdmin;
window.editProductFromAdmin = editProductFromAdmin;
window.saveAdminProduct = saveAdminProduct;
window.deleteProductFromAdmin = deleteProductFromAdmin;
window.exportBackup = exportBackup;
window.importBackup = importBackup;
window.adminAddBalance = adminAddBalance;
window.confirmAdminBalance = confirmAdminBalance;
window.openAdminPromoModal = openAdminPromoModal;
window.openStarsBuy = openStarsBuy;
window.msbSetSelf = msbSetSelf;
window.msbSetStars = msbSetStars;
window.msbSelectPremium = msbSelectPremium;
window.msbBuy = msbBuy;
window.openCase = openCase;
window.spinCase = spinCase;
window.openDailyBonus = openDailyBonus;
window.claimBonus = claimBonus;
window.openLoyaltyInfo = openLoyaltyInfo;
window.showThanksScreen = showThanksScreen;
window.thanksGoInventory = thanksGoInventory;
window.thanksShare = thanksShare;
window.openAIChat = openAIChat;
window.aicSend = aicSend;
window.aicQuickSend = aicQuickSend;
window.requestHumanAdmin = requestHumanAdmin;
window.openNewTicket = openNewTicket;
window.submitNewTicket = submitNewTicket;
window.sendTicketReply = sendTicketReply;
window.openTicketView = openTicketView;
window.scrollToReviewForm = scrollToReviewForm;
window.scrollToPopularQuestions = scrollToPopularQuestions;
window.switchCartTab = switchCartTab;
window.onbNext = onbNext;
window.onbSkip = onbSkip;
