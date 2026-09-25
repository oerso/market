// ==================== CONFIG ====================
const ADMIN_PASSWORD = '837472';
const ADMIN_IDS = [7803765347, 912559442];
const SUPPORT_LINK = 'https://t.me/desired_support';
const DIRECT_CONTACT = 'https://t.me/id912559442';
const BOT_LINK = 'https://t.me/desired_bot';
const LOW_STOCK = 5;
const CASE_PRICE = 50;
const BONUS_AMOUNTS = [5, 5, 15, 15, 15, 25, 50];
const PREMIUM_PRICES = { 3: 1239, 6: 1649, 12: 2979 };
const STARS_PRICE_PER_STAR = 1.45;
const POINTS_MAX_PERCENT = 30;

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
  stats: Storage.get('stats', { topUp: 0, spent: 0, orders: 0, bonus: 0 }),
  achievements: Storage.get('achievements', []),
  tickets: Storage.get('tickets', []),
  aiChat: Storage.get('aiChat', []),
  dailyBonus: Storage.get('dailyBonus', { lastClaim: 0, streak: 0 }),
  caseSpins: Storage.get('caseSpins', 0),
  hideBalance: Storage.get('hideBalance', false),
  onboarded: Storage.get('onboarded', false),
  usePoints: false,
  catalogView: Storage.get('catalogView', 'grid'),
  startPage: Storage.get('startPage', 'main'),
  privacy: Storage.get('privacy', {
    balance: 'all', points: 'all', stats: 'all', avatar: 'all', username: 'all', dm: 'all', online: true
  }),
  friends: Storage.get('friends', []),
  friendRequests: Storage.get('friendRequests', []),
  outgoingRequests: Storage.get('outgoingRequests', []),
  chats: Storage.get('chats', []),
  currentChatId: null,
  currentUserId: null,
  reviewsFilterProduct: null,
  reviewSelectedProduct: null,
  privacyFrom: null,
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
  startParam: null,
  lang: Storage.get('lang', 'ru'),
  filters: { priceMin: 0, priceMax: 0, sort: 'popular', hit: false, isNew: false, sale: false }
};

// Автозагрузка start_param из Telegram
const tgApp = window.Telegram?.WebApp;
if (tgApp?.initDataUnsafe?.start_param) state.startParam = tgApp.initDataUnsafe.start_param;

// ==================== I18N (RU/EN) ====================
const I18N = {
  ru: {
    onb_1_title: 'Добро пожаловать в desired', onb_1_text: 'Маркет цифровых товаров: аккаунты, звёзды, Premium, NFT-подарки. Всё в одном месте.',
    onb_2_title: 'Автовыдача 24/7', onb_2_text: 'Купил — получил моментально. Никаких ожиданий и переписок.',
    onb_3_title: 'Общайся и зарабатывай', onb_3_text: 'Друзья, чаты, профили, рефералка 10% + 3%. Социальная сеть внутри маркета.',
    skip: 'Пропустить', next: 'Дальше',
    dd_shop: 'Магазин', dd_catalog: 'Каталог', dd_inventory: 'Инвентарь', dd_orders: 'Заказы', dd_tx: 'Транзакции', dd_reviews: 'Отзывы',
    dd_social: 'Социальное', dd_friends: 'Друзья', dd_chats: 'Чаты', dd_people: 'Поиск людей',
    dd_earn: 'Заработок', dd_ref: 'Рефералка', dd_leaders: 'Лидеры', dd_ach: 'Достижения',
    dd_info: 'Информация', dd_faq: 'FAQ', dd_info_page: 'Инфо', dd_support: 'Поддержка', dd_changelog: 'Ченджлог', dd_settings: 'Настройки',
    hello: 'Приветствую 👋', good_luck: 'Удачных покупок!',
    qa_bonus: 'Бонус', qa_case: 'Кейс', qa_chats: 'Чаты', qa_support: 'Помощь',
    progress_title: 'Мой прогресс сегодня',
    hero_tag: 'Новинки каждый день', hero_title: 'Скидки до 62%', hero_sub: 'На аккаунты, звёзды и Premium',
    hero_timer_label: 'До конца акции', sold_today: 'Продано сегодня', online_now: 'Онлайн сейчас',
    sale_day: 'СКИДКА ДНЯ', take: 'Забрать →',
    qf_all: 'Все', qf_cheap: 'До 100₽', qf_hit: 'Хиты', qf_new: 'Новинки', qf_sale: 'Скидки', qf_top: 'Топ рейтинг',
    tab_accounts: 'Аккаунты', tab_stars: 'Звёзды и Премиум',
    profile: 'Профиль', balance: 'Баланс', top_up: 'Пополнить',
    loyalty: 'Уровень лояльности', with_us: 'С нами', days: 'дней',
    topped_up: 'Пополнено', spent: 'Потрачено', points: 'Баллы', orders: 'Заказов',
    sec_social: 'Социальное', friends: 'Друзья', chats: 'Чаты', find_people: 'Найти людей',
    sec_earn: 'Заработок', ref_program: 'Реферальная программа', achievements: 'Достижения', leaders: 'Лидеры',
    sec_more: 'Ещё', tx_history: 'Транзакции', my_reviews: 'Мои отзывы', settings: 'Настройки',
    support: 'Поддержка', support_sub: 'Обратитесь к нам, если есть вопросы',
    inventory: 'Инвентарь', all: 'Все', active: 'Активные', empty_yet: 'Пока пусто',
    empty_inv_sub: 'Купленные товары появятся здесь', to_catalog: 'В каталог',
    cart: 'Корзина', favorites: 'Избранное', step_goods: 'Товары', step_pay: 'Оплата', step_done: 'Готово',
    goods: 'Товары', loyalty_disc: 'Скидка лояльности', points_disc: 'Списать баллы', points_applied: 'Баллы',
    promo: 'Промокод', apply_promo: 'Применить промокод', total: 'Итого', add_funds: 'Докинуть',
    auto_issue_note: 'Автовыдача после оплаты', checkout: 'Оформить заказ',
    cart_empty: 'Корзина пуста', cart_empty_sub: 'Добавь товары из каталога',
    fav_empty: 'Избранное пусто', fav_empty_sub: 'Жми ♡ на товарах, чтобы сохранить их здесь',
    upsell_title: 'С этим часто берут:',
    transactions: 'Транзакции', tx_in: 'Пополнения', tx_out: 'Покупки', tx_empty: 'История пуста', tx_empty_sub: 'Здесь появятся пополнения и покупки',
    my_orders: 'Мои заказы', orders_empty: 'Заказов пока нет', orders_empty_sub: 'Купи первый товар',
    ref_hero_title: 'Зови друзей — 10%', ref_hero_sub: '+3% со второго уровня. Вывод от 500₽.',
    copy: 'Копировать', lvl_1: 'Уровень 1', lvl_2: 'Уровень 2', earned: 'Заработано', min_withdraw: 'Мин. вывод', share_link: 'Поделиться ссылкой',
    reviews: 'Отзывы', based_on: 'На основе', reviews_word: 'отзывов', write_review: 'Написать отзыв',
    reviews_by_product: 'Отзывы по товарам', reviews_no_products: 'У тебя пока нет покупок — отзыв можно оставить только после заказа.',
    leave_review: 'Оставь свой отзыв', rfh_sub: 'Помоги другим сделать правильный выбор', product: 'Товар:',
    send_review: 'Отправить отзыв',
    search_friends: 'Поиск по ID или имени', friend_requests: 'Заявки в друзья', my_friends: 'Мои друзья',
    no_friends: 'Пока никого нет', no_friends_sub: 'Найди друзей по ID и добавь их',
    no_chats: 'Чатов пока нет', no_chats_sub: 'Начни общение с другом', to_friends: 'К друзьям',
    my_id: 'Твой ID для друзей', copy_id: 'Копировать', search_people: 'Введи ID или имя', people_hint: 'Введи ID (6 цифр) друга, чтобы найти его профиль',
    search_faq: 'Поиск по вопросам...', cat_payment: 'Оплата', cat_products: 'Товары', cat_warranty: 'Гарантия', cat_account: 'Аккаунт', cat_social: 'Соцсеть', cat_other: 'Другое',
    info_page: 'Информация', info_sub: 'Маркет цифровых товаров · v1.1.0', auto_issue: 'Автовыдача', warranty: 'Гарантия',
    our_team: 'Наша команда', founder: 'Основатель', dev: 'Разработка', marketing: 'Маркетинг',
    ai_online: 'ИИ-консультант онлайн', how_help: 'Чем помочь?', how_help_sub: 'ИИ отвечает мгновенно 24/7,<br>живой админ подключится если нужно',
    ai_chat: 'Чат с ИИ-консультантом', ai_chat_sub: 'Мгновенные ответы на любые вопросы',
    new_ticket: 'Создать тикет', new_ticket_sub: 'Опиши проблему, админ ответит',
    direct_contact: 'Связаться напрямую', direct_contact_sub: 'Написать админу в Telegram',
    my_tickets: 'Мои тикеты', no_tickets: 'Тикетов пока нет', no_tickets_sub: 'Создай тикет, если есть проблема',
    popular_q: 'Популярные вопросы', q_where_order: 'Где мой заказ?', q_how_pay: 'Как оплатить?', q_return: 'Хочу вернуть товар', q_not_work: 'Товар не работает',
    lb_orders: 'Заказы', lb_spent: 'Траты', lb_bonus: 'Бонусы', lb_refs: 'Рефералы', lb_rating: 'Рейтинг',
    unlocked: 'Открыто', of: 'из', changelog: 'Ченджлог',
    sec_personalization: 'Персонализация', language: 'Язык интерфейса', language_hint: 'RU / EN',
    theme: 'Тема оформления', theme_hint: 'Меняет всю палитру', accent: 'Акцентный цвет', accent_hint: 'Кнопки, границы',
    start_page: 'Стартовый экран', start_page_hint: 'Куда открывать при запуске',
    radius: 'Радиус углов', radius_hint: 'Скругление карточек', sharp: 'Острые', default: 'Обычные', round: 'Скруглённые', pill: 'Максимум',
    font_size: 'Размер шрифта', font_size_hint: 'Для удобного чтения', small: 'Мелкий', large: 'Крупный', xlarge: 'Очень крупный',
    compact: 'Компактный режим', compact_hint: 'Больше контента', animations: 'Анимации', animations_hint: 'Плавные переходы',
    glow: 'Свечение', glow_hint: 'Glow на кнопках', season: 'Сезонная тема', season_hint: 'Под праздник',
    season_default: 'Обычная', season_newyear: 'Новый год', season_halloween: 'Хэллоуин', season_blackfriday: 'Чёрная пятница',
    sec_privacy: 'Конфиденциальность', show_balance: 'Кто видит мой баланс', show_balance_hint: 'В публичном профиле',
    show_points: 'Кто видит мои баллы', show_points_hint: 'В публичном профиле',
    show_stats: 'Кто видит статистику', show_stats_hint: 'Заказы, траты',
    show_avatar: 'Кто видит мою аватарку', show_avatar_hint: 'В публичном профиле',
    show_username: 'Кто видит мой @username', show_username_hint: 'В публичном профиле',
    who_can_write: 'Кто может писать мне', who_can_write_hint: 'В личных чатах',
    show_online: 'Показывать онлайн-статус', show_online_hint: 'Видно другим юзерам',
    privacy_all: 'Все', privacy_friends: 'Друзья', privacy_none: 'Никто',
    sec_notifications: 'Уведомления', push_orders: 'Заказы и покупки', push_orders_hint: 'Пуш в боте',
    push_sales: 'Акции и скидки', push_sales_hint: 'Только важное', push_chats: 'Сообщения в чатах', push_chats_hint: 'Личные и групповые',
    push_bonus: 'Бонусы и кейсы', push_bonus_hint: 'Ежедневный, кейс', sound_ui: 'Звуки интерфейса', sound_ui_hint: 'Клики, уведомления',
    haptic: 'Вибрация', haptic_hint: 'Тактильный отклик',
    sec_security: 'Безопасность', '2fa': 'Двухфакторная аутентификация', '2fa_hint': 'Скоро',
    active_sessions: 'Активные сессии', active_sessions_hint: 'Скоро', bind_email: 'Привязать email', bind_email_hint: 'Скоро', soon: 'В разработке',
    sec_about: 'О приложении', app_version: 'Версия приложения', share_app: 'Поделиться приложением', share_app_hint: 'Позови друзей',
    contact_us: 'Связаться с нами', reset_settings: 'Сбросить настройки',
    debug: 'Отладка (админ)', admin: 'Админ-панель',
    tab_dashboard: 'Дашборд', tab_products: 'Товары', tab_users: 'Юзеры', tab_orders: 'Заказы', tab_tickets: 'Тикеты',
    tab_promo: 'Промокоды', tab_reviews: 'Отзывы', tab_backup: 'Бэкап', tab_logs: 'Логи', tab_admin: 'Админ',
    not_found: 'Страница не найдена', not_found_sub: 'Похоже, здесь ничего нет.',
    nav_market: 'Маркет', nav_inv: 'Инвентарь', nav_chats: 'Чаты', nav_cart: 'Корзина', nav_profile: 'Профиль',
    enter_pass: 'Введите пароль', cancel: 'Отмена', login: 'Войти', denied: 'Доступ запрещён', denied_sub: 'У вас нет прав администратора.', ok: 'Понятно',
    top_up_title: 'Пополнение баланса', topup_notice: 'Оплата появится после переезда на сервер: СБП, карты РФ, Stars, CryptoBot.',
    promo_title: 'Ввести промокод', close: 'Закрыть', apply: 'Применить',
    case_of_day: 'КЕЙС ДНЯ', case_title: 'Крути и выигрывай', case_sub: 'От 10₽ до Premium 12 мес · 15 призов',
    case_stat_premium: 'Premium', case_stat_account: 'США', case_stat_100: '100₽', case_stat_small: 'до 50₽',
    case_note: 'Минимум 10₽, максимум Premium 12 мес',
    stars: 'Звёзды', premium: 'Премиум', for_self: 'Для себя', months: 'мес', year: 'год',
    accept: 'Я принимаю', terms_of_use: 'Условия использования',
    filters: 'Фильтры', price: 'Цена', sort: 'Сортировка', sort_popular: 'По популярности', sort_cheap: 'Сначала дешёвые',
    sort_expensive: 'Сначала дорогие', sort_rating: 'По рейтингу', sort_new: 'Сначала новые',
    marks: 'Метки', filters_hit: 'Только хиты', filters_new: 'Только новинки', filters_sale: 'Только со скидкой',
    reset: 'Сбросить', new_ticket_title: 'Новый тикет', cat_order: 'Проблема с заказом',
    cat_payment_problem: 'Проблема с оплатой', cat_product_broken: 'Товар не работает',
    cat_refund: 'Возврат средств', cat_social_problem: 'Проблема в соцсети', cat_other_problem: 'Другое',
    ticket_subject_ph: 'Тема', ticket_textarea_ph: 'Опиши проблему подробно...',
    ticket_hint: 'Чем подробнее — тем быстрее решим', send: 'Отправить',
    ai_consultant: 'ИИ-консультант', online: 'Онлайн', admin: 'Админ',
    q_where: 'Где заказ?', q_pay: 'Как оплатить?', q_return: 'Возврат', q_broken: 'Не работает',
    write_msg: 'Напиши сообщение...',
    daily_bonus: 'Ежедневный бонус', loyalty_levels: 'Уровни лояльности', loyalty_sub: 'Чем больше тратишь — тем больше кэшбэк',
    loyalty_note: 'Также учитывается время на маркете — активные юзеры получают бонусы',
    points_title: 'Что такое баллы?', points_sub: '1 балл = 1₽ скидка на покупку',
    points_how_1: 'Начисляются за покупки: 5% от суммы заказа',
    points_how_2: '+10 баллов за каждый отзыв',
    points_how_3: 'Бонусы за ежедневный вход',
    points_how_4: 'Бонусы за приглашённых друзей',
    points_note: 'Баллами можно оплатить до 30% от суммы корзины',
    thanks_title: 'Спасибо за покупку!', order: 'Заказ', issued: 'оформлен', open_inv: 'Открыть инвентарь', share: 'Поделиться',
    friend_req_title: 'Добавить в друзья?', add_friend: 'Добавить',
    edit_profile: 'Редактировать профиль', bio_ph: 'О себе (до 100 символов)', display_name_ph: 'Отображаемое имя', save: 'Сохранить',
    in_dev: 'Функция в разработке', in_dev_sub: 'Скоро здесь появится что-то крутое.',
    end_catalog: '— Конец каталога —', recent_title: 'Недавно смотрел', clear: 'Очистить',
    live_title: 'Сейчас покупают', packages: 'Готовые пакеты', reviews_mini: 'Что говорят юзеры',
    search_ph: 'Поиск по каталогу', review_ph: 'Поделись впечатлениями о покупке...'
  },
  en: {
    onb_1_title: 'Welcome to desired', onb_1_text: 'Digital goods market: accounts, stars, Premium, NFT-gifts. All in one place.',
    onb_2_title: 'Auto-delivery 24/7', onb_2_text: 'Bought — got instantly. No waiting, no chatting.',
    onb_3_title: 'Chat & earn', onb_3_text: 'Friends, chats, profiles, referral 10% + 3%. A social network inside the market.',
    skip: 'Skip', next: 'Next',
    dd_shop: 'Shop', dd_catalog: 'Catalog', dd_inventory: 'Inventory', dd_orders: 'Orders', dd_tx: 'Transactions', dd_reviews: 'Reviews',
    dd_social: 'Social', dd_friends: 'Friends', dd_chats: 'Chats', dd_people: 'Find people',
    dd_earn: 'Earnings', dd_ref: 'Referral', dd_leaders: 'Leaders', dd_ach: 'Achievements',
    dd_info: 'Info', dd_faq: 'FAQ', dd_info_page: 'Info', dd_support: 'Support', dd_changelog: 'Changelog', dd_settings: 'Settings',
    hello: 'Hello 👋', good_luck: 'Happy shopping!',
    qa_bonus: 'Bonus', qa_case: 'Case', qa_chats: 'Chats', qa_support: 'Help',
    progress_title: 'My progress today',
    hero_tag: 'New items every day', hero_title: 'Discounts up to 62%', hero_sub: 'On accounts, stars and Premium',
    hero_timer_label: 'Ends in', sold_today: 'Sold today', online_now: 'Online now',
    sale_day: 'DEAL OF THE DAY', take: 'Get →',
    qf_all: 'All', qf_cheap: 'Under 100₽', qf_hit: 'Hits', qf_new: 'New', qf_sale: 'Sales', qf_top: 'Top rated',
    tab_accounts: 'Accounts', tab_stars: 'Stars & Premium',
    profile: 'Profile', balance: 'Balance', top_up: 'Top up',
    loyalty: 'Loyalty level', with_us: 'With us', days: 'days',
    topped_up: 'Topped up', spent: 'Spent', points: 'Points', orders: 'Orders',
    sec_social: 'Social', friends: 'Friends', chats: 'Chats', find_people: 'Find people',
    sec_earn: 'Earnings', ref_program: 'Referral program', achievements: 'Achievements', leaders: 'Leaders',
    sec_more: 'More', tx_history: 'Transactions', my_reviews: 'My reviews', settings: 'Settings',
    support: 'Support', support_sub: 'Contact us if you have questions',
    inventory: 'Inventory', all: 'All', active: 'Active', empty_yet: 'Empty yet',
    empty_inv_sub: 'Purchased items will appear here', to_catalog: 'To catalog',
    cart: 'Cart', favorites: 'Favorites', step_goods: 'Items', step_pay: 'Payment', step_done: 'Done',
    goods: 'Items', loyalty_disc: 'Loyalty discount', points_disc: 'Use points', points_applied: 'Points',
    promo: 'Promo code', apply_promo: 'Apply promo code', total: 'Total', add_funds: 'Add funds',
    auto_issue_note: 'Auto-delivery after payment', checkout: 'Checkout',
    cart_empty: 'Cart is empty', cart_empty_sub: 'Add items from the catalog',
    fav_empty: 'Favorites empty', fav_empty_sub: 'Tap ♡ on items to save them here',
    upsell_title: 'Often bought with:',
    transactions: 'Transactions', tx_in: 'Deposits', tx_out: 'Purchases', tx_empty: 'History is empty', tx_empty_sub: 'Deposits and purchases will appear here',
    my_orders: 'My orders', orders_empty: 'No orders yet', orders_empty_sub: 'Buy your first item',
    ref_hero_title: 'Invite friends — 10%', ref_hero_sub: '+3% from second level. Withdrawal from 500₽.',
    copy: 'Copy', lvl_1: 'Level 1', lvl_2: 'Level 2', earned: 'Earned', min_withdraw: 'Min. withdrawal', share_link: 'Share link',
    reviews: 'Reviews', based_on: 'Based on', reviews_word: 'reviews', write_review: 'Write a review',
    reviews_by_product: 'Reviews by product', reviews_no_products: 'You have no purchases yet — you can only leave a review after ordering.',
    leave_review: 'Leave your review', rfh_sub: 'Help others make the right choice', product: 'Product:',
    send_review: 'Send review',
    search_friends: 'Search by ID or name', friend_requests: 'Friend requests', my_friends: 'My friends',
    no_friends: 'Nobody yet', no_friends_sub: 'Find friends by ID and add them',
    no_chats: 'No chats yet', no_chats_sub: 'Start chatting with a friend', to_friends: 'To friends',
    my_id: 'Your ID for friends', copy_id: 'Copy', search_people: 'Enter ID or name', people_hint: 'Enter friend\'s 6-digit ID to find their profile',
    search_faq: 'Search questions...', cat_payment: 'Payment', cat_products: 'Products', cat_warranty: 'Warranty', cat_account: 'Account', cat_social: 'Social', cat_other: 'Other',
    info_page: 'Information', info_sub: 'Digital goods market · v1.1.0', auto_issue: 'Auto-delivery', warranty: 'Warranty',
    our_team: 'Our team', founder: 'Founder', dev: 'Development', marketing: 'Marketing',
    ai_online: 'AI consultant online', how_help: 'How can I help?', how_help_sub: 'AI replies instantly 24/7,<br>live admin joins if needed',
    ai_chat: 'Chat with AI consultant', ai_chat_sub: 'Instant answers to any question',
    new_ticket: 'Create ticket', new_ticket_sub: 'Describe the issue, admin will reply',
    direct_contact: 'Contact directly', direct_contact_sub: 'Message admin on Telegram',
    my_tickets: 'My tickets', no_tickets: 'No tickets yet', no_tickets_sub: 'Create a ticket if there\'s a problem',
    popular_q: 'Popular questions', q_where_order: 'Where is my order?', q_how_pay: 'How to pay?', q_return: 'I want to return', q_not_work: 'Item doesn\'t work',
    lb_orders: 'Orders', lb_spent: 'Spent', lb_bonus: 'Bonuses', lb_refs: 'Referrals', lb_rating: 'Rating',
    unlocked: 'Unlocked', of: 'of', changelog: 'Changelog',
    sec_personalization: 'Personalization', language: 'Interface language', language_hint: 'RU / EN',
    theme: 'Theme', theme_hint: 'Changes whole palette', accent: 'Accent color', accent_hint: 'Buttons, borders',
    start_page: 'Start page', start_page_hint: 'Where to open on launch',
    radius: 'Corner radius', radius_hint: 'Cards & buttons', sharp: 'Sharp', default: 'Default', round: 'Round', pill: 'Max',
    font_size: 'Font size', font_size_hint: 'For comfortable reading', small: 'Small', large: 'Large', xlarge: 'Very large',
    compact: 'Compact mode', compact_hint: 'More content', animations: 'Animations', animations_hint: 'Smooth transitions',
    glow: 'Glow', glow_hint: 'Glow on buttons', season: 'Seasonal theme', season_hint: 'For holidays',
    season_default: 'Default', season_newyear: 'New Year', season_halloween: 'Halloween', season_blackfriday: 'Black Friday',
    sec_privacy: 'Privacy', show_balance: 'Who sees my balance', show_balance_hint: 'In public profile',
    show_points: 'Who sees my points', show_points_hint: 'In public profile',
    show_stats: 'Who sees my stats', show_stats_hint: 'Orders, spends',
    show_avatar: 'Who sees my avatar', show_avatar_hint: 'In public profile',
    show_username: 'Who sees my @username', show_username_hint: 'In public profile',
    who_can_write: 'Who can message me', who_can_write_hint: 'In private chats',
    show_online: 'Show online status', show_online_hint: 'Visible to other users',
    privacy_all: 'Everyone', privacy_friends: 'Friends only', privacy_none: 'Nobody',
    sec_notifications: 'Notifications', push_orders: 'Orders & purchases', push_orders_hint: 'Push in bot',
    push_sales: 'Sales & discounts', push_sales_hint: 'Only important', push_chats: 'Chat messages', push_chats_hint: 'Private & group',
    push_bonus: 'Bonuses & cases', push_bonus_hint: 'Daily, case', sound_ui: 'UI sounds', sound_ui_hint: 'Clicks, notifications',
    haptic: 'Vibration', haptic_hint: 'Tactile feedback',
    sec_security: 'Security', '2fa': 'Two-factor auth', '2fa_hint': 'Soon',
    active_sessions: 'Active sessions', active_sessions_hint: 'Soon', bind_email: 'Bind email', bind_email_hint: 'Soon', soon: 'In development',
    sec_about: 'About', app_version: 'App version', share_app: 'Share app', share_app_hint: 'Invite friends',
    contact_us: 'Contact us', reset_settings: 'Reset settings',
    debug: 'Debug (admin)', admin: 'Admin panel',
    tab_dashboard: 'Dashboard', tab_products: 'Products', tab_users: 'Users', tab_orders: 'Orders', tab_tickets: 'Tickets',
    tab_promo: 'Promos', tab_reviews: 'Reviews', tab_backup: 'Backup', tab_logs: 'Logs', tab_admin: 'Admin',
    not_found: 'Page not found', not_found_sub: 'Looks like there\'s nothing here.',
    nav_market: 'Market', nav_inv: 'Inventory', nav_chats: 'Chats', nav_cart: 'Cart', nav_profile: 'Profile',
    enter_pass: 'Enter password', cancel: 'Cancel', login: 'Login', denied: 'Access denied', denied_sub: 'You are not an admin.', ok: 'Got it',
    top_up_title: 'Top up balance', topup_notice: 'Payment coming after server migration: SBP, RU cards, Stars, CryptoBot.',
    promo_title: 'Enter promo code', close: 'Close', apply: 'Apply',
    case_of_day: 'CASE OF THE DAY', case_title: 'Spin & win', case_sub: 'From 10₽ to Premium 12 mo · 15 prizes',
    case_stat_premium: 'Premium', case_stat_account: 'USA', case_stat_100: '100₽', case_stat_small: 'up to 50₽',
    case_note: 'Minimum 10₽, maximum Premium 12 mo',
    stars: 'Stars', premium: 'Premium', for_self: 'For myself', months: 'mo', year: 'year',
    accept: 'I accept', terms_of_use: 'Terms of use',
    filters: 'Filters', price: 'Price', sort: 'Sort', sort_popular: 'By popularity', sort_cheap: 'Cheapest first',
    sort_expensive: 'Most expensive first', sort_rating: 'By rating', sort_new: 'Newest first',
    marks: 'Marks', filters_hit: 'Only hits', filters_new: 'Only new', filters_sale: 'Only on sale',
    reset: 'Reset', new_ticket_title: 'New ticket', cat_order: 'Order problem',
    cat_payment_problem: 'Payment problem', cat_product_broken: 'Item doesn\'t work',
    cat_refund: 'Refund', cat_social_problem: 'Social issue', cat_other_problem: 'Other',
    ticket_subject_ph: 'Subject', ticket_textarea_ph: 'Describe the issue in detail...',
    ticket_hint: 'The more details — the faster we solve', send: 'Send',
    ai_consultant: 'AI consultant', online: 'Online', admin: 'Admin',
    q_where: 'Where is order?', q_pay: 'How to pay?', q_return: 'Refund', q_broken: 'Not working',
    write_msg: 'Write a message...',
    daily_bonus: 'Daily bonus', loyalty_levels: 'Loyalty levels', loyalty_sub: 'The more you spend — the more cashback',
    loyalty_note: 'Time on the market also counts — active users get bonuses',
    points_title: 'What are points?', points_sub: '1 point = 1₽ discount',
    points_how_1: 'Earned from purchases: 5% of order',
    points_how_2: '+10 points for each review',
    points_how_3: 'Bonuses for daily login',
    points_how_4: 'Bonuses for invited friends',
    points_note: 'Points can cover up to 30% of cart total',
    thanks_title: 'Thank you!', order: 'Order', issued: 'placed', open_inv: 'Open inventory', share: 'Share',
    friend_req_title: 'Add as friend?', add_friend: 'Add',
    edit_profile: 'Edit profile', bio_ph: 'About you (up to 100 chars)', display_name_ph: 'Display name', save: 'Save',
    in_dev: 'Feature in development', in_dev_sub: 'Something cool coming soon.',
    end_catalog: '— End of catalog —', recent_title: 'Recently viewed', clear: 'Clear',
    live_title: 'Buying now', packages: 'Ready packages', reviews_mini: 'What users say',
    search_ph: 'Search catalog', review_ph: 'Share your impressions...'
  }
};

function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || key; }

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    const v = t(k);
    if (v === k) return;
    el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const k = el.dataset.i18nPh;
    const v = t(k);
    if (v === k) return;
    el.placeholder = v;
  });
  document.documentElement.lang = state.lang;
}

// ==================== DATA ====================
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

// FAQ v2 — переписано с нуля, без повторов, 50+ вопросов
const FAQ = [
  { cat: 'products', q: 'Как получить товар после оплаты?', a: 'Моментально в разделе «Инвентарь». Там логин, пароль и все данные заказа.' },
  { cat: 'products', q: 'Сколько идёт выдача товара?', a: 'Автовыдача мгновенная 24/7. Если товар не пришёл за 5 минут — пиши в поддержку.' },
  { cat: 'products', q: 'Что за аккаунты вы продаёте?', a: 'Отлежавшиеся, с полным доступом: логин, пароль, почта, иногда номер.' },
  { cat: 'products', q: 'Как долго живут аккаунты?', a: 'От 6 месяцев при правильном использовании: без резких смен IP, без спама.' },
  { cat: 'products', q: 'Что такое аренда NFT-подарка?', a: 'Подарок на твой профиль Telegram на 30 дней. Продление — по той же цене.' },
  { cat: 'products', q: 'Что такое Telegram Stars?', a: 'Внутренняя валюта Telegram для подарков, реакций и покупок внутри приложений.' },
  { cat: 'products', q: 'Куда приходят звёзды?', a: 'На указанный @username после оплаты. Нужен только юзернейм или ID.' },
  { cat: 'products', q: 'Можно купить Stars без Premium?', a: 'Да, Stars продаются отдельно. Premium не обязателен.' },
  { cat: 'products', q: 'Что делать, если товар закончился?', a: 'Следи за обновлениями в Telegram-канале. Пополняем склад ежедневно.' },
  { cat: 'products', q: 'Работают ли аккаунты без VPN?', a: 'Да, аккаунты и звёзды работают без VPN, если у тебя стабильный интернет.' },
  { cat: 'products', q: 'Какие страны аккаунтов есть?', a: 'США, Великобритания, Япония, Колумбия, Казахстан, Германия. Постоянно расширяем список.' },
  { cat: 'payment', q: 'Какие способы оплаты?', a: 'СБП, карты РФ, Telegram Stars, CryptoBot. Подключим после переезда на сервер.' },
  { cat: 'payment', q: 'Как пополнить баланс?', a: 'Нажми кнопку с балансом сверху → выбери сумму → оплати удобным способом.' },
  { cat: 'payment', q: 'Что делать, если оплата не прошла?', a: 'Проверь баланс. Если списалось, но не зачислилось — пиши в поддержку с чеком.' },
  { cat: 'payment', q: 'Есть ли оптовые скидки?', a: 'Да: от 10 штук — 15%, от 50 — 25%, от 100 — 30%. Пиши в поддержку.' },
  { cat: 'payment', q: 'Можно ли купить в рассрочку?', a: 'Для крупных заказов от 5000₽ — да. Пиши в поддержку, обсудим условия.' },
  { cat: 'payment', q: 'Можно оплатить с чужой карты?', a: 'Только с письменного разрешения владельца. Мы не поддерживаем мошенничество.' },
  { cat: 'payment', q: 'Возвращаются ли деньги при отмене?', a: 'Да, если оплата прошла, а товар не выдан — возврат на баланс моментально.' },
  { cat: 'payment', q: 'Есть ли минимальная сумма пополнения?', a: 'Да, минимум 25₽. Максимум — без ограничений.' },
  { cat: 'payment', q: 'Что такое промокод и где его взять?', a: 'Промокод — код на скидку. Выдаём в Telegram-канале, в кейсе, за отзывы и бонусы.' },
  { cat: 'warranty', q: 'Что делать, если товар не работает?', a: 'Напиши в поддержку с номером заказа. Заменим или вернём деньги в течение 24 часов.' },
  { cat: 'warranty', q: 'Какая гарантия на товары?', a: 'От 24 часов до 7 дней — зависит от типа товара. Точный срок в карточке.' },
  { cat: 'warranty', q: 'Можно ли вернуть деньги?', a: 'Да, если товар не работает и заявка подана в течение 24 часов после покупки.' },
  { cat: 'warranty', q: 'Что если аккаунт забанят?', a: 'В течение гарантийного срока заменим на новый или вернём деньги. Всё честно.' },
  { cat: 'warranty', q: 'Что делать, если я ошибся с покупкой?', a: 'До выдачи товара можно отменить заказ через поддержку. После — только возврат по гарантии.' },
  { cat: 'warranty', q: 'Куда писать при проблеме с товаром?', a: 'В раздел «Поддержка» → «Создать тикет». Или напрямую админу в Telegram.' },
  { cat: 'warranty', q: 'Как быстро рассматривают заявки?', a: 'В рабочее время — до 15 минут. Ночью — до 2 часов.' },
  { cat: 'warranty', q: 'Заменят ли аккаунт при проблеме?', a: 'Да, если проблема подтвердится. Замена или возврат — на выбор.' },
  { cat: 'account', q: 'Что такое баллы и зачем они?', a: 'Копятся с покупок, отзывов, входов. 1 балл = 1₽ скидка в корзине (до 30%).' },
  { cat: 'account', q: 'Как получить статус Verified?', a: 'Нужно 5+ отзывов и сумма покупок от 5000₽. Значок появится автоматически.' },
  { cat: 'account', q: 'Есть ли скидки постоянным клиентам?', a: 'Да, кэшбэк по уровню: Bronze 3%, Silver 5%, Gold 8%, Platinum 12%.' },
  { cat: 'account', q: 'Как повысить уровень лояльности?', a: 'Больше покупок и больше времени на маркете. Уровни: Bronze → Silver → Gold → Platinum.' },
  { cat: 'account', q: 'Как восстановить доступ к аккаунту маркета?', a: 'У нас авторизация через Telegram. Восстановление не требуется — просто открой Mini App.' },
  { cat: 'account', q: 'Что если я удалил Telegram?', a: 'Все данные хранятся в твоём Telegram-аккаунте. Восстанови доступ — всё вернётся.' },
  { cat: 'account', q: 'Как поменять аватарку?', a: 'Аватарка берётся из твоего Telegram. Смени её в самом Telegram — обновится здесь.' },
  { cat: 'account', q: 'Как скрыть баланс от других?', a: 'Настройки → Конфиденциальность → Кто видит мой баланс → выбрать «Никто».' },
  { cat: 'social', q: 'Как добавить друга?', a: 'Раздел «Найти людей» → введи его 6-значный ID или имя → «Добавить в друзья».' },
  { cat: 'social', q: 'Где взять свой ID для друзей?', a: 'Раздел «Найти людей» — сверху крупно отображается твой ID. Жми «Копировать».' },
  { cat: 'social', q: 'Как написать другому юзеру?', a: 'Добавь его в друзья → раздел «Чаты» → выбери чат и пиши. Или сразу из его профиля.' },
  { cat: 'social', q: 'Кто может мне писать?', a: 'Настройки → Конфиденциальность → Кто может писать мне. По умолчанию — все.' },
  { cat: 'social', q: 'Как скрыть свой онлайн-статус?', a: 'Настройки → Конфиденциальность → Показывать онлайн-статус → выключить.' },
  { cat: 'social', q: 'Что такое публичный профиль?', a: 'Это профиль, который видят другие юзеры: имя, аватарка, ачивки, статистика (если не скрыл).' },
  { cat: 'social', q: 'Можно ли удалить чат?', a: 'Да, свайп по чату или долгое нажатие → удалить. История пропадёт.' },
  { cat: 'social', q: 'Как заблокировать юзера?', a: 'Открой его профиль → «Заблокировать». Он больше не сможет тебе писать.' },
  { cat: 'other', q: 'Как работает реферальная программа?', a: '10% с покупок друзей 1 уровня и 3% со 2 уровня. Вывод от 500₽.' },
  { cat: 'other', q: 'Есть ли партнёрская программа для блогеров?', a: 'Да, отдельные условия, повышенный процент и промокоды. Пиши в поддержку.' },
  { cat: 'other', q: 'Что за ежедневный бонус?', a: 'Заходи каждый день → получай от 5 до 50₽ на баланс. Стрик 7 дней = максимальный бонус.' },
  { cat: 'other', q: 'Что такое кейс дня?', a: 'Крути рулетку за 50₽ → выигрывай от 10₽ до Premium 12 месяцев.' },
  { cat: 'other', q: 'Как часто обновляется каталог?', a: 'Ежедневно. Новые аккаунты и товары появляются каждый день.' },
  { cat: 'other', q: 'Как связаться с админом?', a: 'Через раздел «Поддержка» → «Связаться напрямую» или через тикет в приложении.' },
  { cat: 'other', q: 'Есть ли мобильное приложение?', a: 'Мы работаем прямо в Telegram как Mini App. Устанавливать ничего не нужно.' }
];

const INFO_ITEMS = [
  { q: 'О маркете', a: 'desired — маркет цифровых товаров: Telegram-аккаунты, звёзды, премиум, аренда NFT. Автовыдача 24/7, поддержка, гарантия.' },
  { q: 'Наша миссия', a: 'Сделать покупку цифровых товаров такой же простой, как покупка кофе. Без скамов, без сложностей.' },
  { q: 'Гарантии', a: '100% возврат, если товар не работает. Заявку подаёшь в течение 24 часов. Замена или деньги на выбор.' },
  { q: 'Правила маркета', a: 'Возврат возможен только в случае нерабочего товара. Спорные ситуации решает поддержка.' },
  { q: 'Публичная статистика', a: 'Продано заказов: 12 458. Средняя оценка: 4.9/5. Онлайн: постоянно растёт.' },
  { q: 'Пользовательское соглашение', a: 'Полная версия откроется после переезда на сервер. Сейчас действует базовая.' },
  { q: 'Политика конфиденциальности', a: 'Не передаём данные третьим лицам. Хранится в Telegram. Полная версия — после переезда.' },
  { q: 'Правила возврата', a: 'Заявка в течение 24 часов. Возврат на баланс или карту. По решению поддержки — замена.' },
  { q: 'Как мы работаем', a: 'Автоматизированная система: заказ → оплата → моментальная выдача данных.' },
  { q: 'Поддержка', a: 'Отвечаем в течение 15 минут днём и до 2 часов ночью.' },
  { q: 'Оптовым клиентам', a: 'Индивидуальные условия от 50 заказов в месяц. Отдельный менеджер, спеццены.' },
  { q: 'Партнёрам и блогерам', a: 'Повышенный процент по рефералке, промокоды, персональные скидки. Пиши в поддержку.' },
  { q: 'Безопасность', a: 'HTTPS, защищённые шлюзы, у нас нет доступа к твоим картам.' },
  { q: 'Будущее маркета', a: 'Скоро: полноценная админка, личный кабинет партнёра, подписки, автопополнение, розыгрыши.' },
  { q: 'Обратная связь', a: 'Нашёл баг или есть идея? Пиши в поддержку. Лучшие идеи получают бонусы.' }
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
  { id: 'social_butterfly', icon: '🦋', name: 'Социальная бабочка', desc: 'Добавь 5 друзей' },
  { id: 'chatter', icon: '💬', name: 'Болтун', desc: 'Отправь 50 сообщений' }
];

const CHANGELOG = [
  { ver: 'v1.1.0', date: 'Сегодня', changes: [
    'Социальная сеть: друзья, чаты, публичные профили',
    'ID для каждого юзера (6 цифр)',
    'Многоязычный интерфейс RU/EN',
    'Настройки разбиты на секции (персонализация, конфиденциальность, уведомления, безопасность)',
    'Приватность: скрытие баланса, баллов, аватара, @username',
    'Аватарка из Telegram',
    'Кейс v2: 15 секторов, фикс прокрутки, казино-стиль',
    'Stars/Premium покупка по @username',
    'Отзывы по товарам, нельзя без покупки',
    'Корзина: управление +/-, каждый товар = отдельный заказ',
    'Баллы: 1=1₽, до 30% скидки',
    'Лидерборд: 5 разделов (заказы/траты/бонусы/рефералы/рейтинг)',
    'Кнопка "?" у баллов',
    'Dropdown теперь fixed (плавающий)',
    'Новый 3D-логотип с бликами и переливами',
    'Модерн-textarea в тикетах',
    'Прогресс-карточка на главной',
    'Полоса загрузки сверху',
    'Скелетоны везде',
    'FAQ переписан с нуля, без повторов'
  ] },
  { ver: 'v1.0.0', date: 'Ранее', changes: ['Полная переработка профиля', 'Уровни лояльности', 'Тикеты и ИИ-чат', 'Покупка Stars/Premium', 'Ежедневный бонус + кейс'] },
  { ver: 'v0.9.0', date: '3 дня назад', changes: ['Новый сплэш', 'SVG-иконки', 'Фикс faq'] }
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

const SPLASH_TAGLINES = ['Маркет звёзд, премиума и аккаунтов', 'Автовыдача 24/7 без выходных', 'Тысячи довольных покупателей', 'Твой маркет цифровых товаров'];
const SPLASH_STAGES = [
  { at: 0, status: 'Инициализация...' }, { at: 20, status: 'Загрузка каталога...' },
  { at: 45, status: 'Проверка товаров...' }, { at: 70, status: 'Синхронизация...' },
  { at: 90, status: 'Почти готово...' }, { at: 100, status: 'Добро пожаловать!' }
];

// ==================== AI MOCK ====================
const AI_ANSWERS = [
  { keys: ['заказ', 'где', 'пришл', 'статус'], answer: 'Все купленные товары моментально появляются в разделе «Инвентарь». Если товар не пришёл — дай номер заказа, позову админа.' },
  { keys: ['оплат', 'пополн', 'платёж', 'сбп', 'карт', 'crypto'], answer: 'Оплата сейчас в разработке — скоро подключим СБП, карты РФ, Stars и CryptoBot.' },
  { keys: ['возврат', 'верн', 'деньг'], answer: 'Возврат возможен, если товар не работает и заявка подана в течение 24 часов. Дай номер заказа.' },
  { keys: ['не работ', 'сломан', 'проблем'], answer: 'Жаль, что так вышло! Опиши подробно что не работает и приложи номер заказа. Заменим или вернём деньги.' },
  { keys: ['гаранти'], answer: 'Гарантия от 24 часов до 7 дней — точный срок в карточке товара.' },
  { keys: ['реферал', 'приглаш', 'друз'], answer: 'Зовёшь друга — получаешь 10% с его покупок + 3% со второго уровня.' },
  { keys: ['баланс', 'кошел'], answer: 'Баланс пополняется кнопкой «+» сверху. Оплата в разработке — скоро подключим все способы.' },
  { keys: ['аккаунт', 'логин', 'парол'], answer: 'Данные аккаунта приходят в инвентарь: логин, пароль, почта.' },
  { keys: ['stars', 'звезд', 'звёзд'], answer: 'Telegram Stars продаются отдельно или вместе с Premium в разделе «Звёзды и Премиум».' },
  { keys: ['premium', 'премиум'], answer: 'Premium активируется на твой аккаунт или аккаунт получателя. Срок от 3 мес до 1 года.' },
  { keys: ['nft', 'подарок', 'аренд'], answer: 'NFT-подарки арендуются на 30 дней и появляются в профиле Telegram.' },
  { keys: ['поддержк', 'помощ', 'админ'], answer: 'Можешь создать тикет, написать в ИИ-чат или позвать админа напрямую.' },
  { keys: ['отзыв', 'оценк'], answer: 'Оставить отзыв можно только после покупки товара. За отзыв +10 баллов.' },
  { keys: ['бонус', 'ежеднев'], answer: 'Заходи каждый день — получай бонус от 5 до 50₽. Стрик 7 дней = +50₽.' },
  { keys: ['скидк', 'промокод'], answer: 'Промокод вводится в профиле или корзине. Актуальные — в Telegram-канале.' },
  { keys: ['друг', 'соц', 'чат'], answer: 'Найти друзей можно в разделе «Найти людей» по 6-значному ID. Чат — после добавления в друзья.' },
  { keys: ['id', 'профиль'], answer: 'Твой ID — 6 цифр, отображается в разделе «Найти людей» и в профиле.' },
  { keys: ['язык', 'english', 'русск'], answer: 'Язык меняется в Настройки → Персонализация → Язык интерфейса.' },
  { keys: ['привет', 'здравствуй', 'хай'], answer: 'Привет! Чем могу помочь? Могу ответить про заказы, оплату, возврат, товары, соцсеть.' },
  { keys: ['спасибо'], answer: 'Всегда рад! Если ещё что-то понадобится — пиши.' }
];

function getAIResponse(text) {
  const lower = text.toLowerCase().trim();
  for (const item of AI_ANSWERS) {
    for (const key of item.keys) if (lower.includes(key)) return item.answer;
  }
  return 'Хм, не совсем понял вопрос. Могу помочь с заказами, оплатой, возвратом, товарами, рефералкой. Если нужен живой админ — нажми кнопку «Админ».';
}

// ==================== SPLASH ====================
function spawnSplashParticles() {
  const wrap = document.getElementById('splashParticles');
  if (!wrap) return;
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'splash3-particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    p.style.animationDelay = (Math.random() * 6) + 's';
    p.style.opacity = (0.4 + Math.random() * 0.6);
    if (Math.random() > 0.7) { p.style.background = '#ffffff'; p.style.boxShadow = '0 0 6px #fff, 0 0 12px rgba(255,255,255,0.5)'; }
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
    setTimeout(() => { tagIdx = (tagIdx + 1) % SPLASH_TAGLINES.length; tagEl.textContent = SPLASH_TAGLINES[tagIdx]; tagEl.classList.remove('fade'); }, 350);
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
      if (eased >= SPLASH_STAGES[i].at && lastStage < i) { lastStage = i; if (statusEl) statusEl.textContent = SPLASH_STAGES[i].status; break; }
    }
    if (raw < 100) requestAnimationFrame(tick);
    else { clearInterval(tagInterval); setTimeout(done, 320); }
  };
  requestAnimationFrame(tick);
}

// ==================== TOP LOADING BAR ====================
function showTopLoading(duration) {
  const bar = document.getElementById('topLoadingBar');
  const fill = document.getElementById('topLoadingFill');
  if (!bar || !fill) return;
  bar.classList.add('active');
  fill.style.width = '0%';
  fill.style.transition = 'width .3s';
  setTimeout(() => { fill.style.width = '70%'; }, 20);
  setTimeout(() => { fill.style.width = '100%'; }, duration || 400);
  setTimeout(() => { bar.classList.remove('active'); fill.style.width = '0%'; }, (duration || 400) + 350);
}

// ==================== INIT ====================
window.addEventListener('DOMContentLoaded', () => {
  applyAllSettings();
  applyTranslations();
  initTelegram();
  bindAllOnclicks();
  autoCreateUser();

  startSplashAnim(() => {
    const splash = document.getElementById('splash');
    if (splash) splash.classList.add('hide');
    setTimeout(() => {
      splash?.remove();
      enterApp();
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
  setupScrollReveal();
});

function autoCreateUser() {
  if (state.currentUser && state.currentUser.firstName && state.currentUser.shortId) return;
  const tg = state.tgUser;
  const username = tg?.username || tg?.first_name || 'desired';
  const firstName = tg?.first_name || username;
  state.currentUser = {
    username: username,
    firstName: firstName,
    tgId: tg?.id || null,
    shortId: state.currentUser?.shortId || generateShortId(),
    avatarUrl: tg?.photo_url || null,
    bio: state.currentUser?.bio || '',
    displayName: state.currentUser?.displayName || firstName,
    createdAt: state.currentUser?.createdAt || Date.now()
  };
  Storage.set('currentUser', state.currentUser);
}

function generateShortId() {
  return String(Math.floor(100000 + Math.random() * 900000));
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
      e.preventDefault(); e.stopPropagation();
      try { new Function(code).call(el, e); } catch (err) { console.error('onclick error:', err, 'code:', code); }
    });
  });
}

// ==================== ONBOARDING ====================
let onbSlide = 0;
function showOnboarding() { const el = document.getElementById('onboarding'); if (!el) return; el.classList.remove('hidden'); onbSlide = 0; updateOnbSlide(); }
function updateOnbSlide() {
  document.querySelectorAll('.onb2-slide').forEach(s => s.classList.toggle('active', +s.dataset.slide === onbSlide));
  document.querySelectorAll('.onb2-dot').forEach(d => d.classList.toggle('active', +d.dataset.dot === onbSlide));
  const nextBtn = document.getElementById('onbNext');
  if (nextBtn) nextBtn.textContent = onbSlide === 2 ? (state.lang === 'ru' ? 'Поехали!' : 'Let\'s go!') : t('next');
}
function onbNext() { if (onbSlide < 2) { onbSlide++; updateOnbSlide(); haptic('light'); } else closeOnboarding(); }
function onbSkip() { closeOnboarding(); }
function closeOnboarding() { const el = document.getElementById('onboarding'); if (el) el.classList.add('hidden'); Storage.set('onboarded', true); state.onboarded = true; haptic('medium'); }

// ==================== SETTINGS ====================
function applyAllSettings() {
  const theme = Storage.get('theme', 'dark'); document.body.setAttribute('data-theme', theme);
  const accent = Storage.get('accent', 'red'); document.body.setAttribute('data-accent', accent);
  const season = Storage.get('season', 'default');
  if (season === 'default') document.body.removeAttribute('data-season'); else document.body.setAttribute('data-season', season);
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
  const t1 = Storage.get('theme', 'dark');
  document.querySelectorAll('.theme-swatch').forEach(el => el.classList.toggle('active', el.dataset.theme === t1));
  const a = Storage.get('accent', 'red');
  document.querySelectorAll('.accent-dot').forEach(el => el.classList.toggle('active', el.dataset.accent === a));
  const setV = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  const setC = (id, v) => { const el = document.getElementById(id); if (el) el.checked = v; };
  setV('radiusSelect', Storage.get('radius', 'pill'));
  setV('fontScaleSelect', Storage.get('fontScale', 'default'));
  setV('seasonSelect', Storage.get('season', 'default'));
  setV('startPageSelect', Storage.get('startPage', 'main'));
  setV('languageSelect', state.lang);
  setC('compactToggle', Storage.get('compact', false));
  setC('animToggle', Storage.get('animEnabled', true));
  setC('glowToggle', Storage.get('glow', true));
  setC('soundToggle', Storage.get('soundEnabled', true));
  setC('hapticToggle', Storage.get('hapticEnabled', true));
  setC('notifyOrders', Storage.get('notifyOrders', true));
  setC('notifySales', Storage.get('notifySales', true));
  setC('notifyChats', Storage.get('notifyChats', true));
  setC('notifyBonus', Storage.get('notifyBonus', true));
  setC('showOnlineToggle', Storage.get('showOnline', true));
  setV('privacyBalance', state.privacy.balance);
  setV('privacyPoints', state.privacy.points);
  setV('privacyStats', state.privacy.stats);
  setV('privacyAvatar', state.privacy.avatar);
  setV('privacyUsername', state.privacy.username);
  setV('privacyDm', state.privacy.dm);
}

function resetSettings() {
  ['theme','accent','radius','fontScale','compact','animEnabled','glow','season'].forEach(k => Storage.del(k));
  applyAllSettings();
  toast(state.lang === 'ru' ? 'Настройки сброшены' : 'Settings reset', 'success');
  haptic('medium');
}

function changeLanguage(lang) {
  state.lang = lang;
  Storage.set('lang', lang);
  applyTranslations();
  renderProducts();
  renderReviews();
  renderReviewsMini();
  renderFAQ();
  renderInfo();
  renderPackages();
  renderCart();
  renderTransactions();
  renderOrders();
  renderInventory();
  renderFavoritesFull();
  renderTickets();
  renderFriends();
  renderChats();
  renderPeopleResults();
  updateHello();
  renderTrophies();
  renderAchievements();
  renderChangelog();
  updateCatalogCounts();
  toast(lang === 'ru' ? 'Язык изменён' : 'Language changed', 'success');
  haptic('light');
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
  renderLeaderboard('orders');
  renderChangelog();
  renderLiveFeed();
  renderSaleCard();
  renderProgressCard();
  renderTickets();
  renderAIChat();
  renderFriends();
  renderChats();
  renderIncoming();
  renderPeopleResults();
  updateHello();
  checkLoyalty();
  checkAchievements();
  moveCatalogSlider();
  updateBackButton();
  updateDaysOnMarket();
  updateChatBadges();
  updateFriendsCount();
  updateChatsCount();

  // Стартовый экран из настроек
  const startPage = Storage.get('startPage', 'main');
  if (startPage && startPage !== 'main') {
    setTimeout(() => go(startPage), 400);
  } else {
    routeFromHash();
  }

  // startapp параметр
  if (state.startParam) {
    setTimeout(() => {
      if (document.getElementById('page-' + state.startParam)) go(state.startParam);
      state.startParam = null;
    }, 600);
  }
}

function updateHello() {
  const el = document.getElementById('helloText');
  const sub = document.getElementById('helloSub');
  if (!el) return;
  const name = state.tgUser?.first_name || state.currentUser?.firstName || state.currentUser?.username || 'друг';
  el.innerHTML = `${t('hello')}, ${escapeHtml(name)} <svg class="hello-wave" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11.5V14a5 5 0 0 0 5 5h0a5 5 0 0 0 5-5V5.5a1.5 1.5 0 0 0-3 0V11"/><path d="M11 5.5V11"/><path d="M14.5 5.5V11"/><path d="M4 11.5V14a8 8 0 0 0 8 8h0a8 8 0 0 0 8-8V5.5a1.5 1.5 0 0 0-3 0"/></svg>`;
  if (sub) sub.textContent = t('good_luck');
}

function updateProfileUI() {
  const username = state.currentUser?.username || 'user';
  const firstName = state.currentUser?.displayName || state.tgUser?.first_name || state.currentUser?.firstName || username;
  const tgId = state.tgUser?.id || state.currentUser?.tgId || '—';
  const shortId = state.currentUser?.shortId || '000000';
  const setT = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setT('userName', firstName);
  setT('userId', '@id' + tgId);
  setT('userShortId', '#' + shortId);
  setT('myShortId', '#' + shortId);
  const avatarEl = document.getElementById('userAvatar');
  if (avatarEl) {
    const avatarUrl = state.currentUser?.avatarUrl;
    if (avatarUrl) {
      avatarEl.style.backgroundImage = `url(${avatarUrl})`;
      avatarEl.textContent = '';
    } else {
      avatarEl.style.backgroundImage = '';
      avatarEl.textContent = firstName[0]?.toUpperCase() || 'd';
    }
  }
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

function formatBalance(n) { return state.hideBalance ? '••••₽' : n + '₽'; }

function setupEyeButton() {
  const btn = document.getElementById('eyeBtn');
  if (!btn) return;
  const open = btn.querySelector('.eye-open');
  const closed = btn.querySelector('.eye-closed');
  const update = () => {
    if (state.hideBalance) { open?.classList.add('hidden'); closed?.classList.remove('hidden'); }
    else { open?.classList.remove('hidden'); closed?.classList.add('hidden'); }
    updateBalanceDisplay();
    const pb = document.getElementById('profileBalance');
    if (pb) pb.textContent = formatBalance(Storage.get('balance', 0));
  };
  update();
  btn.addEventListener('click', () => { state.hideBalance = !state.hideBalance; Storage.set('hideBalance', state.hideBalance); update(); haptic('light'); });
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
  if (!document.getElementById('page-' + page)) page = '404';
  showTopLoading(300);
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page)?.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === page));
  location.hash = page;
  window.scrollTo(0, 0);
  haptic('light');
  closeDropdown();
  updateBackButton();
  setupScrollReveal();
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
  } else go('main');
}

function updateBackButton() {
  const btn = document.getElementById('backBtn');
  const activePage = document.querySelector('.page.active');
  const id = activePage?.id?.replace('page-', '');
  if (!btn) return;
  if (id && id !== 'main') btn.classList.remove('hidden'); else btn.classList.add('hidden');
}

function setupBackButton() { document.getElementById('backBtn')?.addEventListener('click', () => { haptic('light'); goBack(); }); }

function routeFromHash() {
  const params = new URLSearchParams(location.search);
  const pageParam = params.get('page');
  if (pageParam && document.getElementById('page-' + pageParam)) { go(pageParam); return; }
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
  setInterval(() => { if (document.hidden) return; brand.classList.add('jump'); setTimeout(() => brand.classList.remove('jump'), 600); }, 2000);
}

// ==================== SCROLL REVEAL ====================
function setupScrollReveal() {
  const reveals = document.querySelectorAll('.section-title, .sale-card, .progress-card, .packages, .reviews-mini, .live-feed');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => { el.style.opacity = '1'; });
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => {
    if (el.style.opacity !== '0') {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
    }
    io.observe(el);
  });
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
  toast(state.lang === 'ru' ? 'Фильтры применены' : 'Filters applied', 'success');
}

function resetFilters() {
  state.filters = { priceMin: 0, priceMax: 0, sort: 'popular', hit: false, isNew: false, sale: false };
  ['filterPriceMin','filterPriceMax'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  ['filterHit','filterNew','filterSale'].forEach(id => { const el = document.getElementById(id); if (el) el.checked = false; });
  const fs = document.getElementById('filterSort'); if (fs) fs.value = 'popular';
  updateFilterBadge();
}

function updateFilterBadge() {
  let count = 0;
  if (state.filters.priceMin) count++; if (state.filters.priceMax) count++;
  if (state.filters.sort !== 'popular') count++;
  if (state.filters.hit) count++; if (state.filters.isNew) count++; if (state.filters.sale) count++;
  const badge = document.getElementById('filterBadge');
  if (!badge) return;
  if (count > 0) { badge.textContent = count; badge.classList.remove('hidden'); } else badge.classList.add('hidden');
}

// ==================== CATALOG ====================
function moveCatalogSlider() {
  const slider = document.getElementById('catalogTabSlider');
  if (!slider) return;
  if (state.catalogTab === 'stars') slider.classList.add('right'); else slider.classList.remove('right');
}

function toggleCatalogView() {
  state.catalogView = state.catalogView === 'grid' ? 'list' : 'grid';
  Storage.set('catalogView', state.catalogView);
  const gridIcon = document.querySelector('.vt-grid');
  const listIcon = document.querySelector('.vt-list');
  if (gridIcon) gridIcon.classList.toggle('hidden', state.catalogView !== 'grid');
  if (listIcon) listIcon.classList.toggle('hidden', state.catalogView !== 'list');
  renderProducts();
  haptic('light');
}

function updateCatalogCounts() {
  // счётчики убраны из UI (по запросу), функция-заглушка
}

// ==================== SALE OF DAY ====================
function getSaleProduct() { return PRODUCTS.find(p => p.oldPrice) || PRODUCTS[0]; }

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

function openSaleProduct() { const p = getSaleProduct(); if (p) openProduct(p.id); }

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
  list.className = 'products' + (state.catalogView === 'list' ? ' list-view' : '');
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
      list.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--muted);padding:30px;">' + (state.lang === 'ru' ? 'Ничего не найдено' : 'Nothing found') + '</div>';
      return;
    }

    const visible = items.slice(0, visibleProducts);
    list.innerHTML = visible.map((p, idx) => {
      const isFav = state.favorites.includes(p.id);
      const discountPercent = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
      const stockHint = p.stock <= LOW_STOCK ? `<div class="product-stock">⚠ ${state.lang === 'ru' ? 'Осталось' : 'Left'} ${p.stock} ${state.lang === 'ru' ? 'шт' : 'pcs'}</div>` : '';
      const badgeClass = p.badge === 'ХИТ' ? 'hit' : p.badge === 'NEW' ? 'new' : '';
      return `
      <div class="product" style="animation-delay:${idx*40}ms">
        <button class="product-fav ${isFav ? 'active' : ''}" data-fav="${p.id}" aria-label="Fav">
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
          ${p.tags ? `<div class="product-tags">${p.tags.slice(0,2).map(tg => `<span class="product-tag">${escapeHtml(tg)}</span>`).join('')}</div>` : ''}
          ${stockHint}
        </div>
        <div class="product-price-row">
          <div class="product-price">${p.price}₽</div>
          ${p.oldPrice ? `<div class="product-old">${p.oldPrice}₽</div>` : ''}
          ${discountPercent ? `<span style="color:var(--green);font-size:11px;font-weight:800;">-${discountPercent}%</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="btn-add" data-add="${p.id}">${state.lang === 'ru' ? 'В корзину' : 'Add'}</button>
          <button class="btn-buy" data-buy="${p.id}">${state.lang === 'ru' ? 'Купить' : 'Buy'}</button>
        </div>
      </div>`;
    }).join('');

    const end = document.getElementById('productsEnd');
    if (end) {
      if (items.length > visibleProducts) {
        end.textContent = `— ${state.lang === 'ru' ? 'Показать ещё' : 'Show more'} ${items.length - visibleProducts} —`;
        end.classList.remove('hidden');
        end.onclick = () => { visibleProducts += 6; renderProducts(); };
      } else end.classList.add('hidden');
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
  const reviews = state.reviews.filter(r => r.productId === id);
  modal.innerHTML = `
    <div style="font-size:52px;text-align:center;margin-bottom:10px;">${p.flag}</div>
    <h3 style="font-size:20px;font-weight:800;text-align:center;margin-bottom:6px;">${escapeHtml(p.name)}</h3>
    <div style="text-align:center;color:var(--muted);font-size:12px;margin-bottom:12px;">${escapeHtml(p.sub)}</div>
    <div class="product-rating" style="justify-content:center;margin-bottom:12px;">
      ${'<span class="star" style="color:var(--yellow);font-size:16px;">★</span>'.repeat(Math.round(p.rating))}
      <span style="margin-left:6px;font-weight:700;">${p.rating}</span>
      <span style="margin-left:8px;color:var(--muted);font-size:12px;">(${reviews.length})</span>
    </div>
    <div style="display:flex;gap:10px;justify-content:center;margin-bottom:16px;flex-wrap:wrap;">
      <div class="product-tag">⚡ ${state.lang === 'ru' ? 'Автовыдача' : 'Auto-delivery'}</div>
      <div class="product-tag">🛡 ${state.lang === 'ru' ? 'Гарантия 24ч' : 'Warranty 24h'}</div>
    </div>
    <div style="text-align:center;font-size:28px;font-weight:800;margin-bottom:16px;">
      ${p.price}₽ ${p.oldPrice ? `<span style="font-size:16px;color:var(--muted);text-decoration:line-through;margin-left:8px;">${p.oldPrice}₽</span>` : ''}
    </div>
    <div style="display:flex;gap:8px;margin-bottom:14px;">
      <button class="btn btn-secondary" style="flex:1;" data-fav-modal="${id}">${isFav ? '❤️' : '🤍'} ${state.lang === 'ru' ? 'Избранное' : 'Fav'}</button>
      <button class="btn btn-secondary" style="flex:1;" data-share="${id}">📤 ${state.lang === 'ru' ? 'Поделиться' : 'Share'}</button>
    </div>
    <button class="btn btn-primary btn-full" data-add-from-modal="${id}">${state.lang === 'ru' ? 'В корзину' : 'Add to cart'}</button>
    <button class="btn btn-secondary btn-full" style="margin-top:8px;" data-buy-from-modal="${id}">${state.lang === 'ru' ? 'Купить сразу' : 'Buy now'}</button>
  `;
  openModal('modalProduct');
}

function shareProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const link = `${BOT_LINK}?startapp=product_${id}`;
  if (navigator.share) navigator.share({ title: p.name, text: `${p.name} — ${p.price}₽`, url: link }).catch(()=>{});
  else { navigator.clipboard?.writeText(link); toast(state.lang === 'ru' ? 'Ссылка скопирована' : 'Link copied', 'success'); }
}

// ==================== FAVORITES ====================
function toggleFav(id) {
  const btn = document.querySelector(`[data-fav="${id}"]`);
  if (btn) btn.classList.add('loading');
  setTimeout(() => {
    const i = state.favorites.indexOf(id);
    if (i >= 0) state.favorites.splice(i, 1); else state.favorites.push(id);
    Storage.set('favorites', state.favorites);
    document.querySelectorAll(`[data-fav="${id}"]`).forEach(b => {
      const active = state.favorites.includes(id);
      b.classList.remove('loading');
      b.classList.toggle('active', active);
      const svg = b.querySelector('svg');
      if (svg) svg.setAttribute('fill', active ? 'currentColor' : 'none');
    });
    renderFavoritesFull();
    haptic('light');
    checkAchievements();
  }, 250);
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
        <button class="ffi-btn" data-fav-rm="${p.id}" aria-label="Remove">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <button class="ffi-btn primary" data-fav-to-cart="${p.id}" aria-label="Add to cart">
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

function clearRecent() { state.recent = []; Storage.set('recent', []); renderRecent(); toast(state.lang === 'ru' ? 'Очищено' : 'Cleared', 'success'); }

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
      <button class="btn btn-primary" data-pkg="${pkg.id}">${state.lang === 'ru' ? 'Взять' : 'Take'}</button>
    </div>
  `).join('');
}

function addPackageToCart(id) {
  const pkg = PACKAGES.find(p => p.id === id);
  if (!pkg) return;
  const existing = state.cart.find(c => c.id === pkg.id);
  if (existing) existing.qty = (existing.qty || 1) + 1;
  else state.cart.push({ id: pkg.id, name: pkg.title, flag: '🎁', price: pkg.price, qty: 1 });
  Storage.set('cart', state.cart);
  renderCartBadge(); renderCart(); updateStepper();
  toast(`${pkg.title} → ${state.lang === 'ru' ? 'в корзине' : 'added'}`, 'success');
  haptic('light');
}

// ==================== CART ====================
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const existing = state.cart.find(c => c.id === p.id);
  if (existing) existing.qty = (existing.qty || 1) + 1;
  else state.cart.push({ id: p.id, name: p.name, flag: p.flag, price: p.price, qty: 1 });
  Storage.set('cart', state.cart);
  renderCartBadge(); renderCart(); updateStepper();
  toast(`${p.name} → ${state.lang === 'ru' ? 'в корзине' : 'added'}`, 'success');
  haptic('light');
  playSound();
}

function buyNow(id) { addToCart(id); go('cart'); }

function renderCartBadge() {
  const badge = document.getElementById('cartBadge');
  const totalQty = state.cart.reduce((s, i) => s + (i.qty || 1), 0);
  if (!badge) return;
  if (totalQty > 0) { badge.textContent = totalQty; badge.classList.remove('hidden'); } else badge.classList.add('hidden');
}

function updateStepper() {
  const s1 = document.getElementById('step1');
  const s2 = document.getElementById('step2');
  const s3 = document.getElementById('step3');
  if (!s1) return;
  s1.classList.add('active');
  if (state.cart.length > 0) s2.classList.add('active'); else s2.classList.remove('active');
  s3.classList.remove('active');
}

function renderCart() {
  const list = document.getElementById('cartList');
  const empty = document.getElementById('cartEmpty');
  const summary = document.getElementById('cartSummary');
  const upsell = document.getElementById('upsell');
  if (!list) return;

  if (!state.cart.length) {
    list.innerHTML = ''; empty?.classList.remove('hidden'); summary?.classList.add('hidden'); upsell?.classList.add('hidden');
    return;
  }
  empty?.classList.add('hidden'); summary?.classList.remove('hidden');

  // Кнопка очистки
  const clearBtnHtml = `<button class="cart-clear-btn" onclick="clearCart()">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
    ${state.lang === 'ru' ? 'Очистить корзину' : 'Clear cart'}
  </button>`;

  list.innerHTML = clearBtnHtml + state.cart.map((item, i) => {
    const qty = item.qty || 1;
    return `
    <div class="cart-item">
      <div class="cart-item-info">
        <span class="cart-item-flag">${item.flag}</span>
        <div class="cart-item-text">
          <div class="cart-item-name">${escapeHtml(item.name)}</div>
          <div class="cart-item-price">${item.price}₽ ${qty > 1 ? `× ${qty} = ${item.price * qty}₽` : ''}</div>
        </div>
      </div>
      <div class="cart-item-qty">
        <button class="cart-qty-btn" onclick="changeCartQty(${i}, -1)">−</button>
        <span class="cart-qty-value">${qty}</span>
        <button class="cart-qty-btn" onclick="changeCartQty(${i}, 1)">+</button>
      </div>
      <button class="cart-remove" onclick="removeCart(${i})" aria-label="Remove">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>`;
  }).join('');

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
      </div>`).join('');
  } else upsell?.classList.add('hidden');

  // Подсчёт с qty
  const subtotal = state.cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  const loyaltyDiscount = Math.round(subtotal * getCashbackPercent() / 100);
  const promoDiscount = state.appliedPromo ? Math.round(subtotal * state.appliedPromo.disc / 100) : 0;

  // Баллы
  const maxPointsBySum = Math.floor(subtotal * POINTS_MAX_PERCENT / 100);
  const pointsUsed = state.usePoints ? Math.min(state.points, maxPointsBySum) : 0;

  const total = Math.max(0, subtotal - loyaltyDiscount - promoDiscount - pointsUsed);

  const setT = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setT('cartCount', state.cart.reduce((s, i) => s + (i.qty || 1), 0));
  setT('cartLoyalty', `-${loyaltyDiscount}₽`);
  setT('cartPromo', state.appliedPromo ? `${state.appliedPromo.code} (-${state.appliedPromo.disc}%)` : '—');
  setT('cartTotal', Math.max(0, total) + '₽');
  setT('pointsAvailable', state.points);

  const pointsRow = document.getElementById('cartPointsDiscountRow');
  const pointsDiscountEl = document.getElementById('cartPointsDiscount');
  if (state.usePoints && pointsUsed > 0) {
    pointsRow?.classList.remove('hidden');
    if (pointsDiscountEl) pointsDiscountEl.textContent = `-${pointsUsed}₽`;
  } else {
    pointsRow?.classList.add('hidden');
  }

  const balance = Storage.get('balance', 0);
  const check = document.getElementById('balanceCheck');
  const text = document.getElementById('balanceCheckText');
  const topUpBtn = document.getElementById('topUpQuick');
  if (!check) return;
  if (balance >= total) {
    check.classList.remove('insufficient');
    text.textContent = `✅ ${state.lang === 'ru' ? 'Баланс' : 'Balance'}: ${balance}₽`;
    topUpBtn?.classList.add('hidden');
  } else {
    check.classList.add('insufficient');
    text.textContent = `❌ ${state.lang === 'ru' ? 'Не хватает' : 'Need'} ${total - balance}₽`;
    topUpBtn?.classList.remove('hidden');
    if (topUpBtn) topUpBtn.textContent = `+${total - balance}₽`;
  }
}

function changeCartQty(index, delta) {
  const item = state.cart[index];
  if (!item) return;
  const newQty = (item.qty || 1) + delta;
  if (newQty < 1) { removeCart(index); return; }
  if (newQty > 99) return;
  item.qty = newQty;
  Storage.set('cart', state.cart);
  renderCart();
  renderCartBadge();
  haptic('light');
}

function removeCart(i) {
  state.cart.splice(i, 1);
  Storage.set('cart', state.cart);
  renderCart(); renderCartBadge(); updateStepper();
  haptic('light');
}

function clearCart() {
  if (!state.cart.length) return;
  if (!confirm(state.lang === 'ru' ? 'Очистить корзину?' : 'Clear cart?')) return;
  state.cart = [];
  Storage.set('cart', state.cart);
  renderCart(); renderCartBadge(); updateStepper();
  toast(state.lang === 'ru' ? 'Корзина очищена' : 'Cart cleared', 'success');
}

function toggleUsePoints() {
  const toggle = document.getElementById('usePointsToggle');
  state.usePoints = toggle?.checked || false;
  renderCart();
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
  const builtIn = { 'CASE5': 5, 'CASE10': 10, 'CASE15': 15, 'WELCOME10': 10, 'DESIRED5': 5 };
  let discount = promo ? promo.disc : (builtIn[code] || null);
  if (!discount) { resultEl.textContent = '❌ ' + (state.lang === 'ru' ? 'Не найден' : 'Not found'); resultEl.style.color = 'var(--accent)'; return; }
  if (state.usedPromos[code]) { resultEl.textContent = '❌ ' + (state.lang === 'ru' ? 'Уже использован' : 'Already used'); resultEl.style.color = 'var(--accent)'; return; }
  state.appliedPromo = { code, disc: discount };
  state.usedPromos[code] = 1;
  Storage.set('usedPromos', state.usedPromos);
  resultEl.textContent = `✅ -${discount}%`;
  resultEl.style.color = 'var(--green)';
  toast(`${state.lang === 'ru' ? 'Промокод' : 'Promo'} -${discount}%`, 'success');
  setTimeout(() => { closeModal('modalPromo'); renderCart(); document.getElementById('promoInput').value = ''; resultEl.textContent = ''; }, 1200);
}

function openPromoModal() { openModal('modalPromo'); }

// ==================== TOPUP ====================
function openTopUp() { openModal('modalTopUp'); }

function submitTopUp() {
  const input = document.getElementById('topUpAmount');
  const amount = +input.value;
  if (!amount || amount < 25) return toast(state.lang === 'ru' ? 'Минимум 25₽' : 'Min 25₽', 'error');
  Storage.set('balance', Storage.get('balance', 0) + amount);
  state.stats.topUp += amount;
  Storage.set('stats', state.stats);
  state.transactions.unshift({ type: 'in', title: state.lang === 'ru' ? 'Пополнение' : 'Top up', amount, date: Date.now() });
  Storage.set('transactions', state.transactions);
  updateProfileUI();
  renderTransactions();
  renderCart();
  closeModal('modalTopUp');
  input.value = '';
  animateBalanceChange(amount);
  toast(`+${amount}₽`, 'success');
  haptic('medium');
}

function animateBalanceChange(addAmount) {
  const balance = Storage.get('balance', 0);
  const topEl = document.getElementById('topBalance');
  const profEl = document.getElementById('profileBalance');
  const from = Math.max(0, balance - (addAmount || 100));
  if (topEl && !state.hideBalance) animateCounter(topEl, from, balance, 500, '₽');
  if (profEl && !state.hideBalance) animateCounter(profEl, from, balance, 500, '₽');
}

// ==================== CHECKOUT ====================
function checkout() {
  if (!state.cart.length) return;
  const subtotal = state.cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  const loyaltyDiscount = Math.round(subtotal * getCashbackPercent() / 100);
  const promoDiscount = state.appliedPromo ? Math.round(subtotal * state.appliedPromo.disc / 100) : 0;
  const maxPointsBySum = Math.floor(subtotal * POINTS_MAX_PERCENT / 100);
  const pointsUsed = state.usePoints ? Math.min(state.points, maxPointsBySum) : 0;
  const total = Math.max(0, subtotal - loyaltyDiscount - promoDiscount - pointsUsed);
  const balance = Storage.get('balance', 0);
  if (balance < total) return toast(state.lang === 'ru' ? 'Недостаточно средств' : 'Insufficient funds', 'error');
  Storage.set('balance', balance - total);

  // ВАЖНО (п.11): каждый товар = отдельный заказ
  const orderIds = [];
  const allItems = [];

  state.cart.forEach(cartItem => {
    const qty = cartItem.qty || 1;
    // Разбиваем на отдельные единицы
    for (let k = 0; k < qty; k++) {
      const orderId = 'ORD' + Date.now() + Math.random().toString(36).slice(2, 5);
      orderIds.push(orderId);
      const itemPrice = cartItem.price;
      // Пропорционально распределяем скидки на каждый товар
      const itemLoyalty = Math.round(itemPrice * getCashbackPercent() / 100);
      const itemPromo = state.appliedPromo ? Math.round(itemPrice * state.appliedPromo.disc / 100) : 0;
      const itemPoints = qty > 0 ? Math.round(pointsUsed / qty) : 0;
      const itemTotal = Math.max(0, itemPrice - itemLoyalty - itemPromo - itemPoints);

      state.orders.push({ id: orderId, items: [{ name: cartItem.name, flag: cartItem.flag, price: itemPrice }], total: itemTotal, status: 'Выдан', date: Date.now() });
      state.inventory.push({
        id: 'INV' + Date.now() + Math.random().toString(36).slice(2,6),
        orderId, name: cartItem.name, flag: cartItem.flag, price: itemPrice,
        status: 'active', guarantee: '24ч', date: Date.now(),
        data: 'Логин: example@user\nПароль: ' + Math.random().toString(36).slice(2, 12)
      });
      allItems.push({ name: cartItem.name, flag: cartItem.flag, price: itemPrice });
    }

    // Уменьшаем сток товара
    const p = PRODUCTS.find(x => x.id === cartItem.id);
    if (p && p.stock > 0) p.stock = Math.max(0, p.stock - qty);
  });

  Storage.set('orders', state.orders);
  Storage.set('inventory', state.inventory);
  saveProducts();

  // Списание баллов
  if (pointsUsed > 0) {
    state.points = Math.max(0, state.points - pointsUsed);
    Storage.set('points', state.points);
  }

  state.transactions.unshift({ type: 'out', title: `Заказ ${total}₽`, amount: total, date: Date.now() });
  Storage.set('transactions', state.transactions);

  state.stats.spent += total;
  state.stats.orders += allItems.length;
  const earnedPoints = Math.round(total * 0.05);
  state.points += earnedPoints;
  Storage.set('stats', state.stats);
  Storage.set('points', state.points);

  state.cart = [];
  state.appliedPromo = null;
  state.usePoints = false;
  Storage.set('cart', state.cart);
  Storage.set('appliedPromo', null);

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

  showThanksScreen(orderIds[0], allItems, total);
}

// ==================== THANKS ====================
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
      </div>`).join('');
  }
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
      confettiEl.appendChild(c);
    }
  }
  openModal('modalThanks');
  haptic('heavy');
}

function thanksGoInventory() { closeModal('modalThanks'); setTimeout(() => go('inventory'), 200); }

function thanksShare() {
  const text = 'Купил в desired — топовый маркет цифровых товаров! 🔥';
  const link = `${BOT_LINK}?start=ref_${state.currentUser?.username || 'user'}`;
  if (navigator.share) navigator.share({ title: 'desired', text, url: link }).catch(()=>{});
  else { navigator.clipboard?.writeText(`${text}\n${link}`); toast(state.lang === 'ru' ? 'Скопировано' : 'Copied', 'success'); }
}

// ==================== STARS/PREMIUM (п.7) ====================
function openStarsBuy(mode) {
  state.msbMode = mode || 'stars';
  state.msbPremiumMonths = 12;
  const modal = document.getElementById('modalStarsBuy');
  if (!modal) return;
  const selfUsername = state.currentUser?.username || '';
  const recInput = document.getElementById('msb2Recipient');
  if (recInput) recInput.value = '@' + selfUsername;
  document.querySelectorAll('.msb2-toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === state.msbMode));
  updateMSBModeUI();
  openModal('modalStarsBuy');
}

function updateMSBModeUI() {
  const starsBlock = document.getElementById('msb2StarsBlock');
  const premBlock = document.getElementById('msb2PremiumBlock');
  const modeName = document.getElementById('msb2ModeName');
  const modeSub = document.getElementById('msb2ModeSub');
  const totalEl = document.getElementById('msb2Total');
  if (state.msbMode === 'stars') {
    starsBlock?.classList.remove('hidden');
    premBlock?.classList.add('hidden');
    if (modeName) modeName.textContent = t('stars');
    if (modeSub) modeSub.textContent = state.lang === 'ru' ? 'Купите себе или друзьям' : 'Buy for yourself or friends';
  } else {
    starsBlock?.classList.add('hidden');
    premBlock?.classList.remove('hidden');
    if (modeName) modeName.textContent = t('premium');
    if (modeSub) modeSub.textContent = state.lang === 'ru' ? 'Самые низкие цены на рынке' : 'Lowest prices on the market';
  }
  updateMSBTotal();
}

function updateMSBTotal() {
  const totalEl = document.getElementById('msb2Total');
  if (!totalEl) return;
  let price = 0;
  if (state.msbMode === 'stars') {
    const amount = +document.getElementById('msb2StarsAmount')?.value || 0;
    price = Math.round(amount * STARS_PRICE_PER_STAR);
  } else {
    price = PREMIUM_PRICES[state.msbPremiumMonths] || 0;
  }
  totalEl.textContent = price > 0 ? `≈ ${price}₽` : '—';
}

function msb2SetSelf() {
  const u = state.currentUser?.username || '';
  const inp = document.getElementById('msb2Recipient');
  if (inp) inp.value = '@' + u;
  haptic('light');
}

function msb2SetStars(n) {
  const inp = document.getElementById('msb2StarsAmount');
  if (inp) inp.value = n;
  updateMSBTotal();
  haptic('light');
}

function msb2SelectPremium(months) {
  state.msbPremiumMonths = months;
  document.querySelectorAll('.msb2-prem-opt').forEach(o => o.classList.toggle('active', +o.dataset.months === months));
  updateMSBModeUI();
  haptic('light');
}

function msb2Buy() {
  const terms = document.getElementById('msb2Terms')?.checked;
  if (!terms) return toast(state.lang === 'ru' ? 'Прими условия' : 'Accept terms', 'error');
  const recipient = document.getElementById('msb2Recipient')?.value.trim();
  if (!recipient) return toast(state.lang === 'ru' ? 'Укажи получателя' : 'Enter recipient', 'error');

  let name = '', price = 0, flag = '⭐';
  if (state.msbMode === 'stars') {
    const amount = +document.getElementById('msb2StarsAmount')?.value || 0;
    if (amount < 50) return toast(state.lang === 'ru' ? 'Минимум 50 звёзд' : 'Min 50 stars', 'error');
    price = Math.round(amount * STARS_PRICE_PER_STAR);
    name = `Stars ${amount} → ${recipient}`;
  } else {
    const months = state.msbPremiumMonths;
    price = PREMIUM_PRICES[months];
    flag = '💎';
    name = `Premium ${months} мес → ${recipient}`;
  }

  const balance = Storage.get('balance', 0);
  if (balance < price) return toast(state.lang === 'ru' ? 'Недостаточно средств' : 'Insufficient funds', 'error');

  Storage.set('balance', balance - price);
  state.stats.spent += price;
  state.stats.orders += 1;
  state.points += Math.round(price * 0.05);
  Storage.set('stats', state.stats);
  Storage.set('points', state.points);

  const orderId = 'ORD' + Date.now();
  state.orders.push({ id: orderId, items: [{ name, flag, price }], total: price, status: 'Выдан', date: Date.now() });
  state.inventory.push({
    id: 'INV' + Date.now() + Math.random().toString(36).slice(2,6),
    orderId, name, flag, price, status: 'active', guarantee: '24ч', date: Date.now(),
    data: `Получатель: ${recipient}\nТовар: ${name}\nДата: ${new Date().toLocaleString('ru-RU')}`
  });
  Storage.set('orders', state.orders);
  Storage.set('inventory', state.inventory);
  state.transactions.unshift({ type: 'out', title: `Заказ ${price}₽`, amount: price, date: Date.now() });
  Storage.set('transactions', state.transactions);

  closeModal('modalStarsBuy');
  updateProfileUI();
  renderOrders(); renderInventory(); renderTransactions(); renderCart();
  checkLoyalty(); checkAchievements();
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
    </div>`).join('');
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
    </div>`).join('');
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
        <div class="inv-card-status ${item.status === 'active' ? 'active' : 'history'}">${item.status === 'active' ? '✓' : ''}</div>
      </div>
      <div class="inv-card-body">
        ${state.lang === 'ru' ? 'Заказ' : 'Order'}: ${item.orderId}<br>
        ${state.lang === 'ru' ? 'Куплено' : 'Purchased'}: ${new Date(item.date).toLocaleString()}<br>
        ${state.lang === 'ru' ? 'Гарантия' : 'Warranty'}: ${item.guarantee}
      </div>
      <div class="inv-card-actions">
        <button class="inv-action-btn" data-inv-copy="${item.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          ${state.lang === 'ru' ? 'Данные' : 'Data'}
        </button>
        <button class="inv-action-btn" data-inv-review="${encodeURIComponent(item.name)}" data-inv-review-id="${item.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          ${state.lang === 'ru' ? 'Оценить' : 'Rate'}
        </button>
        <button class="inv-action-btn" data-inv-again="${encodeURIComponent(item.name)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          ${state.lang === 'ru' ? 'Снова' : 'Again'}
        </button>
      </div>
    </div>`).join('');
}

function copyInvData(id) {
  const item = state.inventory.find(x => x.id === id);
  if (!item) return;
  navigator.clipboard?.writeText(item.data);
  toast(state.lang === 'ru' ? 'Данные скопированы' : 'Data copied', 'success');
  haptic('light');
}

function reviewProductFromInv(name, invId) {
  const inv = state.inventory.find(i => i.id === invId);
  if (!inv) { go('reviews'); return; }
  // Находим product по имени
  const prod = PRODUCTS.find(p => p.name === name);
  go('reviews');
  setTimeout(() => {
    if (prod) {
      state.reviewSelectedProduct = prod.id;
      state.reviewsFilterProduct = prod.id;
      renderReviewsProductChips();
      const chosen = document.getElementById('reviewProductChosen');
      const chosenName = document.getElementById('rpcName');
      if (chosen) chosen.classList.remove('hidden');
      if (chosenName) chosenName.textContent = `${prod.flag} ${prod.name}`;
      document.getElementById('reviewFormAnchor')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      toast(`Оцени: ${name}`, 'info');
    }
  }, 400);
}

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
  toast(state.lang === 'ru' ? 'Ссылка скопирована' : 'Link copied', 'success');
  haptic('light');
}

// ==================== REVIEWS (по товарам) ====================
function getPurchasedProducts() {
  // Возвращает список товаров, которые юзер покупал (для отзывов)
  const purchasedNames = new Set(state.orders.flatMap(o => o.items.map(i => i.name)));
  return PRODUCTS.filter(p => purchasedNames.has(p.name) || state.orders.some(o => o.items.some(it => it.name === p.name)));
}

function renderReviewsProductChips() {
  const chipsWrap = document.getElementById('reviewsProductChips');
  const hint = document.getElementById('reviewsNoProducts');
  const form = document.getElementById('reviewFormAnchor');
  if (!chipsWrap) return;

  const purchased = getPurchasedProducts();
  if (!purchased.length) {
    chipsWrap.innerHTML = '';
    hint?.classList.remove('hidden');
    form?.classList.add('disabled');
    return;
  }
  hint?.classList.add('hidden');
  form?.classList.remove('disabled');

  const allChip = `<button class="rps-chip ${!state.reviewsFilterProduct ? 'active' : ''}" onclick="setReviewsFilterProduct(null)">${state.lang === 'ru' ? 'Все отзывы' : 'All reviews'}</button>`;
  chipsWrap.innerHTML = allChip + purchased.map(p => `
    <button class="rps-chip ${state.reviewsFilterProduct === p.id ? 'active' : ''}" onclick="setReviewsFilterProduct(${p.id})">
      ${p.flag} ${escapeHtml(p.name)}
    </button>`).join('');
}

function setReviewsFilterProduct(productId) {
  state.reviewsFilterProduct = productId;
  state.reviewSelectedProduct = productId;
  renderReviewsProductChips();
  renderReviews();
  if (productId) {
    const p = PRODUCTS.find(x => x.id === productId);
    const chosen = document.getElementById('reviewProductChosen');
    const chosenName = document.getElementById('rpcName');
    if (chosen) chosen.classList.remove('hidden');
    if (chosenName && p) chosenName.textContent = `${p.flag} ${p.name}`;
  } else {
    document.getElementById('reviewProductChosen')?.classList.add('hidden');
    state.reviewSelectedProduct = null;
  }
  haptic('light');
}

function renderReviews() {
  const list = document.getElementById('reviewsList');
  const avg = document.getElementById('reviewAvg');
  const count = document.getElementById('reviewCount');
  if (!list) return;
  let items = [...state.reviews];
  if (state.reviewsFilterProduct) items = items.filter(r => r.productId === state.reviewsFilterProduct);
  if (state.reviewFilter === '5') items = items.filter(r => r.rating === 5);
  if (state.reviewFilter === '4') items = items.filter(r => r.rating === 4);
  if (state.reviewFilter === '3') items = items.filter(r => r.rating === 3);
  if (avg) avg.textContent = items.length ? (items.reduce((s, r) => s + (r.rating || 5), 0) / items.length).toFixed(1) : '5.0';
  if (count) count.textContent = state.reviews.length;

  updateReviewDistribution(items);

  if (!items.length) { list.innerHTML = `<div style="text-align:center;color:var(--muted);padding:20px;font-size:13px;">${state.lang === 'ru' ? 'Пока нет отзывов' : 'No reviews yet'}</div>`; return; }
  list.innerHTML = items.map(r => {
    const authorName = r.authorName || r.author || 'user';
    const initial = authorName[0].toUpperCase();
    const prod = r.productId ? PRODUCTS.find(p => p.id === r.productId) : null;
    return `
      <div class="review-item">
        ${prod ? `<div class="review-product-tag">${prod.flag} ${escapeHtml(prod.name)}</div>` : ''}
        <div class="review-head">
          <div class="review-author-wrap">
            <div class="review-avatar">${escapeHtml(initial)}</div>
            <div>
              <div class="review-author-name">${escapeHtml(authorName)}</div>
              <div class="review-author-sub">${state.lang === 'ru' ? 'Покупатель' : 'Buyer'}</div>
            </div>
          </div>
          <div class="review-date">${new Date(r.date).toLocaleDateString()}</div>
        </div>
        <div class="review-stars-row">
          ${'<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'.repeat(r.rating || 5)}
        </div>
        <div class="review-text">${escapeHtml(r.text)}</div>
      </div>`;
  }).join('');
}

function updateReviewDistribution(items) {
  const list = items || state.reviews;
  const total = list.length || 1;
  const counts = [0,0,0,0,0];
  list.forEach(r => { if (r.rating >= 1 && r.rating <= 5) counts[r.rating-1]++; });
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
  if (!items.length) { el.innerHTML = `<div style="text-align:center;color:var(--muted);padding:16px;font-size:13px;">${state.lang === 'ru' ? 'Пока нет отзывов' : 'No reviews yet'}</div>`; return; }
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
  if (!text) return toast(state.lang === 'ru' ? 'Напиши отзыв' : 'Write a review', 'error');
  const purchased = getPurchasedProducts();
  if (!purchased.length) return toast(state.lang === 'ru' ? 'Сначала купи товар' : 'Buy something first', 'error');
  const productId = state.reviewSelectedProduct;
  if (!productId) return toast(state.lang === 'ru' ? 'Выбери товар' : 'Choose a product', 'error');

  const authorName = state.currentUser?.displayName || state.tgUser?.first_name || state.currentUser?.firstName || 'user';
  state.reviews.unshift({
    author: state.currentUser?.username || 'user',
    authorName: authorName,
    text, rating: state.reviewRating, date: Date.now(),
    productId: productId
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
  toast(state.lang === 'ru' ? 'Отзыв опубликован! +10 баллов' : 'Review posted! +10 points', 'success');
  checkAchievements();
}

function scrollToReviewForm() {
  if (!getPurchasedProducts().length) return toast(state.lang === 'ru' ? 'Сначала купи товар' : 'Buy something first', 'error');
  const el = document.getElementById('reviewFormAnchor');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ==================== FAQ ====================
function renderFAQ() {
  const el = document.getElementById('faqList');
  if (!el) return;
  const q = document.getElementById('faqSearch')?.value?.toLowerCase().trim() || '';
  let filtered = FAQ;
  if (state.faqCat !== 'all') filtered = filtered.filter(f => f.cat === state.faqCat);
  if (q) filtered = filtered.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  if (!filtered.length) {
    el.innerHTML = `<div style="text-align:center;color:var(--muted);padding:20px;">${state.lang === 'ru' ? 'Ничего не найдено' : 'Nothing found'}</div>`;
    return;
  }
  el.innerHTML = filtered.map(f => {
    let qHtml = escapeHtml(f.q); let aHtml = escapeHtml(f.a);
    if (q) {
      const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      qHtml = qHtml.replace(re, '<mark>$1</mark>');
      aHtml = aHtml.replace(re, '<mark>$1</mark>');
    }
    return `<div class="faq-item" data-faq><div class="faq-q">${qHtml}<span>▾</span></div><div class="faq-a">${aHtml}</div></div>`;
  }).join('');
}

// ==================== INFO ====================
function renderInfo() {
  const el = document.getElementById('infoList');
  if (!el) return;
  el.innerHTML = INFO_ITEMS.map(f => `<div class="faq-item" data-faq><div class="faq-q">${escapeHtml(f.q)}<span>▾</span></div><div class="faq-a">${escapeHtml(f.a)}</div></div>`).join('');
}

// ==================== PROGRESS CARD ====================
function renderProgressCard() {
  const el = document.getElementById('progressTasks');
  const count = document.getElementById('progressCount');
  const fill = document.getElementById('progressFill');
  if (!el) return;

  const today = new Date().setHours(0,0,0,0);
  const todayOrders = state.orders.filter(o => o.date >= today).length;
  const todayReviews = state.reviews.filter(r => r.date >= today).length;
  const bonusToday = (state.dailyBonus.lastClaim || 0) >= today;

  const tasks = [
    { done: todayOrders >= 1, text: state.lang === 'ru' ? 'Сделай заказ' : 'Place an order', reward: '+25₽' },
    { done: todayReviews >= 1, text: state.lang === 'ru' ? 'Оставь отзыв' : 'Leave a review', reward: '+10₽' },
    { done: bonusToday, text: state.lang === 'ru' ? 'Забери бонус дня' : 'Claim daily bonus', reward: '+5₽' }
  ];
  const doneCount = tasks.filter(t => t.done).length;
  if (count) count.textContent = `${doneCount}/${tasks.length}`;
  if (fill) fill.style.width = (doneCount / tasks.length * 100) + '%';

  el.innerHTML = tasks.map(task => `
    <div class="progress-task ${task.done ? 'done' : ''}">
      <span class="progress-task-check"></span>
      <span class="progress-task-text">${task.text}</span>
      <span class="progress-task-reward">${task.reward}</span>
    </div>`).join('');
}

// ==================== SOCIAL: FRIENDS ====================
function getPublicUser(id) {
  // Для демо: если это текущий юзер — берём его, иначе генерируем мокового
  if (id === state.currentUser?.shortId) return state.currentUser;
  // Ищем в моковой базе
  return MOCK_USERS.find(u => u.shortId === id) || null;
}

const MOCK_USERS = [
  { shortId: '123456', name: 'Alex', username: 'alex_p', bio: 'Топовый реселлер', verified: true, online: true, orders: 287, spent: 42500, friends: 42, avatar: null },
  { shortId: '234567', name: 'Michael', username: 'mike_trade', bio: 'Покупаю оптом', verified: true, online: false, orders: 194, spent: 28900, friends: 31, avatar: null },
  { shortId: '345678', name: 'Sofia', username: 'sofia_x', bio: 'Люблю аккаунты', verified: false, online: true, orders: 87, spent: 12400, friends: 18, avatar: null },
  { shortId: '456789', name: 'Daniel', username: 'dan_kz', bio: 'Казахстан', verified: false, online: false, orders: 42, spent: 5600, friends: 12, avatar: null },
  { shortId: '567890', name: 'Kate', username: 'kate_n', bio: '', verified: false, online: true, orders: 156, spent: 19800, friends: 24, avatar: null },
  { shortId: '678901', name: 'Ivan', username: 'ivan_p', bio: 'Купи-продай', verified: true, online: false, orders: 320, spent: 51000, friends: 56, avatar: null },
  { shortId: '789012', name: 'Anna', username: 'anna_z', bio: '', verified: false, online: true, orders: 67, spent: 8900, friends: 15, avatar: null },
  { shortId: '890123', name: 'Peter', username: 'peter_v', bio: 'Stars → Premium', verified: false, online: false, orders: 12, spent: 1200, friends: 5, avatar: null }
];

function renderFriends() {
  const list = document.getElementById('friendsList');
  const empty = document.getElementById('friendsEmpty');
  if (!list) return;
  if (!state.friends.length) { list.innerHTML = ''; empty?.classList.remove('hidden'); return; }
  empty?.classList.add('hidden');
  list.innerHTML = state.friends.map(f => {
    const user = getPublicUser(f.id);
    if (!user) return '';
    const initial = (user.name || user.displayName || 'U')[0].toUpperCase();
    const isOnline = user.online;
    return `
      <div class="friend-item" data-open-user="${user.shortId}">
        <div class="friend-avatar">${initial}<span class="friend-online-dot ${isOnline ? 'online' : ''}"></span></div>
        <div class="friend-info">
          <div class="friend-name">${escapeHtml(user.name || user.displayName || user.username)}${user.verified ? `<span class="friend-verified"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4M12 2l2.09 3.26L18 4.27l2.09 3.26L23 9.27l-2.91 2.28L22 15.19l-3.91 1.06L18 19.51l-3.91-.77L12 22l-2.09-3.26L6 19.51l-2.09-3.26L1 14.73l2.91-2.28L2 8.81l3.91-1.06L6 4.49l3.91.77L12 2z"/></svg></span>` : ''}</div>
          <div class="friend-sub">#${user.shortId} · ${user.online ? (state.lang === 'ru' ? 'онлайн' : 'online') : (state.lang === 'ru' ? 'был(а) недавно' : 'recently')}</div>
        </div>
        <div class="friend-actions">
          <button class="friend-action-btn primary" data-chat-with="${user.shortId}" onclick="event.stopPropagation()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
          <button class="friend-action-btn" data-remove-friend="${user.shortId}" onclick="event.stopPropagation()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>`;
  }).join('');
}

function renderIncoming() {
  const wrap = document.getElementById('friendsIncoming');
  const list = document.getElementById('incomingList');
  const count = document.getElementById('incomingCount');
  if (!wrap || !list) return;
  if (!state.friendRequests.length) { wrap.classList.add('hidden'); return; }
  wrap.classList.remove('hidden');
  if (count) count.textContent = state.friendRequests.length;
  list.innerHTML = state.friendRequests.map(req => {
    const user = getPublicUser(req.from);
    if (!user) return '';
    const initial = (user.name || 'U')[0].toUpperCase();
    return `
      <div class="incoming-item">
        <div class="incoming-avatar">${initial}</div>
        <div class="incoming-info">
          <div class="incoming-name">${escapeHtml(user.name || user.username)}</div>
          <div class="incoming-sub">#${user.shortId}</div>
        </div>
        <div class="incoming-actions">
          <button class="friend-action-btn primary" data-accept-friend="${user.shortId}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </button>
          <button class="friend-action-btn" data-decline-friend="${user.shortId}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>`;
  }).join('');
}

function updateFriendsCount() {
  const el = document.getElementById('friendsCount');
  const badge = document.getElementById('friendsCountBadge');
  if (el) el.textContent = state.friends.length;
  if (badge) {
    if (state.friends.length > 0) { badge.textContent = state.friends.length; badge.style.display = 'flex'; }
    else badge.style.display = 'none';
  }
}

function searchFriends(q) {
  const list = document.getElementById('friendsList');
  const empty = document.getElementById('friendsEmpty');
  if (!list) return;
  const query = q.toLowerCase().trim();
  let filtered = state.friends;
  if (query) {
    filtered = state.friends.filter(f => {
      const u = getPublicUser(f.id);
      if (!u) return false;
      return (u.name || '').toLowerCase().includes(query) || (u.username || '').toLowerCase().includes(query) || u.shortId.includes(query);
    });
  }
  if (!filtered.length) {
    list.innerHTML = '';
    if (empty) {
      empty.classList.remove('hidden');
      empty.querySelector('.empty-title').textContent = query ? (state.lang === 'ru' ? 'Не найдено' : 'Not found') : (state.lang === 'ru' ? 'Пока никого нет' : 'Nobody yet');
    }
    return;
  }
  empty?.classList.add('hidden');
  // тот же рендер что и в renderFriends
  list.innerHTML = filtered.map(f => {
    const user = getPublicUser(f.id);
    if (!user) return '';
    const initial = (user.name || 'U')[0].toUpperCase();
    return `
      <div class="friend-item" data-open-user="${user.shortId}">
        <div class="friend-avatar">${initial}<span class="friend-online-dot ${user.online ? 'online' : ''}"></span></div>
        <div class="friend-info">
          <div class="friend-name">${escapeHtml(user.name || user.username)}</div>
          <div class="friend-sub">#${user.shortId}</div>
        </div>
        <div class="friend-actions">
          <button class="friend-action-btn primary" data-chat-with="${user.shortId}" onclick="event.stopPropagation()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>
      </div>`;
  }).join('');
}

function copyMyId() {
  const id = state.currentUser?.shortId || '';
  navigator.clipboard?.writeText(id);
  toast(state.lang === 'ru' ? 'ID скопирован' : 'ID copied', 'success');
  haptic('light');
}

function addFriend(id) {
  if (state.friends.some(f => f.id === id)) return toast(state.lang === 'ru' ? 'Уже в друзьях' : 'Already friends', 'error');
  const user = getPublicUser(id);
  if (!user) return toast(state.lang === 'ru' ? 'Пользователь не найден' : 'User not found', 'error');
  state.friends.push({ id, addedAt: Date.now() });
  Storage.set('friends', state.friends);
  renderFriends();
  renderPeopleResults();
  updateFriendsCount();
  checkAchievements();
  toast(`${user.name || user.username} ${state.lang === 'ru' ? 'добавлен в друзья' : 'added'}`, 'success');
  haptic('medium');
}

function removeFriend(id) {
  state.friends = state.friends.filter(f => f.id !== id);
  Storage.set('friends', state.friends);
  renderFriends();
  renderPeopleResults();
  updateFriendsCount();
  toast(state.lang === 'ru' ? 'Удалён из друзей' : 'Removed', 'success');
  haptic('light');
}

function acceptFriend(id) {
  state.friendRequests = state.friendRequests.filter(r => r.from !== id);
  Storage.set('friendRequests', state.friendRequests);
  addFriend(id);
  renderIncoming();
}

function declineFriend(id) {
  state.friendRequests = state.friendRequests.filter(r => r.from !== id);
  Storage.set('friendRequests', state.friendRequests);
  renderIncoming();
  haptic('light');
}

// ==================== SOCIAL: PEOPLE SEARCH ====================
function renderPeopleResults() {
  const el = document.getElementById('peopleResults');
  if (!el) return;
  const q = document.getElementById('peopleSearchInput')?.value?.toLowerCase().trim() || '';
  if (!q) { el.innerHTML = ''; return; }

  const results = MOCK_USERS.filter(u =>
    u.shortId.includes(q) || u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)
  );

  if (!results.length) {
    el.innerHTML = `<div style="text-align:center;color:var(--muted);padding:20px;font-size:13px;">${state.lang === 'ru' ? 'Никого не найдено' : 'Nobody found'}</div>`;
    return;
  }

  el.innerHTML = results.map(u => {
    const initial = u.name[0].toUpperCase();
    const isFriend = state.friends.some(f => f.id === u.shortId);
    return `
      <div class="person-item" data-open-user="${u.shortId}">
        <div class="person-avatar">${initial}<span class="friend-online-dot ${u.online ? 'online' : ''}"></span></div>
        <div class="person-info">
          <div class="person-name">${escapeHtml(u.name)}${u.verified ? `<span class="person-verified"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4M12 2l2.09 3.26L18 4.27l2.09 3.26L23 9.27l-2.91 2.28L22 15.19l-3.91 1.06L18 19.51l-3.91-.77L12 22l-2.09-3.26L6 19.51l-2.09-3.26L1 14.73l2.91-2.28L2 8.81l3.91-1.06L6 4.49l3.91.77L12 2z"/></svg></span>` : ''}</div>
          <div class="person-sub">#${u.shortId} · @${escapeHtml(u.username)}</div>
        </div>
        <div class="person-actions">
          ${isFriend
            ? `<button class="person-action-btn" data-chat-with="${u.shortId}" onclick="event.stopPropagation()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
               </button>`
            : `<button class="person-action-btn primary" data-add-friend="${u.shortId}" onclick="event.stopPropagation()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
               </button>`}
        </div>
      </div>`;
  }).join('');
}

// ==================== SOCIAL: PUBLIC PROFILE ====================
function openUserProfile(id) {
  const user = getPublicUser(id);
  if (!user) return;
  state.currentUserId = id;
  state.privacyFrom = id;

  const isSelf = id === state.currentUser?.shortId;
  const isFriend = state.friends.some(f => f.id === id);
  const initial = (user.name || user.displayName || 'U')[0].toUpperCase();

  // Проверка приватности
  const canSeeBalance = isSelf || state.privacy.balance === 'all' || (state.privacy.balance === 'friends' && isFriend);
  const canSeePoints = isSelf || state.privacy.points === 'all' || (state.privacy.points === 'friends' && isFriend);
  const canSeeStats = isSelf || state.privacy.stats === 'all' || (state.privacy.stats === 'friends' && isFriend);
  const canSeeUsername = isSelf || state.privacy.username === 'all' || (state.privacy.username === 'friends' && isFriend);
  const canSeeAvatar = isSelf || state.privacy.avatar === 'all' || (state.privacy.avatar === 'friends' && isFriend);
  const canDm = isSelf || state.privacy.dm === 'all' || (state.privacy.dm === 'friends' && isFriend);

  const avatarStyle = canSeeAvatar && user.avatar
    ? `background-image:url(${user.avatar})`
    : `background:linear-gradient(135deg,var(--accent),var(--accent-dark))`;

  const content = document.getElementById('publicProfileContent');
  if (!content) return;

  content.innerHTML = `
    <div class="public-profile-head">
      <div class="public-profile-avatar" style="${avatarStyle}">${canSeeAvatar && user.avatar ? '' : initial}</div>
      <div class="public-profile-name">
        ${escapeHtml(user.name || user.displayName || 'user')}
        ${user.verified ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4M12 2l2.09 3.26L18 4.27l2.09 3.26L23 9.27l-2.91 2.28L22 15.19l-3.91 1.06L18 19.51l-3.91-.77L12 22l-2.09-3.26L6 19.51l-2.09-3.26L1 14.73l2.91-2.28L2 8.81l3.91-1.06L6 4.49l3.91.77L12 2z"/></svg>` : ''}
      </div>
      <div class="public-profile-id">
        #${user.shortId}${canSeeUsername && user.username ? ` · @${escapeHtml(user.username)}` : ''}
      </div>
      ${user.online ? `<div class="public-profile-status"><span class="public-profile-status-dot"></span>${state.lang === 'ru' ? 'ОНЛАЙН' : 'ONLINE'}</div>` : ''}
    </div>
    ${user.bio ? `<div class="public-profile-bio">${escapeHtml(user.bio)}</div>` : ''}
    <div class="public-profile-stats">
      <div class="public-profile-stat">
        <div class="public-profile-stat-value">${canSeeStats ? (user.orders || 0) : '•••'}</div>
        <div class="public-profile-stat-label">${state.lang === 'ru' ? 'Заказов' : 'Orders'}</div>
      </div>
      <div class="public-profile-stat">
        <div class="public-profile-stat-value">${canSeeStats ? (user.spent || 0).toLocaleString() + '₽' : '•••'}</div>
        <div class="public-profile-stat-label">${state.lang === 'ru' ? 'Потрачено' : 'Spent'}</div>
      </div>
      <div class="public-profile-stat">
        <div class="public-profile-stat-value">${user.friends || 0}</div>
        <div class="public-profile-stat-label">${state.lang === 'ru' ? 'Друзей' : 'Friends'}</div>
      </div>
    </div>
    <div class="public-profile-actions">
      ${!isSelf ? `
        <div class="public-profile-actions-row">
          ${!isFriend ? `
            <button class="btn btn-primary" onclick="addFriendFromProfile('${user.shortId}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
              ${state.lang === 'ru' ? 'Добавить' : 'Add'}
            </button>
          ` : `
            <button class="btn btn-secondary" onclick="removeFriendFromProfile('${user.shortId}')">
              ${state.lang === 'ru' ? 'Удалить из друзей' : 'Remove friend'}
            </button>
          `}
          ${canDm ? `
            <button class="btn btn-secondary" onclick="openChatWith('${user.shortId}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              ${state.lang === 'ru' ? 'Написать' : 'Message'}
            </button>
          ` : ''}
        </div>
      ` : `
        <button class="btn btn-primary" onclick="closeModal('modalPublicProfile'); go('profile')">
          ${state.lang === 'ru' ? 'Редактировать профиль' : 'Edit profile'}
        </button>
      `}
    </div>
    <div class="public-profile-ach">
      <div class="public-profile-ach-title">${state.lang === 'ru' ? 'Достижения' : 'Achievements'}</div>
      <div class="public-profile-ach-list">
        ${ACHIEVEMENTS.slice(0, 6).map((a, i) => `<div class="public-profile-ach-item ${i < 3 ? '' : 'locked'}" title="${a.name}">${a.icon}</div>`).join('')}
      </div>
    </div>
  `;
  openModal('modalPublicProfile');
}

function addFriendFromProfile(id) {
  addFriend(id);
  closeModal('modalPublicProfile');
}

function removeFriendFromProfile(id) {
  removeFriend(id);
  closeModal('modalPublicProfile');
}

// ==================== SOCIAL: CHATS ====================
function openChatWith(userId) {
  state.currentChatId = userId;
  const user = getPublicUser(userId);
  if (!user) return;
  closeModal('modalPublicProfile');
  closeModal('modalFriendRequest');
  renderUserChat();
  openModal('modalUserChat');
}

function openUserProfileFromChat() {
  if (state.currentChatId) {
    closeModal('modalUserChat');
    setTimeout(() => openUserProfile(state.currentChatId), 200);
  }
}

function renderUserChat() {
  const user = getPublicUser(state.currentChatId);
  if (!user) return;
  const avatarEl = document.getElementById('ucAvatar');
  const nameEl = document.getElementById('ucName');
  const statusText = document.getElementById('ucStatusText');
  const messagesEl = document.getElementById('ucMessages');
  const initial = (user.name || 'U')[0].toUpperCase();

  if (avatarEl) {
    if (user.avatar) { avatarEl.style.backgroundImage = `url(${user.avatar})`; avatarEl.textContent = ''; }
    else { avatarEl.style.backgroundImage = ''; avatarEl.textContent = initial; }
  }
  if (nameEl) nameEl.textContent = user.name || user.username;
  if (statusText) statusText.textContent = user.online ? (state.lang === 'ru' ? 'Онлайн' : 'Online') : (state.lang === 'ru' ? 'Был(а) недавно' : 'Recently');

  // История сообщений
  const chat = state.chats.find(c => c.userId === state.currentChatId);
  const messages = chat?.messages || [];
  if (messagesEl) {
    if (!messages.length) {
      messagesEl.innerHTML = `<div class="aic-msg system">${state.lang === 'ru' ? 'Начни общение первым 👋' : 'Start the conversation 👋'}</div>`;
    } else {
      messagesEl.innerHTML = messages.map(m => `<div class="aic-msg ${m.role === 'me' ? 'user' : 'ai'}">${escapeHtml(m.text)}</div>`).join('');
    }
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
}

function sendUserMessage() {
  const inp = document.getElementById('ucInput');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text || !state.currentChatId) return;
  let chat = state.chats.find(c => c.userId === state.currentChatId);
  if (!chat) {
    chat = { userId: state.currentChatId, messages: [], unread: 0, lastDate: Date.now() };
    state.chats.push(chat);
  }
  chat.messages.push({ role: 'me', text, date: Date.now() });
  chat.lastDate = Date.now();
  inp.value = '';
  Storage.set('chats', state.chats);
  renderUserChat();
  renderChats();
  haptic('light');

  // Авто-ответ через 1.5 сек
  setTimeout(() => {
    const user = getPublicUser(state.currentChatId);
    const responses = state.lang === 'ru' ? [
      'Привет! 👋', 'Ок, понял', 'Спасибо за инфо', 'Что-то ещё?', 'Норм 👍',
      'Сейчас посмотрю', 'Давай', 'Уже пишу'
    ] : ['Hi! 👋', 'OK, got it', 'Thanks for info', 'Anything else?', 'Nice 👍', 'Let me check', 'Sure', 'On it'];
    const reply = responses[Math.floor(Math.random() * responses.length)];
    if (chat) {
      chat.messages.push({ role: 'other', text: reply, date: Date.now() });
      chat.lastDate = Date.now();
      Storage.set('chats', state.chats);
      if (state.currentChatId === chat.userId) renderUserChat();
      renderChats();
    }
  }, 1200 + Math.random() * 800);
}

function renderChats() {
  const list = document.getElementById('chatsList');
  const empty = document.getElementById('chatsEmpty');
  if (!list) return;
  if (!state.chats.length) { list.innerHTML = ''; empty?.classList.remove('hidden'); return; }
  empty?.classList.add('hidden');
  const sorted = [...state.chats].sort((a, b) => (b.lastDate || 0) - (a.lastDate || 0));
  list.innerHTML = sorted.map(chat => {
    const user = getPublicUser(chat.userId);
    if (!user) return '';
    const initial = (user.name || 'U')[0].toUpperCase();
    const lastMsg = chat.messages[chat.messages.length - 1];
    const hasUnread = chat.unread > 0;
    return `
      <div class="chat-item" data-open-chat="${user.shortId}">
        <div class="chat-avatar">${initial}<span class="chat-online-dot ${user.online ? 'online' : ''}"></span></div>
        <div class="chat-item-info">
          <div class="chat-name">${escapeHtml(user.name || user.username)}</div>
          <div class="chat-last-msg ${hasUnread ? 'unread' : ''}">${lastMsg ? escapeHtml(lastMsg.text).slice(0, 40) : '—'}</div>
        </div>
        ${hasUnread ? `<span class="chat-badge">${chat.unread}</span>` : ''}
      </div>`;
  }).join('');
}

function updateChatBadges() {
  const total = state.chats.reduce((s, c) => s + (c.unread || 0), 0);
  const navBadge = document.getElementById('chatsBadgeNav');
  const fabBadge = document.getElementById('chatFabBadge');
  const qaBadge = document.getElementById('qaChatsBadge');
  [navBadge, fabBadge, qaBadge].forEach(b => {
    if (!b) return;
    if (total > 0) { b.textContent = total; b.classList.remove('hidden'); }
    else b.classList.add('hidden');
  });
}

function updateChatsCount() {
  const badge = document.getElementById('chatsCountBadge');
  if (badge) {
    if (state.chats.length > 0) { badge.textContent = state.chats.length; badge.style.display = 'flex'; }
    else badge.style.display = 'none';
  }
}

function openChatsPage() {
  renderChats();
  go('chats');
}

// ==================== CASE v2 (п.1) ====================
const CASE_PRIZES = [
  { label: '+10₽', value: 10, type: 'balance', weight: 22 },
  { label: '+20₽', value: 20, type: 'balance', weight: 18 },
  { label: '+30₽', value: 30, type: 'balance', weight: 14 },
  { label: '+10₽', value: 10, type: 'balance', weight: 10 },
  { label: '+50₽', value: 50, type: 'balance', weight: 8 },
  { label: '+20₽', value: 20, type: 'balance', weight: 8 },
  { label: '+40₽', value: 40, type: 'balance', weight: 6 },
  { label: '+10₽', value: 10, type: 'balance', weight: 5 },
  { label: '+30₽', value: 30, type: 'balance', weight: 4 },
  { label: '🇺🇸 США', value: 0, type: 'product', productId: 1, weight: 2.5 },
  { label: '+50₽', value: 50, type: 'balance', weight: 1 },
  { label: '+20₽', value: 20, type: 'balance', weight: 0.8 },
  { label: '+100₽', value: 100, type: 'balance', weight: 0.4 },
  { label: '+10₽', value: 10, type: 'balance', weight: 0.2 },
  { label: '💎 Premium', value: 0, type: 'premium', months: 12, weight: 0.1 }
];

let caseRotation = 0;
let caseSpinning = false;

function openCase() {
  const resEl = document.getElementById('caseResult');
  if (resEl) resEl.textContent = '';
  const btn = document.getElementById('caseBtn');
  const btnText = document.getElementById('caseBtnText');
  if (btn) {
    const balance = Storage.get('balance', 0);
    btn.disabled = balance < CASE_PRICE;
    if (btnText) btnText.textContent = balance < CASE_PRICE
      ? (state.lang === 'ru' ? 'Недостаточно средств' : 'Insufficient funds')
      : (state.lang === 'ru' ? `Крутить за ${CASE_PRICE}₽` : `Spin for ${CASE_PRICE}₽`);
  }
  openModal('modalCase');
}

function spinCase() {
  if (caseSpinning) return;
  const balance = Storage.get('balance', 0);
  if (balance < CASE_PRICE) return toast(state.lang === 'ru' ? 'Недостаточно средств' : 'Insufficient funds', 'error');

  caseSpinning = true;
  Storage.set('balance', balance - CASE_PRICE);
  state.stats.spent += CASE_PRICE;
  Storage.set('stats', state.stats);
  state.caseSpins = (state.caseSpins || 0) + 1;
  Storage.set('caseSpins', state.caseSpins);
  state.transactions.unshift({ type: 'out', title: state.lang === 'ru' ? 'Крутка кейса' : 'Case spin', amount: CASE_PRICE, date: Date.now() });
  Storage.set('transactions', state.transactions);

  // Взвешенный рандом
  const totalWeight = CASE_PRIZES.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * totalWeight;
  let prizeIdx = 0;
  let prize = CASE_PRIZES[0];
  for (let i = 0; i < CASE_PRIZES.length; i++) {
    if (r < CASE_PRIZES[i].weight) { prize = CASE_PRIZES[i]; prizeIdx = i; break; }
    r -= CASE_PRIZES[i].weight;
  }

  // Фикс прокрутки (п.1): считаем угол БЕЗОПАСНО от текущего
  const total = CASE_PRIZES.length;
  const sliceAngle = 360 / total;
  // Целевой угол: чтобы приз попал под указатель (указатель сверху, 12 часов)
  // Сектор i = от i*slice до (i+1)*slice, повёрнутый на rotation
  // Нужно чтобы центр сектора prizeIdx оказался под указателем → rotation = -(prizeIdx*slice + slice/2) + N*360
  const baseAngle = -(prizeIdx * sliceAngle + sliceAngle / 2);
  const spins = 5 + Math.floor(Math.random() * 3); // 5-7 полных оборотов
  // Всегда добавляем нужное кол-во оборотов относительно ТЕКУЩЕГО угла
  const currentRotation = caseRotation % 360;
  const targetModulo = ((baseAngle % 360) + 360) % 360;
  const currentModulo = ((currentRotation % 360) + 360) % 360;
  let delta = targetModulo - currentModulo;
  if (delta <= 0) delta += 360;
  const newRotation = caseRotation + spins * 360 + delta;
  caseRotation = newRotation;

  const wheel = document.getElementById('caseWheel');
  if (wheel) {
    wheel.style.transition = 'transform 4s cubic-bezier(.17,.67,.31,1.02)';
    wheel.style.transform = `rotate(${newRotation}deg)`;
  }

  const btn = document.getElementById('caseBtn');
  if (btn) btn.disabled = true;
  const resEl = document.getElementById('caseResult');
  if (resEl) resEl.textContent = state.lang === 'ru' ? 'Крутим...' : 'Spinning...';
  haptic('heavy');

  setTimeout(() => {
    let resultText = '';
    if (prize.type === 'balance') {
      Storage.set('balance', Storage.get('balance', 0) + prize.value);
      state.stats.bonus = (state.stats.bonus || 0) + prize.value;
      Storage.set('stats', state.stats);
      state.transactions.unshift({ type: 'in', title: `Кейс: +${prize.value}₽`, amount: prize.value, date: Date.now() });
      Storage.set('transactions', state.transactions);
      resultText = `🎉 ${state.lang === 'ru' ? 'Выигрыш' : 'Win'}: +${prize.value}₽`;
    } else if (prize.type === 'product') {
      const p = PRODUCTS.find(x => x.id === prize.productId);
      const orderId = 'ORD' + Date.now();
      state.orders.push({ id: orderId, items: [{ name: p.name, flag: p.flag, price: 0 }], total: 0, status: 'Выдан (кейс)', date: Date.now() });
      state.inventory.push({ id: 'INV' + Date.now() + Math.random().toString(36).slice(2,6), orderId, name: p.name, flag: p.flag, price: 0, status: 'active', guarantee: '24ч', date: Date.now(), data: 'Логин: example@user\nПароль: ' + Math.random().toString(36).slice(2,12) });
      Storage.set('orders', state.orders);
      Storage.set('inventory', state.inventory);
      resultText = `🎉 ${state.lang === 'ru' ? 'Выигрыш' : 'Win'}: ${p.flag} ${p.name}! ${state.lang === 'ru' ? 'Смотри в инвентаре' : 'Check inventory'}`;
    } else if (prize.type === 'premium') {
      const orderId = 'ORD' + Date.now();
      state.orders.push({ id: orderId, items: [{ name: 'Premium 12 мес (кейс)', flag: '💎', price: 0 }], total: 0, status: 'Выдан (кейс)', date: Date.now() });
      state.inventory.push({ id: 'INV' + Date.now() + Math.random().toString(36).slice(2,6), orderId, name: 'Premium 12 мес (кейс)', flag: '💎', price: 0, status: 'active', guarantee: '24ч', date: Date.now(), data: 'Активация: напишите @desired_support' });
      Storage.set('orders', state.orders);
      Storage.set('inventory', state.inventory);
      resultText = `🎉 ${state.lang === 'ru' ? 'Джекпот!' : 'JACKPOT!'} Premium 12 ${state.lang === 'ru' ? 'мес' : 'mo'}`;
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

    // Разблокировка через 1.5 сек с фиксом прокрутки
    setTimeout(() => {
      caseSpinning = false;
      if (btn) {
        const b = Storage.get('balance', 0);
        btn.disabled = b < CASE_PRICE;
        const btnText = document.getElementById('caseBtnText');
        if (btnText) btnText.textContent = b < CASE_PRICE
          ? (state.lang === 'ru' ? 'Недостаточно средств' : 'Insufficient funds')
          : (state.lang === 'ru' ? `Крутить за ${CASE_PRICE}₽` : `Spin for ${CASE_PRICE}₽`);
      }
    }, 1500);
  }, 4100);
}

// ==================== DAILY BONUS ====================
function checkDailyBonusBadge() {
  const badge = document.getElementById('qaBonusBadge');
  if (!badge) return;
  const today = new Date().setHours(0,0,0,0);
  const last = state.dailyBonus.lastClaim || 0;
  if (last < today) badge.classList.remove('hidden'); else badge.classList.add('hidden');
}

function openDailyBonus() { updateBonusUI(); openModal('modalDailyBonus'); }

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
      btn.textContent = state.lang === 'ru' ? 'Уже забрано сегодня' : 'Already claimed';
    } else {
      btn.disabled = false;
      const nextDay = Math.min(7, (streak % 7) + 1);
      const amount = BONUS_AMOUNTS[nextDay - 1];
      btn.textContent = state.lang === 'ru' ? `Забрать +${amount}₽` : `Claim +${amount}₽`;
    }
  }
  if (sub) sub.textContent = state.lang === 'ru'
    ? `Стрик: ${streak} дн. · Следующий бонус на 7-й день: +50₽`
    : `Streak: ${streak} d · Day 7 bonus: +50₽`;
}

function claimBonus() {
  const today = new Date().setHours(0,0,0,0);
  const last = state.dailyBonus.lastClaim || 0;
  if (last >= today) return toast(state.lang === 'ru' ? 'Уже забрано' : 'Already claimed', 'error');
  const yesterday = today - 86400000;
  let streak = state.dailyBonus.streak || 0;
  if (last >= yesterday && last < today) streak = Math.min(7, streak + 1);
  else streak = 1;
  const dayIdx = Math.min(6, streak - 1);
  const amount = BONUS_AMOUNTS[dayIdx];

  Storage.set('balance', Storage.get('balance', 0) + amount);
  state.dailyBonus = { lastClaim: Date.now(), streak };
  Storage.set('dailyBonus', state.dailyBonus);
  state.stats.bonus = (state.stats.bonus || 0) + amount;
  Storage.set('stats', state.stats);
  state.transactions.unshift({ type: 'in', title: `${state.lang === 'ru' ? 'Бонус' : 'Bonus'} (${streak})`, amount, date: Date.now() });
  Storage.set('transactions', state.transactions);

  updateProfileUI();
  renderTransactions();
  updateBonusUI();
  checkDailyBonusBadge();
  checkAchievements();
  renderProgressCard();
  animateBalanceChange(amount);
  toast(`+${amount}₽`, 'success');
  haptic('heavy');
  playSound();
}

// ==================== LOYALTY ====================
function getCashbackPercent() {
  const s = state.stats.spent;
  if (s >= 50000) return 12;
  if (s >= 20000) return 8;
  if (s >= 5000) return 5;
  return 3;
}

function getLoyaltyLevel() {
  const s = state.stats.spent; const o = state.stats.orders;
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
  const nextName = next === 50000 ? 'Platinum' : next === 20000 ? 'Gold' : 'Silver';
  if (text) {
    if (state.stats.spent >= 50000) text.textContent = state.lang === 'ru' ? 'Максимальный уровень 👑' : 'Max level 👑';
    else text.textContent = state.lang === 'ru' ? `До ${nextName}: ${remaining}₽` : `To ${nextName}: ${remaining}₽`;
  }
  const rankKeys = ['bronze', 'silver', 'gold', 'platinum'];
  const currentIdx = rankKeys.indexOf(level.key);
  document.querySelectorAll('.lv2-rank').forEach((r, i) => {
    r.classList.toggle('achieved', i <= currentIdx);
    r.classList.toggle('current', i === currentIdx);
  });
  state.loyaltyLevel = level.key;
}

function openLoyaltyInfo() { openModal('modalLoyaltyInfo'); }
function openPointsInfo() { openModal('modalPointsInfo'); }

// ==================== ACHIEVEMENTS ====================
function checkAchievements() {
  const u = state.achievements;
  const check = (id, cond) => {
    if (cond && !u.includes(id)) {
      u.push(id);
      const a = ACHIEVEMENTS.find(x => x.id === id);
      if (a) { toast(`${a.icon} ${a.name}`, 'success'); haptic('medium'); }
    }
  };
  check('first_order', state.orders.length >= 1);
  check('ten_orders', state.orders.length >= 10);
  check('big_spender', state.stats.spent >= 5000);
  check('reviewer', state.reviews.filter(r => r.author === state.currentUser?.username).length >= 5);
  check('loyal', ['gold', 'platinum'].includes(state.loyaltyLevel));
  check('case_hunter', state.caseSpins >= 5);
  check('daily_master', state.dailyBonus.streak >= 7);
  check('social_butterfly', state.friends.length >= 5);
  const totalMsgs = state.chats.reduce((s, c) => s + c.messages.filter(m => m.role === 'me').length, 0);
  check('chatter', totalMsgs >= 50);
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
    </div>`).join('');
  const unlocked = document.getElementById('achUnlocked');
  const total = document.getElementById('achTotal');
  const fill = document.getElementById('achProgressFill');
  if (unlocked) unlocked.textContent = state.achievements.length;
  if (total) total.textContent = ACHIEVEMENTS.length;
  if (fill) fill.style.width = (state.achievements.length / ACHIEVEMENTS.length * 100) + '%';
}

// ==================== LEADERBOARD (5 табов, п.3) ====================
function renderLeaderboard(type) {
  const el = document.getElementById('lbList');
  if (!el) return;
  const userFirstName = state.currentUser?.displayName || state.tgUser?.first_name || state.currentUser?.firstName || 'you';

  let data = [];
  if (type === 'orders') {
    data = [
      { name: 'Иван', val: state.stats.orders || 0, me: true },
      { name: 'Alex', val: 287 }, { name: 'Michael', val: 194 }, { name: 'Sofia', val: 87 },
      { name: 'Kate', val: 156 }, { name: 'Daniel', val: 42 }, { name: 'Anna', val: 67 }
    ];
  } else if (type === 'spent') {
    data = [
      { name: 'Иван', val: state.stats.spent || 0, me: true, suffix: '₽' },
      { name: 'Alex', val: 42500, suffix: '₽' }, { name: 'Michael', val: 28900, suffix: '₽' },
      { name: 'Kate', val: 19800, suffix: '₽' }, { name: 'Sofia', val: 12400, suffix: '₽' },
      { name: 'Anna', val: 8900, suffix: '₽' }, { name: 'Daniel', val: 5600, suffix: '₽' }
    ];
  } else if (type === 'bonus') {
    data = [
      { name: 'Иван', val: state.stats.bonus || 0, me: true, suffix: '₽' },
      { name: 'Alex', val: 3200, suffix: '₽' }, { name: 'Michael', val: 2800, suffix: '₽' },
      { name: 'Sofia', val: 1500, suffix: '₽' }, { name: 'Kate', val: 1200, suffix: '₽' },
      { name: 'Anna', val: 800, suffix: '₽' }, { name: 'Daniel', val: 400, suffix: '₽' }
    ];
  } else if (type === 'refs') {
    data = [
      { name: 'Иван', val: state.friends.length || 0, me: true },
      { name: 'Alex', val: 42 }, { name: 'Michael', val: 31 }, { name: 'Kate', val: 24 },
      { name: 'Sofia', val: 18 }, { name: 'Anna', val: 15 }, { name: 'Daniel', val: 12 }
    ];
  } else if (type === 'rating') {
    data = [
      { name: 'Иван', val: 5.0, me: true },
      { name: 'Alex', val: 4.98 }, { name: 'Sofia', val: 4.95 }, { name: 'Kate', val: 4.92 },
      { name: 'Michael', val: 4.88 }, { name: 'Anna', val: 4.85 }, { name: 'Daniel', val: 4.75 }
    ];
  }
  data.sort((a, b) => b.val - a.val);
  const userIdx = data.findIndex(d => d.me);
  if (userIdx > 0) data[userIdx].name = userFirstName;

  el.innerHTML = data.slice(0, 10).map((d, i) => `
    <div class="lb-item ${i < 3 ? 'top' + (i+1) : ''}">
      <div class="lb-rank">${i + 1}</div>
      <div class="lb-name">${escapeHtml(d.name)}${d.me ? ' (ты)' : ''}</div>
      <div class="lb-value">${d.val}${d.suffix || ''}</div>
    </div>`).join('');
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
    </div>`).join('');
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
      <span class="what">${state.lang === 'ru' ? 'купил' : 'bought'} ${b.product}</span>
      <span class="when">${Math.floor(Math.random() * 30) + 1} ${state.lang === 'ru' ? 'мин' : 'min'}</span>
    </div>`).join('');
}

function animateCounter(el, from, to, duration, suffix) {
  if (!el) return;
  const start = performance.now();
  const step = (now) => {
    const t1 = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t1, 3);
    const val = Math.round(from + (to - from) * eased);
    el.textContent = val.toLocaleString('ru-RU') + (suffix || '');
    if (t1 < 1) requestAnimationFrame(step);
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

// ==================== TIMER ====================
function startPromoTimer() {
  const el = document.getElementById('promoTimer');
  if (!el) return;
  const tick = () => {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const diff = Math.max(0, end - now);
    const h = String(Math.floor(diff / 3600000)).padStart(2,'0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
    el.textContent = `${h}:${m}:${s}`;
  };
  tick();
  setInterval(tick, 1000);
}

// ==================== SUPPORT: TICKETS ====================
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
    const statusClass = { open: 'ticket-status-open', progress: 'ticket-status-progress', answered: 'ticket-status-answered', closed: 'ticket-status-closed' }[t.status] || 'ticket-status-open';
    const statusLabel = { open: 'Открыт', progress: 'В работе', answered: 'Ответ админа', closed: 'Закрыт' }[t.status] || 'Открыт';
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
      </div>`;
  }).join('');
}

const TICKET_CATEGORIES = {
  order: 'Проблема с заказом', payment: 'Проблема с оплатой', product: 'Товар не работает',
  refund: 'Возврат средств', social: 'Проблема в соцсети', other: 'Другое'
};

function openNewTicket() {
  document.getElementById('ticketCategory').value = 'order';
  document.getElementById('ticketSubject').value = '';
  document.getElementById('ticketMessage').value = '';
  const charCount = document.getElementById('ticketCharCount');
  if (charCount) charCount.textContent = '0';
  openModal('modalNewTicket');
}

function submitNewTicket() {
  const category = document.getElementById('ticketCategory').value;
  const subject = document.getElementById('ticketSubject').value.trim();
  const message = document.getElementById('ticketMessage').value.trim();
  if (!subject) return toast(state.lang === 'ru' ? 'Укажи тему' : 'Enter subject', 'error');
  if (!message) return toast(state.lang === 'ru' ? 'Опиши проблему' : 'Describe issue', 'error');

  const ticket = {
    id: 'TCK' + Date.now(),
    category, categoryLabel: TICKET_CATEGORIES[category] || 'Другое',
    subject, status: 'open', date: Date.now(),
    messages: [{ role: 'user', text: message, date: Date.now() }]
  };
  state.tickets.push(ticket);
  Storage.set('tickets', state.tickets);
  closeModal('modalNewTicket');
  renderTickets();
  toast(state.lang === 'ru' ? 'Тикет создан' : 'Ticket created', 'success');
  haptic('medium');

  setTimeout(() => {
    ticket.messages.push({ role: 'admin', text: state.lang === 'ru' ? 'Привет! Тикет принят в работу. Ответим в течение 15 минут.' : 'Hi! Ticket received. We\'ll reply within 15 minutes.', date: Date.now() });
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
  const t1 = state.tickets.find(x => x.id === id);
  if (!t1) return;
  const subjectEl = document.getElementById('tvSubject');
  const statusEl = document.getElementById('tvStatus');
  const dateEl = document.getElementById('tvDate');
  const msgsEl = document.getElementById('ticketMessages');
  if (subjectEl) subjectEl.textContent = t1.subject;
  if (statusEl) {
    statusEl.className = 'tvh-status ' + ({ open: 'ticket-status-open', progress: 'ticket-status-progress', answered: 'ticket-status-answered', closed: 'ticket-status-closed' }[t1.status] || 'ticket-status-open');
    statusEl.textContent = { open: 'Открыт', progress: 'В работе', answered: 'Ответ админа', closed: 'Закрыт' }[t1.status] || 'Открыт';
  }
  if (dateEl) dateEl.textContent = new Date(t1.date).toLocaleString('ru-RU');
  if (msgsEl) {
    msgsEl.innerHTML = t1.messages.map(m => `<div class="tmsg ${m.role}">${escapeHtml(m.text)}<span class="tmsg-meta">${new Date(m.date).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})}</span></div>`).join('');
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }
}

function sendTicketReply() {
  const inp = document.getElementById('ticketReplyText');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text) return;
  const t1 = state.tickets.find(x => x.id === state.currentTicketId);
  if (!t1) return;
  t1.messages.push({ role: 'user', text, date: Date.now() });
  t1.status = 'progress';
  Storage.set('tickets', state.tickets);
  inp.value = '';
  renderTicketView(t1.id);
  renderTickets();
  haptic('light');
  setTimeout(() => {
    t1.messages.push({ role: 'admin', text: state.lang === 'ru' ? 'Принял, сейчас разберусь 👌' : 'Got it, checking now 👌', date: Date.now() });
    t1.status = 'answered';
    Storage.set('tickets', state.tickets);
    renderTicketView(t1.id);
    renderTickets();
  }, 2500);
}

function contactSupportDirect() { window.open(DIRECT_CONTACT, '_blank'); }
function scrollToPopularQuestions() { document.getElementById('supportPopular')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

// ==================== SUPPORT: AI CHAT ====================
function openAIChat(prefillText) {
  openModal('modalAIChat');
  renderAIChat();
  if (prefillText) setTimeout(() => aicSendText(prefillText), 300);
  else setTimeout(() => document.getElementById('aicInput')?.focus(), 300);
}

function renderAIChat() {
  const el = document.getElementById('aicMessages');
  if (!el) return;
  if (!state.aiChat.length) {
    state.aiChat.push({ role: 'ai', text: state.lang === 'ru' ? 'Привет! Я ИИ-консультант desired. Помогу с заказами, оплатой, возвратом, товарами. Что интересует?' : 'Hi! I\'m desired AI. Help with orders, payments, refunds, products. What do you need?', date: Date.now() });
    Storage.set('aiChat', state.aiChat);
  }
  el.innerHTML = state.aiChat.map(m => `<div class="aic-msg ${m.role}">${escapeHtml(m.text)}</div>`).join('');
  el.scrollTop = el.scrollHeight;
}

function aicQuickSend(text) { aicSendText(text); }

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

  const el = document.getElementById('aicMessages');
  if (el) {
    const typing = document.createElement('div');
    typing.className = 'aic-typing';
    typing.id = 'aicTyping';
    typing.innerHTML = '<span></span><span></span><span></span>';
    el.appendChild(typing);
    el.scrollTop = el.scrollHeight;
  }

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
  state.aiChat.push({ role: 'system', text: state.lang === 'ru' ? '📣 Запрос отправлен администратору.' : '📣 Request sent to admin.', date: Date.now() });
  Storage.set('aiChat', state.aiChat);
  renderAIChat();
  toast(state.lang === 'ru' ? 'Админ уведомлён' : 'Admin notified', 'success');
  haptic('medium');
  setTimeout(() => {
    state.aiChat.push({ role: 'ai', text: `Если срочно — напиши: t.me/id912559442`, date: Date.now() });
    Storage.set('aiChat', state.aiChat);
    renderAIChat();
  }, 1500);
}

// ==================== DEBUG ====================
function debugClearStore() {
  if (!confirm('Очистить весь localStorage?')) return;
  localStorage.clear();
  location.reload();
}

function debugResetOnboarding() {
  Storage.del('onboarded');
  state.onboarded = false;
  toast('Onboarding сброшен', 'success');
}

function debugResetDailyBonus() {
  state.dailyBonus = { lastClaim: 0, streak: 0 };
  Storage.set('dailyBonus', state.dailyBonus);
  checkDailyBonusBadge();
  toast('Daily bonus сброшен', 'success');
}

function debugExportStore() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    try { data[k] = JSON.parse(localStorage.getItem(k)); } catch { data[k] = localStorage.getItem(k); }
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `debug_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast('Экспортировано', 'success');
}

function debugAddTestFriends() {
  const ids = ['123456', '234567', '345678', '456789', '567890'];
  ids.forEach(id => { if (!state.friends.some(f => f.id === id)) state.friends.push({ id, addedAt: Date.now() }); });
  Storage.set('friends', state.friends);
  renderFriends();
  updateFriendsCount();
  toast('Друзья добавлены', 'success');
}

// ==================== PROFILE EDIT ====================
const AVATAR_EMOJIS = ['🦊','🐼','🦁','🐸','🐙','🦄','🐯','🐨','🦉','🐺','🐻','🐷'];

function openProfileEdit() {
  const el = document.getElementById('peBio');
  const nameEl = document.getElementById('peCustomName');
  if (el) el.value = state.currentUser?.bio || '';
  if (nameEl) nameEl.value = state.currentUser?.displayName || '';
  // Аватарки
  const pick = document.getElementById('peAvatarPick');
  if (pick) {
    const current = state.currentUser?.avatarEmoji || '';
    pick.innerHTML = AVATAR_EMOJIS.map(e => `<div class="pe-avatar-option ${e === current ? 'active' : ''}" data-av-emoji="${e}">${e}</div>`).join('');
    pick.querySelectorAll('[data-av-emoji]').forEach(o => {
      o.addEventListener('click', () => {
        pick.querySelectorAll('.pe-avatar-option').forEach(x => x.classList.remove('active'));
        o.classList.add('active');
      });
    });
  }
  openModal('modalProfileEdit');
}

function saveProfileEdit() {
  const bio = document.getElementById('peBio')?.value.trim() || '';
  const displayName = document.getElementById('peCustomName')?.value.trim() || '';
  const avatarEmoji = document.querySelector('.pe-avatar-option.active')?.dataset.avEmoji || '';
  state.currentUser.bio = bio;
  if (displayName) state.currentUser.displayName = displayName;
  state.currentUser.avatarEmoji = avatarEmoji;
  Storage.set('currentUser', state.currentUser);
  updateProfileUI();
  closeModal('modalProfileEdit');
  toast(state.lang === 'ru' ? 'Профиль сохранён' : 'Profile saved', 'success');
  haptic('light');
}

function openShareApp() {
  const link = `${BOT_LINK}?start=ref_${state.currentUser?.username || 'user'}`;
  const text = state.lang === 'ru'
    ? '🔥 Зацени desired — топовый маркет цифровых товаров! Автовыдача, гарантия, низкие цены.'
    : '🔥 Check out desired — a top digital goods market! Auto-delivery, warranty, low prices.';
  if (navigator.share) navigator.share({ title: 'desired', text, url: link }).catch(()=>{});
  else { navigator.clipboard?.writeText(`${text}\n${link}`); toast(state.lang === 'ru' ? 'Скопировано' : 'Copied', 'success'); }
}

// ==================== TOASTS / HAPTIC / SOUND ====================
function toast(text, type = 'info') {
  const wrap = document.getElementById('toastWrap');
  if (!wrap) return;
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = text;
  wrap.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); }, 2200);
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

// ==================== MODALS ====================
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('show');
  el.onclick = (e) => { if (e.target === el) closeModal(id); };
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('show'); el.onclick = null; }
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
    toast(state.lang === 'ru' ? 'Добро пожаловать, админ' : 'Welcome, admin', 'success');
  } else {
    document.getElementById('adminPassInput').value = '';
    toast(state.lang === 'ru' ? 'Неверный пароль' : 'Wrong password', 'error');
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
          </div>`).join('')}
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
      </div>`).join('') || '<div style="color:var(--muted);font-size:12px;">Нет юзеров</div>';
    c.innerHTML = `<h4>👤 Юзеры (${Object.keys(state.users).length})</h4>${list}`;
  } else if (tab === 'orders') {
    c.innerHTML = `<h4>📦 Заказы (${state.orders.length})</h4>` + (state.orders.length
      ? state.orders.slice().reverse().slice(0, 50).map((o) => {
        const realIdx = state.orders.indexOf(o);
        return `
        <div class="admin-row">
          <span>${o.id} · ${new Date(o.date).toLocaleDateString()}</span>
          <span style="display:flex;gap:6px;align-items:center;">
            <span>${o.total}₽</span>
            <button class="ghost" data-admin-refund="${realIdx}">↩️</button>
          </span>
        </div>`;
      }).join('')
      : '<div style="color:var(--muted);font-size:12px;">Нет заказов</div>');
  } else if (tab === 'tickets') {
    const list = state.tickets.slice().reverse().map(t =>
      `<div class="admin-row">
        <span>${escapeHtml(t.subject)} <span style="color:var(--muted);font-size:11px;">· ${t.categoryLabel} · ${t.messages.length}</span></span>
        <span style="display:flex;gap:6px;align-items:center;">
          <span style="font-size:11px;color:var(--muted);">${new Date(t.date).toLocaleDateString()}</span>
          <button class="ghost" data-admin-ticket="${t.id}">💬</button>
        </span>
      </div>`).join('') || '<div style="color:var(--muted);font-size:12px;">Нет тикетов</div>';
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
          </div>`).join('') : '<div style="color:var(--muted);font-size:12px;">Нет промокодов</div>'}
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
      <p style="color:var(--muted);font-size:12px;margin-bottom:12px;">Сохрани всю БД или загрузи из бэкапа.</p>
      <button data-admin-export="1">📥 Скачать бэкап</button>
      <input type="file" id="backupFile" accept=".json" style="margin-top:12px;display:block;width:100%;padding:10px;background:var(--input-bg);border:1px solid var(--border);border-radius:10px;color:var(--text);font-size:13px;">
      <button class="ghost" data-admin-import="1" style="margin-top:8px;">📤 Загрузить</button>
      <div style="margin-top:16px;padding:12px;background:var(--card-2);border-radius:12px;font-size:12px;color:var(--muted);">
        Юзеров: <b>${Object.keys(state.users).length}</b><br>
        Товаров: <b>${PRODUCTS.length}</b><br>
        Заказов: <b>${state.orders.length}</b><br>
        Промокодов: <b>${state.promos.length}</b><br>
        Отзывов: <b>${state.reviews.length}</b><br>
        Инвентарь: <b>${state.inventory.length}</b><br>
        Тикетов: <b>${state.tickets.length}</b><br>
        Друзей: <b>${state.friends.length}</b><br>
        Чатов: <b>${state.chats.length}</b>
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
        <p style="color:var(--muted);font-size:12px;margin-bottom:8px;">ID админов:</p>
        ${ADMIN_IDS.map(id => `<div class="admin-row"><span>ID ${id}</span></div>`).join('')}
      </div>
      <button class="ghost" data-open-debug="1" style="margin-top:20px;">🐞 Открыть страницу отладки</button>
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
  if (id) { const idx = PRODUCTS.findIndex(x => x.id === +id); if (idx >= 0) PRODUCTS[idx] = { ...PRODUCTS[idx], ...data }; }
  else { data.id = Date.now(); PRODUCTS.push(data); }
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
  logAction(`ban_toggle: @${username}`);
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
    users: state.users, products: PRODUCTS, orders: state.orders, promos: state.promos,
    reviews: state.reviews, inventory: state.inventory, transactions: state.transactions,
    points: state.points, stats: state.stats, tickets: state.tickets, aiChat: state.aiChat,
    dailyBonus: state.dailyBonus, friends: state.friends, chats: state.chats,
    balance: Storage.get('balance', 0), version: 'v1.1.0', exported: Date.now()
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
      if (data.friends) Storage.set('friends', data.friends);
      if (data.chats) Storage.set('chats', data.chats);
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
  toast('Пароль изменён', 'success');
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
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#dropdownMenu') && !e.target.closest('#dotsBtn')) dropdown?.classList.remove('show');
  });
  dropdown?.addEventListener('click', (e) => e.stopPropagation());

  // Scroll topbar + scroll-to-top + chat fab
  const scrollBtn = document.getElementById('scrollTopBtn');
  const chatFab = document.getElementById('chatFab');
  window.addEventListener('scroll', () => {
    document.getElementById('topbar')?.classList.toggle('scrolled', window.scrollY > 10);
    if (scrollBtn) {
      if (window.scrollY > 500) scrollBtn.classList.remove('hidden'); else scrollBtn.classList.add('hidden');
    }
    if (chatFab) {
      if (window.scrollY > 300) chatFab.classList.remove('hidden'); else chatFab.classList.add('hidden');
    }
  });
  scrollBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Logo click → catalog
  document.getElementById('brandLogo')?.addEventListener('click', () => {
    haptic('light');
    go('main');
  });

  // Admin login via 5 taps on logo (long press)
  let taps = 0, tapTimer = null;
  document.getElementById('brandLogo')?.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    openModal('modalAdminPass');
  });

  window.addEventListener('hashchange', () => {
    const h = location.hash.replace('#', '');
    if (h && document.getElementById('page-' + h)) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.getElementById('page-' + h).classList.add('active');
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === h));
      updateBackButton();
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
  document.querySelectorAll('.cart-top-tab').forEach(t => t.addEventListener('click', () => switchCartTab(t.dataset.ctab)));

  // Stars/Premium toggle
  document.querySelectorAll('.msb2-toggle-btn').forEach(b => {
    b.addEventListener('click', () => {
      state.msbMode = b.dataset.mode;
      document.querySelectorAll('.msb2-toggle-btn').forEach(x => x.classList.toggle('active', x.dataset.mode === state.msbMode));
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

  // Stars input
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

  // View toggle
  document.getElementById('viewToggle')?.addEventListener('click', toggleCatalogView);

  // Search catalog
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

  // FAQ search (п.7 fix)
  const faqSearch = document.getElementById('faqSearch');
  faqSearch?.addEventListener('input', () => renderFAQ());
  faqSearch?.addEventListener('click', (e) => e.stopPropagation());
  faqSearch?.addEventListener('touchstart', (e) => e.stopPropagation());

  // Friends search
  document.getElementById('friendsSearchInput')?.addEventListener('input', (e) => searchFriends(e.target.value));

  // People search
  document.getElementById('peopleSearchInput')?.addEventListener('input', () => renderPeopleResults());

  // Ticket char counter
  document.getElementById('ticketMessage')?.addEventListener('input', (e) => {
    const count = document.getElementById('ticketCharCount');
    const val = e.target.value;
    if (count) count.textContent = val.length;
    if (val.length > 500) e.target.value = val.slice(0, 500);
  });

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
    else if (id === 'hapticToggle') Storage.set('hapticEnabled', e.target.checked);
    else if (id === 'notifyOrders') Storage.set('notifyOrders', e.target.checked);
    else if (id === 'notifySales') Storage.set('notifySales', e.target.checked);
    else if (id === 'notifyChats') Storage.set('notifyChats', e.target.checked);
    else if (id === 'notifyBonus') Storage.set('notifyBonus', e.target.checked);
    else if (id === 'showOnlineToggle') Storage.set('showOnline', e.target.checked);
    else if (id === 'startPageSelect') { Storage.set('startPage', e.target.value); state.startPage = e.target.value; }
    else if (id === 'languageSelect') { changeLanguage(e.target.value); return; }
    else if (id === 'privacyBalance') { state.privacy.balance = e.target.value; Storage.set('privacy', state.privacy); }
    else if (id === 'privacyPoints') { state.privacy.points = e.target.value; Storage.set('privacy', state.privacy); }
    else if (id === 'privacyStats') { state.privacy.stats = e.target.value; Storage.set('privacy', state.privacy); }
    else if (id === 'privacyAvatar') { state.privacy.avatar = e.target.value; Storage.set('privacy', state.privacy); }
    else if (id === 'privacyUsername') { state.privacy.username = e.target.value; Storage.set('privacy', state.privacy); }
    else if (id === 'privacyDm') { state.privacy.dm = e.target.value; Storage.set('privacy', state.privacy); }
    else return;
    applyAllSettings();
  });

  // Global click delegation
  document.addEventListener('click', (e) => {
    const swatch = e.target.closest('.theme-swatch');
    if (swatch) { Storage.set('theme', swatch.dataset.theme); applyAllSettings(); toast(state.lang === 'ru' ? 'Тема изменена' : 'Theme changed', 'success'); haptic('light'); return; }

    const dot = e.target.closest('.accent-dot');
    if (dot) { Storage.set('accent', dot.dataset.accent); applyAllSettings(); haptic('light'); return; }

    if (e.target.closest('#saleCard')) { openSaleProduct(); return; }

    // Product fav
    const fav = e.target.closest('[data-fav]');
    if (fav) { e.stopPropagation(); toggleFav(+fav.dataset.fav); return; }

    const fm = e.target.closest('[data-fav-modal]');
    if (fm) { toggleFav(+fm.dataset.favModal); closeModal('modalProduct'); return; }

    const favToCart = e.target.closest('[data-fav-to-cart]');
    if (favToCart) { addToCart(+favToCart.dataset.favToCart); toggleFav(+favToCart.dataset.favToCart); return; }

    const favRm = e.target.closest('[data-fav-rm]');
    if (favRm) { toggleFav(+favRm.dataset.favRm); return; }

    const add = e.target.closest('[data-add]');
    if (add) { e.stopPropagation(); addToCart(+add.dataset.add); return; }

    const buy = e.target.closest('[data-buy]');
    if (buy) { e.stopPropagation(); buyNow(+buy.dataset.buy); return; }

    const am = e.target.closest('[data-add-from-modal]');
    if (am) { addToCart(+am.dataset.addFromModal); closeModal('modalProduct'); return; }
    const bm = e.target.closest('[data-buy-from-modal]');
    if (bm) { buyNow(+bm.dataset.buyFromModal); closeModal('modalProduct'); return; }

    const open = e.target.closest('[data-product-open]');
    if (open) { openProduct(+open.dataset.productOpen); return; }

    const share = e.target.closest('[data-share]');
    if (share) { shareProduct(+share.dataset.share); return; }

    const upAdd = e.target.closest('[data-upsell]');
    if (upAdd) { addToCart(+upAdd.dataset.upsell); return; }

    const pkg = e.target.closest('[data-pkg]');
    if (pkg) { addPackageToCart(pkg.dataset.pkg); return; }

    // Inventory actions
    const invCopy = e.target.closest('[data-inv-copy]');
    if (invCopy) { copyInvData(invCopy.dataset.invCopy); return; }
    const invReview = e.target.closest('[data-inv-review]');
    if (invReview) { reviewProductFromInv(decodeURIComponent(invReview.dataset.invReview), invReview.dataset.invReviewId); return; }
    const invAgain = e.target.closest('[data-inv-again]');
    if (invAgain) { buyAgain(decodeURIComponent(invAgain.dataset.invAgain)); return; }

    // FAQ toggle
    const faq = e.target.closest('[data-faq]');
    if (faq) { faq.classList.toggle('open'); return; }

    // Tickets
    const ticketOpen = e.target.closest('[data-ticket-open]');
    if (ticketOpen) { openTicketView(ticketOpen.dataset.ticketOpen); return; }

    // Friends / users
    const openUser = e.target.closest('[data-open-user]');
    if (openUser) { openUserProfile(openUser.dataset.openUser); return; }
    const addFriendBtn = e.target.closest('[data-add-friend]');
    if (addFriendBtn) { e.stopPropagation(); addFriend(addFriendBtn.dataset.addFriend); return; }
    const rmFriend = e.target.closest('[data-remove-friend]');
    if (rmFriend) { e.stopPropagation(); removeFriend(rmFriend.dataset.removeFriend); return; }
    const accFriend = e.target.closest('[data-accept-friend]');
    if (accFriend) { acceptFriend(accFriend.dataset.acceptFriend); return; }
    const decFriend = e.target.closest('[data-decline-friend]');
    if (decFriend) { declineFriend(decFriend.dataset.declineFriend); return; }
    const chatWith = e.target.closest('[data-chat-with]');
    if (chatWith) { e.stopPropagation(); openChatWith(chatWith.dataset.chatWith); return; }
    const openChat = e.target.closest('[data-open-chat]');
    if (openChat) { openChatWith(openChat.dataset.openChat); return; }

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
    if (e.target.closest('[data-open-debug]')) { go('debug'); renderDebugState(); return; }
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

  // aicInput auto-grow + Enter
  const aicInput = document.getElementById('aicInput');
  aicInput?.addEventListener('input', () => { aicInput.style.height = 'auto'; aicInput.style.height = Math.min(aicInput.scrollHeight, 100) + 'px'; });
  aicInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); aicSend(); } });

  // ucInput
  const ucInput = document.getElementById('ucInput');
  ucInput?.addEventListener('input', () => { ucInput.style.height = 'auto'; ucInput.style.height = Math.min(ucInput.scrollHeight, 100) + 'px'; });
  ucInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendUserMessage(); } });

  // ticketReplyText
  const trt = document.getElementById('ticketReplyText');
  trt?.addEventListener('input', () => { trt.style.height = 'auto'; trt.style.height = Math.min(trt.scrollHeight, 100) + 'px'; });
  trt?.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendTicketReply(); } });

  // msb2StarsAmount live total
  document.getElementById('msb2StarsAmount')?.addEventListener('input', updateMSBTotal);
}

// ==================== DEBUG STATE ====================
function renderDebugState() {
  const el = document.getElementById('debugState');
  if (!el) return;
  const data = {
    currentUser: state.currentUser,
    balance: Storage.get('balance', 0),
    points: state.points,
    orders: state.orders.length,
    friends: state.friends.length,
    chats: state.chats.length,
    achievements: state.achievements.length,
    lang: state.lang,
    theme: Storage.get('theme', 'dark'),
    privacy: state.privacy
  };
  el.textContent = JSON.stringify(data, null, 2);
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
window.changeCartQty = changeCartQty;
window.clearCart = clearCart;
window.toggleUsePoints = toggleUsePoints;
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
window.contactSupportDirect = contactSupportDirect;
window.copyRef = copyRef;
window.copyMyId = copyMyId;
window.addReview = addReview;
window.scrollToReviewForm = scrollToReviewForm;
window.setReviewsFilterProduct = setReviewsFilterProduct;
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
window.msb2SetSelf = msb2SetSelf;
window.msb2SetStars = msb2SetStars;
window.msb2SelectPremium = msb2SelectPremium;
window.msb2Buy = msb2Buy;
window.openCase = openCase;
window.spinCase = spinCase;
window.openDailyBonus = openDailyBonus;
window.claimBonus = claimBonus;
window.openLoyaltyInfo = openLoyaltyInfo;
window.openPointsInfo = openPointsInfo;
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
window.scrollToPopularQuestions = scrollToPopularQuestions;
window.switchCartTab = switchCartTab;
window.onbNext = onbNext;
window.onbSkip = onbSkip;
window.toggleCatalogView = toggleCatalogView;
window.openUserProfile = openUserProfile;
window.addFriendFromProfile = addFriendFromProfile;
window.removeFriendFromProfile = removeFriendFromProfile;
window.openChatWith = openChatWith;
window.openUserProfileFromChat = openUserProfileFromChat;
window.sendUserMessage = sendUserMessage;
window.addFriend = addFriend;
window.removeFriend = removeFriend;
window.acceptFriend = acceptFriend;
window.declineFriend = declineFriend;
window.openProfileEdit = openProfileEdit;
window.saveProfileEdit = saveProfileEdit;
window.openShareApp = openShareApp;
window.changeLanguage = changeLanguage;
window.debugClearStore = debugClearStore;
window.debugResetOnboarding = debugResetOnboarding;
window.debugResetDailyBonus = debugResetDailyBonus;
window.debugExportStore = debugExportStore;
window.debugAddTestFriends = debugAddTestFriends;
window.openChatsPage = openChatsPage;
window.renderDebugState = renderDebugState;
