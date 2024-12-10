import { setupServer } from 'msw/node'
import { handlers } from './handlers'

const server = setupServer(...handlers)
before(() => server.listen());
afterEach(() => server.resetHandlers());
after(() => server.close());

export default server

