const {Message} = require('../models/message');

const getMessages = async (req, res) => {
    const messages = await Message.find().sort('-created_at').limit(10);
    res.send({messages: messages.reverse()});
};

const postMessage = async (req, res) => {
    const authtoken = req.headers.authtoken;
    const client = (authtoken === process.env.dilyaToken)? 'dilya': 'ulugbek';
    const message = await Message.create({
        user: client,
        text: req.body.text
    })
    res.sendStatus(200);
    req.wsServer.onMessageSend();
};

module.exports = {getMessages, postMessage};