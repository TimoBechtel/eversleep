import { limit } from '@compactjs/limit';
import { parse } from '@compactjs/parse-time';

export const generateNaps = (uiStore) => {
  const naps = [];
  // guessing that object has specific schema
  // TODO: needs refactoring
  Object.values(uiStore).forEach((value) => {
    const start = parse(Object.values(value)[0]);
    const end = limit(start + Object.values(value)[1] / 60, 24);
    naps.push({ start, end });
  });
  return naps;
};
