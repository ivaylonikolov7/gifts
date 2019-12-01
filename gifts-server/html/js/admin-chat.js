var socket = io();
let chats = document.querySelector('#chats')
let chatId,messages;

socket.on('admin please join room', (room)=>{
    socket.emit('make admin join room', room);
    console.log('Admin will join ' + room);
})

socket.on('user send admin', (data)=>{
    addMessageToDom(data.message, data.room);
})
socket.on('add a room to frontend', (roomId)=>{
    if(isTheRoomUnique(roomId)){
        addNewChatroomToDom(roomId);
        let currentChatId = document.querySelector(`#${roomId}`);
        currentChatId.querySelector('input[type=submit]').addEventListener('click', (e)=>{
            let message = currentChatId.querySelector('textarea').value
            addMessageToDom(message, roomId);
            socket.emit('send user message', message);
            
        });
    }

})

function addNewChatroomToDom(roomId) {
    let templateUser = `
    <div class="chat-id user" id=${roomId}>
        <h1>${roomId}</h1>
        <div id="messages">
        </div>
        <textarea></textarea>
        <div id="submit">
            <input type="submit">
        </div>
    </div>`;
    chats.innerHTML += templateUser;
}

function addMessageToDom(message, data) {
    let messageTemplate = `<div id="admin" class="message">${message}</div>`;
    chatId = document.querySelector(`#${data}`);
    messages = chatId.querySelector('#messages');
    messages.innerHTML += messageTemplate;
}
function isTheRoomUnique(roomId){
    let unique = true;
    let allRoomsDOOM = document.querySelectorAll(`#${roomId}`)
    allRoomsDOOM.forEach((roomDom)=>{
        if(roomDom.getAttribute('id')==roomId){
            unique=false
            console.log(roomDom.getAttribute('id'))
            console.log(roomId);
            console.log('--------------------');
        }
    })
    return unique;
}