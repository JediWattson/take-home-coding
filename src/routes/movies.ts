import { Router, Request, Response } from 'express'
import { MovieItem, CrewItem, MovieResData } from '../types' 
import { movieUrl, movieReqOptions } from '../lib/constants'
import { makeMovieQueryString } from '../lib/helpers'

const router = Router()

export const getMoviesByYear = async (req: Request, res: Response) => {
	try {
		const year: string = req.params['year']
		if (year.length !== 4 || !Number.isInteger(parseInt(year, 10))) {
			res.send([])
			return 
		}

		const movieRes = await fetch(
			`${movieUrl}discover/movie?${makeMovieQueryString(year)}`, 
			movieReqOptions
		)

		const data = await movieRes.json();		
		const moviesPromises = data.results
		.map(async (item: MovieItem): Promise<MovieResData> => {
			const editorsRes = await fetch(
				`${movieUrl}movie/${item.id}/credits?language=en-US`, 
				movieReqOptions
			)
			const editorsData = await editorsRes.json()
			const editors: string[] = editorsData.crew
				.filter((editor: CrewItem) => editor.known_for_department === 'Editing')
				.map((editor: CrewItem) => editor.name)
		
			const date = new Date(item.release_date)
			const options: Intl.DateTimeFormatOptions = {
				timeZone: 'UTC',
			  	year: 'numeric',
				month: 'long',
				day: 'numeric'
			}
			const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
			return {
				title: item.original_title,
				vote_average: item.vote_average,
				release_date: formattedDate,
				editors
			}
		})
		
		const movies: MovieResData[] = await Promise.all(moviesPromises)	
		res.send(movies)
	} catch(err) {
		console.error(err)
	}
}

router.get('/:year', getMoviesByYear)

export default router;
