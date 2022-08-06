var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = {
    get_brands,
    get_brand,
}

function get_brands(page) {
    let sql = "SELECT * FROM know_your_labor.brand LIMIT 10";

    return con.query(sql, function (err, result) {
        if (err) throw err;
        return result
    });
}

function get_brand(id) {
    let sql = "SELECT * FROM know_your_labor.brand WHERE id=" + id;

    return con.query(sql, function (err, result) {
        if (err) throw err;
        return result
    });
}
