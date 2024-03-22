const sql = require("./db.js");

// constructor
const ClassRoom = function(classRoom) {
  this.id = classRoom.id ?? null;
  this.maLop = classRoom.maLop;
  this.ten = classRoom.ten;
  this.gv = classRoom.gv;
  this.startDate = classRoom.startDate;
  this.endDate = classRoom.endDate;
};

ClassRoom.create = (newclassRoom, result) => {
  // check exist maLop
  sql.query(`SELECT * FROM classes WHERE maLop = ${newclassRoom.maLop}`, (err, res) => {
    if (res.length) {
      result({ kind: "exist" }, null);
      return;
    }
  });
  sql.query("INSERT INTO classes SET ?", newclassRoom, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created classRoom: ", { id: res.insertId, ...newclassRoom });
    result(null, { id: res.insertId, ...newclassRoom });
  });
};

ClassRoom.findByMaLop = (id, result) => {
  sql.query(`SELECT * FROM classes WHERE maLop = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found classRoom: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found ClassRoom with the id
    result({ kind: "not_found" }, null);
  });
};

ClassRoom.getAll = (title, result) => {
  let query = "SELECT * FROM classes";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("classes: ", res);
    result(null, res);
  });
};

ClassRoom.updateById = (id, classRoom, result) => {
  sql.query(
    "UPDATE classes SET maLop = ?, hodem = ?, ten = ? WHERE id = ?",
    [classRoom.masv, classRoom.hodem, classRoom.ten, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found classRoom with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated classRoom: ", { id: id, ...classRoom });
      result(null, { id: id, ...classRoom });
    }
  );
};

ClassRoom.remove = (id, result) => {
  sql.query("DELETE FROM classes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found classRoom with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted classRoom with id: ", id);
    result(null, res);
  });
};

ClassRoom.removeAll = result => {
  sql.query("DELETE FROM classes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} classRoom`);
    result(null, res);
  });
};

module.exports = ClassRoom;