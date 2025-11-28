type CookieOptions = {
  days?: number;
  path?: string;
  secure?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
  domain?: string;
};

const isBrowser = typeof document !== 'undefined';

export const getCookie = (name: string): string | undefined => {
  if (!isBrowser) return undefined;
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (const c of cookies) {
    const [k, ...rest] = c.split('=');
    if (decodeURIComponent(k) === name) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return undefined;
};

export const setCookie = (
  name: string,
  value: string,
  opts: CookieOptions = {},
): void => {
  if (!isBrowser) return;
  const { days, path = '/', secure, sameSite = 'Lax', domain } = opts;

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (typeof days === 'number') {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    cookie += `; Expires=${expires}`;
  }
  if (path) cookie += `; Path=${path}`;
  if (domain) cookie += `; Domain=${domain}`;
  if (sameSite) cookie += `; SameSite=${sameSite}`;
  if (secure) cookie += `; Secure`;

  document.cookie = cookie;
};

export const removeCookie = (
  name: string,
  opts: Omit<CookieOptions, 'days'> = {},
): void => {
  setCookie(name, '', { ...opts, days: -1 });
};

export const getEntryCookie = (): string | null => {
  return getCookie('entry') || null;
};

export const clearEntryCookie = (): void => {
  const domain =
    process.env.NODE_ENV === 'production' ? '.say-cheese.me' : undefined;
  removeCookie('entry', { path: '/', domain });
};
