let cart = [];

function addToCart(productName, productPrice) {
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCartCount();
    updateCartDisplay();
    alert(productName + ' has been added to your cart.');
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = `(${cart.length})`;
}

function updateCartDisplay() {
    const cartItemsTable = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    cartItemsTable.innerHTML = `
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
        </tr>
    `;

    let total = 0;
    cart.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>R${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>R${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
        `;

        cartItemsTable.appendChild(row);
    });

    cartTotalElement.textContent = `Total: R${total.toFixed(2)}`;
}
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartCount();
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Proceeding to checkout...');
        cart = [];
        updateCartCount();
        updateCartDisplay();
    }
}

function populateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummary = document.querySelector('.order-summary');
    let total = 0;

    orderSummary.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('order-item');
        itemElement.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-price">R${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderSummary.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    
    const totalElement = document.createElement('div');
    totalElement.classList.add('order-total');
    totalElement.innerHTML = `
        <span>Total:</span>
        <span>R${total.toFixed(2)}</span>
    `;
    orderSummary.appendChild(totalElement);
}

document.addEventListener('DOMContentLoaded', populateOrderSummary);

function validateCheckoutForm() {
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const country = document.getElementById('country').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!name || !address || !city || !zip || !country || !cardNumber || !expiryDate || !cvv) {
        alert('Please fill in all the required fields.');
        return false;
    }
    return true;
}
const checkoutForm = document.querySelector('#checkout form');
checkoutForm.addEventListener('submit', function (event) {
    if (!validateCheckoutForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});
