/* eslint-disable @typescript-eslint/no-explicit-any */
import buildURL from './buildURL';
import HTTP_METHOD from './httpMethod';

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
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      return data;
    } catch (err) {
      throw new Error('');
    }
  }
}
