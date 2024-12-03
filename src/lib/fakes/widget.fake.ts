import Widget from '@/types/Widget';
import { faker } from '@faker-js/faker';

export function fakeWidget(): Widget {
  return {
    createdAt: faker.date.past(),
    description: faker.lorem.sentence(),
    name: faker.lorem.words({ max: 5, min: 1 }),
    updatedAt: faker.date.past(),
    widgetId: faker.string.uuid(),
  };
}
