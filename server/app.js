var express = require('express');
var cors = require('cors'); // 解决跨域
var favicon = require('serve-favicon');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

const DB_URL = 'mongodb://127.0.0.1:27017/express_assistant';
// const DB_URL = 'mongodb://127.0.0.1:27017/express_first';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(callback) {
    console.log('Connection Successed');
});
var fs = require('file-system');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// 解决跨域需要
app.use(cors());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

fs.readdirSync('controllers').forEach(file => {
    if (file.substr(-3) === '.js') {
        const route = require('./controllers/' + file);

        route.controller(app);
    }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');

    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development

    // 解决跨域问题
    res.header('Access-Control-Allow-Origin', ' * ');
    res.header('Access-Control-Allow-Credentials', 'true');

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// express 解决跨域的设置
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', '3.2.1');

    if (req.method === 'PTIONS') res.send(200);
    else next();
});

module.exports = app;
