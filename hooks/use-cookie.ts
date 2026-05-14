import Cookies from 'js-cookie';
import { useCallback } from 'react';

interface CookieOptions {
  expires?: number; // Duration in hours
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

interface CookieData<T = any> {
  value: T;
  expiresAt: number; // Timestamp
}

export function useCookie() {
  /**
   * Set a cookie with automatic expiration handling
   */
  const setCookie = useCallback(
    <T = any>(key: string, value: T, durationInHours: number = 24, options?: CookieOptions) => {
      const expiresAt = Date.now() + durationInHours * 60 * 60 * 1000;
      const data: CookieData<T> = {
        value,
        expiresAt,
      };

      const cookieOptions = {
        expires: durationInHours / 24, // js-cookie expects days
        path: options?.path || '/',
        domain: options?.domain,
        secure: options?.secure ?? true,
        sameSite: options?.sameSite || ('lax' as const),
      };

      Cookies.set(key, JSON.stringify(data), cookieOptions);
    },
    []
  );

  /**
   * Get a cookie value and check if it's expired
   */
  const getCookie = useCallback(<T = any>(key: string): T | null => {
    try {
      const cookieValue = Cookies.get(key);
      if (!cookieValue) return null;

      const data: CookieData<T> = JSON.parse(cookieValue);

      // Check if expired
      if (Date.now() > data.expiresAt) {
        Cookies.remove(key);
        return null;
      }

      return data.value;
    } catch (error) {
      console.error(`Error parsing cookie ${key}:`, error);
      return null;
    }
  }, []);

  /**
   * Increment a numeric cookie value
   */
  const incrementCookie = useCallback(
    (key: string, incrementBy: number = 1, durationInHours: number = 24) => {
      const currentValue = getCookie<number>(key) || 0;
      const newValue = currentValue + incrementBy;
      setCookie(key, newValue, durationInHours);
      return newValue;
    },
    [getCookie, setCookie]
  );

  /**
   * Update/modify a cookie value
   */
  const updateCookie = useCallback(
    <T = any>(key: string, value: T, durationInHours?: number) => {
      const existingCookie = Cookies.get(key);
      let duration = durationInHours || 24;

      // Preserve existing expiration if no new duration provided
      if (!durationInHours && existingCookie) {
        try {
          const data: CookieData = JSON.parse(existingCookie);
          const remainingTime = data.expiresAt - Date.now();
          duration = Math.max(1, remainingTime / (60 * 60 * 1000)); // Convert to hours
        } catch {
          // Use default if parsing fails
        }
      }

      setCookie(key, value, duration);
    },
    [setCookie]
  );

  /**
   * Delete a cookie
   */
  const deleteCookie = useCallback(
    (key: string, options?: Pick<CookieOptions, 'path' | 'domain'>) => {
      Cookies.remove(key, { path: options?.path || '/', domain: options?.domain });
    },
    []
  );

  /**
   * Check if a cookie exists and is not expired
   */
  const hasCookie = useCallback(
    (key: string): boolean => {
      return getCookie(key) !== null;
    },
    [getCookie]
  );

  /**
   * Get remaining time until expiration (in milliseconds)
   */
  const getTimeUntilExpiration = useCallback((key: string): number | null => {
    try {
      const cookieValue = Cookies.get(key);
      if (!cookieValue) return null;

      const data: CookieData = JSON.parse(cookieValue);
      const remaining = data.expiresAt - Date.now();
      return remaining > 0 ? remaining : null;
    } catch {
      return null;
    }
  }, []);

  return {
    setCookie,
    getCookie,
    incrementCookie,
    updateCookie,
    deleteCookie,
    hasCookie,
    getTimeUntilExpiration,
  };
}
