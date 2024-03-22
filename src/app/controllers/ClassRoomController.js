const ClassRoom = require("../models/ClassRoom.js");

// Retrieve all Student from the database (with condition).
exports.index = (req, res) => {
    const title = req.query.title;
  
    ClassRoom.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving classRooms."
        });
      else res.send(data);
    });
  };

// Find a single Student by Id
exports.show = (req, res) => {
  ClassRoom.findByMaLop(req.params.maLop, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Class room with maLop ${req.params.maLop}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving class room with id " + req.params.maLop
          });
        }
      } else res.send(data);
    });
  };
  
  
// Create and Save a new Student
exports.create = (req, res) => {
  // Validate request
  
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a classRoom
  const classRoom = new ClassRoom({
    maLop: req.body.maLop,
    ten: req.body.ten,
    gv: req.body.gv,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });

  // Save Class room in the database
  ClassRoom.create(student, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student."
      });
    else res.send(data);
  });
};

// Update a Student identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  ClassRoom.updateById(
    req.params.id,
    new Student(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found class room`
          });
        } else {
          res.status(500).send({
            message: "Error updating class roome"
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Class room with the specified id in the request
exports.delete = (req, res) => {
  ClassRoom.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Class room with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Class room with id " + req.params.id
        });
      }
    } else res.send({ message: `Class room was deleted successfully!` });
  });
};

// Delete all Students from the database.
exports.deleteAll = (req, res) => {
  ClassRoom.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Class rooms."
      });
    else res.send({ message: `All Class rooms were deleted successfully!` });
  });
};