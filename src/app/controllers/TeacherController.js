'use strict';
const { User, Student, ClassRoom, Company } = require("../models");
const { Op } = require("sequelize");

 exports.getCurrentStudents = (req, res) => {
  console.log('TeacherController.getCurrentStudents', req.user.dataValues.id);
  const userId = req.user.dataValues.id;
  let companyParams = {}
  if ( req.query.filter.status) {
    if( req.query.filter.status.length === 1) {
      companyParams = {
        model: Company,
        as: 'company',
        where: {
          status: [req.query.filter.status]
        }
      }
    } else {
      companyParams = {
        model: Company,
        as: 'company',
        where: {
          status: req.query.filter.status
        }
      }
    }
  } else {
    companyParams = {
      model: Company,
      as: 'company'
    }
  }

  // Lấy danh sách các lớp học hiện tại của giảng viên
  Student.findAll({
    attributes: {
      exclude: ['matKhau']
    },
    where: {
      gvId: userId,
    },
    include: [
      companyParams,
      {
        model: ClassRoom,
        as: 'classroom',
        where: {
          endDate: {
            [Op.gte]: new Date()
          }
        },
      },
    'report',
    'giangvien'
  ]
  }).then((data) => {
    res.send(data);
  })
};

exports.acceptCompany = (req, res) => {
  const svId = req.params.id;
  Student.findOne({
    where: {
      id: svId
    },
    include: ['company']
  }).then((data) => {
    console.log('data', data);
    data.company.update({
      status: '1'
    }).then((data) => {
      res.send(data);
    })
  })
}

exports.rejectCompany = (req, res) => {
  const svId = req.params.id;
  Student.findOne({
    where: {
      id: svId
    },
    include: ['company']
  }).then((data) => {
    console.log('data', data);
    data.company.update({
      status: '2'
    }).then((data) => {
      res.send(data);
    })
  })
}


