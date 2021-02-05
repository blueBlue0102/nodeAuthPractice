const http = require('http');
const express = require('express');
const config = require('../config');
const basicAuth = require('./basicAuth');

const app = express();

app.use('/s', basicAuth);

app.get('/',(req,res)=>{
    res.status(200).end("Welcome to your express app!")
})

app.get('/s',(req,res)=>{
    res.status(200).end("Authentication Page!!")
});

app.listen(config.port, () => {
    console.log(`Example app listening at http://localhost:${config.port}`);
});