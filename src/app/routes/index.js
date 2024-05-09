const studentRouter = require('./students');
const userRouter = require('./users');
const classroomRouter = require('./classrooms');
const facultyRouter = require('./faculties');
const authRouter = require('./authencation');
const companyRouter = require('./companies');
const fileRouter = require('./files');

const authMiddleware = require('../middlewares/auth.middleware.js');

function route(app) {
    app.use('/api/users', [authMiddleware.isAuth], userRouter);
    app.use('/api/students', [authMiddleware.isAuth], studentRouter);
    app.use('/api/classes', authMiddleware.isAuth, classroomRouter);
    app.use('/api/faculties', facultyRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/companies', authMiddleware.isAuth, companyRouter);
    app.use('/api/files', authMiddleware.isAuth, fileRouter);
}

module.exports = route;