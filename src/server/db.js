import mysql from "mysql";

const db = mysql.createPool({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "Lixin1235813",
	database: "medical"
});

const query = (sql) => {
	return new Promise((resolve, reject) => {
		db.query(sql, (error, result) => {
			if (!error) {
				resolve(result);
			}
		});
	});
}

export default query;

