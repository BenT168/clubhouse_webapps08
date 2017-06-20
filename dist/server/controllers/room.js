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
var room_1 = require("../models/room");
var base_1 = require("./base");
var RoomCtrl = (function (_super) {
    __extends(RoomCtrl, _super);
    function RoomCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = room_1.default;
        return _this;
    }
    return RoomCtrl;
}(base_1.default));
exports.default = RoomCtrl;
//# sourceMappingURL=room.js.map