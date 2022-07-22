import {
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import React, { FunctionComponent, useMemo } from 'react';
import { Radar } from 'react-chartjs-2';

import { Data, Datasets } from './bar';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface Props {
  labels: string[];
  datasets: Datasets[]
  options?: ChartOptions
}

const RadarChart: FunctionComponent<Props> = ({ labels, datasets, options }:Props) => {
  const data:Data = useMemo(() => ({
    datasets,
    labels,
  }), [labels, datasets]);

  return (
    <Radar data={data} options={options as any} />
  );
};

RadarChart.defaultProps = {
  options: {
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
    responsive: true,
  },
};

export default RadarChart;
