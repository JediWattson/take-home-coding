import * as sinon from 'sinon'
import { expect } from 'chai'
import { getMoviesByYear } from '../src/routes/movies'
import { movieMockRes } from './mocks/constants'
import './mocks/server'

describe('App tests', () => {
	it('Calls to movies and returns data', async () => {
		const mockReq = {
		  	method: 'GET',
			params: { year: '1999' }
		};
		const mockRes = {
			json: sinon.spy(),
			send: sinon.spy()
		};

		await getMoviesByYear(mockReq as any, mockRes as any)
		const isMatch = mockRes.send.calledWith(movieMockRes)
		expect(isMatch).to.be.true
	})

	it('Calls to movies with bad params and returns empty array', async () => {
		const mockReq = {
		  	method: 'GET',
			params: { year: 'asd' }
		};
		const mockRes = {
			json: sinon.spy(),
			send: sinon.spy()
		};

		await getMoviesByYear(mockReq as any, mockRes as any)
		const isMatch = mockRes.send.calledWith([])
		expect(isMatch).to.be.true
	})
})
