var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
});

var connected = false;
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to db");
    connected = true;
});

module.exports = {
    get_brands,
    get_brand,
}

function query(sql, callback) {
    while(!connected) {/* do nothing */}

    con.query(sql, ( (err, result) => {
        err ? callback(err) : callback(result);
    }));
}

function get_brands(page, callback) {
    let sql = "SELECT * FROM know_your_labor.brand LIMIT 10;";
    query(sql, callback);
}

function get_brand(id, callback) {
    let sql = "SELECT * FROM know_your_labor.brand WHERE id=" + id;
    query(sql, callback);
}
