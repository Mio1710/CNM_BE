'use strict';
const Faculty = require("../models/Faculty");

// Retrieve all Faculty from the database (with condition).
exports.index = (req, res) => {
  console.log('FacultyController.index');
    const faculties = Faculty.findAll().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Faculty."
      });
    });
  };

// Find a single Faculty by Id
exports.show = (req, res) => {
  const faculty = Faculty.findOne(req.params.id).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Faculty."
    });
  });
  };
  
  
// Create and Save a new Faculty
exports.create = (req, res) => {
  const user = Faculty.create(new Faculty(req.body));
  res.send(user);
};

// Update a Faculty identified by the id in the request
exports.update = (req, res) => {
  console.log('req.body: ', req.body, req.body.ten, req.params.id);
  const faculty = Faculty.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(num => {
    console.log('num: ', num);
    if (num == 1) {
      res.send({
        message: "Faculty was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Faculty with id=${req.params.id}. Maybe Faculty was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating Faculty with id=" + req.params.id
    });
  })
};

// Delete a Class room with the specified id in the request
exports.delete = (req, res) => {
  Faculty.delete(req.params.id);
  res.send({ message: `Faculty was deleted successfully!` });
};

// Delete all Facultys from the database.
exports.deleteAll = (req, res) => {
  Faculty.deleteAll();
  res.send({ message: `All Facultys were deleted successfully!` });
};