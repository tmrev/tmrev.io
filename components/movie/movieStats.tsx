import React, { FunctionComponent, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useAppSelector } from '../../hooks';
import { TmrevReview } from '../../models/tmrev';
import { useAuth } from '../../provider/authUserContext';
import { useGetTmrevAvgScoreQuery } from '../../redux/api';
import { roundWithMaxPrecision } from '../../utils/common';
import { getMedian, getStandardDeviation } from '../../utils/math';
import { parseMediaId } from '../../utils/mediaID';
import RadarChart from '../common/charts/radar';

interface Props {
  id?: string
  reviews: TmrevReview[]
}

const MovieStats:FunctionComponent<Props> = ({ id, reviews }) => {
  const { user } = useAuth();
  const { navigationOpen } = useAppSelector((state) => state.navigation);
  const { data, isLoading, isFetching } = useGetTmrevAvgScoreQuery(
    parseMediaId(id),
    { skip: !parseMediaId(id) },
  );

  const userReview = useMemo(() => {
    if (!reviews || !user) return [];

    const findReview = reviews.filter((value) => value.userId === user.uid);

    if (findReview.length) {
      return findReview;
    }

    return [];
  }, [user, reviews]);

  const formatReviews = useMemo(() => {
    if (!reviews) return null;

    const plot: number[] = [];
    const acting: number[] = [];
    const theme: number[] = [];
    const climax: number[] = [];
    const ending: number[] = [];
    const chars: number[] = [];
    const music: number[] = [];
    const cinema: number[] = [];
    const visuals: number[] = [];
    const personalScore: number[] = [];

    reviews.forEach((value) => {
      if (!value.advancedScore) return;

      plot.push(value.advancedScore.plot);
      acting.push(value.advancedScore.acting);
      theme.push(value.advancedScore.theme);
      climax.push(value.advancedScore.climax);
      ending.push(value.advancedScore.ending);
      chars.push(value.advancedScore.characters);
      music.push(value.advancedScore.music);
      cinema.push(value.advancedScore.cinematography);
      visuals.push(value.advancedScore.visuals);
      personalScore.push(value.advancedScore.personalScore);
    });

    return {
      acting,
      chars,
      cinema,
      climax,
      ending,
      music,
      personalScore,
      plot,
      theme,
      visuals,
    };
  }, [reviews]);

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
    if (!data || !reviews || !formatReviews) return [];

    const chartData = [
      {
        backgroundColor: 'rgba(255, 192, 0, 1)',
        borderColor: 'rgba(255, 192, 0, 1)',
        data: [
          getMedian(formatReviews.plot),
          getMedian(formatReviews.theme),
          getMedian(formatReviews.climax),
          getMedian(formatReviews.ending),
          getMedian(formatReviews.acting),
          getMedian(formatReviews.chars),
          getMedian(formatReviews.music),
          getMedian(formatReviews.cinema),
          getMedian(formatReviews.visuals),
          getMedian(formatReviews.personalScore),
        ],
        fill: false,
        label: 'Average Scores',
      },
      {
        backgroundColor: '#4E26E2',
        borderColor: '#4E26E2',
        data: [
          getStandardDeviation(formatReviews.plot),
          getStandardDeviation(formatReviews.theme),
          getStandardDeviation(formatReviews.climax),
          getStandardDeviation(formatReviews.ending),
          getStandardDeviation(formatReviews.acting),
          getStandardDeviation(formatReviews.chars),
          getStandardDeviation(formatReviews.music),
          getStandardDeviation(formatReviews.cinema),
          getStandardDeviation(formatReviews.visuals),
          getStandardDeviation(formatReviews.personalScore),
        ],
        fill: false,
        label: 'Standard Deviation',
      },
    ];

    if (userReview.length) {
      chartData.push(
        {
          backgroundColor: '#FD4C55',
          borderColor: '#FD4C55',
          data: [
            userReview[0].advancedScore?.plot,
            userReview[0].advancedScore?.theme,
            userReview[0].advancedScore?.climax,
            userReview[0].advancedScore?.ending,
            userReview[0].advancedScore?.acting,
            userReview[0].advancedScore?.characters,
            userReview[0].advancedScore?.music,
            userReview[0].advancedScore?.cinematography,
            userReview[0].advancedScore?.visuals,
            userReview[0].advancedScore?.personalScore,
          ],
          fill: false,
          label: 'Personal Score',
        },
      );
    }

    return chartData;
  }, [data, formatReviews, userReview]);

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
                display: true,
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
                  circular: true,
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
                  display: false,
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
