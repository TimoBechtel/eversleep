export const parseString = (timeString) => {
  const parts = timeString.split(':');
  return parseInt(parts[0]) + parseFloat(parts[1]) / 60;
};

export const addHours = (a, b) => (a + b <= 24 ? a + b : a + b - 24);

export const hDiff = (start, end) =>
  end >= start ? end - start : 24 - start + end;
