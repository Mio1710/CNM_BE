'use strict';
const { Student } = require("../models");

// Retrieve all Student from the database (with condition).
exports.index = (req, res) => {
  let include = req.query.filter.include;
  include = include ? include.split(',') : [];
  Student.findAll({
    include: include
  })
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving Students."
      });
  });
};

// Find a single Student by Id
exports.show = (req, res) => {
    Student.findOne(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Student with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };
  
  
// Create and Save a new Student
exports.create = async (req, res) => {

  const { maso, matKhau } = req.body;
  // check Student exist
  const StudentExists = await Student.findOne({
      where: {
          maso
      }
  });
  if (StudentExists) {
      return res.status(400).send("Student already exists.");
  }
  // Hash the password
  const bcrypt = require('bcrypt');
  const salt = bcrypt.genSaltSync(10);
  console.log('salt: ', salt, matKhau);
  const hashedPassword = await bcrypt.hash(matKhau ?? "123456", salt);
  // Create a new Student

  req.body.matKhau = hashedPassword;
  // Save Student in the database
  const Student = Student.create(req.body);
  res.send(Student);
};

// Update a Student identified by the id in the request
exports.update = (req, res) => {
  console.log('req.body: ', req.body, req.params.id);
  const Student = Student.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  res.send(Student);
};

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
  Student.delete(req.params.id);
};

// Delete all Students from the database.
exports.deleteAll = (req, res) => {
  Student.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Students."
      });
    else res.send({ message: `All Students were deleted successfully!` });
  });
};