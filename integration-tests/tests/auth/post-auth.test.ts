import { AuthPostRequestBody, POST } from '@/app/api/auth/route';
import projectConfig from '@/config/index';
import prisma from '@/lib/prisma';
import User from '@/types/User';
import { NextRequest } from 'next/server';
import { EMAIL, PASSWORD } from '../../fixtures/user.fixture';

const mockSetCookies = jest.fn();
jest.mock('next/headers', () => ({
  cookies: () => ({
    set: (...args: unknown[]) => mockSetCookies(...args),
  }),
  headers: () => ({
    get: jest.fn(),
  }),
}));

const url = 'https://localhost';

const USER = {
  email: EMAIL,
  password: PASSWORD,
};

describe('/auth POST API', () => {
  let user: User;

  beforeAll(async () => {
    user = await prisma.user.findFirstOrThrow({
      where: { email: USER.email },
    });
  });

  beforeEach(async () => {
    mockSetCookies.mockReset();
  });

  it('should return auth cookie on successful login', async () => {
    const body: AuthPostRequestBody = {
      email: USER.email,
      password: USER.password,
    };
    const request = new NextRequest(url, {
      body: JSON.stringify(body),
      method: 'POST',
    });

    const response = await POST(request);

    expect(response.status).toEqual(200);
    expect(await response.json()).toEqual({
      data: {
        email: USER.email,
        isLoggedIn: true,
      },
    });

    expect(mockSetCookies).toHaveBeenCalledWith(
      projectConfig.auth.cookieName,
      user.userId,
    );
  });

  it('should return Bad Request when the request data is invalid', async () => {
    const request = new NextRequest(url, {
      body: JSON.stringify({ hi: 'how are you?' }),
      method: 'POST',
    });

    const response = await POST(request);

    expect(response.status).toEqual(400);
    expect(await response.json()).toEqual({
      error: 'Validation error: Required at "email"; Required at "password"',
    });

    expect(mockSetCookies).not.toHaveBeenCalled();
  });

  it('should return Unauthorized when user does not exist', async () => {
    const body: AuthPostRequestBody = {
      email: 'user@doesnotexist.com',
      password: PASSWORD,
    };
    const request = new NextRequest(url, {
      body: JSON.stringify(body),
      method: 'POST',
    });

    const response = await POST(request);

    expect(response.status).toEqual(401);
    expect(await response.json()).toEqual({ error: 'Unauthorized' });

    expect(mockSetCookies).not.toHaveBeenCalled();
  });

  it('should return Unauthorized when password does not match', async () => {
    const body: AuthPostRequestBody = {
      email: USER.email,
      password: 'bad',
    };
    const request = new NextRequest(url, {
      body: JSON.stringify(body),
      method: 'POST',
    });

    const response = await POST(request);

    expect(response.status).toEqual(401);
    expect(await response.json()).toEqual({ error: 'Unauthorized' });

    expect(mockSetCookies).not.toHaveBeenCalled();
  });
});
