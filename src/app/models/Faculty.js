const sql = require("./db.js");

// constructor
const Faculty = function(faculty) {
  this.id = faculty.id ?? null;
  this.maKhoa = faculty.maKhoa;
  this.ten = faculty.ten;
};

Faculty.create = (newFaculty, result) => {
  console.log("newFaculty", newFaculty);
  sql.query("INSERT INTO faculties SET ?", newFaculty, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      console.log("created faculty: ", { id: res.insertId, ...newFaculty });
      result(null, { id: res.insertId, ...newFaculty });
    }
  });
};

Faculty.findById = (id, result) => {
  sql.query(`SELECT * FROM faculties WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found faculty: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Faculty.getAll = (title, result) => {
  let query = "SELECT * FROM faculties";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("faculties: ", res);
    result(null, res);
  });
};

Faculty.updateById = (id, faculty, result) => {
  sql.query(
    "UPDATE faculties SET maKhoa = ?, ten = ? WHERE id = ?",
    [faculty.maKhoa, faculty.ten, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Faculty with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Faculty: ", { id: id, ...faculty });
      result(null, { id: id, ...faculty });
    }
  );
};

Faculty.remove = (id, result) => {
  sql.query("DELETE FROM faculties WHERE id = ?", id, (err, res) => {
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

    console.log("deleted faculty with id: ", id);
    result(null, res);
  });
};

Faculty.removeAll = result => {
  sql.query("DELETE FROM faculties", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} faculties`);
    result(null, res);
  });
};

module.exports = Faculty;