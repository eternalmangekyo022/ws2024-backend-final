import mysql from 'mysql2'

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'ub2023'
})

export default {
	query: (q, val) => new Promise((res, rej) => {
		db.query(q, val, (err, rows) => {
			if (err) rej(err)
			res(rows)
		})
	})
}