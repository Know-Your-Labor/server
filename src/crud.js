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

function query(sql, params, callback) {
    while(!connected) {/* do nothing */}

    con.query(sql, params, ( (err, result) => {
        err ? callback(err) : callback(result);
    }));
}

function get_brands(page, filter, callback) {
    let sql = "SELECT distinct * FROM know_your_labor.brand WHERE name LIKE ? LIMIT 10;";
    query(sql, ['%'+filter+'%'], callback);
}

function get_brand(id, callback) {
    let sql = "SELECT * FROM know_your_labor.brand WHERE id=? LIMIT 1;";
    query(sql, [id], callback);
}
