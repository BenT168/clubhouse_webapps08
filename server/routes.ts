import * as express from 'express';

import EventCtrl from './controllers/event';
import UserCtrl from './controllers/user';
import MessagingCtrl from './controllers/messaging';
import Event from './models/event';
import User from './models/user';
import Messaging from './models/messaging';

export default function setRoutes(app) {

  const router = express.Router();

  const eventCtrl = new EventCtrl();
  const userCtrl = new UserCtrl();
  const messagingCtrl = new MessagingCtrl();

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
