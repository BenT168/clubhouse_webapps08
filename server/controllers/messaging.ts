import Messaging from '../models/messaging';
import BaseCtrl from './base';

export default class MessagingCtrl extends BaseCtrl {
  model = Messaging;

  getAllRoom = (req, res) => {
    this.model.findOne({ room: req.params.room }, (err, messaging) => {
      if (err) { return console.error(err); }
      res.json(messaging);
    });
  };

  save = (req, res) => {
    this.model.create(req.body, (err, post) => {
      if (err) { return console.error(err); }
      res.json(post);
    });
  };

}
