import { Application } from 'express'
import movies from './movies'

type OptsType = { app: Application }

export default (opts: OptsType) => {
	const { app } = opts
	app.use('/movies', movies)
}
