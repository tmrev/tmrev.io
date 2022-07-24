import React, { FunctionComponent, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useAppSelector } from '../../hooks';
import { useGetTmrevAvgScoreQuery } from '../../redux/api';
import { roundWithMaxPrecision } from '../../utils/common';
import { parseMediaId } from '../../utils/mediaID';
import RadarChart from '../common/charts/radar';

interface Props {
  id?: string
}

const MovieStats:FunctionComponent<Props> = ({ id }) => {
  const { navigationOpen } = useAppSelector((state) => state.navigation);
  const { data, isLoading, isFetching } = useGetTmrevAvgScoreQuery(
    parseMediaId(id),
    { skip: !parseMediaId(id) },
  );

  const labels: string[] = useMemo(() => {
    if (!data) return [];

    return [
      'Plot', 'Theme', 'Climax',
      'Ending', 'Acting',
      'Characters', 'Music',
      'Cinematography', 'Visuals', 'Personal Score',
    ];
  }, [data]);

  const datasets: any[] = useMemo(() => {
    if (!data) return [];

    return [
      {
        backgroundColor: 'rgba(255, 192, 0, 0.2)',
        borderColor: 'rgba(255, 192, 0, 1)',
        data: [
          data.plot,
          data.theme, data.climax,
          data.ending,
          data.acting, data.characters,
          data.music,
          data.cinematography, data.visuals, data.personalScore,
        ],
        fill: false,
        label: 'Average Scores',
      },
    ];
  }, [data]);

  if (isLoading || !data) {
    if (!isFetching) {
      return null;
    }

    return (
      <div className="hidden lg:block lg:max-w-xl xl:w-full xl:max-w-none space-y-8">
        <h2 className="text-tmrev-alt-yellow font-bold tracking-widest text-2xl">THE MOVIE REVIEW (RATING)</h2>
        <Skeleton baseColor="#3B3B3B" className=" mt-8" height={512} highlightColor="#555555" />
      </div>
    );
  }

  return (
    <div className={` ${navigationOpen ? 'xl:max-w-4xl' : 'max-w-full'}  space-y-8`}>
      <div className="flex-col items-center relative">
        <h2 className="text-tmrev-alt-yellow font-bold tracking-widest text-2xl">
          THE MOVIE REVIEW (
          {roundWithMaxPrecision(data.totalScore, 1)}
          )
        </h2>

      </div>
      <RadarChart
        datasets={datasets}
        labels={labels}
        options={
          {
            plugins: {
              legend: {
                display: false,
                labels: {
                  color: 'white',
                },
                position: 'bottom' as const,
              },
              title: {
                color: 'white',
                display: false,
                text: '',
              },
            },
            responsive: true,
            scales: {
              r: {
                angleLines: {
                  color: '#3B3B3B',
                },
                grid: {
                  color: '#3B3B3B',
                },
                max: 10,
                min: 1,
                pointLabels: {
                  backdropColor: '#3B3B3B',
                  color: 'white',
                },
                ticks: {
                  backdropColor: '#3B3B3B',
                  color: 'white',
                },
              },
            },
          }
        }
      />
    </div>

  );
};

MovieStats.defaultProps = {
  id: '',
};

export default MovieStats;
