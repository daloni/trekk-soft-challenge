import { baseCall } from './request.base';
import { FetchMock } from 'jest-fetch-mock';
import { RequestInterface, RequestMethod } from '../config/request.interface';

describe('Request base', () => {
  const request: RequestInterface = {
    url: 'https://api.github.com/search/users',
    method: RequestMethod.GET,
  };
  const headers = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: request.method?.toString(),
    credentials: 'same-origin',
  };

  beforeEach(() => {
    (fetch as FetchMock).resetMocks();
  });

  it('should request success', async () => {
    const response = {
      message: 'API is up',
    };
    (fetch as FetchMock).mockResponseOnce(JSON.stringify(response));

    const users = await baseCall(request);

    expect(users).toEqual(response);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(request.url, headers);
  });

  it('should request exception', async () => {
    const response = 'API is down';
    (fetch as FetchMock).mockReject(() => Promise.reject(JSON.stringify(response)));

    await expect(baseCall(request)).rejects.toMatch(JSON.stringify(response));
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(request.url, headers);
  });

  it('should request with error', async () => {
    const message = 'API error';
    const response = {
      ok: false,
      json: () => ({ message })
    };
    (fetch as FetchMock).mockReject(() => Promise.resolve(response));

    await expect(baseCall(request)).rejects.toThrow(message);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(request.url, headers);
  });

  it('should return default message', async () => {
    const defaultMessage = 'An error occurred!';
    const response = {
      json: () => ({})
    };
    (fetch as FetchMock).mockReject(() => Promise.resolve(response));

    await expect(baseCall(request)).rejects.toThrow(new Error(defaultMessage));
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(request.url, headers);
  });

  it('should check data without ok', async () => {
    const message = 'Custom message';
    const response = {
      json: () => ({ message })
    };
    (fetch as FetchMock).mockImplementationOnce(() => Promise.resolve(response as unknown as Response));

    await expect(baseCall(request)).rejects.toThrow(new Error(message));
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(request.url, headers);
  });
});
