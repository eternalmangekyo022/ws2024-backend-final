import db from './db.js'

export default {
	async findAll() {
		return await db.query('select * from stages')
	}
}