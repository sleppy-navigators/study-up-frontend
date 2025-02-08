import {
  HTTPError,
  type NormalizedOptions,
  type KyResponse,
  type KyRequest,
} from 'ky';

export class UnauthorizedError extends HTTPError {
  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions
  ) {
    super(response, request, options);
    this.name = 'UnauthorizedError';
    this.message = '로그인이 필요한 서비스예요';
  }
}

export class ForbiddenError extends HTTPError {
  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions
  ) {
    super(response, request, options);
    this.name = 'ForbiddenError';
    this.message = '접근 권한이 없어요';
  }
}

export class NotFoundError extends HTTPError {
  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions
  ) {
    super(response, request, options);
    this.name = 'NotFoundError';
    this.message = '요청하신 정보를 찾을 수 없어요';
  }
}

export class ConflictError extends HTTPError {
  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions
  ) {
    super(response, request, options);
    this.name = 'ConflictError';
    this.message = '이미 존재하는 정보예요';
  }
}

export class BadRequestError extends HTTPError {
  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions
  ) {
    super(response, request, options);
    this.name = 'BadRequestError';
    this.message = '입력하신 정보가 올바르지 않아요';
  }
}

export class ValidationError extends HTTPError {
  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions
  ) {
    super(response, request, options);
    this.name = 'ValidationError';
    this.message = '입력하신 정보를 다시 확인해주세요';
  }
}

export class ServerError extends HTTPError {
  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions
  ) {
    super(response, request, options);
    this.name = 'ServerError';
    this.message = '일시적인 서버 오류가 발생했어요. 잠시 후 다시 시도해주세요';
  }
}

export class ServiceUnavailableError extends HTTPError {
  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions
  ) {
    super(response, request, options);
    this.name = 'ServiceUnavailableError';
    this.message = '현재 서비스 점검 중이에요. 잠시 후 다시 시도해주세요';
  }
}

export class NetworkError extends Error {
  constructor() {
    super('인터넷 연결을 확인해주세요');
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor() {
    super('요청 시간이 초과되었어요. 다시 시도해주세요');
    this.name = 'TimeoutError';
  }
}
