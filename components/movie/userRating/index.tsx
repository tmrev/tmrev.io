/* eslint-disable sort-keys-fix/sort-keys-fix */
import clsx from 'clsx';
import React, {
  FunctionComponent, memo, useCallback, useEffect, useMemo, useState,
} from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setCurrentReview } from '../../../redux/slice/reviewsSlice';
import { debounce } from '../../../utils/common';
import Button from '../../common/Button';
import HeaderText from '../../common/typography/headerText';
import RateList from './rateList';

type RatingType = 'acting' | 'characters' |
'cinematography' | 'climax' | 'ending' | 'music' |
'personalScore' | 'plot' | 'theme' | 'visuals'

const UserRating: FunctionComponent = () => {
  const { currentReview } = useAppSelector((state) => state.reviews);
  const [plot, setPlot] = useState<number | null>(null);
  const [theme, setTheme] = useState<number | null>(null);
  const [climax, setClimax] = useState<number | null>(null);
  const [ending, setEnding] = useState<number | null>(null);
  const [acting, setActing] = useState<number | null>(null);
  const [characters, setCharacters] = useState<number | null>(null);
  const [music, setMusic] = useState<number | null>(null);
  const [cinematography, setCinematography] = useState<number | null>(null);
  const [visuals, setVisuals] = useState<number | null>(null);
  const [personalScore, setPersonalScore] = useState<number | null>(null);
  const [notes, setNotes] = useState<string>(currentReview?.notes || '');
  const [reviewedDate, setReviewedDate] = useState<string>(currentReview?.reviewedDate || '');
  const [expand, setExpand] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const inputs = useMemo(() => ({
    plot: {
      defaultValue: plot,
      label: 'Plot',
      setValue: setPlot,
    },
    theme: {
      defaultValue: theme,
      label: 'Theme',
      setValue: setTheme,
    },
    climax: {
      defaultValue: climax,
      label: 'Climax',
      setValue: setClimax,
    },
    ending: {
      defaultValue: ending,
      label: 'Ending',
      setValue: setEnding,
    },
    acting: {
      defaultValue: acting,
      label: 'Acting',
      setValue: setActing,
    },
    characters: {
      defaultValue: characters,
      label: 'Characters',
      setValue: setCharacters,
    },
    music: {
      defaultValue: music,
      label: 'Music',
      setValue: setMusic,
    },
    cinematography: {
      defaultValue: cinematography,
      label: 'Cinematography',
      setValue: setCinematography,
    },
    visuals: {
      defaultValue: visuals,
      label: 'Visuals',
      setValue: setVisuals,
    },
    personalScore: {
      defaultValue: personalScore,
      label: 'Personal Score',
      setValue: setPersonalScore,
    },
  }), []);

  const notesChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const debouncedNotes = useCallback(debounce(notesChangeHandler, 300), []);

  useEffect(() => {
    dispatch(setCurrentReview(
      {
        advancedScore: {
          acting,
          characters,
          cinematography,
          climax,
          ending,
          music,
          personalScore,
          plot,
          theme,
          visuals,
        },
        notes: notes || currentReview?.notes,
        reviewedDate: reviewedDate || currentReview?.reviewedDate,
      } as any,
    ));
  }, [
    plot, theme, climax,
    ending, acting, characters,
    music, cinematography, visuals,
    personalScore, notes, reviewedDate,
  ]);

  return (
    <div className="flex-col space-y-4">
      <div className="flex items-center">
        <HeaderText headingType="h2">Rating</HeaderText>
        <div className="flex-grow" />
        <Button variant="icon" onClick={() => setExpand(!expand)}>
          <span className="material-symbols-outlined">
            {expand ? 'expand_less' : 'expand_more'}
          </span>
        </Button>
      </div>
      {
        expand && (
          Object.keys(inputs).map((input: any) => (
            <div key={inputs[input as RatingType].label}>
              <RateList
                defaultValue={currentReview?.advancedScore[input as RatingType]}
                label={inputs[input as RatingType].label}
                setValue={inputs[input as RatingType].setValue}
              />
            </div>
          ))
        )
      }
      <div>
        <HeaderText headingType="h2">Notes</HeaderText>
        <textarea
          className={clsx(
            'border-2 p-2 rounded w-full',
            'dark:bg-tmrev-gray-dark opacity-100 dark:border-black dark:text-white',
            'dark:focus:outline-white focus:outline-black focus:outline-1',
          )}
          defaultValue={currentReview?.notes}
          rows={5}
          onChange={debouncedNotes}
        />
      </div>
      <div className="space-y-4">
        <HeaderText headingType="h2">Review Date</HeaderText>
        <input
          className={clsx(
            'border-2 p-2 rounded w-full',
            'dark:bg-tmrev-gray-dark opacity-100 dark:border-black dark:text-white',
            'dark:focus:outline-white focus:outline-black focus:outline-1',
          )}
          defaultValue={currentReview?.reviewedDate}
          type="date"
          onChange={(e) => setReviewedDate(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

export default memo(UserRating);
