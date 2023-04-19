import model from '../models/teams.model.js'

export default {
	async findById({ params: { teamId } }, res) {
		const team = await model.findById(teamId)
		res.json(team)
	},

	async update({ user, params: { teamId }, body: { name, location, contactEmail } }, res) {
		const updated = await model.update(user, teamId, name, location, contactEmail)
		res.json(updated[0])
	},

	async delete({ user, params: { teamId } }, res) {
		await model.delete(user, teamId)
		res.json({ success: true })
	}
}