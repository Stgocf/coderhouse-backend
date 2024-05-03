const socket = io();

socket.on('products', (products) => {
    console.log('load products using sockets!');
    const productsContainer = document.getElementById('products-socket');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('tr');
        productElement.innerHTML = `
            <td>${product._id}</td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.thumbnail}</td>
            <td>${product.code}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            <td>${product.status}</td>
        `;
        productsContainer.appendChild(productElement);
    });

});

const addProdForm = document.getElementById('add-product-form');
addProdForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,   
    };

    console.log(product);
    console.log('socket emit newproduct');

    socket.emit('newproduct', product );
    addProdForm.reset();
});