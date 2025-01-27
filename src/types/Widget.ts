import { Widget as PrismaWidget } from '@prisma/client';

type Widget = Omit<PrismaWidget, 'userId'>;

export default Widget;
