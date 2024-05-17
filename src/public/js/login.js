import { login } from "../../controllers/session";

const loginnForm = document.getElementById('login-form');
loginnForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value  
    };

    console.log(user);
    //use de login function from session.js
    login(user)
    .then( res => {
        console.log(res)
        //if the login is OK redirect to the profile page
        if(res.status === 200){
            res.render('profile')
        }
        else{
            //if the login is not OK show an error message
            alert('Login Error')
        }
    })

    loginnForm.reset();
});