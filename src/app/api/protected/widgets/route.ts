import authMiddleware from '@/lib/auth-middleware';
import handleErrorResponse from '@/lib/errors/handleErrorResponse';
import prisma from '@/lib/prisma';
import NextResponseErrorBody from '@/types/NextResponseErrorBody';
import Widget from '@/types/Widget';
import { NextRequest, NextResponse } from 'next/server';

export type GetResponseBody = {
  data: Widget[];
};

export async function GET(
  request: NextRequest,
): Promise<NextResponse<GetResponseBody | NextResponseErrorBody>> {
  try {
    const session = await authMiddleware(request);

    const widgets = await prisma.widget.findMany({
      orderBy: {
        id: 'asc',
      },
      select: {
        createdAt: true,
        description: true,
        name: true,
        updatedAt: true,
        widgetId: true,
      },
      where: { userId: session.user.userId },
    });

    return NextResponse.json({ data: widgets });
  } catch (error: unknown) {
    return handleErrorResponse(error);
  }
}
