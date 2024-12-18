import { AuthPostRequestBody } from '@/app/api/auth/route';
import UnauthorizedError from '@/lib/errors/UnauthorizedError';
import Auth from '@/types/Auth';
import Widget from '@/types/Widget';

/**
 * Wrapper around fetch, expecting and returning a JSON typed response
 * within the `data` field.
 *
 * @param path The fetch path
 * @param fetchOptions The fetch options
 * @returns Typed response.json().data
 */
export async function _api<T>(
  path: string,
  fetchOptions?: RequestInit,
): Promise<T> {
  const response = await fetch(path, fetchOptions);

  if (response.status === 401) {
    throw new UnauthorizedError();
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return (await response.json()).data as T;
}

// *************************************************************
// ************************* AUTH ******************************
// *************************************************************

export async function getAuth(): Promise<Auth> {
  return _api<Auth>('/api/auth');
}

export async function postAuth({
  email,
  password,
}: AuthPostRequestBody): Promise<Auth> {
  return _api<Auth>('/api/auth', {
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}

// *************************************************************
// ************************ WIDGETS ***************************
// *************************************************************

export async function getWidgets(): Promise<Widget[]> {
  return _api<Widget[]>('/api/protected/widgets');
}
