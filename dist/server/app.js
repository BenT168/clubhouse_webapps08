"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var http = require("http");
var socket = require("socket.io");
var routes_1 = require("./routes");
var app = express();
exports.app = app;
var router = express.Router();
var server = http.createServer(app);
var io = socket(server);
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
    routes_1.default(app);
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    app.listen(app.get('port'), function () {
        console.log('Angular Full Stack listening on port ' + app.get('port'));
    });
});
server.listen(4000);
// socket io
io.on('connection', function (socket) {
    console.log('User connected');
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
    socket.on('save-message', function (data) {
        console.log(data);
        io.emit('new-message', { message: data });
    });
});
//# sourceMappingURL=app.js.map