'use strict';
const {Company} = require("../models");

// Retrieve all Student from the database (with condition).
exports.index = (req, res) => {
  let include = req.query.filter.include;
  include = include ? include.split(',') : [];
  Company.findAll({
    include: include
  })
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving Companies."
      });
  });
};

// Find a single Student by Id
exports.show = (req, res) => {
    Company.findOne(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Company with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Company with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };
  
  
// Create and Save a new Company
/*
exports.create = async (req, res) => {
  const { id } = req.body;
  // check Companyexist
  const companyExists = await Company.findOne({
      where: {
          id
      }
  });
  console.log('companyExists: ', companyExists);
  if (companyExists) {
      return res.status(400).send("Company already exists.");
  }
 
  // Save Student in the database
  const company = Company.create(req.body);
  res.send(company);
};
*/
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.tenCongTy) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Company
  const company = {
    tenCongTy: req.body.tenCongTy,
    status: '0',
    lop: req.body.lop,
    gv: req.body.gv,
    viTri: req.body.viTri,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    sinhvien: req.user.id 
  };

  const existCompany = await Company.findOne({
    where: {
      sinhvien: req.user.id
    }
  });

  if(existCompany) {
    existCompany.update(company).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    });
  } else {
  // Save Company in the database
    Company.create(company)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Company."
        });
      });
    }
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

// Delete a Student with the specified id in the request
/*
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
*/
// Delete a Student with the specified id in the request
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
