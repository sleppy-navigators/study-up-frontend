import { http, HttpResponse } from 'msw';
import type { HttpResponseResolver } from 'msw';

function wrapHandlerWithLogging(
  resolver: HttpResponseResolver
): HttpResponseResolver {
  return async (props) => {
    const { request, params, cookies } = props;
    // Log request details
    console.log(`[MSW] Intercepted: ${request.method} ${request.url}`, {
      method: request.method,
      url: request.url,
      body: request.body,
      params: params,
      cookies: cookies,
    });

    // Call original resolver
    const response = await resolver(props);
    // Log response details
    console.log(`[MSW] Mocked response: ${request.method} ${request.url}`, {
      method: request.method,
      url: request.url,
      response,
    });

    return response;
  };
}

export const handlers = [
  http.get(
    'https://api.example.com/users',
    wrapHandlerWithLogging(({ request, params, cookies }) => {
      return HttpResponse.json({ users: ['John', 'Jane'] });
    })
  ),
];
