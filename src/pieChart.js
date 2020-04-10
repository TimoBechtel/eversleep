import Chart from 'chart.js';
import { limit } from '@compactjs/limit';

const generateDataset = (naps) => {
  const sortedNaps = naps.sort((n1, n2) => n1.start - n2.start);
  const set = {
    data: [],
    backgroundColor: [],
    borderWidth: 4,
    borderColor: '#525367',
  };
  sortedNaps.forEach((nap, i) => {
    set.data.push(limit(nap.end - nap.start, 24));
    set.backgroundColor.push(gradient);
    let diff;
    if (sortedNaps[i + 1]) {
      diff = limit(sortedNaps[i + 1].start - nap.end, 24);
    } else {
      diff = limit(sortedNaps[0].start - nap.end, 24);
    }
    if (diff !== 0) {
      set.data.push(diff);
      set.backgroundColor.push(defaultBackground);
    }
  });
  return set;
};

const rotation = (naps) => {
  return -0.5 * Math.PI + (naps[0].start / 24) * 2 * Math.PI;
};

let pieChart, gradient, defaultBackground;
export const init = (ctx, naps) => {
  gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, '#f06e7c');
  gradient.addColorStop(1, '#fa2f88');
  defaultBackground = '#65687C';

  const dataset = generateDataset(naps);

  pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      datasets: [dataset],
    },
    options: {
      legend: false,
      rotation: rotation(naps),
      tooltips: {
        callbacks: {
          label: function (item, data) {
            if (data.datasets[item.datasetIndex].labels)
              return data.datasets[item.datasetIndex].labels[item.index];

            const time = data.datasets[item.datasetIndex].data[
              item.index
            ].toFixed(2);

            return `${Math.floor(time)}h ${Math.round((time * 60) % 60)}min`;
          },
        },
      },
    },
  });
};

export const update = (naps) => {
  const dataset = generateDataset(naps);
  pieChart.data.datasets[0] = dataset;
  pieChart.options.rotation = rotation(naps);
  pieChart.update();
};
