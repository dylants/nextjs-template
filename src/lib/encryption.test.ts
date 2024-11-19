import { comparePassword, encryptPassword } from '@/lib/encryption';

describe('encryption lib', () => {
  const password = 'my password';

  it('should encrypt and compare password correctly', async () => {
    const hash = await encryptPassword({ password });
    expect(await comparePassword({ hash, password })).toEqual(true);
  });

  it('should return false when passwords mismatch', async () => {
    const hash = await encryptPassword({ password });
    expect(await comparePassword({ hash, password: 'bad' })).toEqual(false);
  });
});
