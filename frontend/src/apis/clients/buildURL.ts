interface BuildURLParams {
  baseURL: URL;
  path?: string;
  queryParams?: Record<string, string>;
}

const buildURL = ({ baseURL, path, queryParams }: BuildURLParams): URL => {
  const url = new URL(baseURL);

  url.pathname = path ? path : '';
  url.search = queryParams ? new URLSearchParams(queryParams).toString() : '';

  return url;
};

export default buildURL;
