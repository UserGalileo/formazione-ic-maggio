import {
  ApplicationConfig,
  ErrorHandler,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {noopInterceptor} from './interceptors/noop.interceptor';
import {cacheInterceptor, SHOULD_CACHE} from './interceptors/cache.interceptor';
import {retryInterceptor} from './interceptors/retry.interceptor';
import {MyErrorHandler} from './services/error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([noopInterceptor, cacheInterceptor, retryInterceptor])
    ),
    {
      provide: ErrorHandler,
      useClass: MyErrorHandler
    }
  ]
};
