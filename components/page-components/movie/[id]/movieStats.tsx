import React, { FunctionComponent, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useAppSelector } from '../../../../hooks';
import { Tmrev } from '../../../../models/tmrev/movie';
import { useAuth } from '../../../../provider/authUserContext';
import { roundWithMaxPrecision } from '../../../../utils/common';
import { getMedian, getStandardDeviation } from '../../../../utils/math';
import RadarChart from '../../../common/charts/radar';
import HeaderText from '../../../common/typography/headerText';

interface Props {
  tmrev: Tmrev
  isFetching: boolean,
  isLoading: boolean
}

const MovieStats:FunctionComponent<Props> = ({
  tmrev, isFetching, isLoading,
}) => {
  const { reviews, avgScore } = tmrev;

  const { user } = useAuth();
  const { navigationOpen } = useAppSelector((state) => state.navigation);

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
    if (!avgScore) return [];

    return [
      'Plot', 'Theme', 'Climax',
      'Ending', 'Acting',
      'Characters', 'Music',
      'Cinematography', 'Visuals', 'Personal Score',
    ];
  }, [avgScore]);

  const datasets: any[] = useMemo(() => {
    if (!avgScore || !reviews || !formatReviews) return [];

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
  }, [avgScore, formatReviews, userReview]);

  if (isLoading || !avgScore) {
    if (!isFetching) {
      return null;
    }

    return (
      <div className="hidden lg:block lg:max-w-xl xl:w-full xl:max-w-none space-y-8">
        <HeaderText headingType="h2">THE MOVIE REVIEW (RATING)</HeaderText>
        <Skeleton baseColor="#3B3B3B" className=" mt-8" height={512} highlightColor="#555555" />
      </div>
    );
  }

  return (
    <div className={` ${navigationOpen ? 'xl:max-w-4xl' : 'max-w-full'}  space-y-8`}>
      <div className="flex-col items-center relative">
        <HeaderText headingType="h2">
          THE MOVIE REVIEW (
          {roundWithMaxPrecision(avgScore.totalScore, 1)}
          )
        </HeaderText>
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

export default MovieStats;
