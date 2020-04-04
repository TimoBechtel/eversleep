import './app.scss';
import SettingsUI from 'settings-ui';
import { selectPreset, templates } from './uiTemplates';
import { init, update } from './pieChart';
import { generateNaps } from './viewModelAdapter';

if (navigator.serviceWorker) navigator.serviceWorker.register('/sw.js');

let pieChartInitialized = false;
const ctx = document.getElementById('pie-chart').getContext('2d');

const presetSelect = SettingsUI();
const defaultPresetId = presetSelect.bind(selectPreset).selectPreset;
presetSelect.render().to(document.getElementById('config'));

let selectedPresetElemen = null;
let eventTimer = null;
const updateSettingsUi = (newTemplate) => {
  const ui = SettingsUI();
  const store = ui.bind(newTemplate);
  clearTimeout(eventTimer);
  eventTimer = null;
  ui.addChangeListener(() => {
    clearTimeout(eventTimer);
    eventTimer = setTimeout(() => {
      update(generateNaps(store));
    }, 500);
  });
  const naps = generateNaps(store);
  if (pieChartInitialized) update(naps);
  else {
    init(ctx, naps);
    pieChartInitialized = true;
  }
  if (selectedPresetElemen)
    selectedPresetElemen = ui.render().replace(selectedPresetElemen);
  else selectedPresetElemen = ui.render().to(document.getElementById('config'));
};

updateSettingsUi(templates[defaultPresetId]);

presetSelect.addChangeListener((key, value) => {
  updateSettingsUi(templates[value] || templates[0]);
});
