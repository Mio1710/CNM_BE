'use strict';
const { Sequelize } = require('sequelize');
const { ClassRoom, User } = require('../models');

// Retrieve all ClassRoom from the database (with condition).
exports.index = (req, res) => {
  const include = req.query.filter.include.split(',');
  ClassRoom.findAll({
    include: include
  })
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving ClassRooms."
      });
  });
};

// Find a single ClassRoom by Id
exports.show = (req, res) => {
    ClassRoom.findOne(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ClassRoom with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving ClassRoom with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };
  
  
// Create and Save a new ClassRoom
exports.create = async (req, res) => {

  const { maLop } = req.body;
  // check ClassRoom exist
  const ClassRoomExists = await ClassRoom.findOne({
      where: {
        maLop
      }
  });
  console.log('ClassRoomExists: ', ClassRoomExists);
  if (ClassRoomExists) {
      return res.status(400).send("ClassRoom already exists.");
  }
  // Create a new ClassRoom
  const cls = ClassRoom.create(req.body);
  res.send(cls);
  
};

// Update a ClassRoom identified by the id in the request
exports.update = (req, res) => {
  console.log('req.body: ', req.body, req.params.id);
  const ClassRoom = ClassRoom.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  res.send(ClassRoom);
};

// Delete a ClassRoom with the specified id in the request
exports.delete = (req, res) => {
  ClassRoom.delete(req.params.id);
};

// Delete all ClassRooms from the database.
exports.deleteAll = (req, res) => {
  ClassRoom.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all ClassRooms."
      });
    else res.send({ message: `All ClassRooms were deleted successfully!` });
  });
};