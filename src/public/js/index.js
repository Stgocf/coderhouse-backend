// Import the socket.io client

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


document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Capture form data
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;

    // Create a user object
    const user = {
        first_name: first_name,
        last_name: last_name,
        age: age,
        email: email,
        password: password
    };

    try {
        // Send a POST request to /api/sessions/login
        const response = await fetch('http://localhost:8080/api/sessions/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        // Process the response
        if (response.ok) {
            const result = await response.json();
            console.log('Success:', result);
            // Redirect to the login handlebars page page
            window.location.href = '/login';
        } else {
            const error = await response.json();
            console.error('Error:', error.msg);
            alert(`Register failed: ${error.msg}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
});

