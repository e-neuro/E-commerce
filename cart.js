document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
});

function loadCartItems() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0];

    if (!cartItemsContainer) {
        console.error("No element found with class 'cart-items'");
        return;
    }

    cartItemsContainer.innerHTML = ''; // Clear any existing items

    cartItems.forEach(item => {
        var cartRow = document.createElement('tr');
        cartRow.classList.add('cart-row');

        var cartRowContents = `
            <td><i class="far fa-times-circle btn-danger"></i></td>
            <td><img src="${item.imageSrc}" alt=""></td>
            <td>${item.title}</td>
            <td class="cart-price">${item.price}</td>
            <td><input class="cart-quantity-input" type="number" value="${item.quantity}"></td>
            <td class="cart-subtotal">${item.price}</td>
        `;
        cartRow.innerHTML = cartRowContents;
        cartItemsContainer.appendChild(cartRow);

        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', () => removeCartItem(item.title));
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', (event) => quantityChanged(event, item.title));
    });

    updateCartTotal();
}

function removeCartItem(title) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.title !== title);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCartItems();
}

function quantityChanged(event, title) {
    var input = event.target;
    var quantity = parseInt(input.value);

    if (isNaN(quantity) || quantity <= 0) {
        input.value = 1;
        quantity = 1;
    }

    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var item = cartItems.find(item => item.title === title);

    if (item) {
        item.quantity = quantity;
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartSubtotal(input, item.price);
    updateCartTotal();
}

function updateCartSubtotal(input, price) {
    var cartRow = input.parentElement.parentElement;
    var subtotalElement = cartRow.getElementsByClassName('cart-subtotal')[0];

    if (!subtotalElement) {
        console.error('Subtotal element is missing in the cart row');
        return;
    }

    var quantity = input.value;
    var subtotal = parseFloat(price.replace('₹', '').replace(',', '')) * quantity;
    subtotalElement.innerText = '₹' + subtotal.toLocaleString();
}

function updateCartTotal() {
    var cartRows = document.getElementsByClassName('cart-row');
    var total = 0;
    var cartItemsCount = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var quantity = parseInt(quantityElement.value);

        cartItemsCount += quantity;

        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var price = parseFloat(priceElement.innerText.replace('₹', '').replace(',', '').replace(',',''));
        total += price * quantity;
        cartRow.getElementsByClassName('cart-subtotal')[0].innerText = '₹' + (price * quantity).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    document.querySelector('.subtotal table tr:nth-child(1) td:nth-child(2)').innerText = cartItemsCount;

    document.getElementsByClassName('cart-total-price')[0].innerText = '₹' + total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var success = document.getElementById('check-out');
if(success){
   success.addEventListener('click', proceedToCheckOut)
}
    function proceedToCheckOut() {
        var cartRows = document.getElementsByClassName('cart-row');
    var total = 0;
    var cartItemsCount = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var quantity = parseInt(quantityElement.value);

        cartItemsCount += quantity;

        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var price = parseFloat(priceElement.innerText.replace('₹', '').replace(',', '').replace(',',''));
        total += price * quantity;
        cartRow.getElementsByClassName('cart-subtotal')[0].innerText = '₹' + (price * quantity).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
    }
    alert(`You have ordered ${cartItemsCount} items. Total price: ₹${total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} \nThank you for Shopping!\nHave a nice day..`);
    localStorage.removeItem('cartItems');
    loadCartItems();
}
