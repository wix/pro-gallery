export const pick = (obj, keys) => {
  const res = {};
  Object.entries(obj).forEach(([key, val]) => {
    if (keys.indexOf(key) >= 0) {
      res[key] = val;
    }
  });
  return res;
};

export const throttle = (callback, limit) => {
  let wait = false;
  return (...args) => {
    if (!wait) {
      callback.apply(this, args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  }
}

export const debounce = (callback, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, wait);
  }
}
}

export const get = (obj, path, defaultValue) => {
  const result = String.prototype.split.call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((res, key) => (res !== null && res !== undefined) ? res[key] : res, obj);
  return (result === undefined || result === obj) ? defaultValue : result;
}

export const isFunction = something => typeof something === 'function';

//   find: () => {},
//   get: () => {},
//   isUndefined: () => {},
//   isNaN: () => {},
//   clone: () => {},
// }
