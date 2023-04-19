import express from 'express'
import auth from './controllers/auth.controller.js'
import runnersRoutes from './routes/runners.routes.js'
import teamsRoutes from './routes/teams.routes.js'
import stagesRoutes from './routes/stages.routes.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(/\/teams/, auth(false))
app.post('/login', auth(true))

const use = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

stagesRoutes(app, use)
runnersRoutes(teamsRoutes(app, use), use)

app.use((err, req, res, next) => {
	if (err === 403) res.status(403).json({ status: 'error', message: 'Not admin' })
	else res.status(500).json({ status: 'error', message: 'Unknown error' })
})
const PORT = 80 || process.env.PORT

app.listen(PORT, () => console.log(`  ${PORT}  `))