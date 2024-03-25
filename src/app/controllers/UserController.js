'use strict';
const User = require("../models/User.js");

// Retrieve all User from the database (with condition).
exports.index = (req, res) => {
  const include = req.query.filter.include;
    const users = User.findAll({
      include: include
    })
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    });
  };

// Find a single User by Id
exports.show = (req, res) => {
    User.findOne(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };
  
  
// Create and Save a new User
exports.create = (req, res) => {
  const user = User.create(new User(req.body));
  res.send(user);
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
  console.log('req.body: ', req.body, req.params.id);
  const user = User.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  res.send(user);
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.delete(req.params.id);
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};