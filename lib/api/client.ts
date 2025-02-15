import ky, { HTTPError, KyResponse, NormalizedOptions, KyRequest } from 'ky';
import { match, P } from 'ts-pattern';
import { createStore } from 'jotai/vanilla';
import { authActions, authAtom } from '../auth/store';
import {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  BadRequestError,
  ValidationError,
  ServerError,
  ServiceUnavailableError,
  NetworkError,
  TimeoutError,
} from '../errors/http';

const store = createStore();

let refreshPromise: Promise<void> | null = null;
const requestQueue: (() => Promise<any>)[] = [];

const addToQueue = (request: () => Promise<any>) => {
  return new Promise((resolve, reject) => {
    requestQueue.push(() => request().then(resolve).catch(reject));
  });
};

const executeQueue = () => {
  const queue = [...requestQueue];
  requestQueue.length = 0;

  queue.forEach((request) => {
    request();
  });
};

const clearQueue = () => {
  const queue = [...requestQueue];
  requestQueue.length = 0;

  queue.forEach((request) => {
    // Ignore all the requests in the queue
    request().catch(() => {});
  });
};

const handleTokenRefresh = async (
  request: KyRequest,
  options: NormalizedOptions,
  response: KyResponse
): Promise<KyResponse> => {
  if (response.status !== 401) {
    return response;
  }

  if (refreshPromise !== null) {
    return addToQueue(() => client(request)) as Promise<KyResponse>;
  }

  try {
    const { accessToken, refreshToken } = store.get(authAtom);
    if (!refreshToken) throw new UnauthorizedError(response, request, options);

    refreshPromise = ky
      .post('auth/refresh', {
        prefixUrl: 'http://localhost:8080',
        json: {
          accessToken,
          refreshToken,
        },
      })
      .json<{
        apiResult: string;
        data: {
          accessToken: string;
          refreshToken: string;
        };
      }>()
      .then(async (response) => {
        await store.set(authActions.setTokens, response.data);
      })
      .catch(() => {
        throw new UnauthorizedError(response, request, options);
      });

    await refreshPromise;
    executeQueue();
    return client(request);
  } catch (error) {
    clearQueue();
    await store.set(authActions.clearTokens);
    throw error;
  } finally {
    refreshPromise = null;
  }
};

const handleError = async (error: HTTPError): Promise<HTTPError> => {
  const response = error.response;
  const request = error.request;
  const options = error.options;

  if (error instanceof TypeError) {
    if (error.message === 'Failed to fetch') {
      throw new NetworkError();
    }
    if (error.message.includes('timeout')) {
      throw new TimeoutError();
    }
  }

  throw match(response.status)
    .with(401, () => new UnauthorizedError(response, request, options))
    .with(403, () => new ForbiddenError(response, request, options))
    .with(404, () => new NotFoundError(response, request, options))
    .with(409, () => new ConflictError(response, request, options))
    .with(400, () => new BadRequestError(response, request, options))
    .with(422, () => new ValidationError(response, request, options))
    .with(503, () => new ServiceUnavailableError(response, request, options))
    .with(
      P.number.between(500, 599),
      () => new ServerError(response, request, options)
    )
    .otherwise(() => new ServerError(response, request, options));
};

export const client = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const { accessToken } = store.get(authAtom);
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [handleTokenRefresh],
    beforeError: [handleError],
  },
  retry: {
    limit: 2,
    methods: ['get', 'put'],
    statusCodes: [408, 500, 502, 503, 504],
    delay: (attemptCount: number) => Math.min(1000 * 2 ** attemptCount, 10000),
  },
});
