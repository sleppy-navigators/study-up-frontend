import ky, { HTTPError, KyResponse, NormalizedOptions, KyRequest } from 'ky';
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
} from '../errors/http';
import { authStore, authAtom, authActions } from '../auth/authStore';
import { authApi } from '@/auth/api';

const handleTokenRefresh = async (
  request: KyRequest,
  options: NormalizedOptions,
  response: KyResponse
): Promise<KyResponse> => {
  if (response.status !== 401) {
    return response;
  }

  const { accessToken, refreshToken } = authStore.get(authAtom);

  if (!accessToken || !refreshToken) {
    authActions.clearTokens();
    throw new UnauthorizedError(response, request, options);
  }

  try {
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await authApi.refreshToken(accessToken, refreshToken);

    authActions.setTokens({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    authActions.clearTokens();
    throw new UnauthorizedError(response, request, options);
  }

  return client(request);
};

const handleHttpError = async (error: HTTPError): Promise<HTTPError> => {
  const { request, response, options } = error;

  throw match(response.status)
    .with(401, () => new UnauthorizedError(response, request, options))
    .with(403, () => new ForbiddenError(response, request, options))
    .with(404, () => new NotFoundError(response, request, options))
    .with(409, () => new ConflictError(response, request, options))
    .with(400, () => new BadRequestError(response, request, options))
    .with(422, () => new ValidationError(response, request, options))
    .with(503, () => new ServiceUnavailableError(response, request, options))
    .otherwise(() => new ServerError(response, request, options));
};

const AUTH_HEADER = 'Authorization';
const BEARER_PREFIX = 'Bearer ';

const setAuthorizationHeader = (request: KyRequest) => {
  const { accessToken } = authStore.get(authAtom);
  if (accessToken) {
    request.headers.set(AUTH_HEADER, `${BEARER_PREFIX}${accessToken}`);
  }
};

export const client = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [setAuthorizationHeader],
    afterResponse: [handleTokenRefresh],
    beforeError: [handleHttpError],
  },
  retry: {
    methods: ['get', 'put'],
    statusCodes: [408, 500, 502, 503, 504],
  },
});
