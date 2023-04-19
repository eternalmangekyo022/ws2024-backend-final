import express from 'express'
import controller from '../controllers/stages.controller.js'

export default (app, use) => {
	const router = express.Router()

	router.get('/', use(controller.findAll))

	app.use('/stages', router)
}