import BadRequestError from '@/lib/errors/BadRequestError';
import NotFoundError from '@/lib/errors/NotFoundError';
import UnauthorizedError from '@/lib/errors/UnauthorizedError';
import { getLogger } from '@/lib/logger';
import NextResponseErrorBody from '@/types/NextResponseErrorBody';
import { NextResponse } from 'next/server';

export default function handleErrorResponse(
  error: unknown,
): NextResponse<NextResponseErrorBody> {
  const logger = getLogger('handleErrorResponse');

  if (error instanceof BadRequestError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } else if (error instanceof NotFoundError) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  } else if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } else {
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    logger.error({ errorMessage }, 'Unknown error');

    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
