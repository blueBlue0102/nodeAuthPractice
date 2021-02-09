const config = require('./config');

exports.showIndexPage = (req, res) => {
    res.status(200).sendFile('login.html', {root: __dirname });
}

exports.login = (req, res) => {
    res.send('成功 login');
}

exports.basicAuth = (req, res, next) => {
    var authHeader = req.headers.authorization;
    if(!authHeader){
        var err = new Error('You are not authenticated');
        res.setHeader('WWW-Authenticate', 'Basic realm="Hi"');
        err.status = 401;
        return next(err);
    }

    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];

    if(username == config.username && password == config.password){
        return res.send('HTTP Basic Auth 成功');
    }else {
        var err = new Error('You are not authenticated');
        res.setHeader('WWW-Authenticate', 'Basic realm = "test"');
        err.status = 401;
        return next(err);
    }
}