const Faculty = require("../models/Faculty");

// Retrieve all Faculty from the database (with condition).
exports.index = (req, res) => {
    const title = req.query.title;
  
    Faculty.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Faculty."
        });
      else res.send(data);
    });
  };

// Find a single Faculty by Id
exports.show = (req, res) => {
  Faculty.findBymaKhoa(req.params.maKhoa, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Class room with maKhoa ${req.params.maKhoa}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving class room with id " + req.params.maKhoa
          });
        }
      } else res.send(data);
    });
  };
  
  
// Create and Save a new Faculty
exports.create = (req, res) => {
  // Validate request
  
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Faculty
  const faculty = new Faculty({
    maKhoa: req.body.maKhoa,
    ten: req.body.ten
  });

  console.log('faculty', faculty);

  // Save Class room in the database
  Faculty.create(faculty, (err, data) => {
    console.log('data', data);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Faculty."
      });
    else res.send(data);
  });
};

// Update a Faculty identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Faculty.updateById(
    req.params.id,
    new Faculty(req.body),
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
  Faculty.remove(req.params.id, (err, data) => {
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

// Delete all Facultys from the database.
exports.deleteAll = (req, res) => {
  Faculty.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Class rooms."
      });
    else res.send({ message: `All Class rooms were deleted successfully!` });
  });
};