

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Capture form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create a user object
    const user = {
        email: email,
        password: password
    };

    try {
        // Send a POST request to /api/sessions/login
        const response = await fetch('http://localhost:8080/api/sessions/login', {
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
            // Redirect to the products page on handlebars
            window.location.href = '/products';
        } else {
            const error = await response.json();
            console.error('Error:', error.msg);
            alert(`Login failed: ${error.msg}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
});
