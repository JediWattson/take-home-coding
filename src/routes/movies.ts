import { Router, Request, Response } from 'express'

const router = Router()

type MovieItemType = {
	id: string,
	original_title: string,
	release_date: string,
	vote_average: number
}

type EditorItemType = {
	original_name: string,
	known_for_department: string
}

type MovieReqOptionsType = {
	method: string,
	headers: {
		accept: string,
		Authorization: string
	}
}

type QueryOptsType = {
	language: string,
	page: number,
	sort_by: string,
}

const options: MovieReqOptionsType = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}`
  }
};

const movieUrl = 'https://api.themoviedb.org/3/'
const queryOpts: QueryOptsType = {
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
		const moviesPromises = data.results.map(async (item: MovieItemType) => {
			const editorsRes = await fetch(`${movieUrl}movie/${item.id}/credits?language=en-US`, options)
			const editorsData = await editorsRes.json()
			const editors = editorsData.crew
				.filter((editor: EditorItemType) => editor.known_for_department === 'Editing')
				.map((editor: EditorItemType) => editor.original_name)
		
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
