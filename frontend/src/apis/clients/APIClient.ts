/* eslint-disable @typescript-eslint/no-explicit-any */
import buildURL from './buildURL';
import { HTTP_METHOD } from '@/constants/api';
import * as Sentry from '@sentry/react';
import throwAPIError from './throwAPIError';
import HTTPError from '../error/HTTPError';

interface APIClientType {
  get<T>(path: string, queryParams?: Record<string, string>): Promise<T>;
  post<T>(path: string, body?: Record<string, any>): Promise<T>;
  patch<T>(path: string, body?: Record<string, any>): Promise<T>;
  delete(path: string): Promise<void>;
}

export default class APIClient implements APIClientType {
  private baseURL: URL;
  private header?: Headers;

  constructor(baseURL: string, header?: HeadersInit) {
    this.baseURL = new URL(baseURL);
    this.header = new Headers(header);
  }

  async get<T>(path: string, queryParams?: Record<string, string>): Promise<T> {
    return this.request<T>({ path, method: HTTP_METHOD.get, queryParams });
  }

  async post<T>(path: string, body?: object): Promise<T> {
    return this.request<T>({ path, method: HTTP_METHOD.post, body });
  }

  async patch<T>(path: string, body?: object): Promise<T> {
    return this.request<T>({ path, method: HTTP_METHOD.patch, body });
  }

  async delete(path: string): Promise<void> {
    return this.request<void>({ path, method: HTTP_METHOD.delete });
  }

  private async request<T>({
    path,
    method,
    body,
    queryParams,
  }: {
    path: string;
    method: string;
    body?: Record<string, any>;
    queryParams?: Record<string, string>;
  }): Promise<T> {
    try {
      const url = buildURL({ baseURL: this.baseURL, path, queryParams });

      const response = await fetch(url, {
        method,
        headers: this.header,
        body: JSON.stringify(body),
        credentials: 'include',
      });

      if (!response.ok) {
        throwAPIError(response.status);
      }

      const data = response.status === 204 ? null : await response.json();

      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        console.error(`HTTP Error ${err.statusCode}: ${err.information.message}`);
      }

      Sentry.withScope((scope: Sentry.Scope) => {
        scope.setLevel('error');
        scope.setTag('url', window.location.href);
        Sentry.captureException(err);
      });
      throw err;
    }
  }
}
