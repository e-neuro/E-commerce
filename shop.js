// document.addEventListener('DOMContentLoaded', () => {
//     var addToCartButtons = document.getElementsByClassName('shop-item-button');
//     for (var i = 0; i < addToCartButtons.length; i++) {
//         var button = addToCartButtons[i];
//         button.addEventListener('click', addToCartClicked);
//     }
// });

// function addToCartClicked(event) {
//     var button = event.target;
//     var shopItem = button.parentElement;

//     var titleElement = shopItem.getElementsByClassName('shop-item-title')[0];
//     var priceElement = shopItem.getElementsByClassName('shop-item-price')[0];
//     var imageElement = shopItem.getElementsByClassName('shop-item-image')[0];

//     if (!titleElement || !priceElement || !imageElement) {
//         console.error('One or more elements are missing in the shop item');
//         return;
//     }

//     var title = titleElement.innerText;
//     var price = priceElement.innerText;
//     var imageSrc = imageElement.src;

//     console.log(title, price, imageSrc);
//     addItemToCart(title, price, imageSrc);
// }

// function addItemToCart(title, price, imageSrc) {
//     var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
//     // Check if the item already exists in the cart
//     var existingItem = cartItems.find(item => item.title === title);
//     if (existingItem) {
//         existingItem.quantity += 1;
//     } else {
//         cartItems.push({ title, price, imageSrc, quantity: 1 });
//     }

//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     alert('Item added to cart');
// }


document.addEventListener('DOMContentLoaded', () => {
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
    updateCartItemCount(); // Update item count on page load
});

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement;

    var titleElement = shopItem.getElementsByClassName('shop-item-title')[0];
    var priceElement = shopItem.getElementsByClassName('shop-item-price')[0];
    var imageElement = shopItem.getElementsByClassName('shop-item-image')[0];

    if (!titleElement || !priceElement || !imageElement) {
        console.error('One or more elements are missing in the shop item');
        return;
    }

    var title = titleElement.innerText;
    var price = priceElement.innerText;
    var imageSrc = imageElement.src;

    console.log(title, price, imageSrc);
    addItemToCart(title, price, imageSrc);
}

function addItemToCart(title, price, imageSrc) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if the item already exists in the cart
    var existingItem = cartItems.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ title, price, imageSrc, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartItemCount(); // Update item count when a new item is added
}

function updateCartItemCount() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    var cartItemCountElement = document.getElementById('cart-item-count');
    if (totalItems > 0) {
        cartItemCountElement.innerText = totalItems;
        cartItemCountElement.style.display = 'inline-block';
    } else {
        cartItemCountElement.style.display = 'none';
    }
}
