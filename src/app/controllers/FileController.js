'use strict';
const { File } = require("../models");
const { Op } = require("sequelize");
const crypto = require('crypto');
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});
const randomName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
// Retrieve all Files from the database (with condition).
exports.index = (req, res) => {
  console.log('FileController.index');

  // Check if there is an include parameter in the query
  if (req.query.filter && req.query.filter.include) {
    const include = req.query.filter.include.split(',');
    File.findAll({
        include: include,
        where: { 
          sv_id: req.user.id,
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
  const { report_type, report_file, commit } = req.body;

  console.log('req.body: ', req.file);
  const key = randomName();
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  const sv_id = req.user.id
  console.log('current user id',req, sv_id);
  // Create a new File
  const file = {
    date: new Date(),
    report_type,
    report_file: req.file.originalname,
    key: key,
    sv_id,
    commit
  };

  // console.log('req.body: ', req.body, req.file, file, req.report_file);
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

exports.download = async (req, res) => {
  const key = req.params.id;
  const file = await File.findByPk(key);
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: file.key
  });

  const response = await s3.send(command);
  res.setHeader('Content-Disposition', `attachment; filename="${file.report_file}"`);
  res.setHeader('Content-Type', response.ContentType);

    // Pipe the response body to the res stream
  response.Body.pipe(res);

};