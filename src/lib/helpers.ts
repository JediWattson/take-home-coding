import { movieQueryOpts } from './constants'

export const makeMovieQueryString = (year: string): string =>
	Object.entries({ ...movieQueryOpts, primary_release_year: year })
		.map(([key, value]) => `${key}=${value}`)
		.join("&")
