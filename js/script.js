// Глобальный массив корзины
let cart = [];

// Функция перерисовки корзины (стрелочная функция)
const renderCart = () => {
    const cartList = document.getElementById('cart-items');
    const totalSpan = document.getElementById('cart-total');
    
    // Очищаем список
    cartList.innerHTML = '';
    
    // Если корзина пуста
    if (cart.length === 0) {
        cartList.innerHTML = '<li>Корзина пуста</li>';
        totalSpan.textContent = 'Итого: 0 ₽';
        return;
    }
    
    // Перебираем товары в корзине
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ${item.price} ₽ 
            <button class="remove-item" data-index="${index}">Удалить</button>`;
        cartList.appendChild(li);
    });
    
    // Обновляем итоговую сумму
    totalSpan.textContent = `Итого: ${total} ₽`;
    
    // Добавляем обработчики на кнопки удаления
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.dataset.index);
            cart.splice(index, 1); // Удаляем товар из массива
            renderCart(); // Перерисовываем корзину
        });
    });
};

// Функция добавления в корзину (стрелочная функция)
const addToCart = (name, price) => {
    cart.push({ name, price });
    renderCart();
    alert(`"${name}" добавлен в корзину!`); // Всплывающее окно
};

// Функция фильтрации товаров
const filterProducts = (category) => {
    const products = document.querySelectorAll('.product-item');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = ''; // Показываем
        } else {
            product.style.display = 'none'; // Скрываем
        }
    });
};

// Ждём загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    // === 1. КНОПКИ ДОБАВЛЕНИЯ В КОРЗИНУ ===
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productItem = btn.closest('.product-item');
            const name = productItem.dataset.name;
            const price = parseInt(productItem.dataset.price);
            addToCart(name, price);
        });
    });
    
    // === 2. КНОПКИ ФИЛЬТРАЦИИ ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = btn.dataset.category;
            filterProducts(category);
        });
    });
    
    // === 3. КНОПКА ОЧИСТКИ КОРЗИНЫ ===
    const clearCartBtn = document.getElementById('clear-cart');
    clearCartBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            cart = [];
            renderCart();
            alert('Корзина очищена!');
        } else {
            alert('Корзина и так пуста!');
        }
    });
    
    // === 4. КНОПКА ОПЛАТЫ ===
    const checkoutBtn = document.getElementById('checkout');
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Корзина пуста! Добавьте товары перед оплатой.');
        } else {
            alert('Покупка прошла успешно! Спасибо за заказ.');
            cart = [];
            renderCart();
        }
    });
});