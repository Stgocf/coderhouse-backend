
//going to /api/session/github when "github-button" is clicked
document.getElementById('github-button').addEventListener('click', async () => {
    window.location.href = 'http://localhost:8080/api/sessions/github';
});