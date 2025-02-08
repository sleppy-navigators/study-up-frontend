import ky, { HTTPError } from 'ky';
import { match, P } from 'ts-pattern';
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

const handleError = async (error: unknown) => {
  if (error instanceof HTTPError) {
    const response = error.response;
    const request = error.request;
    const options = error.options;

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
  }

  if (error instanceof TypeError) {
    if (error.message === 'Failed to fetch') {
      throw new NetworkError();
    }
    if (error.message.includes('timeout')) {
      throw new TimeoutError();
    }
  }

  throw error;
};

export const client = ky.create({
  prefixUrl: 'http://localhost:8080',
  hooks: {
    beforeError: [handleError],
  },
  retry: {
    limit: 3,
    methods: ['get', 'put'],
    statusCodes: [408, 500, 502, 503, 504],
    delay: (attemptCount: number) => Math.min(1000 * 2 ** attemptCount, 10000),
  },
});
