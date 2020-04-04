export const selectPreset = [
  {
    id: 'selectPreset',
    name: 'Schleep Schedule',
    type: 'number',
    defaultValue: 1,
    values: [
      {
        name: 'Everyman 1 - Single Nap',
        value: 0,
      },
      {
        name: 'Everyman 2 - Dual Nap',
        value: 1,
      },
      {
        name: 'Everyman 3 - Triple Nap',
        value: 2,
      },
      {
        name: 'Everyman 4 - Quadruple Nap',
        value: 3,
      },
      {
        name: 'Everyman 5 - Quintuple Nap',
        value: 4,
      },
    ],
  },
];

const core = (start, length) => {
  return {
    id: 'core',
    name: 'Core',
    type: 'section',
    options: [
      {
        id: 'coreStart',
        name: 'Start',
        type: 'time',
        defaultValue: start,
      },
      {
        id: 'coreLength',
        name: 'Length',
        type: 'number',
        min: 0,
        max: 540,
        steps: 45,
        defaultValue: length,
      },
    ],
  };
};

const nap = (start, length, prefix) => {
  const idPrefix = prefix ? prefix.toLowerCase() : 'first';
  const stringPrefix = prefix ? `${prefix} ` : '';
  return {
    id: `${idPrefix}Nap`,
    name: `${stringPrefix}Nap`,
    type: 'section',
    options: [
      {
        id: `${idPrefix}NapStart`,
        name: 'Start',
        type: 'time',
        defaultValue: start,
      },
      {
        id: `${idPrefix}NapLength`,
        name: 'Length',
        type: 'number',
        min: 0,
        max: 240,
        steps: 5,
        defaultValue: length,
      },
    ],
  };
};

export const templates = [
  [core('23:00', 360), nap('13:00', 20)],
  [core('23:00', 270), nap('08:00', 20, 'First'), nap('14:30', 20, 'Second')],
  [
    core('21:00', 180),
    nap('04:10', 20, 'First'),
    nap('08:10', 20, 'Second'),
    nap('14:40', 20, 'Third'),
  ],
  [
    core('22:00', 90),
    nap('03:10', 20, 'First'),
    nap('07:40', 20, 'Second'),
    nap('12:00', 20, 'Third'),
    nap('16:20', 20, '4th'),
  ],
  [
    core('22:00', 90),
    nap('02:00', 20, 'First'),
    nap('06:00', 20, 'Second'),
    nap('10:00', 20, 'Third'),
    nap('14:00', 20, '4th'),
    nap('18:00', 20, '5th'),
  ],
];
