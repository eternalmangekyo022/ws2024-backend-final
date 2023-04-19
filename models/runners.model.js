import db from './db.js'

export default {
	async findByTeam(id) {
		return await db.query('select * from runners where teamId = ?', id)
	},

	async create(user, teamId, firstName, lastName, speed) {
		if (!user.isAdmin) throw 403
		const { insertId } = await db.query('insert into runners(teamId, firstName, lastName, speed, isAdmin) values(?, ?, ?, ?, false)', [teamId, firstName, lastName, speed])
		return await db.query('select * from runners where id = ?', insertId)
	},

	async findByIds(teamId, runnerId) {
		return await db.query('select * from runners where teamId = ? and id = ?', [teamId, runnerId])
	},

	async update(user, id, firstName, lastName, speed) {
		if (!user.isAdmin) throw 403
		await db.query('update runners set firstName = ?, lastName = ?, speed = ? where id = ?', [firstName, lastName, speed, id])
		return await db.query('select * from runners where id = ?', id)
	},

	async delete(user, id) {
		if (!user.isAdmin) throw 403
		await db.query('delete from runners where id = ?', id)
	}
}