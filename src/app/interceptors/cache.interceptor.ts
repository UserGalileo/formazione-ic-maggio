import {HttpContextToken, HttpHandlerFn, HttpRequest, HttpResponse} from '@angular/common/http';
import {of, tap} from 'rxjs';

const cache = new Map<string, any>();

export const SHOULD_CACHE = new HttpContextToken(() => false);

export function cacheInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {

  if (req.method !== 'GET') {
    return next(req);
  }

  const cachedResponse = cache.get(req.urlWithParams);

  return cachedResponse
    ? of(cachedResponse)
    : next(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse && req.context.get(SHOULD_CACHE)) {
          cache.set(req.urlWithParams, event);
        }
      })
    )


}

// CREARE un Observable che emette un valore e completa.
