import { serialize, deserialize } from 'json2url';

const STORE_KEY = 'store';
const PRESET_KEY = 'preset';

export const load = () => {
  let store, preset;
  const match = window.location.href.match(/\?c=(.*)/);
  if (match) {
    [preset, store] = deserialize(match[1]);
  } else {
    preset = localStorage.getItem(PRESET_KEY) || null;
    store = JSON.parse(localStorage.getItem(STORE_KEY)) || null;
  }
  return { preset, store };
};

export const save = (preset, store) => {
  localStorage.setItem(PRESET_KEY, preset);
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
};

export const shareLink = (preset, store) => {
  const serialized = serialize({ preset, store });
  return `${window.location.origin}${window.location.pathname}?c=${serialized}`;
};
