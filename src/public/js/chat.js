const socket = io();

const chat = document.getElementById('chat');
const messagesLog = document.getElementById('messagesLog');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
let data;
let user;

renderMsgs = (msgs) => {
    console.log('renderMsgs function');
    messagesLog.innerHTML = '';
    messages = '';
    msgs.forEach(msg => {
        messages = messages + `<p>${msg.user}: --> ${msg.message}</p>`;
    });
    messagesLog.innerHTML = messages;
}

socket.on('message', (msg) => {
    console.log('recieved message event en frontend');
    data = msg;
});

socket.on('renderMessages', (msgs) => {
    console.log('recieved renderMessages event in the frontend');
    renderMsgs(msgs);
    //chat.scrollTop = messages.scrollIntoView(false);
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
        //renderMsgs(data);
    }
});

messageInput.addEventListener('keyup', (e) => {

    e.preventDefault();
    if (messageInput.value && e.key === 'Enter') {
        //log i console the suer and the message to see if it is working in a string like "user X send message Y"
        console.log(user + ' send message ' + messageInput.value);
        socket.emit('message', { user, message: messageInput.value });
        messageInput.value = '';
    }
}
);
sendButton.addEventListener('click', (e) => {

    e.preventDefault();
    if (messageInput.value) {
        //log i console the suer and the message to see if it is working in a string like "user X send message Y"
        console.log(user + ' send message ' + messageInput.value);
        socket.emit('message', { user, message: messageInput.value });
        messageInput.value = '';
    }
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
