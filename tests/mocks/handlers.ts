import { http, HttpResponse } from 'msw'
import { moviedbMockRes, creditsMockRes } from './constants'

export const handlers = [
	http.get(`*/discover/movie`, () => 
		HttpResponse.json(moviedbMockRes)
	),
	http.get(`*/movie/:movie_id/credits`, () => 
		HttpResponse.json(creditsMockRes)	
	)
]
