import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fakeToken, userData } from './fixtures';

const server = setupServer(
  rest.post('http://localhost:5000/auth/register', ((req, res, context) => {
    return res(context.status(200), context.json({headers: fakeToken}));
  })),
  rest.post('http://localhost:5000/auth/login', ((req, res, context) => {
    return res(context.status(200), context.json({headers: fakeToken}));
  })),
  rest.get('http://localhost:5000/auth/is-verify', ((req, res, context) => {
    return res(context.status(200), context.json([{ message: true }]));
  })),
  rest.get('http://localhost:5000/dashbrd/', ((req, res, context) => {
    return res(context.status(200), context.json(userData));
  })),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
