const express = require('express');
const config = require('./config');
const handler = require('./handler');

const router = express.Router();

router
.get('/', handler.showIndexPage)
.post('/api/login', handler.login)
.get('/api/basicAuth', handler.basicAuth)

module.exports = router;