const express = require('express');
const router = require('./router');
const config = require('./config');

const app = express();

app.use(router);

app.listen(config.port, () => {
    console.log(`Example app listening at http://localhost:${config.port}`);
});