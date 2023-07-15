import React, {
  FunctionComponent, useEffect, useMemo, useState,
} from 'react';
import Skeleton from 'react-loading-skeleton';

import { TheNumbers, Title } from '../../../../models/tmrev';
import Button from '../../../common/Button';
import BarChart, { Datasets } from '../../../common/charts/bar';

const tmrevAPI = process.env.NEXT_PUBLIC_TMREV_API;

interface Props {
  title: string,
  year: string
  dataSet: Title
  id: number
}

const MovieRevenue:FunctionComponent<Props> = ({
  title, year, dataSet, id,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [data, setData] = useState<TheNumbers[]>([]);
  const [activeData, setActiveData] = useState<Title>(dataSet);
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

  const fetchTheNumbers = async () => {
    setIsLoading(true);
    setIsFetching(true);
    const response = await fetch(`${tmrevAPI}/numbers/daily?title=${title}&year=${year}&id=${id}`);
    const jsonData: TheNumbers[] = await response.json();
    setIsLoading(false);
    setIsFetching(false);

    setData(jsonData);
  };

  useEffect(() => {
    fetchTheNumbers();
  }, [title, year]);

  const handleActiveData = (value: Title) => {
    setActiveData(value);
    setOpenDropDown(false);
  };

  const dataIndex:number = useMemo(() => {
    if (!data.length) return 0;

    let index = 0;

    data.forEach((value, i) => {
      if (value.title === activeData) {
        index = i;
      }
    });

    return index;
  }, [activeData, data]);

  const labels: string[] = useMemo(() => {
    if (!data.length) return [];

    return data[dataIndex].data.map((value) => value.date);
  }, [data, dataIndex]);

  const datasets: Datasets[] = useMemo(() => {
    try {
      if (!data.length) return [];

      return [
        {
          backgroundColor: '#4E26E2',
          data: data[dataIndex].data.map((value) => Number(value.totalGross.replace(/[^0-9.-]+/g, ''))),
          label: 'Total Gross',
        },
        {
          backgroundColor: '#FD4C55',
          data: data[dataIndex].data.map((value) => Number(value.gross.replace(/[^0-9.-]+/g, ''))),
          label: 'Gross',
        },
        {
          backgroundColor: '#FFC000',
          data: data[dataIndex].data.map((value) => Number(value.perTheater.replace(/[^0-9.-]+/g, ''))),
          label: 'Per Theater',
        },
      ];
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return [];
    }
  }, [data, dataIndex]);

  if (isLoading || !data.length) {
    if (!isFetching) {
      return null;
    }

    return (
      <div className="max-w-[502px] bg-black rounded p-2 overflow-auto">
        <Skeleton baseColor="#3B3B3B" className=" mt-8" height={243} highlightColor="#555555" />
      </div>
    );
  }

  return (
    <div className=" bg-black rounded p-2 overflow-auto">
      <div className="flex items-center relative">
        <h2 className='text-lg font-semibold' >{data[dataIndex].title}</h2>
        <div className="flex-grow" />
        <div className="relative">
          <Button variant="icon" onClick={() => setOpenDropDown(!openDropDown)}>
            <span className="material-icons">
              more_vert
            </span>
          </Button>
          {openDropDown && (
            <div className="bg-tmrev-gray-dark text-white p-2 absolute rounded right-0 flex-col">
              <Button
                disabled={activeData === 'Weekend Box Office Performance'}
                onClick={() => handleActiveData('Weekend Box Office Performance')}
              >
                Weekend Box Office Performance
              </Button>
              <Button
                disabled={activeData === 'Daily Box Office Performance'}
                onClick={() => handleActiveData('Daily Box Office Performance')}
              >
                Daily Box Office Performance
              </Button>
              <Button
                disabled={activeData === 'Weekly Box Office Performance'}
                onClick={() => handleActiveData('Weekly Box Office Performance')}
              >
                Weekly Box Office Performance
              </Button>
            </div>
          )}
        </div>
      </div>
      <BarChart
        datasets={datasets}
        labels={labels}
        options={
          {
            plugins: {
              legend: {
                labels: {
                  color: 'white',
                },
                position: 'bottom' as const,
              },
              title: {
                color: 'white',
                display: false,
                text: `${data[dataIndex].title}`,
              },
            },
            responsive: true,
            scales: {
              x: {
                ticks: { color: 'white' },
              },
              y: {
                grid: {color: "#3B3B3B"},
                ticks: { color: 'white' },
              },
            },
          }
        }
      />
    </div>

  );
};

export default MovieRevenue;
