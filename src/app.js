import './app.scss';
import 'oh-snack/dist/index.css';
import SettingsUI from 'settings-ui';
import { selectPreset, templates } from './uiTemplates';
import { init, update } from './pieChart';
import { generateNaps } from './viewModelAdapter';
import { load, save, shareLink } from './configLoader';
import { assign } from '@compactjs/assign';
import { clipboard } from '@compactjs/clipboard';
import { snack } from 'oh-snack';

if (navigator.serviceWorker) navigator.serviceWorker.register('/sw.js');

const presetSelect = SettingsUI();
const presetStore = presetSelect.bind(selectPreset);
presetSelect.render().to(document.getElementById('config'));

const loadedSettings = load();
if (loadedSettings.preset !== null) {
  presetStore.selectPreset = loadedSettings.preset;
  presetSelect.update('selectPreset');
}

let selectedPresetElemen = null;
let store;
let eventTimer = null;
let ui = SettingsUI();

const changeListener = () => {
  clearTimeout(eventTimer);
  eventTimer = setTimeout(() => {
    update(generateNaps(store));
  }, 500);
};

const updateSettingsUi = (presetId) => {
  ui = SettingsUI();
  ui.addChangeListener(changeListener);
  const newTemplate = templates[presetId] || templates[0];
  store = ui.bind(newTemplate);
  const naps = generateNaps(store);
  update(naps);
  selectedPresetElemen = ui.render().replace(selectedPresetElemen);
};

store = ui.bind(templates[presetStore.selectPreset]);

if (loadedSettings.store) {
  assign(store, loadedSettings.store);
  ui.update();
}

ui.addChangeListener(changeListener);
const ctx = document.getElementById('pie-chart').getContext('2d');
init(ctx, generateNaps(store));
selectedPresetElemen = ui.render().to(document.getElementById('config'));

presetSelect.addChangeListener((key, value) => {
  updateSettingsUi(value);
});

document.getElementById('save-button').addEventListener('click', () => {
  save(presetStore.selectPreset, store);
  snack('Saved configuration');
});

document.getElementById('share-button').addEventListener('click', () => {
  const link = shareLink(presetStore.selectPreset, store);
  console.log(link);
  // window.location.href = shareLink(presetStore.selectPreset, store);
  if (navigator && navigator.share) {
    navigator.share({
      title: 'Eversleep',
      text: 'A polyphasic sleep schedule',
      url: link,
    });
  } else {
    clipboard(link); snack('Copied configuration link to clipboard');
  }
});
