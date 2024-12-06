import { MovieQuery, MovieReqOptions } from '../types'

export const movieUrl = 'https://api.themoviedb.org/3/'

export const movieReqOptions: MovieReqOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}`
  }
};

export const movieQueryOpts: MovieQuery = {
	original_language: 'en-US',
	page: 1,
	sort_by: "popularity.desc"
}

