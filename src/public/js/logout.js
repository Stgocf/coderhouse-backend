//add event on the logout-button click to execute api/sessions/logout
document.getElementById('logout-button').addEventListener('click', async () => {

    console.log('Logging out...');
    const response = await fetch('http://localhost:8080/api/sessions/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
    if (response.ok) {
        alert('Logged out successfully');
        window.location.href = '/login';
    }
    else {
        alert('Failed to log out');
        console.log('Error logging out')
    }

});