'use strict';
const { User } = require("../models");

// Retrieve all User from the database (with condition).
/*
exports.index = (req, res) => {
  const include = req.query.filter.include.split(',');
  const type = req.query.filter.type;
  User.findAll({
    include: include,
    where: { type }
  })
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving users."
      });
  });
};
// Retrieve all ClassRoom from the database (with condition).
exports.index = (req, res) => {
  console.log('UserController.index');
    const users = User.findAll().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ClassRoom."
      });
    });
  };
  */
 exports.index = (req, res) => {
  console.log('UserController.index');

  // Kiểm tra xem liệu có tham số include trong query không
  if (req.query.filter && req.query.filter.include) {
    const include = req.query.filter.include.split(',');
    User.findAll({
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
    User.findAll()
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

// Find a single User by Id
exports.show = (req, res) => {
    User.findOne(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  
// Create and Save a new User
exports.create = async (req, res) => {

  const { maso, matKhau } = req.body;
  // check user exist
  const userExists = await User.findOne({
      where: {
          maso
      }
  });
  if (userExists) {
      return res.status(400).send("User already exists.");
  }
  // Hash the password
  const bcrypt = require('bcrypt');
  const salt = bcrypt.genSaltSync(10);
  console.log('salt: ', salt, matKhau);
  const hashedPassword = await bcrypt.hash(matKhau ?? "123456", salt);
  // Create a new user

  req.body.matKhau = hashedPassword;
  // Save User in the database
  const user = User.create(req.body);
  res.send(user);
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
  console.log('req.body: ', req.body, req.params.id);
  const user = User.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  res.send(user);
};

// Delete a User with the specified id in the request
/*
exports.delete = (req, res) => {
  User.delete(req.params.id);
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
*/
// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "User was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete User with id=" + id
    });
  });
};

// Delete all Students from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} Users were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Users."
    });
  });
};
