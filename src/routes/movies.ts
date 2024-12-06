import { Router, Request, Response } from 'express'
import { MovieReqOptions, MovieQuery, MovieItem, CrewItem } from '../types' 

const router = Router()

const options: MovieReqOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}`
  }
};

const movieUrl = 'https://api.themoviedb.org/3/'
const queryOpts: MovieQuery = {
	language: 'en-US',
	page: 1,
	sort_by: "popularity.desc"
}

const makeQueryString = (year: string): string =>
	Object.entries({ ...queryOpts, primary_release_year: year })
		.map(([key, value]) => `${key}=${value}`)
		.join("&")

router.get('/:year', async (req: Request, res: Response) => {
	try {
		const year: string = req.params['year']
		const movieRes = await fetch(`${movieUrl}discover/movie?${makeQueryString(year)}`, options)
		const data = await movieRes.json();
		const moviesPromises = data.results.map(async (item: MovieItem) => {
			const editorsRes = await fetch(`${movieUrl}movie/${item.id}/credits?language=en-US`, options)
			const editorsData = await editorsRes.json()
			const editors = editorsData.crew
				.filter((editor: CrewItem) => editor.known_for_department === 'Editing')
				.map((editor: CrewItem) => editor.original_name)
		
			return {
				editors,
				title: item.original_title,
				releaseDate: item.release_date,
				voterAverage: item.vote_average
			}
		})
		const movies = await Promise.all(moviesPromises)
		res.send(movies)
	} catch(err) {
		console.error(err)
	}
})

export default router;
