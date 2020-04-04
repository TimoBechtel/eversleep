const STORE_KEY = 'store';
const PRESET_KEY = 'preset';

export const load = () => {
  const preset = localStorage.getItem(PRESET_KEY) || null;
  const store = JSON.parse(localStorage.getItem(STORE_KEY)) || null;
  return { preset, store };
};

export const save = (preset, store) => {
  localStorage.setItem(PRESET_KEY, preset);
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
};
