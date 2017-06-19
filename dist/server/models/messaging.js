"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var messagingSchema = new mongoose.Schema({
    room: String,
    nickname: String,
    message: String,
    updated_at: { type: Date, default: Date.now },
});
var Messaging = mongoose.model('Messaging', messagingSchema);
exports.default = Messaging;
//# sourceMappingURL=messaging.js.map