import { GET, GetResponseBody } from '@/app/api/protected/widgets/route';
import prisma from '@/lib/prisma';
import User from '@/types/User';
import Widget from '@/types/Widget';
import { NextRequest } from 'next/server';
import {
  USER_NO_WIDGETS_EMAIL,
  USER_WITH_WIDGETS_EMAIL,
} from '../../fixtures/user.fixture';
import { establishAuth } from '../../test-lib/test-auth';

const url = 'https://localhost';

describe('/api/protected/widgets GET Integration Test', () => {
  describe('when the user has widgets', () => {
    let user: User;
    let widgets: Widget[];

    beforeAll(async () => {
      user = await prisma.user.findFirstOrThrow({
        where: { email: USER_WITH_WIDGETS_EMAIL },
      });
      widgets = await prisma.widget.findMany({
        select: {
          createdAt: true,
          description: true,
          name: true,
          updatedAt: true,
          widgetId: true,
        },
        where: { userId: user.userId },
      });
    });

    it('should return all widgets for the user', async () => {
      const request = new NextRequest(url);
      establishAuth({ request, user });
      const response = await GET(request);

      expect(response.status).toEqual(200);
      const { data } = (await response.json()) as GetResponseBody;

      expect(data).toHaveLength(3);
      expect(data).toEqual(JSON.parse(JSON.stringify(widgets)));
    });
  });

  describe('when the user has no widgets', () => {
    let user: User;

    beforeAll(async () => {
      user = await prisma.user.findFirstOrThrow({
        where: { email: USER_NO_WIDGETS_EMAIL },
      });
    });

    it('should return no widgets', async () => {
      const request = new NextRequest(url);
      establishAuth({ request, user });
      const response = await GET(request);

      expect(response.status).toEqual(200);
      const { data } = (await response.json()) as GetResponseBody;

      expect(data).toHaveLength(0);
    });
  });

  it('should fail when unauthorized', async () => {
    const request = new NextRequest(url);
    const response = await GET(request);

    expect(response.status).toEqual(401);
    expect(await response.json()).toEqual({
      error: 'Unauthorized',
    });
  });
});
