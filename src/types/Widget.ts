import { Widget as PrismaWidget } from '@prisma/client';

type Widget = Omit<PrismaWidget, 'id' | 'userId'>;

export default Widget;
