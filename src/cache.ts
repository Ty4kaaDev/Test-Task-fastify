const cache = new Map<string, any>();

export const setCache = (key: string, value: any, ttl: number) => {
  cache.set(key, { value, expires: Date.now() + ttl });
};

export const getCache = (key: string) => {
  const cached = cache.get(key);
  if (!cached) return null;
  
  if (Date.now() > cached.expires) {
    cache.delete(key);
    return null;
  }

  return cached.value;
};
