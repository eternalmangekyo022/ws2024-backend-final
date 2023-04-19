import db from './db.js'

export default {
	async findByTeam(id) {
		return await db.query('select * from runners where teamId = ?', id)
	},

	async create(user, teamId, firstName, lastName, speed) {
		if (!user.isAdmin) throw 403
		let token = parseInt((Math.random() * Math.pow(10, 9)).toString().split('.')[0])
		while(true) {			
			const tokens = await db.query('select token from runners')
			if(tokens.filter(i => i.token === token).length === 0) break
		}
		const { insertId } = await db.query('insert into runners(teamId, firstName, lastName, speed, isAdmin, token) values(?, ?, ?, ?, false, ?)', [teamId, firstName, lastName, speed, token])
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