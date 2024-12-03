import _ from 'lodash';
import { generateUsers } from './users/users.seeds';
import { generateWidgets } from './widgets/widgets.seeds';

function getNumberEnvVariable(
  envValue: string | undefined,
  envVariableName: string,
  defaultValue?: number,
): number {
  if (envValue) {
    // allow the string number to include underscores
    return _.toNumber(envValue.replace(/_/g, ''));
  } else if (defaultValue) {
    return defaultValue;
  } else {
    throw new Error(`Environment variable ${envVariableName} required`);
  }
}

export default async function generateSeeds() {
  await generateUsers();

  const numWidgets = getNumberEnvVariable(
    process.env.SEED_NUM_WIDGETS,
    'SEED_NUM_WIDGETS',
    10,
  );
  await generateWidgets(numWidgets);
}
