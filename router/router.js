const Router = require('express');
const {getMessages, postMessage} = require('../controllers/messageController');

const router = new Router();

router.get('/messages', getMessages);
router.post('/message', postMessage);

module.exports = { router };