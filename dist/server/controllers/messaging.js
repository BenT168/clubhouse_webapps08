"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var messaging_1 = require("../models/messaging");
var base_1 = require("./base");
var MessagingCtrl = (function (_super) {
    __extends(MessagingCtrl, _super);
    function MessagingCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = messaging_1.default;
        _this.getAllRoom = function (req, res) {
            _this.model.find({ room: req.params.room }, function (err, messages) {
                if (err) {
                    return console.error(err);
                }
                if (!messages.length) {
                    console.log("No room \'" + req.params.room + "\' found.");
                }
                else {
                    res.json(messages);
                }
            });
        };
        _this.save = function (req, res) {
            _this.model.create(req.body, function (err, post) {
                console.log("Saving post " + post + ".\n");
                if (err) {
                    return console.error(err);
                }
                res.json(post);
            });
        };
        return _this;
    }
    return MessagingCtrl;
}(base_1.default));
exports.default = MessagingCtrl;
//# sourceMappingURL=messaging.js.map