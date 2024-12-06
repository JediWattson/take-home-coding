import express, { Express, Request, Response } from "express"
const app: Express = express()
const port: string = process.env.PORT || "9000"

app.get('/:year', (req: Request, res: Response) => {
	const year = req.params['year']
	res.send(`Hello world - ${year}`)
})

app.listen(port, () => {
	console.log(`started listening on ${port}`)
})
