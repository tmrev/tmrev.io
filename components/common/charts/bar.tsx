import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { FunctionComponent, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

export type Datasets = {
  label: string
  data: string[] | number[]
  backgroundColor: string;
}

export type Data = {
  labels: string[];
  datasets: Datasets[]
}

interface Props {
  labels: string[]
  datasets: Datasets[]
  options?: ChartOptions
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart:FunctionComponent<Props> = ({ labels, datasets, options }: Props) => {
  const data:Data = useMemo(() => ({
    datasets,
    labels,
  }), [labels, datasets]);

  return (
    <Bar data={data} options={options as any} />
  );
};

BarChart.defaultProps = {
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

export default BarChart;
