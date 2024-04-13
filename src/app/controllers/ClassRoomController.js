'use strict';
const ClassRoom = require("../models/ClassRoom.js");

// Retrieve all ClassRoom from the database (with condition).
exports.index = (req, res) => {
  const include = req.query.filter.include;
  console.log(1, include )
  ClassRoom.findAll({
    include: ['giangvien']
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

  const { maso, matKhau } = req.body;
  // check ClassRoom exist
  const ClassRoomExists = await ClassRoom.findOne({
      where: {
          maso
      }
  });
  if (ClassRoomExists) {
      return res.status(400).send("ClassRoom already exists.");
  }
  // Hash the password
  const bcrypt = require('bcrypt');
  const salt = bcrypt.genSaltSync(10);
  console.log('salt: ', salt, matKhau);
  const hashedPassword = await bcrypt.hash(matKhau ?? "123456", salt);
  // Create a new ClassRoom

  req.body.matKhau = hashedPassword;
  // Save ClassRoom in the database
  const ClassRoom = ClassRoom.create(req.body);
  res.send(ClassRoom);
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