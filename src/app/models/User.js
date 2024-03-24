const sql = require("./db.js");

// constructor
const User = function(user) {
  this.id = user.id ?? null;
  this.maso = user.maso;
  this.hodem = user.hodem;
  this.ten = user.ten;
  this.type = user.type;
  this.email = user.email;
  this.password = user.password;
  this.maKhoa = user.maKhoa;
  this.hinhanh = user.hinhanh;
  this.phone = user.phone;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created User: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = getAll = (include, type, result) => {
  let joinTables = '';
  if(include.length > 0) {
      include.forEach(e => {
        if(e === 'khoa') {
          joinTables = joinTables + ' JOIN faculties ON users.maKhoa = faculties.id';
        }
      });
  }
  console.log('joinTables', joinTables);
  let query = "SELECT users.*, faculties.ten as tenKhoa FROM users"+ joinTables +" where type = '" + type +"'";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET maso = ?, hodem = ?, ten = ?, type = ?, email = ?, password = ?, maKhoa = ?, hinhanh = ?, maLop = ? WHERE id = ?",
    [user.maso, user.hodem, user.ten, user.type, user.email, user.password, user.maKhoa, user.hinhanh, user.maLop, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...User });
      result(null, { id: id, ...User });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;