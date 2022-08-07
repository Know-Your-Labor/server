var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "know_your_labor"
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
    get_brand_controversies
}

function query(sql, params, callback) {
    while(!connected) {/* do nothing */}

    con.query(sql, params, ( (err, result) => {
        err ? callback(err) : callback(result);
    }));
}

function get_brands(page, filter, callback) {
    let sql = `
        SELECT
            brand.id,
            brand.name,
            brand.url,
            COUNT(controversy.id) AS total_controversies,
            SUM(CASE WHEN controversy.slavery THEN 1 ELSE 0 END) AS slavey_controversies,
            SUM(CASE WHEN controversy.child_labor THEN 1 ELSE 0 END) AS child_labor_controversies,
            SUM(CASE WHEN controversy.strike THEN 1 ELSE 0 END) AS strike_controversies,
            SUM(CASE WHEN controversy.environmental THEN 1 ELSE 0 END) AS environmental_controversies
        FROM brand
        LEFT JOIN brand_controversy ON brand_controversy.brand_id = brand.id
        LEFT JOIN controversy ON controversy.id = brand_controversy.controversy_id
        WHERE brand.name LIKE ?
        GROUP BY brand.id, brand.name, brand.url
        LIMIT 10;
    `;
    query(sql, ['%'+filter+'%'], callback);
}

function get_brand(id, callback) {
    let sql = "SELECT * FROM brand WHERE id=? LIMIT 1;";
    query(sql, [id], callback);
}

function get_brand_controversies(id, callback) {
    let sql = `
        SELECT *
        FROM brand_controversy
        LEFT JOIN controversy ON controversy.id = brand_controversy.controversy_id
        WHERE brand_controversy.brand_id = ?;
    `;
    query(sql, [id], callback);
}
