import db from './db.js'

export default async token => {
	const user = await db.query('select * from runners where token = ?', token || 0)
	return user.length ? user[0] : null
}