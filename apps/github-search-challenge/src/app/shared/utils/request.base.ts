import { RequestInterface } from '../config/request.interface';

export const baseCall = async <T>(
  request: RequestInterface,
  rest: RequestInit = {}
): Promise<T> => {
  const response = await fetch(
    request.url,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      ...rest,
      method: request.method.toString(),
      credentials: 'same-origin',
    }
  );

  if (!response?.ok) {
    const error = await response.json();
    throw new Error(error?.message || 'An error occurred!');
  }

  return response.json();
};
