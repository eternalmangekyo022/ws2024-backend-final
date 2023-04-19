import model from '../models/stages.model.js'

export default {
	async findAll(req, res) {
		const stages = await model.findAll()
		res.json(stages)
	}
}