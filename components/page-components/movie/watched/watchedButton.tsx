import React, {
  FunctionComponent, useEffect, useMemo, useState,
} from 'react';

import { useAppDispatch } from '../../../../hooks';
import { AllReviewsResponse } from '../../../../models/tmrev';
import { MovieResponse } from '../../../../models/tmrev/movie';
import { Watched, WatchedPayload } from '../../../../models/tmrev/watched';
import { useAuth } from '../../../../provider/authUserContext';
import { useCreateWatchedMutation, useGetWatchedQuery, useUpdateWatchedMutation } from '../../../../redux/api';
import { setOpenToast, setToastContent } from '../../../../redux/slice/toastSlice';
import { numberShortHand } from '../../../../utils/common';
import Button from '../../../common/Button';

interface Props {
  movie: MovieResponse
  review: AllReviewsResponse
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
  review,
}:Props) => {
  const [token, setToken] = useState<string>('');
  const [addWatched] = useCreateWatchedMutation();
  const [updateWatched] = useUpdateWatchedMutation();
  const [success, setSuccess] = useState<boolean>(false);
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    if (success) {
      dispatch(setToastContent('Rated Movie Successfully'));
      dispatch(setOpenToast(true));
      setSuccess(false);
    }
  }, [success]);

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
      setSuccess(true);
    } else {
      await addWatched(payload);
      setSuccess(true);
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
        <p>{numberShortHand(review.body.likes)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="icon" onClick={() => handleWatched(false)}>
          <span className={pickClass(hasUserRated, false)}>
            thumb_down
          </span>
        </Button>
        <p>{numberShortHand(review.body.dislikes)}</p>
      </div>
    </div>
  );
};

export default WatchedButton;
