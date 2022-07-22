import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { FunctionComponent, useMemo } from 'react';
import { Line } from 'react-chartjs-2';

import type { Data, Datasets } from './bar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
);

interface Props {
  labels: string[];
  datasets: Datasets[]
  options?: ChartOptions
}

const LineCart: FunctionComponent<Props> = ({ labels, datasets, options }:Props) => {
  const data:Data = useMemo(() => ({
    datasets,
    labels,
  }), [labels, datasets]);

  return (
    <Line data={data} options={options as any} />
  );
};

LineCart.defaultProps = {
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

export default LineCart;
