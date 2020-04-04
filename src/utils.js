export const parseString = (timeString) => {
  const parts = timeString.split(':');
  return parseInt(parts[0]) + parseFloat(parts[1]) / 60;
};

export const addHours = (a, b) => (a + b <= 24 ? a + b : a + b - 24);

export const hDiff = (start, end) =>
  end >= start ? end - start : 24 - start + end;

export const assignProperties = (objectA, objectB) => {
  const isArray = Array.isArray(objectB);
  Object.keys(objectA).forEach((key, i) => {
    if (objectA[key] && typeof objectA[key] === 'object') {
      assignProperties(objectA[key], objectB[isArray ? i : key]);
      return;
    }
    objectA[key] = objectB[isArray ? i : key];
  });
};
