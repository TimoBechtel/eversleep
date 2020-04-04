import './app.scss';
import SettingsUI from 'settings-ui';
import { selectPreset, templates } from './uiTemplates';
import { init, update } from './pieChart';
import { generateNaps } from './viewModelAdapter';
import { load, save } from './configLoader';
import { assignProperties } from './utils';

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
  assignProperties(store, loadedSettings.store);
  ui.update();
}

ui.addChangeListener(changeListener);
const ctx = document.getElementById('pie-chart').getContext('2d');
init(ctx, generateNaps(store));
selectedPresetElemen = ui.render().to(document.getElementById('config'));

presetSelect.addChangeListener((key, value) => {
  updateSettingsUi(value);
});

document.getElementById('save-button').addEventListener('click', (e) => {
  save(presetStore.selectPreset, store);
  const buttonText = e.target.innerHTML;
  e.target.innerHTML = 'Saved configuration.';
  setTimeout(() => {
    e.target.innerHTML = buttonText;
  }, 3000);
});
