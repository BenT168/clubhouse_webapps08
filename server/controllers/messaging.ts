import Messaging from '../models/messaging';
import BaseCtrl from './base';

export default class MessagingCtrl extends BaseCtrl {
  model = Messaging;

  getAllRoom = (req, res) => {
    this.model.find({ room: req.params.room }, (err, messages) => {
      if (err) { return console.error(err); }
      if (!messages.length) {
        console.log("No room \'" + req.params.room + "\' found." );
      } else {
        res.json(messages);
      }
    });
  };

  save = (req, res) => {
    this.model.create(req.body, (err, post) => {
      console.log("Saving post " + post + ".\n");
      if (err) { return console.error(err); }
      res.json(post);
    });
  };

}
