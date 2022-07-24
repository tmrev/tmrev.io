import clsx from 'clsx';
import React, {
  FunctionComponent, useCallback, useEffect, useMemo, useState,
} from 'react';

import { useAppDispatch } from '../../../hooks';
import { setCurrentReview } from '../../../redux/slice/reviewsSlice';
import { debounce } from '../../../utils/common';
import Button from '../../common/Button';
import RateList from './rateList';

type RatingType = 'acting' | 'characters' |
'cinematography' | 'climax' | 'ending' | 'music' |
'personalScore' | 'plot' | 'theme' | 'visuals'

const UserRating: FunctionComponent = () => {
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
  const [notes, setNotes] = useState<string>('');
  const [reviewedDate, setReviewedDate] = useState<string>('');
  const [expand, setExpand] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const inputs = useMemo(() => ({
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
    cinematography: {
      defaultValue: cinematography,
      label: 'Cinematography',
      setValue: setCinematography,
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
    music: {
      defaultValue: music,
      label: 'Music',
      setValue: setMusic,
    },
    personalScore: {
      defaultValue: personalScore,
      label: 'Personal Score',
      setValue: setPersonalScore,
    },
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
    visuals: {
      defaultValue: visuals,
      label: 'Visuals',
      setValue: setVisuals,
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
        notes,
        reviewedDate,
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
        <h2 className="text-tmrev-alt-yellow font-bold tracking-widest text-2xl">RATING</h2>
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
                defaultValue={inputs[input as RatingType].defaultValue}
                label={inputs[input as RatingType].label}
                setValue={inputs[input as RatingType].setValue}
              />
            </div>
          ))
        )
      }
      <div>
        <h2 className="text-tmrev-alt-yellow font-bold tracking-widest text-2xl">NOTES</h2>
        <textarea
          className={clsx(
            'border-2 p-2 rounded w-full',
            'dark:bg-tmrev-gray-dark opacity-100 dark:border-black dark:text-white',
            'dark:focus:outline-white focus:outline-black focus:outline-1',
          )}
          rows={5}
          onChange={debouncedNotes}
        />
      </div>
      <div className="space-y-4">
        <h2 className="text-tmrev-alt-yellow font-bold tracking-widest text-2xl">REVIEW DATE</h2>
        <input
          className={clsx(
            'border-2 p-2 rounded w-full',
            'dark:bg-tmrev-gray-dark opacity-100 dark:border-black dark:text-white',
            'dark:focus:outline-white focus:outline-black focus:outline-1',
          )}
          type="date"
          onChange={(e) => setReviewedDate(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

export default UserRating;
