import model from '../models/auth.model.js'

export default login => async (req, res, next) => {
	const token = login ? req.body.token : req.headers.authorization
	const user = await model(token)
	if (!user && !login) res.status(401).json({ status: 'error', message: 'Unauthorized' })
	else if (!user) res.status(401).json({ status: 'error', message: 'Failed login' })
	else if (login) res.json({ status: 'success', user })
	else {
		req.user = user
		next()
	}
}