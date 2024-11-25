import { generateUsers } from './users/users.seeds';
import { generateWidgets } from './widgets/widgets.seeds';

export default async function generateSeeds() {
  await generateUsers();
  await generateWidgets();
}
