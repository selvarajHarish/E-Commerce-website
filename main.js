const products = [
    { id: 1, name: 'Gas Stove', price: 3000, discount: '35%', imageUrl: 'images/cooker.jpeg', category: 'Category 1' },
    { id: 2, name: 'Ear Buds', price: 1399, discount: '45%', imageUrl: 'images/earbuds.png', category: 'Category 2' },
    { id: 3, name: 'Headphone', price: 5000, discount: '10%', imageUrl: 'images/headphone.png', category: 'Category 3' },
    { id: 4, name: 'Mobile', price: 40000, discount: '30%', imageUrl: 'images/mobile.png', category: 'Category 4' },
    { id: 5, name: 'Laptop', price: 55000, discount: '40%', imageUrl: 'images/laptop.png', category: 'Category 5' },
    { id: 6, name: 'Nike shoe', price: 5000, discount: '25%', imageUrl: 'images/nikeshoe.png', category: 'Category 6' },
    { id: 7, name: 'Smart watch', price: 1000, discount: '20%', imageUrl: 'images/smartwatch.png', category: 'Category 7' },
    { id: 8, name: 'Crocs', price: 2500, discount: '10%', imageUrl: 'images/slipper.png', category: 'Category 8' },
    { id: 9, name: 'Trolley Bags', price: 6000, discount: '40%', imageUrl: 'images/trolley.png', category: 'Category 9' },
    { id: 10, name: 'Deodorants', price: 150, discount: '50%', imageUrl: 'images/perfume.png', category: 'Category 10' },
];

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Price: ₹${product.price}</p>
            <p>Discount: ${product.discount}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

if (document.getElementById('product-list')) {
    displayProducts(products);
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

function displayCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';
    cart.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Discount: ${product.discount}</p>
            <p>Price: ₹${product.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartElement.appendChild(productDiv);
    });
}

if (document.getElementById('cart')) {
    displayCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function checkout() {
    window.location.href = 'checkout.html';
}

// Checkout functionality
if (document.getElementById('checkout-form')) {
    document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Purchase complete!');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'index.html';
    });
}

// User account functionality
const users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (document.getElementById('register-form')) {
    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        window.location.href = 'login.html';
    });
}

if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            alert('Login successful!');
            window.location.href = 'profile.html';
        } else {
            alert('Invalid email or password');
        }
    });
}

if (document.getElementById('user-name')) {
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-email').textContent = currentUser.email;
}

function logout() {
    currentUser = null;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    window.location.href = 'index.html';
}


document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    displayProducts(filteredProducts);
});

function sortProducts() {
    const sortValue = document.getElementById('sort').value;
    let sortedProducts = [...products];
    if (sortValue === 'priceAsc') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'priceDesc') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'newestFirst') {
        sortedProducts.sort((a, b) => b.id - a.id); // Assuming newer products have higher IDs
    } else if (sortValue === 'popularity') {
        // Implement popularity sort logic
    } else if (sortValue === 'relevance') {
        // Implement relevance sort logic
    }
    displayProducts(sortedProducts);
}

function filterProducts() {
    const filterValue = document.getElementById('filter').value;
    let filteredProducts = [...products];
    if (filterValue === 'Price1') {
        filteredProducts = products.filter(product => product.price <= 250);
    } else if (filterValue === 'Price2') {
        filteredProducts = products.filter(product => product.price > 250 && product.price <= 500);
    } else if (filterValue === 'Price3') {
        filteredProducts = products.filter(product => product.price > 500 && product.price <= 1000);
    } else if (filterValue === 'Price4') {
        filteredProducts = products.filter(product => product.price > 1000 && product.price <= 2000);
    } else if (filterValue === 'Price5') {
        filteredProducts = products.filter(product => product.price > 2000 && product.price <= 5000);
    } else if (filterValue === 'Price6') {
        filteredProducts = products.filter(product => product.price > 5000 && product.price <= 10000);
    }
    displayProducts(filteredProducts);
}

function discountProducts() {
    const discountValue = document.getElementById('discount').value;
    let discountedProducts = [...products];
    if (discountValue === 'discount1') {
        discountedProducts = products.filter(product => parseInt(product.discount) >= 50);
    } else if (discountValue === 'discount2') {
        discountedProducts = products.filter(product => parseInt(product.discount) >= 40);
    } else if (discountValue === 'discount3') {
        discountedProducts = products.filter(product => parseInt(product.discount) >= 30);
    } else if (discountValue === 'discount4') {
        discountedProducts = products.filter(product => parseInt(product.discount) >= 20);
    } else if (discountValue === 'discount5') {
        discountedProducts = products.filter(product => parseInt(product.discount) >= 10);
    }
    displayProducts(discountedProducts);
}





