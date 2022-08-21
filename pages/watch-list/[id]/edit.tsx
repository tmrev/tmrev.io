/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from 'clsx';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { useAppSelector } from '../../../hooks';
import { UpdateWatchList } from '../../../models/tmrev';
import { useAuth } from '../../../provider/authUserContext';
import { useUpdateWatchListMutation } from '../../../redux/api';
import imageUrl from '../../../utils/imageUrl';

const WatchListEdit: NextPage = () => {
  const router = useRouter();
  const { movies, watchList } = useAppSelector((state) => state.watchList);
  const [removedMovies, setRemovedMovies] = useState<number[]>([]);
  const [publicStatus, setPublicStatus] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const { user } = useAuth();
  const [description, setDescription] = useState<string>('');
  const [updateWatchList] = useUpdateWatchListMutation();

  const update = async () => {
    if (!watchList || !movies || !user) return;
    try {
      const token = await user.getIdToken();

      const moviesIds: number[] = [];

      watchList.movies.forEach((value) => {
        if (!removedMovies.includes(value)) moviesIds.push(value);
      });

      const payload: UpdateWatchList = {
        description,
        movies: moviesIds,
        public: publicStatus,
        tags: watchList.tags,
        title,
        token,
        userId: user.uid,
        watchListId: watchList._id,
      };

      await updateWatchList(payload);

      router.back();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleRemoveMovies = (id: number) => {
    if (removedMovies.includes(id)) {
      const newArray = [...removedMovies];
      const index = removedMovies.findIndex((value) => value === id);
      newArray.splice(index, 1);
      setRemovedMovies([...newArray]);
    } else {
      const newArray = [...removedMovies];
      newArray.push(id);
      setRemovedMovies(newArray);
    }
  };

  const renderVisibility = () => (
    <Button variant="icon" onClick={() => setPublicStatus(!publicStatus)}>
      <span className="material-symbols-outlined">
        {publicStatus ? 'visibility' : 'visibility_off'}
      </span>
    </Button>
  );

  useEffect(() => {
    if (!watchList) return;

    setPublicStatus(watchList.public);
    setTitle(watchList.title);
    setDescription(watchList.description);
  }, [watchList]);

  useEffect(() => {
    if (!movies || !watchList) {
      router.push(`/watch-list/${router.query.id}`);
    }
  }, [watchList, movies, router.query.id]);

  useEffect(() => {
    if (router.query.id) {
      router.prefetch(`/watch-list/${router.query.id}`);
    }
  }, [router.query.id]);

  const renderUpdates = () => {
    if (!watchList) return null;
    const updates: React.ReactNode[] = [];

    if (removedMovies.length) updates.push(<li>{`You are removing ${removedMovies.length} Movie`}</li>);

    if (publicStatus !== watchList.public) updates.push(<li>{`You are updating visibility to ${publicStatus ? 'Public' : 'Private'}`}</li>);

    if (title !== watchList.title) updates.push(<li>{`You are updating the Title from "${watchList.title}" to "${title}"`}</li>);

    if (description !== watchList.description) updates.push(<li>{`You are updating the Description from "${watchList.description}" to "${description}"`}</li>);

    return (
      <>
        <ul className=" font-bold text-tmrev-alt-red list-inside list-disc w-full">
          {updates.map((value) => (
            <React.Fragment key={value?.toString()}>
              {value}
            </React.Fragment>
          ))}
        </ul>
        {!!updates.length && (
          <Button variant="primary" onClick={update}>Save</Button>
        )}
      </>
    );
  };

  if (!watchList || !movies) return null;

  return (
    <>
      <div className="bg-tmrev-gray-dark p-4 w-full flex-col flex text-white">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="watchlist-title">WatchList Title</label>
            <div className="flex items-center space-x-4">
              <Input
                className="w-max"
                defaultValue={watchList.title}
                id="watchlist-title"
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
              {renderVisibility()}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="watchlist-description">WatchList Description</label>
            <div className="flex items-center space-x-4">
              <Input
                className="w-max"
                defaultValue={watchList.description}
                id="watchlist-description"
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </div>
          </div>
          {renderUpdates()}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4 items-start mt-4">
        {watchList.movies.map((movieId) => {
          const value = movies[movieId];
          return (
            <button
              key={value.id}
              className="flex justify-center items-center rounded"
              title="click to remove"
              type="button"
              onClick={() => handleRemoveMovies(movieId)}
            >
              <div className={clsx(
                'relative aspect-[2/3] w-[250px] h-[400px]  rounded',
                'lg:w-[300px] lg:h-[500px]',
              )}
              >
                <Image
                  priority
                  className={clsx('rounded', removedMovies.includes(movieId) ? 'opacity-10' : 'opacity-100')}
                  layout="fill"
                  objectFit="cover"
                  src={imageUrl(value.poster_path || '', 500)}
                />
              </div>
            </button>
          );
        })}
      </div>
    </>

  );
};

export default WatchListEdit;
