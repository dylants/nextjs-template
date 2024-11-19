jest.mock('next/headers', () => ({
  headers: () => ({
    get: jest.fn(),
  }),
}));
