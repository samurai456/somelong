const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');
const {router} = require('./router/router');
const {onConnection, onMessageSend} = require('./wsOperations/onConnection');
const {verifyToken} = require("./middlewares/verifyToken");
const app = express();
require('dotenv').config()

process.on('uncaughtException', e=>console.log(e))

const server = http.createServer(app)
const webSocketServer = new WebSocket.Server({ server })

webSocketServer.on('connection', onConnection);
webSocketServer.onMessageSend = onMessageSend;

const attachWs = (req, res, next) => {
    req.wsServer = webSocketServer;
    next();
}

app.use(express.json());
app.get('/test', (req, res) => {
   res.send({a: 200})
});
app.use('/api', verifyToken, attachWs, router);

async function startApp(){
    try {
        await mongoose.connect(process.env.dbURL);
        server.listen(8000, () => console.log('server is running...'));
    } catch (e) {
        console.log(e)
    }
}

startApp();