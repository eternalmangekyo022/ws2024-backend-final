import db from './db.js'

export default {
	async findById(id) {
		const teams = await db.query('select * from teams where id = ?', id)
		return teams[0]
	},

	async update(user, id, name, location, contactEmail) {
		if (!user.isAdmin) throw 403
		await db.query('update teams set name = ?, location = ?, contactEmail = ? where id = ?', [name, location, contactEmail, id])
		return await db.query('select * from teams where id = ?', id)
	},

	async delete(user, id) {
		if (!user.isAdmin) throw 403
		await db.query('delete from runners where teamId = ?', id)
		await db.query('delete from teams where id = ?', id)
		return
	}
}