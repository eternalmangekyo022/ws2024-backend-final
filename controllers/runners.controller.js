import model from '../models/runners.model.js'

export default {
	async findByTeam({ params: { teamId } }, res) {
		const runners = await model.findByTeam(teamId)
		res.json(runners)
	},

	async create({ user, params: { teamId }, body: { firstName, lastName, speed } }, res) {
		const inserted = await model.create(user, teamId, firstName, lastName, speed)
		res.json(inserted[0])
	},

	async findByIds({ params: { teamId, runnerId } }, res) {
		const runners = await model.findByIds(teamId, runnerId)
		res.json(runners[0])
	},

	async update({ user, params: { runnerId }, body: { firstName, lastName, speed } }, res) {
		const updated = await model.update(user, runnerId, firstName, lastName, speed)
		res.json(updated[0])
	},

	async delete({ user, params: { runnerId } }, res) {
		await model.delete(user, runnerId)
		res.json({ success: true })
	}
}