"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var event_1 = require("./controllers/event");
var user_1 = require("./controllers/user");
var messaging_1 = require("./controllers/messaging");
function setRoutes(app) {
    var router = express.Router();
    var eventCtrl = new event_1.default();
    var userCtrl = new user_1.default();
    var messagingCtrl = new messaging_1.default();
    // Events
    router.route('/events').get(eventCtrl.getAll);
    router.route('/events/count').get(eventCtrl.count);
    router.route('/event').post(eventCtrl.insert);
    router.route('/event/:id').get(eventCtrl.get);
    router.route('/event/:id').put(eventCtrl.update);
    router.route('/event/:id').delete(eventCtrl.delete);
    // Users
    router.route('/').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    // Messaging
    router.route('/messaging').post(messagingCtrl.save);
    router.route('/messaging/:room').get(messagingCtrl.getAllRoom);
    router.route('/messaging/:id').get(messagingCtrl.get);
    router.route('/messaging/:id').put(messagingCtrl.update);
    router.route('/messaging/:id').delete(messagingCtrl.delete);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map