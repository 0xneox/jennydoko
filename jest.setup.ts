// Jest runs in a plain Node environment where the Metro/React-Native global
// `__DEV__` is not defined. Production code guards dev-only console output
// behind `if (__DEV__)`; mirror the dev build here so those logs still fire
// during tests (and so the guard never throws a ReferenceError).
(global as any).__DEV__ = true;
