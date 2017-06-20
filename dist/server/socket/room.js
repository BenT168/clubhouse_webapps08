"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var room_1 = require("../models/room");
var message_1 = require("./message");
var RoomSocket = (function () {
    function RoomSocket(io) {
        var _this = this;
        this.io = io;
        this.rooms = [];
        this.messageSockets = [];
        this.nsp = this.io.of('/room');
        this.nsp.on('connection', function (socket) {
            console.log('Client connected');
            _this.socket = socket;
            _this.updateMessageSockets();
            _this.listen();
        });
    }
    // Add signal
    RoomSocket.prototype.listen = function () {
        var _this = this;
        this.socket.on('disconnect', function () { return _this.disconnect(); });
        this.socket.on('create', function (name) { return _this.create(name); });
        this.socket.on('remove', function (name) { return _this.remove(name); });
        this.socket.on('list', function () { return _this.list(); });
    };
    // Handle disconnect
    RoomSocket.prototype.disconnect = function () {
        console.log('Client disconnected');
    };
    // Create a room
    RoomSocket.prototype.create = function (name) {
        var _this = this;
        room_1.Room.create(name).subscribe(function (room) { return _this.list(); }, function (error) { return console.error('Room creation failed', error); });
    };
    // Remove a room
    RoomSocket.prototype.remove = function (name) {
        var _this = this;
        room_1.Room.find(name).subscribe(function (room) { return room.remove().subscribe(function (x) { }, function (e) { }, function () { return _this.list(); }); }, function (error) { return console.error('Room removal failed', error); });
    };
    // List all rooms
    RoomSocket.prototype.list = function () {
        var _this = this;
        room_1.Room.list().subscribe(function (rooms) {
            _this.rooms = rooms;
            _this.updateMessageSockets();
            _this.nsp.emit('item', rooms);
        });
    };
    // Update message sockets
    RoomSocket.prototype.updateMessageSockets = function () {
        // Add message sockets for new rooms
        var validRooms = {};
        var _loop_1 = function (room) {
            validRooms[room.name] = true;
            var matches = this_1.messageSockets.filter(function (messageSocket) { return messageSocket.room.name === room.name; });
            if (matches.length == 0) {
                console.log('creating new namespace for', room.name);
                this_1.messageSockets.push(new message_1.MessageSocket(this_1.io, room));
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.rooms; _i < _a.length; _i++) {
            var room = _a[_i];
            _loop_1(room);
        }
        // Destroy sockets for removed rooms
        for (var index in this.messageSockets) {
            var messageSocket = this.messageSockets[index];
            if (!validRooms[messageSocket.room.name]) {
                this.messageSockets.splice(parseInt(index, 10), 1);
            }
        }
    };
    return RoomSocket;
}());
exports.RoomSocket = RoomSocket;
//# sourceMappingURL=room.js.map