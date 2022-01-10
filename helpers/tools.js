export const pick = (names) => (obj) => {
  names = Array.isArray(names) ? names : [names];
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => names.includes(key))
  );
};
