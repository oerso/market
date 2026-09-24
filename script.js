// ==================== TELEGRAM ====================
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// ==================== НАСТРОЙКИ ====================
const CHAT_ID_SUPPORT = "твой_физа";
const CHAT_ID_FAQ = "твой_канал_faq";
const CHAT_ID_REVIEWS = "твой_канал_отзывы";

// ==================== ДАННЫЕ ====================
let userData = {
    id: tg.initDataUnsafe?.user?.id || 1,
    username: tg.initDataUnsafe?.user?.username || "desired",
    firstName: tg.initDataUnsafe?.user?.first_name || "Гость",
    balance: 0,
    referrals: 0,
    refCode: "REF_" + (tg.initDataUnsafe?.user?.id || 1),
    joined: new Date().toLocaleDateString("ru-RU")
};

let products = [
    { id: 1, name: "США", desc: "2078 покупок · автовыдача", price: 89, oldPrice: 99, discount: 10, flag: "🇺🇸", category: "accounts" },
    { id: 2, name: "Великобритания", desc: "107 покупок · автовыдача", price: 159, flag: "🇬🇧", category: "accounts" },
    { id: 3, name: "Япония", desc: "52 покупки · автовыдача", price: 349, flag: "🇯🇵", category: "accounts" },
    { id: 4, name: "Telegram Stars 100", desc: "100 звёзд на аккаунт", price: 150, flag: "⭐", category: "stars" },
    { id: 5, name: "Telegram Premium 1 мес", desc: "Premium на 1 месяц", price: 350, flag: "💎", category: "premium" },
    { id: 6, name: "Аренда NFT", desc: "Подарок в профиль", price: 500, flag: "🎁", category: "nft" },
];

let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let history = JSON.parse(localStorage.getItem("history") || "[]");
let chatMessages = JSON.parse(localStorage.getItem("chatMessages") || "[]");

// ==================== НАВИГАЦИЯ ====================
let currentPage = "catalog";

function render(page) {
    currentPage = page;
    const main = document.getElementById("mainContent");
    document.querySelectorAll(".nav-item").forEach(el => {
        el.classList.toggle("active", el.dataset.page === page);
    });
    document.getElementById("headerBalance").innerHTML = `<span>+</span> ${userData.balance}₽`;

    if (page === "catalog") renderCatalog(main);
    else if (page === "inventory") renderInventory(main);
    else if (page === "profile") renderProfile(main);
    else if (page === "cart") renderCart(main);
    else if (page === "chat") renderChat(main);
    else if (page === "reviews") renderReviews(main);
    else if (page === "faq") renderFAQ(main);
    else if (page === "support") renderSupport(main);
    else if (page === "rules") renderRules(main);
    else if (page === "referral") renderReferral(main);
}

// ==================== КАТАЛОГ ====================
function renderCatalog(container) {
    container.innerHTML = `
        <div class="banner">
            <div class="banner-text">
                <h3>Скидки до 62%</h3>
                <p>на аккаунты и подписки</p>
                <div class="timer">ещё 41:27:35</div>
            </div>
            <div class="banner-img">%</div>
        </div>

        <div class="categories">
            <div class="category-card" onclick="filterCatalog('accounts')">
                <div class="category-icon">📱</div>
                <div class="category-name">Аккаунты</div>
                <div class="category-desc">Юзернеймы и +888</div>
            </div>
            <div class="category-card" onclick="filterCatalog('premium')">
                <div class="category-icon">💎</div>
                <div class="category-name">Подписки</div>
                <div class="category-desc">На сервисы</div>
            </div>
            <div class="category-card" onclick="filterCatalog('nft')">
                <div class="category-icon">🎁</div>
                <div class="category-name">Аренда NFT</div>
                <div class="category-desc">Подарок в профиль</div>
            </div>
        </div>

        <div class="search-box">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="Поиск по каталогу" id="searchInput" oninput="searchProducts(this.value)">
        </div>

        <div class="filters">
            <button class="filter-btn active" data-cat="all">🔥 Популярное</button>
            <button class="filter-btn" data-cat="cheap">💰 Дешевле</button>
            <button class="filter-btn" data-cat="expensive">💵 Дороже</button>
        </div>

        <div id="productList"></div>
    `;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderProducts(btn.dataset.cat);
        };
    });

    renderProducts("all");
}

function filterCatalog(cat) {
    render("catalog");
    setTimeout(() => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        renderProducts(cat);
    }, 50);
}

function renderProducts(sort) {
    const list = document.getElementById("productList");
    if (!list) return;
    let filtered = [...products];
    if (sort === "cheap") filtered.sort((a, b) => a.price - b.price);
    else if (sort === "expensive") filtered.sort((a, b) => b.price - a.price);
    else if (sort !== "all") filtered = filtered.filter(p => p.category === sort);

    list.innerHTML = filtered.map(p => `
        <div class="product">
            <div class="product-info">
                <div class="product-flag">${p.flag}</div>
                <div>
                    <div class="product-name">${p.name}</div>
                    <div class="product-desc">${p.desc}</div>
                </div>
            </div>
            <div class="product-price-block">
                <div class="product-price" style="position:relative;">
                    ${p.price}₽
                    ${p.oldPrice ? `<span class="product-price-old">${p.oldPrice}₽</span>` : ''}
                    ${p.discount ? `<span class="product-discount">-${p.discount}%</span>` : ''}
                </div>
            </div>
            <div class="product-actions">
                <button class="btn" onclick="addToCart(${p.id})">Купить</button>
            </div>
        </div>
    `).join("");
}

function searchProducts(query) {
    const list = document.getElementById("productList");
    const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    list.innerHTML = filtered.map(p => `
        <div class="product">
            <div class="product-info">
                <div class="product-flag">${p.flag}</div>
                <div>
                    <div class="product-name">${p.name}</div>
                    <div class="product-desc">${p.desc}</div>
                </div>
            </div>
            <div class="product-actions">
                <button class="btn" onclick="addToCart(${p.id})">Купить</button>
            </div>
        </div>
    `).join("");
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        tg.showAlert(`✅ ${product.name} добавлен в корзину`);
    }
}

// ==================== КОРЗИНА ====================
function renderCart(container) {
    if (cart.length === 0) {
        container.innerHTML = `<div class="empty"><div class="empty-icon">🛒</div>Корзина пуста</div>`;
        return;
    }
    const total = cart.reduce((sum, p) => sum + p.price, 0);
    container.innerHTML = `
        <div class="section-title">Корзина (${cart.length})</div>
        ${cart.map((p, i) => `
            <div class="product">
                <div class="product-info">
                    <div class="product-flag">${p.flag}</div>
                    <div>
                        <div class="product-name">${p.name}</div>
                        <div class="product-price">${p.price}₽</div>
                    </div>
                </div>
                <button class="btn btn-outline" onclick="removeFromCart(${i})">Удалить</button>
            </div>
        `).join("")}
        <div class="balance-card" style="margin-top:15px;">
            <div class="balance-card-left">
                <div class="balance-card-label">Итого</div>
                <div class="balance-card-value">${total}₽</div>
            </div>
            <button class="balance-card-btn" onclick="checkout()">Оплатить</button>
        </div>
    `;
}

function removeFromCart(i) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    render("cart");
}

function checkout() {
    const total = cart.reduce((sum, p) => sum + p.price, 0);
    if (total > userData.balance) {
        tg.showAlert("❌ Недостаточно средств");
        return;
    }
    userData.balance -= total;
    cart.forEach(p => history.push({ product: p.name, price: p.price, date: new Date().toLocaleDateString("ru-RU") }));
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("history", JSON.stringify(history));
    tg.showAlert("✅ Покупка успешна!");
    render("profile");
}

// ==================== ИНВЕНТАРЬ ====================
function renderInventory(container) {
    if (history.length === 0) {
        container.innerHTML = `<div class="empty"><div class="empty-icon">📦</div>Инвентарь пуст</div>`;
        return;
    }
    container.innerHTML = `
        <div class="section-title">Инвентарь</div>
        ${history.map(h => `
            <div class="product">
                <div class="product-info">
                    <div>
                        <div class="product-name">${h.product}</div>
                        <div class="product-desc">${h.date}</div>
                    </div>
                </div>
                <div class="product-price">${h.price}₽</div>
            </div>
        `).join("")}
    `;
}

// ==================== ПРОФИЛЬ ====================
function renderProfile(container) {
    const letter = (userData.username[0] || "U").toUpperCase();
    container.innerHTML = `
        <div class="profile-avatar">${letter}</div>
        <div class="profile-name">@${userData.username}</div>
        <div class="profile-id-wrapper">
            <div class="profile-id">@id${userData.id}</div>
        </div>

        <div class="balance-card">
            <div class="balance-card-left">
                <div class="balance-card-label">💰 Баланс</div>
                <div class="balance-card-value">${userData.balance}₽</div>
            </div>
            <button class="balance-card-btn" onclick="topup()">Пополнить</button>
        </div>

        <div class="stats-grid">
            <div class="stat-card green">
                <div class="stat-icon">💵</div>
                <div class="stat-value">${userData.balance}₽</div>
                <div class="stat-label">↗ Пополнено</div>
            </div>
            <div class="stat-card gray">
                <div class="stat-icon">🪙</div>
                <div class="stat-value">0₽</div>
                <div class="stat-label">↙ Потрачено</div>
            </div>
        </div>

        <div class="transactions-btn" onclick="showTransactions()">📄 Все транзакции</div>

        <div class="menu-section-title">Рефералы</div>
        <div class="menu-list-item" onclick="render('referral')">
            <div class="menu-list-icon">👥</div>
            <div class="menu-list-text">Реферальная программа</div>
            <div class="menu-list-arrow">›</div>
        </div>

        <div class="menu-section-title" style="margin-top:15px;">Ещё</div>
        <div class="menu-list-item" onclick="render('reviews')">
            <div class="menu-list-icon">⭐</div>
            <div class="menu-list-text">Отзывы</div>
            <div class="menu-list-arrow">›</div>
        </div>
        <div class="menu-list-item" onclick="render('rules')">
            <div class="menu-list-icon">ℹ️</div>
            <div class="menu-list-text">Информация</div>
            <div class="menu-list-arrow">›</div>
        </div>

        <div class="support-banner">
            <div class="support-badge">🕐 24/7</div>
            <h3>Поддержка</h3>
            <p>Обратитесь к нам, если есть вопросы</p>
        </div>
    `;
}

function topup() {
    openModal(`
        <h3>Пополнение баланса</h3>
        <p style="color:#8a8a8a;font-size:13px;margin-bottom:15px;">Выберите способ:</p>
        <button class="btn" style="width:100%;padding:15px;margin-bottom:8px;">💳 СБП</button>
        <button class="btn" style="width:100%;padding:15px;margin-bottom:8px;">💳 Банковская карта РФ</button>
        <button class="btn" style="width:100%;padding:15px;margin-bottom:8px;">⭐ Telegram Stars</button>
        <button class="btn" style="width:100%;padding:15px;">₿ CryptoBot</button>
    `);
}

function showTransactions() {
    openModal(`
        <h3>Транзакции</h3>
        <div class="empty"><div class="empty-icon">📄</div>Здесь появятся пополнения и покупки</div>
    `);
}

// ==================== ЧАТ ====================
function renderChat(container) {
    container.innerHTML = `
        <div class="section-title">💬 Общий чат</div>
        <div class="chat-container">
            <div class="chat-messages" id="chatMessages"></div>
            <div class="chat-input-wrapper">
                <input type="text" class="chat-input" id="chatInput" placeholder="Написать сообщение..." onkeypress="if(event.key==='Enter')sendMessage()">
                <button class="chat-send" onclick="sendMessage()">➤</button>
            </div>
        </div>
    `;
    renderChatMessages();
    scrollChatToBottom();
}

function renderChatMessages() {
    const box = document.getElementById("chatMessages");
    if (!box) return;
    if (chatMessages.length === 0) {
        box.innerHTML = `<div class="empty" style="padding:30px;font-size:13px;">Пока сообщений нет. Напиши первым!</div>`;
        return;
    }
    box.innerHTML = chatMessages.map(m => `
        <div class="chat-message ${m.own ? 'own' : ''}">
            <div class="chat-message-name">${m.own ? 'Ты' : '@' + m.name}</div>
            <div class="chat-message-text">${m.text}</div>
        </div>
    `).join("");
}

function sendMessage() {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text) return;
    chatMessages.push({ name: userData.username, text: text, own: true });
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
    input.value = "";
    renderChatMessages();
    scrollChatToBottom();
}

function scrollChatToBottom() {
    const box = document.getElementById("chatMessages");
    if (box) box.scrollTop = box.scrollHeight;
}

// ==================== ОТЗЫВЫ ====================
function renderReviews(container) {
    container.innerHTML = `
        <div class="section-title">⭐ Отзывы</div>
        <div class="menu-list-item">
            <div class="menu-list-icon">⭐</div>
            <div>
                <div class="menu-list-text">@user123</div>
                <div class="product-desc">Всё пришло быстро, рекомендую</div>
            </div>
        </div>
        <div class="menu-list-item">
            <div class="menu-list-icon">⭐</div>
            <div>
                <div class="menu-list-text">@buyer_99</div>
                <div class="product-desc">Premium купил, всё чётко</div>
            </div>
        </div>
        <button class="btn" style="width:100%;padding:15px;margin-top:15px;" onclick="tg.openTelegramLink('https://t.me/${CHAT_ID_REVIEWS}')">Написать отзыв</button>
    `;
}

// ==================== FAQ ====================
function renderFAQ(container) {
    container.innerHTML = `
        <div class="section-title">❓ FAQ</div>
        <div class="menu-list-item">
            <div>
                <div class="menu-list-text">Как купить товар?</div>
                <div class="product-desc">Добавь в корзину → оплати → товар выдаётся автоматически</div>
            </div>
        </div>
        <div class="menu-list-item">
            <div>
                <div class="menu-list-text">Что делать, если товар не пришёл?</div>
                <div class="product-desc">Напиши в поддержку, разберёмся за 24 часа</div>
            </div>
        </div>
        <div class="menu-list-item">
            <div>
                <div class="menu-list-text">Как пополнить баланс?</div>
                <div class="product-desc">СБП, карта РФ, Telegram Stars, CryptoBot</div>
            </div>
        </div>
    `;
}

// ==================== ПОДДЕРЖКА ====================
function renderSupport(container) {
    container.innerHTML = `
        <div class="section-title">🆘 Поддержка</div>
        <p style="color:#8a8a8a;font-size:13px;margin-bottom:15px;">Если есть вопросы — пиши нам.</p>
        <button class="btn" style="width:100%;padding:15px;" onclick="tg.openTelegramLink('https://t.me/${CHAT_ID_SUPPORT}')">Написать в поддержку</button>
    `;
}

// ==================== ПРАВИЛА ====================
function renderRules(container) {
    container.innerHTML = `
        <div class="section-title">📜 Информация</div>
        <div class="menu-list-item"><div class="menu-list-text">1. Запрещено мошенничество</div></div>
        <div class="menu-list-item"><div class="menu-list-text">2. Возврат — только если товар не выдан</div></div>
        <div class="menu-list-item"><div class="menu-list-text">3. Уважайте других пользователей</div></div>
    `;
}

// ==================== РЕФЕРАЛКА ====================
function renderReferral(container) {
    const refLink = `https://t.me/твой_бот?start=${userData.refCode}`;
    container.innerHTML = `
        <div class="section-title">👥 Реферальная программа</div>
        <p style="color:#8a8a8a;font-size:13px;margin-bottom:15px;">Приглашай друзей — получай 5-10% с их покупок.</p>
        <div class="balance-card">
            <div class="balance-card-left">
                <div class="balance-card-label">Твоя ссылка</div>
                <div style="font-size:11px;word-break:break-all;color:#8a8a8a;margin-top:5px;">${refLink}</div>
            </div>
        </div>
        <button class="btn" style="width:100%;padding:15px;margin-top:10px;" onclick="copyRef('${refLink}')">📋 Копировать</button>
        <div class="balance-card" style="margin-top:15px;">
            <div class="balance-card-left">
                <div class="balance-card-label">Рефералов</div>
                <div class="balance-card-value">${userData.referrals}</div>
            </div>
        </div>
    `;
}

function copyRef(link) {
    navigator.clipboard.writeText(link);
    tg.showAlert("✅ Ссылка скопирована!");
}

// ==================== МОДАЛКА ====================
function openModal(html) {
    document.getElementById("modalBody").innerHTML = html;
    document.getElementById("modal").classList.add("open");
}

document.getElementById("modalClose").onclick = () => {
    document.getElementById("modal").classList.remove("open");
};

// ==================== МЕНЮ 3 ТОЧКИ ====================
document.getElementById("menuBtn").onclick = () => {
    document.getElementById("sideMenu").classList.add("open");
    document.getElementById("overlay").classList.add("open");
};

document.getElementById("overlay").onclick = () => {
    document.getElementById("sideMenu").classList.remove("open");
    document.getElementById("overlay").classList.remove("open");
};

document.querySelectorAll(".side-item").forEach(item => {
    item.onclick = () => {
        document.getElementById("sideMenu").classList.remove("open");
        document.getElementById("overlay").classList.remove("open");
        render(item.dataset.page);
    };
});

// ==================== НИЖНЯЯ НАВИГАЦИЯ ====================
document.querySelectorAll(".nav-item").forEach(item => {
    item.onclick = () => render(item.dataset.page);
});

// ==================== СТАРТ ====================
render("catalog");
