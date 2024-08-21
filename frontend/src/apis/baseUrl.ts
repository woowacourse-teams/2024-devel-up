export const BASE_URL = {
  dev: 'https://dev.api.devel-up.co.kr',
  prod:
    process.env.NODE_ENV === 'production'
      ? 'https://api.devel-up.co.kr'
      : 'https://dev.api.devel-up.co.kr',
} as const;
