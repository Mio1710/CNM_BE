'use strict';
const { User, Student, ClassRoom } = require("../models");
const { Op } = require("sequelize");

 exports.getCurrentStudents = (req, res) => {
  console.log('TeacherController.getCurrentStudents', req.user.dataValues.id);
  const userId = req.user.dataValues.id;

  // Lấy danh sách các lớp học hiện tại của giảng viên
  const students = Student.findAll({
    attributes: {
      exclude: ['matKhau']
    },
    where: {
      gvId: userId
    },
    include: [
      'company',
      {
      model: ClassRoom,
      as: 'classroom',
      where: {
        endDate: {
          [Op.gte]: new Date()
        }
      }
    }]
  }).then((data) => {
    res.send(data);
  })
};

