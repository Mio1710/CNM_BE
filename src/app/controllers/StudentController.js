'use strict';
const { Student, Report } = require("../models");

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
  const studentExists = await Student.findOne({
      where: {
          maso
      }
  });
  if (studentExists) {
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
  const student = Student.create(req.body);
  res.send(student);
};

// Update a Student identified by the id in the request
exports.update = (req, res) => {
  console.log('req.body: ', req.body, req.params.id);
  const student = Student.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  res.send(student);
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Student.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Student was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Student with id=" + id
    });
  });
};

// Delete all Students from the database.
exports.deleteAll = (req, res) => {
  Student.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} Students were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Students."
    });
  });
};

exports.getMyCompany = (req, res) => {
  console.log('student', req.user);
  const student = Student.findOne({
    where: {
      id: req.user.id
    },
    include: ['company', 'classroom', 'giangvien', 'report']
  }).then((data) => {
    res.send(data);
  });
};


exports.getStudentCompany = (req, res) => {
  console.log('student', req.query.filter.svId);
  const studentId = req.query.filter.svId
  Student.findOne({
    where: {
      id: studentId
    },
    include: ['company', 'classroom', 'giangvien', 'report']
  }).then((data) => {
    res.send(data);
  });
};

exports.updateReport =  (req, res) => {
  const studentId = req.params.id;
  const report = { ...req.body, sv: studentId }
  console.log('body', report);
  Report.findOne({
    where: {
      sv: studentId
    }
  }).then((data) => {
    console.log('dataaaaaaaa', data);
    if (!data) {
      Report.create(report)
    } else {
      data.update(report)
    }
    res.send(data);
  });
};