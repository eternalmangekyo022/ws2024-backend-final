import express from 'express'
import controller from '../controllers/teams.controller.js'

export default (app, use) => {
	const router = express.Router({ mergeParams: true })

	router.get('/', use(controller.findById))
	router.put('/', use(controller.update))
	router.delete('/', use(controller.delete))

	app.use('/teams/:teamId', router)
	return router
}