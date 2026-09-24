// ==================== ИНИЦИАЛИЗАЦИЯ ====================
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// ==================== ТОКЕН БОТА ====================
const BOT_TOKEN = "8298081906:AAH6jojHJxQoxtWckyRxWOX72VN72-lWDdw";
const CHAT_ID_SUPPORT = "@твой_поддержка_физа";
const CHAT_ID_FAQ = "@твой_faq_канал";
const CHAT_ID_REVIEWS = "@твой_отзывы_канал";
const CHAT_ID_CHAT = "@твой_чат";

// ==================== ДАННЫЕ (ЗАГЛУШКА) ====================
let userData = {
    id: tg.initDataUnsafe?.user?.id || 1,
    username: tg.initDataUnsafe?.user?.username || "desired",
    firstName: tg.initDataUnsafe?.user?.first_name || "Гость",
    balance: 1500,
    referrals: 5,
    refCode: "REF_" + (tg.initDataUnsafe?.user?.id || 1),
    joined: "01.09.2026"
};

let products = [
    { id: 1, name: "Telegram Stars 100", desc: "100 звёзд на ваш аккаунт", price: 150, category: "stars", reviews: 12 },
    { id: 2, name: "Telegram Stars 500", desc: "500 звёзд на ваш аккаунт", price: 700, category: "stars", reviews: 8 },
    { id: 3, name: "Telegram Premium 1 мес", desc: "Premium на 1 месяц", price: 350, category: "premium", reviews: 34 },
    { id: 4, name: "Telegram Premium 3 мес", desc: "Premium на 3 месяца", price: 950, category: "premium", reviews: 22 },
    { id: 5, name: "Аккаунт США (новый)", desc: "Свежий аккаунт США", price: 90, category: "accounts", reviews: 56 },
    { id: 6, name: "Аккаунт Англия", desc: "Аккаунт Великобритании", price: 120, category: "accounts", reviews: 18 },
    { id: 7, name: "Аккаунт Колумбия", desc: "Аккаунт Колумбии", price: 100, category: "accounts", reviews: 9 },
    { id: 8, name: "Аккаунт Казахстан", desc: "Аккаунт Казахстана", price: 80, category: "accounts", reviews: 14 }
];

let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let history = JSON.parse(localStorage.getItem("history") || "[]");

// ==================== НАВИГАЦИЯ ====================
let currentPage = "catalog";

function render(page) {
    currentPage = page;
    const main = document.getElementById("mainContent");

    // Обновляем активный пункт нижней навигации
    document.querySelectorAll(".nav-item").forEach(el => {
        el.classList.toggle("active", el.dataset.page === page);
    });

    // Обновляем счётчик корзины
    document.getElementById("cartCount").innerText = cart.length;

    // Обновляем баланс в шапке
    document.getElementById("headerBalance").innerText = `💰 ${userData.balance} ₽`;

    // Рендер страницы
    if (page === "catalog") renderCatalog(main);
    else if (page === "cart") renderCart(main);
    else if (page === "profile") renderProfile(main);
    else if (page === "support") renderSupport(main);
    else if (page === "faq") renderFAQ(main);
    else if (page === "reviews") renderReviews(main);
    else if (page === "chat") renderChat(main);
    else if (page === "referral") renderReferral(main);
    else if (page === "rules") renderRules(main);
    else if (page === "instructions") renderInstructions(main);
}

// ==================== КАТАЛОГ ====================
function renderCatalog(container) {
    container.innerHTML = `
        <div class="filters">
            <button class="filter-btn active" data-cat="all">Все</button>
            <button class="filter-btn" data-cat="stars">Stars</button>
            <button class="filter-btn" data-cat="premium">Premium</button>
            <button class="filter-btn" data-cat="accounts">Аккаунты</button>
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

function renderProducts(category) {
    const list = document.getElementById("productList");
    const filtered = category === "all" ? products : products.filter(p => p.category === category);

    list.innerHTML = filtered.map(p => `
        <div class="product">
            <div class="product-info">
                <div class="product-name">${p.name}</div>
                <div class="product-desc">${p.desc}</div>
                <div class="product-price">${p.price} ₽</div>
                <div class="product-desc">⭐ ${p.reviews} отзывов</div>
            </div>
            <div class="product-actions">
                <button class="btn" onclick="addToCart(${p.id})">В корзину</button>
                <button class="btn-info" onclick="showProductInfo(${p.id})">ℹ️</button>
            </div>
        </div>
    `).join("");
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        document.getElementById("cartCount").innerText = cart.length;
        tg.showAlert(`✅ ${product.name} добавлен в корзину`);
    }
}

function showProductInfo(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    openModal(`
        <h3 style="color:#ff1a1a;margin-bottom:15px;">${p.name}</h3>
        <p style="color:#8a8a9a;font-size:13px;line-height:1.6;">${p.desc}</p>
        <p style="margin-top:15px;font-size:13px;"><b>Цена:</b> ${p.price} ₽</p>
        <p style="margin-top:5px;font-size:13px;"><b>Отзывов:</b> ${p.reviews}</p>
        <p style="margin-top:15px;font-size:12px;color:#8a8a9a;">При покупке вы соглашаетесь с правилами и условиями сервиса.</p>
    `);
}

// ==================== КОРЗИНА ====================
function renderCart(container) {
    if (cart.length === 0) {
        container.innerHTML = `<div class="empty">🛒 Корзина пуста</div>`;
        return;
    }
    const total = cart.reduce((sum, p) => sum + p.price, 0);
    container.innerHTML = `
        <div class="section-title">Корзина (${cart.length})</div>
        ${cart.map((p, i) => `
            <div class="cart-item">
                <div>
                    <div class="product-name">${p.name}</div>
                    <div class="product-price">${p.price} ₽</div>
                </div>
                <button class="cart-remove" onclick="removeFromCart(${i})">Удалить</button>
            </div>
        `).join("")}
        <div class="section-title">Итого: ${total} ₽</div>
        <button class="btn" style="width:100%;padding:15px;" onclick="checkout()">Оплатить</button>
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
        tg.showAlert("❌ Недостаточно средств. Пополните баланс.");
        return;
    }
    userData.balance -= total;
    cart.forEach(p => {
        history.push({
            product: p.name,
            price: p.price,
            date: new Date().toLocaleDateString("ru-RU")
        });
    });
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("history", JSON.stringify(history));
    tg.showAlert("✅ Покупка успешна! Товар выдан.");
    render("profile");
}

// ==================== ПРОФИЛЬ ====================
function renderProfile(container) {
    container.innerHTML = `
        <div class="profile-card">
            <div class="profile-row"><span>Юзернейм</span><b>@${userData.username}</b></div>
            <div class="profile-row"><span>Имя</span><b>${userData.firstName}</b></div>
            <div class="profile-row"><span>ID</span><b>${userData.id}</b></div>
            <div class="profile-row"><span>Баланс</span><b>${userData.balance} ₽</b></div>
            <div class="profile-row"><span>Рефералов</span><b>${userData.referrals}</b></div>
            <div class="profile-row"><span>Дата регистрации</span><b>${userData.joined}</b></div>
        </div>
        <button class="btn" style="width:100%;padding:15px;margin-bottom:10px;" onclick="topup()">💳 Пополнить баланс</button>
        <button class="btn btn-outline" style="width:100%;padding:15px;" onclick="render('history')">📜 История заказов</button>
        <div class="section-title">История заказов</div>
        ${history.length === 0 ? '<div class="empty">Пока ничего не куплено</div>' : history.map(h => `
            <div class="history-item">
                <div>
                    <div class="product-name">${h.product}</div>
                    <div class="product-desc">${h.date}</div>
                </div>
                <div class="product-price">${h.price} ₽</div>
            </div>
        `).join("")}
    `;
}

function topup() {
    openModal(`
        <h3 style="color:#ff1a1a;margin-bottom:15px;">Пополнение баланса</h3>
        <p style="font-size:13px;color:#8a8a9a;margin-bottom:15px;">Выберите способ оплаты:</p>
        <button class="btn" style="width:100%;padding:12px;margin-bottom:8px;">💳 СБП</button>
        <button class="btn" style="width:100%;padding:12px;margin-bottom:8px;">💳 Банковская карта РФ</button>
        <button class="btn" style="width:100%;padding:12px;margin-bottom:8px;">⭐ Telegram Stars</button>
        <button class="btn" style="width:100%;padding:12px;">₿ CryptoBot</button>
    `);
}

// ==================== ПОДДЕРЖКА ====================
function renderSupport(container) {
    container.innerHTML = `
        <div class="section-title">🆘 Тех. поддержка</div>
        <p style="font-size:13px;color:#8a8a9a;margin-bottom:15px;">Если у вас возникли вопросы — напишите нам.</p>
        <a class="btn" style="display:block;text-align:center;text-decoration:none;padding:15px;" href="https://t.me/${CHAT_ID_SUPPORT.replace("@","")}" target="_blank">Написать в поддержку</a>
    `;
}

// ==================== FAQ ====================
function renderFAQ(container) {
    container.innerHTML = `
        <div class="section-title">❓ FAQ</div>
        <div class="profile-card">
            <div class="profile-row"><b>Как купить товар?</b></div>
            <div style="padding:10px 0;color:#8a8a9a;font-size:13px;">Добавьте в корзину → оплатите → товар выдаётся автоматически.</div>
            <div class="profile-row"><b>Что делать, если товар не пришёл?</b></div>
            <div style="padding:10px 0;color:#8a8a9a;font-size:13px;">Напишите в тех. поддержку, мы разберёмся в течение 24 часов.</div>
            <div class="profile-row"><b>Как пополнить баланс?</b></div>
            <div style="padding:10px 0;color:#8a8a9a;font-size:13px;">Через СБП, карту РФ, Telegram Stars или CryptoBot.</div>
            <div class="profile-row"><b>Можно ли вернуть деньги?</b></div>
            <div style="padding:10px 0;color:#8a8a9a;font-size:13px;">Возврат только если товар не был выдан или не работает.</div>
        </div>
        <a class="btn btn-outline" style="display:block;text-align:center;text-decoration:none;padding:15px;margin-top:10px;" href="https://t.me/${CHAT_ID_FAQ.replace("@","")}" target="_blank">📖 Все вопросы в канале</a>
    `;
}

// ==================== ОТЗЫВЫ ====================
function renderReviews(container) {
    container.innerHTML = `
        <div class="section-title">⭐ Отзывы</div>
        <div class="profile-card">
            <div class="profile-row"><b>@user123</b> <span style="color:#ff1a1a;">★★★★★</span></div>
            <div style="padding:10px 0;color:#8a8a9a;font-size:13px;">Всё пришло быстро, рекомендую!</div>
            <div class="profile-row"><b>@buyer_99</b> <span style="color:#ff1a1a;">★★★★★</span></div>
            <div style="padding:10px 0;color:#8a8a9a;font-size:13px;">Premium купил, всё чётко.</div>
        </div>
        <a class="btn" style="display:block;text-align:center;text-decoration:none;padding:15px;margin-top:10px;" href="https://t.me/${CHAT_ID_REVIEWS.replace("@","")}" target="_blank">Написать отзыв в канале</a>
    `;
}

// ==================== ЧАТ ====================
function renderChat(container) {
    container.innerHTML = `
        <div class="section-title">💬 Чат</div>
        <div class="profile-card">
            <p style="font-size:13px;color:#8a8a9a;">Общий чат для общения покупателей и администрации.</p>
        </div>
        <a class="btn" style="display:block;text-align:center;text-decoration:none;padding:15px;margin-top:10px;" href="https://t.me/${CHAT_ID_CHAT.replace("@","")}" target="_blank">Перейти в чат</a>
    `;
}

// ==================== РЕФЕРАЛКА ====================
function renderReferral(container) {
    const refLink = `https://t.me/твой_бот?start=${userData.refCode}`;
    container.innerHTML = `
        <div class="section-title">👥 Реферальная система</div>
        <div class="profile-card">
            <p style="font-size:13px;color:#8a8a9a;">Приглашай друзей и получай 5-10% с каждой их покупки!</p>
            <div class="profile-row" style="margin-top:15px;"><span>Твоя ссылка:</span></div>
            <div style="padding:10px;background:#0a0a0f;border-radius:8px;font-size:11px;word-break:break-all;margin-top:5px;">${refLink}</div>
            <button class="btn" style="width:100%;padding:12px;margin-top:10px;" onclick="copyRef('${refLink}')">📋 Копировать ссылку</button>
            <div class="profile-row" style="margin-top:15px;"><span>Рефералов:</span><b>${userData.referrals}</b></div>
        </div>
    `;
}

function copyRef(link) {
    navigator.clipboard.writeText(link);
    tg.showAlert("✅ Ссылка скопирована!");
}

// ==================== ПРАВИЛА ====================
function renderRules(container) {
    container.innerHTML = `
        <div class="section-title">📜 Правила</div>
        <div class="profile-card">
            <div class="profile-row"><b>1. Запрещено мошенничество</b></div>
            <div class="profile-row"><b>2. Запрещена реклама без согласования</b></div>
            <div class="profile-row"><b>3. Уважайте других покупателей</b></div>
            <div class="profile-row"><b>4. Возврат — только если товар не выдан</b></div>
            <div class="profile-row"><b>5. Администрация вправе заблокировать за нарушения</b></div>
        </div>
    `;
}

// ==================== ИНСТРУКЦИИ ====================
function renderInstructions(container) {
    container.innerHTML = `
        <div class="section-title">📖 Инструкции</div>
        <div class="profile-card">
            <div class="profile-row"><b>Как купить Stars?</b></div>
            <div style="padding:10px 0;color:#8a8a9a;font-size:13px;">Выбери → купи → звёзды придут на твой аккаунт через 5 минут.</div>
            <div class="profile-row"><b>Как купить Premium?</b></div>
            <div style="padding:10px 0;color:#8a8a9a;font-size:13px;">Выбери срок → оплати → Premium активируется автоматически.</div>
            <div class="profile-row"><b>Как купить аккаунт?</b></div>
            <div style="padding:10px 0;color:#8a8a9a;font-size:13px;">Выбери страну → оплати → получишь логин/пароль в чате.</div>
        </div>
    `;
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