const {Message} = require('../models/message');

const clients = [];

async function onConnection(ws){
    clients.push(ws);
}

async function onMessageSend(){
    const messages = await Message.find();
    clients.forEach(cl => {
        cl.send(
            JSON.stringify({
                messages: messages.slice(-10)
            })
        )
    });
}

module.exports = {onConnection, onMessageSend};