import React, {
  FunctionComponent, useEffect, useMemo, useState,
} from 'react';

import { MovieResponse } from '../../../../models/tmrev/movie';
import { Watched, WatchedPayload } from '../../../../models/tmrev/watched';
import { useAuth } from '../../../../provider/authUserContext';
import { useCreateWatchedMutation, useGetWatchedQuery, useUpdateWatchedMutation } from '../../../../redux/api';
import { numberShortHand } from '../../../../utils/common';
import Button from '../../../common/Button';

interface Props {
  movie: MovieResponse
}

const pickClass = (active:Watched | null, thumbUp: boolean) => {
  if (!active) return 'material-icons-outlined';

  if (active?.liked && thumbUp) {
    return 'material-icons';
  }

  if (!active?.liked && !thumbUp) {
    return 'material-icons';
  }

  return 'material-icons-outlined';
};

const WatchedButton: FunctionComponent<Props> = ({
  movie,
}:Props) => {
  const [token, setToken] = useState<string>('');
  const [addWatched] = useCreateWatchedMutation();
  const [updateWatched] = useUpdateWatchedMutation();
  const { data } = useGetWatchedQuery(token, { skip: !token });
  const { user } = useAuth();

  const hasUserRated = useMemo(() => {
    if (!data) return null;

    const result: Watched[] = [];

    data.body.forEach((value) => {
      if (value.tmdbID === movie.body.id) {
        result.push(value);
      }
    });

    return result[0];
  }, [data]);

  useEffect(() => {
    if (!user) return;
    const fetchToken = async () => {
      setToken(user.uid);
    };
    fetchToken();
  }, [user]);

  const handleWatched = async (liked: boolean) => {
    if (!user) return;

    const authToken = await user.getIdToken();

    const payload: WatchedPayload = {
      _id: hasUserRated?._id,
      authToken,
      liked,
      posterPath: movie.body.poster_path,
      title: movie.body.title,
      tmdbID: movie.body.id,
    };

    if (hasUserRated) {
      await updateWatched(payload);
    } else {
      await addWatched(payload);
    }
  };

  return (
    <div className="flex space-x-2 mt-4">
      <div className="flex items-center space-x-2">
        <Button variant="icon" onClick={() => handleWatched(true)}>
          <span className={pickClass(hasUserRated, true)}>
            thumb_up
          </span>
        </Button>
        <p>{numberShortHand(movie.body.tmrev.likes)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="icon" onClick={() => handleWatched(false)}>
          <span className={pickClass(hasUserRated, false)}>
            thumb_down
          </span>
        </Button>
        <p>{numberShortHand(movie.body.tmrev.dislikes)}</p>
      </div>
    </div>
  );
};

export default WatchedButton;
