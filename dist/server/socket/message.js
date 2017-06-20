"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_1 = require("../models/message");
var MessageSocket = (function () {
    function MessageSocket(io, room) {
        var _this = this;
        this.room = room;
        this.nsp = io.of("/messages/" + encodeURIComponent(this.room.name));
        this.nsp.on("connection", function (socket) {
            console.log("Client connected to room:", _this.room.name);
            _this.socket = socket;
            _this.listen();
        });
    }
    // Add signal
    MessageSocket.prototype.listen = function () {
        var _this = this;
        this.socket.on("disconnect", function () { return _this.disconnect(); });
        this.socket.on("create", function (message) { return _this.create(message); });
        this.socket.on("list", function () { return _this.list(); });
    };
    // Handle disconnect
    MessageSocket.prototype.disconnect = function () {
        console.log("Client disconnected from room:", this.room.name);
    };
    // Create a message in a room
    MessageSocket.prototype.create = function (params) {
        var _this = this;
        params.room = this.room.name;
        message_1.Message.create(params).subscribe(function (message) { return _this.nsp.emit('item', message); }, function (error) { return console.error('Message sending failed', error); });
    };
    // List all messages in a room
    MessageSocket.prototype.list = function () {
        var _this = this;
        this.room.messages()
            .map(function (messages) { return messages.reverse(); })
            .subscribe(function (messages) { return messages.map(function (message) { return _this.socket.emit(message); }); });
    };
    return MessageSocket;
}());
exports.MessageSocket = MessageSocket;
//# sourceMappingURL=message.js.map