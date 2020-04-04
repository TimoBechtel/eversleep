import { parseString, addHours } from './utils';

export const generateNaps = (uiStore) => {
  const naps = [];
  // guessing that object has specific schema
  // TODO: needs refactoring
  Object.values(uiStore).forEach((value) => {
    const start = parseString(Object.values(value)[0]);
    const end = addHours(start, Object.values(value)[1] / 60);
    naps.push({ start, end });
  });
  return naps;
};
