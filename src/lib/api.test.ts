/**
 * @jest-environment jsdom
 */

import { _api } from '@/lib/api';
import UnauthorizedError from '@/lib/errors/UnauthorizedError';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

describe('api library', () => {
  describe('_api internal function', () => {
    type ApiResponse = { foo: string };

    const server = setupServer(
      rest.get<ApiResponse>('/test/success', (_, res, ctx) => {
        return res(ctx.json({ data: { foo: 'bar' } }));
      }),
      rest.get('/test/unauthorized', (_, res, ctx) => {
        return res(ctx.status(401), ctx.json({ error: 'Unauthorized' }));
      }),
      rest.get('/test/error', (_, res, ctx) => {
        return res(ctx.status(500, 'Something went wrong'));
      }),
    );

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should return data from successful response', async () => {
      const result = await _api<ApiResponse>('/test/success');
      expect(result).toEqual({ foo: 'bar' });
    });

    it('should throw UnauthorizedError on 401 response', async () => {
      try {
        await _api<ApiResponse>('/test/unauthorized');
        fail('Expected UnauthorizedError to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedError);
      }
    });

    it('should throw Error with status text on non-2xx response', async () => {
      try {
        await _api<ApiResponse>('/test/error');
        fail('Expected error to be thrown');
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toEqual('Something went wrong');
      }
    });
  });
});
