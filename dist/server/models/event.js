"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var eventSchema = new mongoose.Schema({
    name: String,
    organisation: String,
    task: String,
    location: String,
    date: String
});
var Event = mongoose.model('Event', eventSchema);
exports.default = Event;
//# sourceMappingURL=event.js.map