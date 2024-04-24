'use strict';
const { Sequelize } = require('sequelize');
const { ClassRoom, User } = require('../models');

// Retrieve all ClassRoom from the database (with condition).
/*
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
*/

// Retrieve all ClassRoom from the database (with condition).

exports.index = (req, res) => {
  console.log('ClassRoomController.index');

  // Kiểm tra xem liệu có tham số include trong query không
  if (req.query.filter && req.query.filter.include) {
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
  } else {
    // Nếu không có tham số include, chỉ truy vấn lớp học mà không bao gồm các mô hình liên quan
    ClassRoom.findAll()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving ClassRooms."
        });
    });
  }
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
  const classroomExists = await ClassRoom.findOne({
      where: {
        maLop
      }
  });
  console.log('classroomExists: ', classroomExists);
  if (classroomExists) {
      return res.status(400).send("ClassRoom already exists.");
  }
  // Create a new ClassRoom
  const cls = ClassRoom.create(req.body);
  res.send(cls);
  
};


// Update a ClassRoom identified by the id in the request
exports.update = (req, res) => {
  console.log('req.body: ', req.body, req.params.id);
  const classroom = ClassRoom.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  res.send(classroom);
};
// Update a ClassRoom identified by the id in the request
/*
exports.update = (req, res) => {
  console.log('req.body: ', req.body, req.body.ten, req.params.id);
  const classroom = ClassRoom.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(num => {
    console.log('num: ', num);
    if (num == 1) {
      res.send({
        message: "ClassRoom was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update ClassRoom with id=${req.params.id}. Maybe ClassRoom was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating ClassRoom with id=" + req.params.id
    });
  })
};
*/

// Delete a ClassRoom with the specified id in the request
/*
exports.delete = (req, res) => {
  ClassRoom.delete(req.params.id);
  res.send({ message: `ClassRoom was deleted successfully!` });
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
*/
// Delete a ClassRoom with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ClassRoom.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "ClassRoom was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete ClassRoom with id=${id}. Maybe ClassRoom was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete ClassRoom with id=" + id
    });
  });
};

// Delete all ClassRooms from the database.
exports.deleteAll = (req, res) => {
  ClassRoom.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} ClassRooms were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all ClassRooms."
    });
  });
};
