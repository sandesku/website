export const BASE_API_URL = "http://localhost:8080";
export const INTERNAL_AUTH_HEADER = { headers: { 'internal_auth_key': 'qwertyuioplkjhgfdsazxcvbnm' } };
export const PING_URL = "/v1/ping";
export const ARTICLE_LIST_URL = "/v1/article/list";
export const ARTICLE_URL = (code) => `/v1/article/get/${code}`;