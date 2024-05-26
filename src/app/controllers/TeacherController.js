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
    'report'
  ]
  }).then((data) => {
    res.send(data);
  })
};

