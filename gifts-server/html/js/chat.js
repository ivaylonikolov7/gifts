
var socket = io();
let popupBool = false;
let joinedRoom = false;
let textareaDom = document.querySelector('textarea');
let popup = document.querySelector('#popup');
let submit = document.querySelector('#send button');
let header = document.querySelector('#live-chat-header')


textareaDom.addEventListener('keydown', (e)=>{
    if(e.code == "Enter" || e.code=="NumpadEnter"){
        let role = 'user';
        e.preventDefault();
        socket.emit('send admin message',{message: textareaDom.value});
        addMessageToDom(role, textareaDom.value);  
        textareaDom.value = '' 
    }
})

let closeChat = document.querySelector('.fa-window-close');
let minimumChat = document.querySelector('.fa-window-minimize');


socket.on('admin send user message', (message)=>{
    let role = 'admin';
    addMessageToDom(role, message);    
})
closeChat.addEventListener('click', (e)=>{
    e.currentTarget.parentElement.parentElement.parentElement.remove();
    socket.emit('close chat');
})

popup.addEventListener('click', ()=>{
    if(popupBool==false){
        let messages = document.querySelector('#messages');
        let board = document.querySelector('#message-board');
        messages.style.display = "block";
        board.style.display = "block"
        popupBool = true;
    }
    else{
        let messages = document.querySelector('#messages');
        let board = document.querySelector('#message-board');        
        messages.style.display = "none";
        board.style.display = "none"
        popupBool = false;
    }
})

header.addEventListener('click', ()=>{
    if(popupBool==false){
        let messages = document.querySelector('#messages');
        let board = document.querySelector('#message-board');
        messages.style.display = "block";
        board.style.display = "block"
        popupBool = true;
        if(joinedRoom==false){
            if(getCookie('room')==null){
                let id = UUID.generate();
                setCookie('room', id, 1)
                socket.emit('join room', id);
                console.log('User will join ' + id)
            }
            else{
                socket.emit('join room', getCookie('room'));
                console.log('User will join ' + getCookie('room'))
            }            
            joinedRoom = true;
        }
    }
    else{
        let messages = document.querySelector('#messages');
        let board = document.querySelector('#message-board');        
        messages.style.display = "none";
        board.style.display = "none"
        popupBool = false;
    }
})

function addMessageToDom(role, message) {
    let messagesDom = document.querySelector('#messages');
    let template = `<div class="message ${role}">${message}</div>`;
    messagesDom.innerHTML += template;
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }