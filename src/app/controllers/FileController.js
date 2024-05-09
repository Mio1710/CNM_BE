'use strict';
const { File } = require("../models");
const { Op } = require("sequelize");


// Retrieve all Files from the database (with condition).
exports.index = (req, res) => {
  console.log('FileController.index');

  // Check if there is an include parameter in the query
  if (req.query.filter && req.query.filter.include) {
    const include = req.query.filter.include.split(',');
    File.findAll({
        include: include,
        where: { report_type:{
            [Op.in]: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
          }
        }
    })
    .then(data => {
            res.send(data);
    }).catch(err => {
            res.status(500).send({
                    message:
                            err.message || "Some error occurred while retrieving Files."
            });
    });
  } else {
    // If there is no include parameter, only query files without including related models
    File.findAll({
      where: { report_type: { [Op.in]: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] } }
    })
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Files."
        });
    });
  }
};

// Find a single File by Id
exports.show = (req, res) => {
    File.findOne(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found File with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving File with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.create = async (req, res) => {
    // Extract data from the request
    const { date, report_type, report_file, sv_id, commit } = req.body;
  
    // Create a new File
    const file = {
      date: new Date(),
      report_type,
      report_file,
      sv_id,
      commit
    };
  
    // Save File in the database
    File.create(file)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the File."
        });
      });
  };
  

// Update a File identified by the id in the request
exports.update = (req, res) => {
  console.log('req.body: ', req.body, req.params.id);
  const file = File.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  res.send(file);
};

// Delete a File with the specified id in the request
exports.delete = (req, res) => {
  File.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send({ message: "File was deleted successfully!" });
  }).catch(err => {
    res.status(500).send({
      message: "Could not delete File with id " + req.params.id
    });
  });
};

// Delete all Files from the database.
exports.deleteAll = (req, res) => {
  File.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({ message: `${nums} Files were deleted successfully!` });
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Files."
    });
  });
};