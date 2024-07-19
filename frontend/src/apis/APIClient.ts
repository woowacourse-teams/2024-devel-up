/* eslint-disable @typescript-eslint/no-explicit-any */

export const HTTP_METHOD = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  delete: 'DELETE',
} as const;

interface BuildURLParams {
  baseURL: URL;
  path?: string;
  queryParams?: Record<string, string>;
}

export const buildURL = ({ baseURL, path, queryParams }: BuildURLParams): URL => {
  const url = new URL(baseURL);

  url.pathname = path ? path : '';
  url.search = queryParams ? new URLSearchParams(queryParams).toString() : '';

  return url;
};

interface APIClientType {
  get<T>(path: string, queryParams?: Record<string, string>): Promise<T>;
  post(path: string, body?: Record<string, any>): Promise<void>;
  patch(path: string, body?: Record<string, any>): Promise<void>;
  delete(path: string): Promise<void>;
}

export default class APIClient implements APIClientType {
  private baseUrl: URL;
  private header?: Headers;

  constructor(baseUrl: string, header?: HeadersInit) {
    this.baseUrl = new URL(baseUrl);
    this.header = new Headers(header);
  }

  async get<T>(path: string, queryParams?: Record<string, string>): Promise<T> {
    const url = buildURL({ baseURL: this.baseUrl, path, queryParams });

    const response = await fetch(url, {
      headers: this.header,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
  }

  async post(path: string, body?: object): Promise<void> {
    const url = buildURL({ baseURL: this.baseUrl, path });

    const response = await fetch(url, {
      method: HTTP_METHOD.post,
      headers: this.header,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
  }

  async patch(path: string, body?: object): Promise<void> {
    const url = buildURL({ baseURL: this.baseUrl, path });

    const response = await fetch(url, {
      method: HTTP_METHOD.patch,
      headers: this.header,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
  }

  async delete(path: string): Promise<void> {
    const url = buildURL({ baseURL: this.baseUrl, path });

    const response = await fetch(url, {
      method: HTTP_METHOD.delete,
      headers: this.header,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
  }
}
