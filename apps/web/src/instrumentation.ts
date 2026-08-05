import type { Instrumentation } from 'next';

export const onRequestError: Instrumentation.onRequestError = (
  error,
  request,
  context,
) => {
  const digest =
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    typeof error.digest === 'string'
      ? error.digest
      : null;

  const event = {
    digest,
    event: 'request_error',
    method: request.method,
    routePath: context.routePath,
    routeType: context.routeType,
    routerKind: context.routerKind,
    timestamp: new Date().toISOString(),
  };

  console.error(JSON.stringify(event));
};
