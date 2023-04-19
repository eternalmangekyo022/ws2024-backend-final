import controller from "../controllers/runners.controller.js";
import express from 'express'

export default (app, use) => {
	const router = express.Router({ mergeParams: true })

	router.get('/', use(controller.findByTeam))
	router.post('/', use(controller.create))
	router.get('/:runnerId', use(controller.findByIds))
	router.put('/:runnerId', use(controller.update))
	router.delete('/:runnerId', use(controller.delete))

	app.use('/runners', router)
}