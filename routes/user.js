const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.route('/:id?')
  .post(addUser)
  .get(getUsers)
  .put(updateUser)
  .delete(deleteUser);


module.exports = router;


function addUser(req, res, next) {
  let user = new User(req.body);
  user.save()
    .then((user) => res.send(user))
    .catch((err) => next(err));
}

function getUsers(req, res, next) {
  let query = (req.params.id) ? User.findById(req.params.id) : User.find();
  query
    .then((response) => res.send(response))
    .catch((err) => next(err));
}

function updateUser(req, res, next) {
  User.findOneAndUpdate({_id:req.params.id}, req.body)
    .then((response) => res.send(response))
    .catch((err) => next(err));
}

function deleteUser(req, res, next) {
  User.findByIdAndRemove(req.params.id)
    .then((response) => res.send(response))
    .catch((err) => next(err));
}
