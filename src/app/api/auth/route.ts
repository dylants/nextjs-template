import config from '@/config/index';
import { comparePassword } from '@/lib/encryption';
import BadRequestError from '@/lib/errors/BadRequestError';
import handleErrorResponse from '@/lib/errors/handleErrorResponse';
import UnauthorizedError from '@/lib/errors/UnauthorizedError';
import { getLogger } from '@/lib/logger';
import prisma from '@/lib/prisma';
import Auth from '@/types/Auth';
import NextResponseErrorBody from '@/types/NextResponseErrorBody';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { toZod } from 'tozod';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const authCookieName = config.auth.cookieName;

export type AuthGetResponseBody = {
  data: Auth;
};

export async function GET(
  request: NextRequest,
): Promise<NextResponse<AuthGetResponseBody | NextResponseErrorBody>> {
  const logger = getLogger(`${request.nextUrl.pathname} ${request.method}`);

  try {
    const userId = request.cookies.get(authCookieName)?.value;

    if (!userId) {
      logger.trace('No userId in auth cookie, returning not logged in');
      return NextResponse.json({
        data: { isLoggedIn: false },
      });
    }

    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      logger.trace({ userId }, 'No user for userId, returning not logged in');
      return NextResponse.json({
        data: { isLoggedIn: false },
      });
    }

    return NextResponse.json({
      data: {
        email: user.email,
        isLoggedIn: true,
      },
    });
  } catch (error: unknown) {
    return handleErrorResponse(error);
  }
}

export type AuthPostRequestBody = {
  email: string;
  password: string;
};

const postSchema: toZod<AuthPostRequestBody> = z.object({
  email: z.string(),
  password: z.string(),
});

export type AuthPostResponseBody = {
  data: Auth;
};

export async function POST(
  request: NextRequest,
): Promise<NextResponse<AuthPostResponseBody | NextResponseErrorBody>> {
  const logger = getLogger(`${request.nextUrl.pathname} ${request.method}`);

  try {
    const json = await request.json();
    const validatedBody = postSchema.safeParse(json);

    if (!validatedBody.success) {
      const message = fromZodError(validatedBody.error);
      throw new BadRequestError(message.toString());
    }

    const { email, password } = validatedBody.data;

    logger.trace({ email }, 'Attempted login');

    const user = await prisma.user.findFirst({
      select: {
        email: true,
        id: true,
        passwordHash: true,
      },
      where: { email },
    });
    if (!user) {
      logger.trace({ email }, 'User not found, returning UnauthorizedError');
      throw new UnauthorizedError();
    }

    const isValidPassword = await comparePassword({
      hash: user.passwordHash,
      password,
    });
    if (!isValidPassword) {
      logger.trace({ email }, 'Invalid password, returning UnauthorizedError');
      throw new UnauthorizedError();
    }

    logger.trace({ email }, 'Valid login auth');
    const cookieStore = cookies();
    cookieStore.set(authCookieName, user.id);

    return NextResponse.json({
      data: {
        email: user.email,
        isLoggedIn: true,
      },
    });
  } catch (error: unknown) {
    return handleErrorResponse(error);
  }
}
