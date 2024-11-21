import UnauthorizedError from '@/lib/errors/UnauthorizedError';
import Auth from '@/types/Auth';

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
