const {Message} = require('../models/message');

const clients = [];

async function onConnection(ws){
    clients.push(ws);
}

async function onMessageSend(){
    const messages = await Message.find().sort('-created_at').limit(10);
    clients.forEach(cl => {
        cl.send(
            JSON.stringify({
                messages: messages.reverse()
            })
        )
    });
}

module.exports = {onConnection, onMessageSend};