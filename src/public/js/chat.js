const socket = io();

const chat = document.getElementById('chat');
const messages = document.getElementById('messages');
let data;
let user;

renderMsgs = (msgs) => {
    let messages = '';
    msgs.forEach(msg => {
        messages = messages + `<div>${msg.user}: --> ${msg.message}</div>`;
    });
    messages.innerHTML = messages;
}

socket.on('message', (msg) => {
    data = msg;
});

socket.on('messages', (msgs) => {
    renderMsgs(msgs);
    chat.scrollTop = messages.scrollIntoView(false);
});

//swal alert
Swal.fire({
    title: 'Enter your email address',
    input: 'email',
    inputValidator: (value) => {
        if (!value) {
            return 'yoy need to enter your email adress!';
        }
    },
    inputAttributes: {
        autocapitalize: 'off'
    },
    showCancelButton: false,
    confirmButtonText: 'Join',
    allowOutsideClick: false
}).then((result) => {
    if (result.isConfirmed) {
        user = result.value;
        renderMsgs(data);
    }
});

chat.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && chat.value) {
        console.log(user);
        console.log(chat.value);
        socket.emit('message', { user, message: chat.value });
        chat.value = '';
    }
    e.preventDefault();
}
);

socket.on('nuevo_user', () => {
    Swal.fire({
        title: 'New user',
        text: 'A new user has joined the chat',
        icon: 'info',
        confirmButtonText: 'Cool',
        position: 'top-end',
    });
});