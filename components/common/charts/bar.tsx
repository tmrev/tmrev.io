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
import React, { forwardRef, useMemo } from 'react';
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
  onClick?: React.MouseEventHandler<HTMLCanvasElement> | undefined
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = forwardRef<any, Props> (({datasets, labels, options, onClick}: Props, ref) => {
  const data:Data = useMemo(() => ({
    datasets,
    labels,
  }), [labels, datasets]);

  return (
    <Bar ref={ref} data={data} options={options as any} onClick={onClick} />
  );
});

BarChart.defaultProps = {
  onClick: undefined,
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
  }
};

export default BarChart;
