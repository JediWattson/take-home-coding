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

	it('Calls to movies with bad params and 404', async () => {
		const mockReq = {
		  	method: 'GET',
			params: { year: 'asd' }
		};
		const mockRes = {
			send: sinon.spy(),
			sendStatus: sinon.spy()
		};

		await getMoviesByYear(mockReq as any, mockRes as any)
		const isMatch = mockRes.sendStatus.calledWith(404)
		expect(isMatch).to.be.true
	})
})
