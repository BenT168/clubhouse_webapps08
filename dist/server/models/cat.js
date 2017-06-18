"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var catSchema = new mongoose.Schema({
    name: String,
    organisation: String,
    task: String,
    location: String,
    date: String
});
var Cat = mongoose.model('Cat', catSchema);
exports.default = Cat;
//# sourceMappingURL=cat.js.map