export function nextTick (callback: (...args: any[]) => any) {
  return Promise.resolve().then(callback);
};
