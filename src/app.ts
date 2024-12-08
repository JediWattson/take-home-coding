import express, { Express } from "express"
import routesInit from './routes'

const app: Express = express()
const port: string = process.env.PORT || "9000"

routesInit({ app })

app.listen(port, () => {
	console.log(`started listening on ${port}`)
})

export default app
